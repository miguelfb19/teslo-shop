import { getPaginatedOrders } from "@/actions/admin/order/get-paginated-orders";

import clsx from "clsx";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline, IoEyeOutline } from "react-icons/io5";
import { DeleteOrderButton } from "../../../../components/admin/DeleteOrderButton";
import { Title } from "@/components/ui/title/Title";

export default async function AdminOrdersPage() {
  const { orders, ok } = await getPaginatedOrders();

  if (!ok) {
    return redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Usuario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={clsx("", {
                      "text-green-800": order.isPaid,
                      "text-red-800": !order.isPaid,
                    })}
                  />
                  <span
                    className={clsx("mx-2", {
                      "text-green-800": order.isPaid,
                      "text-red-800": !order.isPaid,
                    })}
                  >
                    {order.isPaid ? "Pagado" : "No pagada"}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6">
                  <div className="flex gap-5">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline text-blue-600 hover:brightness-50"
                    >
                      <IoEyeOutline size={20} />
                    </Link>
                    <DeleteOrderButton orderId={order.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
