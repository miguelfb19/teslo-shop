"use server";

import prisma from "@/lib/prisma";

export const getAddresFromDatabase = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
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
    return {};
  }
  // const addresses = await prisma.userAddress.findMany();
  // const address = addresses.find(
  //   (address) => address.userId === userId
  // );

  // if (!address) {
  //   return {};
  // }
};
