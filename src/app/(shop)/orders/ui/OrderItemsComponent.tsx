import { Size } from "@/interfaces/product.interface";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";

interface Props {
  OrderItems: {
    product: {
      images: string[];
      slug: string;
      id: string;
      title: string;
    };
    price: number;
    quantity: number;
    size: Size;
  }[];
}

export const OrderItemsComponent = ({OrderItems}: Props) => {
  return (
    <div>
      {OrderItems?.map(({ product, price, quantity, size }) => (
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
            <p className="text-sm font-semibold">Size: {size}</p>
            <p className="text-blue-800 font-semibold">
              {currencyFormat(price)} x {quantity}
            </p>
            <p className="font-bold text-red-800">
              Subtotal: {currencyFormat(price * quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
