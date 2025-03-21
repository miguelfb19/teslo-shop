"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

const ProductSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3).max(1024),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  gender: z.nativeEnum(Gender),
  tags: z.string().min(1),
  categoryId: z.string().uuid(),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = ProductSchema.safeParse(data);

  if (!productParsed.success) {
    console.error(productParsed.error);
    return { ok: false, message: "Los datos enviados no son validos" };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTransaction = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLocaleLowerCase());
      if (id) {
        //Actualizar
        product = await prisma.product.update({
          where: {
            id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        //Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de la imagenes
      // Recorrer la imagenes y guardarlas

      if (formData.getAll("images")) {
        // ["https://url.jpg", "https://url.jpg"]
        const images = await uploadImages(formData.getAll("images") as File[]);

        if (!images) {
          throw new Error("No se pudo guardar las imagenes, rolling back");
        }

        await prisma.productImage.createMany({
          data: images.map((imageUrl) => ({
            url: imageUrl!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // revalidate paths
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      product: prismaTransaction.product,
      ok: true,
      message: "Producto actualizado/creado correctamente",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo actualizar/crear el producto",
    };
  }
};

const uploadImages = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((res) => res.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
