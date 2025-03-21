"use client";

import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [send, setSend] = useState<boolean>(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setSend(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      inStock: product.inStock,
      image: product.images[0],
    };
    addProductToCart(cartProduct);

    setSize(undefined);
    setQuantity(1);
    setSend(false);
  };

  return (
    <>
      {/* Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Cantidad */}
      <QuantitySelector
        quantity={quantity}
        action={setQuantity}
        stock={product.inStock}
        cartPage={false}
      />

      {/* Boton Add to Cart */}
      <button
        onClick={addToCart}
        className={clsx("btn-primary my-5", {
          "opacity-50 pointer-events-none": !size && send,
        })}
        disabled={!size && send ? true : false}
      >
        Agregar al carrito
      </button>
      {send && !size && (
        <span className="text-red-700 text-sm mx-5 fade-in">
          Debes seleccionar una talla
        </span>
      )}
    </>
  );
};
