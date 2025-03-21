"use client";

import Link from "next/link";
import { ProductsInCartCheckout } from "./ui/ProductsInCartCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";
import { Title } from "@/components/ui/title/Title";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 w-full sm:px-0">
      <div className="flex flex-col w-full">
        <Title title="Verificar orden" />

        <div className="flex flex-col-reverse sm:flex-row gap-10">
          {/* Carrito */}
          <div className="flex flex-col bg-gray-50 rounded-md p-7 shadow-xl w-full">
            <Link href="/cart" className="underline mb-5">
              Editar orden
            </Link>

            {/* Items del carrito */}
            <ProductsInCartCheckout />
          </div>

          {/* Checkout - resumen de la orden */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
