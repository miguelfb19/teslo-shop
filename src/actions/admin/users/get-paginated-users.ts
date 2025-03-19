"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin")
    return {
      ok: false,
      message: "El usuario debe ser administrador",
    };

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        email: "asc",
      },
    });

    return {
      ok: true,
      users,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al obtener los usuarios",
      error,
    };
  }
};
