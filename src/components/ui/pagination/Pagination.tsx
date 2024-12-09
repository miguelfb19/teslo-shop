"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") return `${pathName}?${params.toString()}`;

    if (+pageNumber <= 0) return `${pathName}`;

    if (+pageNumber > totalPages) return `${pathName}?${params.toString()}`;

    params.set('page', pageNumber.toString())

    return `${pathName}?${params.toString()}`
  };

  return (
    <div className="flex justify-center text-center mb-28 mt-16">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className={clsx("page-item", {"opacity-25 pointer-events-none": currentPage === 1})}>
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li className="page-item" key={page+' '+index}>
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none",
                {
                  "bg-blue-600 text-white hover:bg-blue-600 hover:text-white": page === currentPage,
                  "hover:bg-gray-200": page !== currentPage
                }
              )}
              href={createPageUrl(page)}
            >
              {page}
            </Link>
          </li>
          ))}
          <li className={clsx("page-item", {"disabled: opacity-25 pointer-events-none": currentPage === totalPages})}>
            <Link
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
