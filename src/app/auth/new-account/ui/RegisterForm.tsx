"use client";

import { createNewUserAccount } from "@/actions/auth/create-user";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { customLogin } from "@/actions/auth/login";

export interface CreateAccountInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateAccountInputs>();

  const verifiyPassword = () => {

    // Obtener campos de contraseña con getValues de useForm
    const { password, confirmPassword } = getValues();
    

    // Hacer verificación y comparación de passwords para mostrar error en pantalla, si todo sale bien, retorna true
    if (password != confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Las contraseñas no coinciden",
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (data: CreateAccountInputs) => {
    // Obtener valores del form
    const { name, email, password } = data;

    // Verificar contraseñas
    const verified = verifiyPassword();
    
    // Salir en caso de que no haya campos llenados o la verficación de contraseñas falle
    if (!name || !email || !password || !verified) return;

    // Crear el usuario en la DB con el server-action
    const newUser = await createNewUserAccount(data);

    // Hacer la autenticación si el usuario fue creado con éxito, o si no retornar un mensaje de error
    if (!newUser.ok) {
      setErrorMessage(newUser.message);
      return;
    } else {
      // ! Aqui debería ir una verificación de EMAIL
      await customLogin(email.toLocaleLowerCase(), password); // Esto no se debería hacer directamente
      reset();
      window.location.replace("/");
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <span className="text-red-500 text-sm mb-5">{errorMessage}</span>

      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-500": errors.name,
        })}
        type="text"
        id="name"
        {...register("name", { required: true })}
      />
      {errors.name?.type === "required" && (
        <span className="text-xs text-red-500">El nombre es obligatorio</span>
      )}
      <label htmlFor="email" className="mt-5">
        Correo electrónico
      </label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-500": errors.email,
        })}
        type="email"
        id="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.type === "required" && (
        <span className="text-xs text-red-500">El email es obligatorio</span>
      )}
      {errors.email?.type === "pattern" && (
        <span className="text-xs text-red-500">
          Debes escribir un correo electrónico válido
        </span>
      )}

      <label htmlFor="password" className="mt-5">
        Contraseña
      </label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-500": errors.password || errors.confirmPassword,
        })}
        type="password"
        id="password"
        {...register("password", { required: true })}
      />
      {errors.password?.type === "required" && (
        <span className="text-xs text-red-500">
          La contraseña es obligatoria
        </span>
      )}

      <label htmlFor="confirm-password" className="mt-5">
        Confirmar contraseña
      </label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-1", {
          "border-red-500": errors.confirmPassword,
        })}
        type="password"
        id="confirm-password"
        {...register("confirmPassword", { required: true })}
      />
      {errors.confirmPassword?.type === "validate" && (
        <span className="text-xs text-red-500">
          Las contraseñas no coinciden
        </span>
      )}
      {errors.confirmPassword?.type === "required" && (
        <span className="text-xs text-red-500">
          Debes confirmar la contraseña
        </span>
      )}

      <button className="btn-primary mt-5">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>

      <div className="flex flex-col items-center">
        <Link
          href="/"
          className={`mt-10 text-sm hover:underline text-blue-700 ${titleFont.className}`}
        >
          Ir a la tienda
        </Link>
      </div>
    </form>
  );
};
