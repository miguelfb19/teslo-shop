"use server";

import prisma from "@/lib/prisma";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) throw new Error("No se encontraron categorias");

    return {
      ok: true,
      message: "Categorias obtenidas correctamente",
      categories: categories,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al obtener las categorias",
      error,
    };
  }
};
