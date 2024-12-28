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

  // En estos callback puedo personalizar la respuesta que se envia al cliente
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    async session({ session, token }) {
      // Obtenemos el usuario de la base de datos
      const user = await prisma.user.findUnique({
        where: { email: token.email! },
      });

      session.user = token.data as any;

      // ! Actualizamos el rol en caso de que se haya cambiado en la base de datos.
      /*Esto es especialmente útil a la hora de actualizar en tiempo real algún dato sobre el usuario del lado del cliente
       ya que al hacer un cambio en la base de datos no se hace este cambio autómaticamente sin primero refrescarlo desde 
       estos callbacks donde viaja la información de la sessión
       útil para campos como emailVerified, role, y otros importantes*/

      if (user) session.user.role = user.role;

      return session;
    },
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
          const { password: _, ...rest } = user; // lo que hicimos con el guio bajo basicamente es renombrar la variable para que no tenga conflicto

          return rest;
        } catch (error) {
          console.error("Hubo un error en la autenticación", error);
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig; // este es el tipado, puede ser tambien :NextAuthConfig en la definicion de la funcion

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
