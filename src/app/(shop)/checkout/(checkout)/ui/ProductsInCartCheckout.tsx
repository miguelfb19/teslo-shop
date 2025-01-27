"use client";

import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCartCheckout = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando productos...</p>;

  return (
    <div>
      {productsInCart.map((product) => (
        <div
          key={product.id + product.size}
          className="flex max-sm:flex-wrap mb-5"
        >
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <p className="text-sm font-semibold">
              <span>{product.title}</span>
            </p>
            <p className="text-sm">
              Size: <strong>{product.size}</strong>
            </p>
            <p className="text-blue-800 font-semibold">
              ${product.price} x {product.quantity}
            </p>
            <p className="font-bold text-red-800">
              Subtotal: ${product.price * product.quantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
