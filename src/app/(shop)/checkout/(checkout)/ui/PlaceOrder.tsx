"use client";

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { rememberAddress, ...restAddress } = useAddressStore(
    (state) => state.address
  );
  const { subTotal, tax, total, itemsInCart } = useCartStore(
    (state) => state.summary
  );

  const { cart } = useCartStore((state) => state);
  const cleanCart = useCartStore((state) => state.cleanCart);

  // Esta desestructuración es para usarla en la UI
  const {
    firstName,
    lastName,
    address: address1,
    address2,
    phone,
    city,
    country,
  } = restAddress;

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // Debemos modificar el address2 en caso de que venga vacio no genere conflicto
    const addressToOrder = {
      address2: address2 ? address2 : "",
      ...restAddress,
    };

    const resp = await placeOrder(productsToOrder, addressToOrder);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      if(resp.flag === "empty-order"){
        router.push("/");
      }
      return;
    }

    //* Todo salio bien!
    cleanCart();
    router.replace(`/orders/${resp.order?.id}`);
  };

  if (!loaded) {
    return <p className="text-center">Cargando orden...</p>;
  }

  return (
    <div className="bg-gray-50 rounded-md shadow-xl p-7 w-full">
      <h2 className="text-2xl mb-2">Dirección de entrega:</h2>
      <div className="mb-3">
        <p>
          <b>Nombre:</b> {`${firstName} ${lastName}`}
        </p>
        <p>
          <b>Dirección:</b>{" "}
          {`${address1}, ${address2 ? address2 + "," : ""} ${city}, ${country
            .split(" ")
            .at(0)}`}
        </p>
        <p>
          <b>Teléfono:</b> {phone}
        </p>
      </div>

      <hr className="mb-2 border-t-4 rounded border-gray-300" />

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
        <span className="text-right mt-5 text-2xl text-blue-800 font-bold">
          {currencyFormat(total)}
        </span>
      </div>

      {/* Disclaimer */}
      <div className="flex my-5 justify-center">
        <span className="text-center text-xs">
          Al hacer click en &quot;Confirmar orden&quot;, aceptas nuestros{" "}
          <a className="underline" href="#">
            Términos y condicionesde uso
          </a>{" "}
          y{" "}
          <a className="underline" href="#">
            Política de privacidad de datos.
          </a>
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <button
          onClick={onPlaceOrder}
          className={clsx("flex justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Confirmar orden
        </button>
        <span className="text-red-500 text-sm mt-2">
          {errorMessage != "" && errorMessage}
        </span>
      </div>
    </div>
  );
};
