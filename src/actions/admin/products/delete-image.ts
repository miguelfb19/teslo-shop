"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL || "");

export const deleteImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl)
    return {
      ok: false,
      message: "No se pueden eliminar imagenes del file system",
    };

  const imageName = imageUrl.split("/").at(-1)?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);

    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)

    return {
      ok: true,
      message: "Imagen eliminada correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
      error,
    };
  }
};
