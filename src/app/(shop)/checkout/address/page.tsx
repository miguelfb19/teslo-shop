import { AddressForm } from "./ui/AddressForm";
import { getCountriesFromDB } from "@/actions/countries/getCountriesFromDB";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { getAddresFromDatabase } from "@/actions/address/get-user-address-from-db";
import { Title } from "@/components/ui/title/Title";

export default async function CheckoutAdressPage() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const rawAddress = await getAddresFromDatabase(session?.user.id);
  const address = rawAddress && "id" in rawAddress ? rawAddress : undefined;
  const countries = await getCountriesFromDB();

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoredAddress={address} />
      </div>
    </div>
  );
}
