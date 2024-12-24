"use client";

// import { logout } from "@/actions/auth/logout";
import { useUiStore } from "@/store";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const { role } = session?.user || { role: null };

  const logoutSession = async () => {
    await signOut({redirectTo: '/'})
  };

  return (
    <div>
      {
        isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
        )
        // black bg
      }

      {isSideMenuOpen && (
        // blur
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={40}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        {/* Input search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-md border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */}
        {session && (
          <Link
            href="/profile"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeMenu}
          >
            <IoPersonOutline size={20} />
            <span className="ml-3 text-md">Perfil</span>
          </Link>
        )}
        {session && (
          <Link
            href="/orders"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeMenu}
          >
            <IoTicketOutline size={20} />
            <span className="ml-3 text-md">Ordenes</span>
          </Link>
        )}
        {!session ? (
          <Link
            href="/auth/login"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeMenu}
          >
            <IoLogInOutline size={20} />
            <span className="ml-3 text-md">Ingresar</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={logoutSession}
          >
            <IoLogOutOutline size={20} />
            <span className="ml-3 text-md">Salir</span>
          </Link>
        )}

        {/* Admin option */}
        {session && role === "admin" && (
          <>
            {/* Line separator */}
            <div className="w-full h-px bg-gray-200 my-10" />
            <div>
              <Link
                href="/"
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={closeMenu}
              >
                <IoShirtOutline size={20} />
                <span className="ml-3 text-md">Productos</span>
              </Link>
              <Link
                href="/"
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={20} />
                <span className="ml-3 text-md">Ordenes</span>
              </Link>
              <Link
                href="/"
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={20} />
                <span className="ml-3 text-md">Usuarios</span>
              </Link>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};
