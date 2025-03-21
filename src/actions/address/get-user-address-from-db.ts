"use server";

import prisma from "@/lib/prisma";

export const getAddresFromDatabase = async (user: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId: user },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        address: true,
        address2: true,
        postalCode: true,
        phone: true,
        city: true,
        countryId: true,
      },
    });
    if (!address) {
      return {};
    }
    const country = await prisma.country.findUnique({
      where: {
        id: address?.countryId,
      },
    });
    const { countryId, address2, ...restAddress } = address;

    return {
      country: `${country?.name} (${country?.indicative})`,
      address2: address2 ? address2 : "",
      ...restAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al obtener los datos de residencia.",
    };
  }
};
