import { titleFont } from "@/config/fonts";
import Link from "next/link";
import Image from "next/image";

interface Props {
  title?: string;
}

export const PageNotFound = ({
  title = "La página que buscas no existe",
}: Props) => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">
          Ups! Lo sentimos mucho. <span className="font-bold text-red-500">{title}</span>.
        </p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href="/"
            className="font-normal hover:underline transition-all text-blue-900"
          >
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
