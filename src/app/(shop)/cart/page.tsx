"use client";

import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { redirect } from "next/navigation";
import { useCartStore } from "@/store/cart/cart-store";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0 ) {
    redirect("/empty");
  }
  return (
    <div className="flex justify-center items-center mb-72 px-10 w-full sm:px-0">
      <div className="flex flex-col w-full">
        <Title title="Carrito" />

        <div className="flex flex-col-reverse sm:flex-row gap-10">
          {/* Carrito */}
          <div className="flex flex-col bg-gray-50 rounded-md p-7 shadow-xl w-full">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items del carrito */}
            <ProductsInCart />
          </div>

          {/* Checkout */}

          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
