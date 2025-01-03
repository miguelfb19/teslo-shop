"use server";

import { Address } from "@/interfaces/address";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(userId, address);

    return {
      ok: true,
      message: "Dirección guardada correctamente",
      address: newAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo guardar la dirección en le DDBB",
    };
  }
};

const createOrReplaceAddress = async (userId: string, address: Address) => {
  try {

    
    const storedAddress = await prisma.userAddress.findFirst({
      where: {
        userId: userId,
      },
    });

    // Debemos obtener el countryId desde la DB debido a que no es el mismo id que en el dato que viene del form
    const countryName = address.country.split(' ')[0]
    const countryId = await prisma.country.findFirst({
      where: {
        name: countryName
      },
      select:{
        id: true
      }
    })
    
    console.log('countryId:', countryId)
    
    
    
    const addressToSave = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      city: address.city,
      postalCode: address.postalCode,
      phone: address.phone,
      countryId: countryId!.id,
      userId: userId,
    };

    console.log('addressToSave:', addressToSave);
    

    if (!storedAddress) {

      console.log('ingresamos al create userAddress')
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      });
      
      console.log('hola despues del create')

      return newAddress;
    }

    const updatedAddres = await prisma.userAddress.update({
      where: {
        userId: userId,
      },
      data: {
        ...addressToSave,
      },
    });

    return updatedAddres;
  } catch (error) {
    throw new Error("No se pudo grabar la dirección", { cause: error });
  }
};
