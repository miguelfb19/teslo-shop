import NextAuth, { type NextAuthConfig } from "next-auth";
// import GitHub from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

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

        // Buscar el correo en la DB

        // Comparar las contraseñas

        // Return usuario e información relevante

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig; // este es el tipado, puede ser tambien :NextAuthConfig en la definicion de la funcion

export const { signIn, signOut, auth } = NextAuth(authConfig);
