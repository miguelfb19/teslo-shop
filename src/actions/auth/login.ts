"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

interface Response {
  status: number;
  message: string;
  ok: boolean;
}

export async function authenticate(
  prevState: Response | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {...Object.fromEntries(formData), redirect: false});

    return { status: 200, message: "Ingresado correctamente.", ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: 401,
            message: "Credeniales incorrectas.",
            ok: false,
          };
        default:
          return { status: 500, message: "Algo malió sal.", ok: false };
      }
    }
  }
}

export const customLogin = async (email: string, password: string) => {

  try {
    await signIn("credentials", {email, password});
    return { ok: true, message: "Ingresado correctamente" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Credenciales incorrectas" };
  }
}
