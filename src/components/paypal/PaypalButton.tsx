"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const roundedAmount = Math.round(amount * 100) / 100;
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrderId = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: "CAPTURE",
    });
    return transactionId;
  };

  if (isPending)
    return (
      <div className="animate-pulse flex flex-col gap-3 mt-5 mb-10">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    );

  return (
    <div className="mt-5">
      <PayPalButtons createOrder={createOrderId} />
    </div>
  );
};
