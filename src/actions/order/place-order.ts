"use server";

import { auth } from "@/auth.config";
import { Address } from "@/interfaces/address";
import { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";
import { getSingleCountryByName } from "../address/get-single-country-by-name";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      status: 500,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la información de los productos
  // Nota: podemos llevar 2 o más productos con el mismo id

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  //   Totales de total, subtotal y tax
  const { total, subtotal, tax } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subtotal = product.price * productQuantity;
      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { total: 0, subtotal: 0, tax: 0 }
  );

  // Verificamos que no sean valores en 0 o negativo

  if (subtotal <= 0 || total <= 0) {
    return {
      ok: false,
      message: "El total de la orden no puede ser 0 o negativo",
      flag: "empty-order"
    };
  }

  // Crear la transaccion en la base de datos

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        // Acumulamos el valor
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene la cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos = no hay stock

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemInOrder: itemsInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,

          OrderItems: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar si el price es 0 lanzar un error

      // 3. Crear la dirección de la orden

      // Escogemos el nombre del country y con el llamamos los datos de la DB
      const countryName = address.country.split(" ").at(0)!;

      // Buscamos en la db todos los datos de country y cogemos el id
      const countryFromDB = await getSingleCountryByName(countryName);
      const countryId = countryFromDB ? countryFromDB.id : "";

      // Le sacamos el campo country al address
      // eslint-disable-next-line
      const { country:_country, ...rest } = address;

      // Insertamos el campo countryId respectivo
      const addressToOrder = {
        countryId: countryId,
        ...rest,
      };

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...addressToOrder,
          orderId: order.id,
        },
      });

      return {
        order: order,
        orderAddress: orderAddress,
        updatedProducts: updatedProducts,
      };
    });
    return {
      ok: true,
      order: prismaTransaction.order,
      prismaTransaction: prismaTransaction,
    };
  } catch (error: any) {
    console.error(error)
    return {
      ok: false,
      message: 'No se pudo poner la orden, intenta de nuevo más tarde',
    };
  }
};
