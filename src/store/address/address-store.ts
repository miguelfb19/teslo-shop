import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  // State
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2: string;
    postalCode: string;
    phone: string;
    city: string;
    country: string;
  };

  // Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        phone: "",
        city: "",
        country: "",
      },
      setAddress: (address) => set({ address }),
    }),
    { name: "address-info" }
  )
);
