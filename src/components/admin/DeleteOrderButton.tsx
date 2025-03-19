"use client";

import { deleteOrder } from "@/actions/admin/order/delete-order";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";

interface Props {
  orderId: string;
}

export const DeleteOrderButton = ({ orderId }: Props) => {
  const removeOrder = async (orderId: string) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Si, eliminar!",
    });
    if (!isConfirmed) return;

    const deletedOrder = await deleteOrder(orderId);

    if (!deletedOrder.ok) {
      Swal.fire({
        title: "Error",
        text: deletedOrder.message,
        icon: "error",
        confirmButtonColor: "#2563eb"
      });
    }

    Swal.fire({
      title: "Orden eliminada correctamente",
      icon: "success",
      confirmButtonColor: "#2563eb"
    });
  };
  return (
    <button
      className="hover:underline text-red-600 hover:brightness-50"
      onClick={()=>removeOrder(orderId)}
    >
      <IoTrashOutline size={20} />
    </button>
  );
};
