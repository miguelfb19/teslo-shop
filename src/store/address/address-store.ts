import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  // State
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
  };

  // Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
        rememberAddress: false,
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
      storage: createJSONStorage(() => sessionStorage), // crea el stora en SessionStorage
    }
  )
);
