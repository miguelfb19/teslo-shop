"use server";

import { PayPalOrderStatusResponse } from "@/interfaces/paypal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de autenticación",
    };
  }

  const transactionDetails = await verifyPaypalPayemnt(
    transactionId,
    authToken
  );

  if (!transactionDetails) {
    return {
      ok: false,
      message: "Error al obtener los detalles del pago",
    };
  }
  const { status, purchase_units } = transactionDetails;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado la orden",
    };
  }

  //todo: actualizar pago en la db
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "El pago no se pudo realizar",
      status: 500,
      error,
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  try {
    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL;
    const base65Token = Buffer.from(
      `${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,
      "utf-8"
    ).toString("base64");

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${base65Token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(`${PAYPAL_OAUTH_URL}`, requestOptions).then(
      (resp) => resp.json()
    );

    return response.access_token;
  } catch (error) {
    // console.error(error);
    return null;
  }
};

const verifyPaypalPayemnt = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  try {
    const PAYPAL_ORDERS_URL = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(`${PAYPAL_ORDERS_URL}`, {
      ...requestOptions,
      cache: "no-store",
    });
    const data = (await response.json()) as PayPalOrderStatusResponse;

    return data;
  } catch (error) {
    // console.error(error);
    return null;
  }
};
