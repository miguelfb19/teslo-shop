"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductInCart = useCartStore(
    (state) => state.updateProductQuantity
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando productos...</p>

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
              <Link
                href={`/product/${product.slug}`}
                className="hover:underline"
              >
                {product.title}
              </Link>
            </p>
            <p className="text-sm">
              Size: <strong>{product.size}</strong>
            </p>
            <p className="text-blue-800 font-semibold">${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductInCart(product, quantity)
              }
              stock={product.inStock}
              cartPage
              product={product}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
