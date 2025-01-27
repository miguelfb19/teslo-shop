"use server";

import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  try {
    // Obtengo la orden de la DB con los campos necesarios
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          select: {
            address: true,
            address2: true,
            city: true,
            country: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        OrderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                slug: true,
                title: true,
                id: true,
              },
            },
          },
        },
      },
    });

    if(!order) throw new Error(`Order whith id:${id} not found`);

    // Obtengo las imagenes que coinciden con los productos de la orden
    const images = await prisma.productImage.findMany({
      where: {
        productId: {
          in: order?.OrderItems.map((item) => item.product.id),
        },
      },
    });

    const finalOrder = {
      ...order,
      OrderItems: order?.OrderItems.map((item) => ({
        ...item,
        product: {
          ...item.product,
          images: images
            .filter((image) => image.productId === item.product.id)
            .map((image) => image.url),
        },
      })),
    };

    return finalOrder;
  } catch (error) {
    console.error(error)
    return null
  }
};
