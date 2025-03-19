"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import type { Rol } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeRole = async (userId: string, role: Rol) => {

    const session = await auth()

    if(session?.user.role !== 'admin'){
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        }
    }
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role
            }
        })

        revalidatePath('/admin/users')

        return {
            ok: true,
            message: 'Rol cambiado correctamente'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo cambiar el rol del usuario',
            error
        }
    }
};
