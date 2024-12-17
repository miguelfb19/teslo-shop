export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
// import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = async ({ slug }: Props) => {
  const getStock = async (slug: string): Promise<number> => {
    try {
      const stock = await getStockBySlug(slug);
      return stock;
    } catch (error) {
      console.error("Hubo un error al obtener el stock del servidor:", error);
      return 0;
    }
  };

  const stock = await getStock(slug);

  return (
    <div>
      <h1
        className={clsx(
          `${titleFont.className} antialiased font-bold text-md text-blue-700`,
          {
            "text-red-500": stock === 0,
            "text-yellow-500": stock > 0 && stock <= 5,
          }
        )}
      >
        {stock > 0 && stock <= 5
          ? `Últimos productos en stock: ${stock}`
          : `Stock: ${stock}`}
      </h1>
    </div>
  );
};
