"use client";

import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { currencyFormat } from "@/utils/currencyFormat";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, tax, total, itemsInCart } = useCartStore(
    (state) => state.summary
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="bg-gray-50 rounded-md shadow-xl p-7 w-full h-fit">
      <h2 className="text-2xl mb-2">Resumen de orden:</h2>
      <div className="grid grid-cols-2">
        <span>No. de productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <Link
          href="/checkout/address"
          className="flex btn-primary justify-center"
        >
          Ir al pago
        </Link>
      </div>
    </div>
  );
};
