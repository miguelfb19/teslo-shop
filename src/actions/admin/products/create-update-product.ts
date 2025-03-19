"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";

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
  const prismaTransaction = await prisma.$transaction(async (tx) => {
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

      console.log({ updatedProduct: product });
    } else {
      //Crear
    }
  });

  //   todo: revalidate paths
  return { ok: true };
};
