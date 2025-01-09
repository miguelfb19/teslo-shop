"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {

    const userAddress = await prisma.userAddress.findUnique({
        where: {
            userId
        }
    })

    if(!userAddress){
        return {
            status: 404,
            message: "La dirección no se encontró en la DB",
            ok: false,
        }
    }
    
    const deletedUserAddress = await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      status: 200,
      message: "Dirección eliminada correctamente",
      ok: true,
      deletedAddress: deletedUserAddress,
    };
  } catch (error) {
    throw new Error("Error al eliminar la dirección en la DDBB", {
      cause: error,
    });
  }
};
