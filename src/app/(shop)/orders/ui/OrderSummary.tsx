import { currencyFormat } from "@/utils";

interface Props {
    itemsInOrder: number,
    subtotal: number,
    tax: number,
    total: number
}

export const OrderSummary = ({itemsInOrder, subtotal, total, tax}:Props) => {
  return (
    <div>
      <h2 className="text-2xl mb-2">Resumen de orden:</h2>
      <div className="grid grid-cols-2">
        <span>No. de productos</span>
        <span className="text-right">
          {itemsInOrder === 1 ? "1 artículo" : `${itemsInOrder} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right mt-5 text-2xl text-blue-800 font-bold">
          {currencyFormat(total)}
        </span>
      </div>
    </div>
  );
};
