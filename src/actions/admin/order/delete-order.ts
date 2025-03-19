"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteOrder = async (orderId: string) => {
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    if (!deletedOrder)
      throw new Error("Hubo un error al elminar la orden en la DB");

    revalidatePath('/admin/orders')
    return {
      ok: true,
      message: `order con id ${orderId} eliminada`,
      deletedOrder,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo eliminar la orden",
      error,
    };
  }
};
