import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountriesFromDB } from "@/actions/countries/getCountriesFromDB";

export default async function CheckoutAdressPage() {
  const countries = await getCountriesFromDB()

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} />
      </div>
    </div>
  );
}
