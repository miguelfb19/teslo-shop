import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SummaryInformation {
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
} // Interface para información de resumen de la orden

interface State {
  cart: CartProduct[];
  summary: SummaryInformation;

  // Methods
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  updateSummary: () => void;
  cleanCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    // el persist es una middleware de zustand que me guarda mi estado en localStorage
    (set, get) => ({
      cart: [],
      summary: {
        subTotal: 0,
        tax: 0,
        total: 0,
        itemsInCart: 0,
      },

      // Methods

      updateSummary: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.price * product.quantity + subTotal,
          0
        );

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        set({
          summary: { subTotal, tax, total, itemsInCart },
        });
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set((state) => ({
            cart: [...state.cart, product],
          }));
          get().updateSummary();
          return;
        }

        // Ya se que el producto esta en el carrito por talla, debo incrementarlo

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
        get().updateSummary();
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
        get().updateSummary();
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
        get().updateSummary();
      },

      cleanCart: () => {
        set({ cart: [] });
        get().updateSummary();
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
