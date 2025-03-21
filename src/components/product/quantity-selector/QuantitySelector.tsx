"use client";

import { CartProduct } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";
import {
  IoRemoveCircleOutline,
  IoAddCircleOutline,
} from "react-icons/io5";
import { VscTrash } from "react-icons/vsc";



interface Props {
  quantity: number;
  stock: number;
  cartPage?: boolean;
  product?: CartProduct;
  action: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  stock,
  cartPage = false,
  product,
  action,
}: Props) => {
  const [warningStock, setWarningStock] = useState(false);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    if (quantity + value > stock) {
      setWarningStock(true);
      return;
    }

    setWarningStock(false);
    action(quantity + value);
  };



  return (
    <div>
      <section className="flex">
        {(!cartPage || quantity > 1) && (
          <button onClick={() => onValueChanged(-1)}>
            <IoRemoveCircleOutline size={30}/>
          </button>
        )}
        {(cartPage && quantity === 1) && (
          <button onClick={() => product && removeProduct(product)}>
            <VscTrash size={30}/>
          </button>
        )}
        <span className="flex w-20 mx-3 px-5 bg-gray-200 items-center justify-center rounded">
          {quantity}
        </span>
        <button onClick={() => onValueChanged(1)}>
          <IoAddCircleOutline size={30}/>
        </button>
      </section>
      {warningStock && (
        <span className="text-xs text-red-700">
          No puedes llevar mas productos de los disponibles
        </span>
      )}
    </div>
  );
};
