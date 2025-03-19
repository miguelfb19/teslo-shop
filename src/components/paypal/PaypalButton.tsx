"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";

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
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`,
          },
        },
      ],
      intent: "CAPTURE",
    });

    // Save transaction id in order
    const { ok } = await setTransactionId(
      transactionId,
      orderId
    );

    if (!ok) {
      throw new Error("Error to save transaction id");
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  if (isPending)
    return (
      <div className="animate-pulse flex flex-col gap-3 mt-5 mb-10 z-0">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    );

  return (
    <div id="paypal-buttons-container" className="mt-5 relative z-0">
      <PayPalButtons createOrder={createOrderId} onApprove={onApprove} />
    </div>
  );
};
