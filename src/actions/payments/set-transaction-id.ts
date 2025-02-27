"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  transactionId: string,
  orderId: string
) => {
  try {
    const savedTransactionId = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId,
      },
      select: {
        transactionId: true,
      },
    });

    if (!savedTransactionId) throw new Error("Error al guardar el id de la transacción en la DDBB");

    return {
      ok: true,
      message: "Transaction id saved",
      transactionId,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo guardar el transaction id",
      error,
    };
  }
};
