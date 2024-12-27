"use client";

import { authenticate } from "@/actions/auth/login";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";
import clsx from "clsx";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { PasswordInput } from "../../../../components/ui/password/PasswordInput";

export interface SignInInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  useEffect(() => {
    if (state?.ok) {
      window.location.replace("/"); // También puedes usar window.location.reload()
      // !Nota: Esto solo funciona si el atributo redirect del signIn es false
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-1"
        type="email"
        id="email"
        name="email"
      />

      <PasswordInput
        inputClassName="px-5 py-2 border bg-gray-200 rounded mb-1"
        labelClassName="mt-5"
        nameAndId="password"
        label="Contraseña"
      />

      <button
        type="submit"
        className={clsx("btn-primary flex items-center justify-center mt-5", {
          "pointer-events-none opacity-50": isPending,
        })}
        aria-disabled={isPending}
        disabled={isPending}
      >
        {isPending ? <LoadingSpinner /> : "Ingresar"}
      </button>

      <div className="flex gap-2 items-center justify-center mt-5">
        {state && state.status != 200 && (
          <>
            <BsExclamationCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
