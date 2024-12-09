import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersIdPage({ params }: Props) {
  const { id } = await params;

  // TODO: verificar
  // redicrect('/')

  return (
    <div className="flex justify-center items-center mb-72 px-10 w-full sm:px-0">
      <div className="flex flex-col w-full">
        <Title title={`Orden #${id}`} />

        <div className="flex flex-col-reverse sm:flex-row gap-10">
          {/* Carrito */}
          <div className="flex flex-col bg-gray-50 rounded-md p-7 shadow-xl w-full">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-600": false,
                  "bg-green-600": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Orden pagada</span>
            </div>

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
                    ${product.price} x 3
                  </p>
                  <p className="font-bold text-red-800">
                    Subtotal: ${product.price * 3}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-gray-50 rounded-md shadow-xl p-7 w-full">
            <h2 className="text-2xl mb-2">Dirección de entrega:</h2>
            <div className="mb-3">
              <p>
                <b>Nombre:</b> Juan Pérez
              </p>
              <p>
                <b>Dirección:</b> Calle 123, Ciudad, País
              </p>
              <p>
                <b>Teléfono:</b> 000000000000
              </p>
            </div>

            <hr className="mb-2 border-t-4 rounded border-gray-300" />

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

            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-5 text-xs font-bold text-white mb-5 mt-5",
                {
                  "bg-red-600": false,
                  "bg-green-600": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Orden pagada</span>
            </div>

            <div className="mt-5 mb-2 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
