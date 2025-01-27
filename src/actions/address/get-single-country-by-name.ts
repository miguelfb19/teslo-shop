"use server";

import prisma from "@/lib/prisma";

export const getSingleCountryByName = async (name: string) => {
  try {
    const country = await prisma.country.findFirst({
      where: {
        name,
      },
    });
    return country;
  } catch (error) {
    console.log(error);
    return null;
  }
};
