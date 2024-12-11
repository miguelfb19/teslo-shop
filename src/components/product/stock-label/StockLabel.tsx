'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string
}


export const StockLabel = async ({slug}:Props) => {
    const [stock, setStock] = useState<number | undefined>(0)

    const getStock = async (slug:string)=>{
        const stock = await getStockBySlug(slug)
        return stock
    }

    useEffect(() => {
      const newStock = getStock(slug)
      
    }, [slug])
    

  return (
    <div>
      <h1
        className={`${titleFont.className} antialiased font-bold text-md text-blue-700`}
      >
        Stock: {stock}
      </h1>
    </div>
  );
};
