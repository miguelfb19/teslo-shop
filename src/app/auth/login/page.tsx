import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen w-1/2  pt-20 sm:pt-32">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <LoginForm />

      <div className="flex flex-col items-center">
        <Link
          href="/"
          className={`mt-10 text-sm hover:underline text-blue-700 ${titleFont.className}`}
        >
          Ir a la tienda
        </Link>
      </div>
    </div>
  );
}
