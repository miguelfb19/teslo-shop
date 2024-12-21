import NextAuth, { type NextAuthConfig } from "next-auth";
// import GitHub from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "auth/new-account",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          // Buscar el correo en la DB
          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          if (!user) return null; // Si no existe el usuario

          // Comparar las contraseñas
          if (!bcryptjs.compareSync(password, user.password)) return null;

          // Return usuario e información relevante
          const { password: _, ...rest } = user; // lo que hicimos con el guin bajo basicamente es renombrar la variable para que no tenga conflicto

          return rest;
        } catch (error) {
          console.error("Hubo un error en la autenticación", error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig; // este es el tipado, puede ser tambien :NextAuthConfig en la definicion de la funcion

export const { signIn, signOut, auth } = NextAuth(authConfig);
