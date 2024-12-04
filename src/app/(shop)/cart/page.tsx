import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";
import { QuantitySelector } from "../../../components/product/quantity-selector/QuantitySelector";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  if (productsInCart.length === 0) {
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

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex max-sm:flex-wrap mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p className="text-sm font-semibold">{product.title}</p>
                  <p className="text-blue-800 font-semibold">
                    ${product.price}
                  </p>
                  <QuantitySelector quantity={3} />

                  <button className="underline mt-3 text-sm">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-gray-50 rounded-md shadow-xl p-7 w-full">
            <h2 className="text-2xl mb-2">Resumen de orden:</h2>
            <div className="grid grid-cols-2">
              <span>No. de productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$15</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right mt-5 text-2xl">$115</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                href="/checkout/address"
                className="flex btn-primary justify-center"
              >
                Pagar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
