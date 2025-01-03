"use server";

import prisma from "@/lib/prisma";

export const getCountriesFromDB = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
    });
    return countries;
  } catch (error) {
    throw error;
  }
};
