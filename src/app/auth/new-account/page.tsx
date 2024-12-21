import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen w-1/2 pt-20 sm:pt-32">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <div className="flex flex-col">
        <label htmlFor="name">Nombre completo</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
          id="name"
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          id="email"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          id="password"
        />

        <button className="btn-primary">Crear cuenta</button>

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
      </div>
    </div>
  );
}
