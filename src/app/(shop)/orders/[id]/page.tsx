import { Title } from "@/components";
import { getOrderById } from "@/actions/order/get-order-by-id";
import { NotOrderExist } from "../ui/NotOrderExist";
import { DeliveryAddressOrder } from "../ui/DeliveryAddressOrder";
import { OrderSummary } from "../ui/OrderSummary";
import { OrderItemsComponent } from "../ui/OrderItemsComponent";
import { PaypalButton } from "../../../../components/paypal/PaypalButton";
import { OrderStatus } from "../../../../components/ui/order/OrderStatus";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersIdPage({ params }: Props) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) return <NotOrderExist id={id} />;

  const { OrderItems, OrderAddress, isPaid, total, subtotal, tax } = order;
  const itemsInOrder = OrderItems.reduce((acc, item) => acc + item.quantity, 0);
  const { firstName, lastName, address, address2, city, country, phone } =
    OrderAddress!;

  return (
    <div className="flex justify-center items-center mb-72 px-10 w-full sm:px-0">
      <div className="flex flex-col w-full">
        <Title title={`Orden #${id}`} />

        <div className="flex flex-col-reverse sm:flex-row gap-10">
          {/* Carrito */}
          <div className="flex flex-col bg-gray-50 rounded-md p-7 shadow-xl w-full">
            <OrderStatus isPaid={isPaid} />

            {/* Items del carrito */}
            <OrderItemsComponent OrderItems={OrderItems} />
          </div>

          {/* Checkout */}
          <div className="bg-gray-50 rounded-md shadow-xl p-7 w-full">
            <DeliveryAddressOrder
              firstName={firstName}
              lastName={lastName}
              country={country}
              address={address}
              address2={address2!}
              phone={phone}
              city={city}
            />
            <hr className="mb-2 border-t-4 rounded border-gray-300" />
            <OrderSummary
              itemsInOrder={itemsInOrder}
              subtotal={subtotal}
              total={total}
              tax={tax}
            />

            {isPaid ? (
              <OrderStatus isPaid={isPaid} />
            ) : (
              <PaypalButton orderId={order.id} amount={order.total} />
            )}

            <div className="mt-5 mb-2 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
