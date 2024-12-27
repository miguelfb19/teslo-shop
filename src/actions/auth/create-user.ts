"use server";

import prisma from "@/lib/prisma";
import { CreateAccountInputs } from "@/app/auth/new-account/ui/RegisterForm";
import bcryptjs from "bcryptjs";

export const createNewUserAccount = async (data: CreateAccountInputs) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user)
      return { status: 400, message: "El usuario ya existe.", ok: false };

    // throw new Error // Esto es para prueba
    const newUser = await prisma.user.create({
      data: {
        email: data.email.toLocaleLowerCase(),
        password: bcryptjs.hashSync(data.password),
        name: data.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      status: 200,
      message: "Usuario creado correctamente.",
      ok: true,
      user: newUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Hubo un error al crear el usuario, intente de nuevo más tarde.",
      ok: false,
      error: error,
    };
  }
};
