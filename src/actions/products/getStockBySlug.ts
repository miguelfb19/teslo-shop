import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
    })

    const stock = product?.inStock

    console.log(stock);
    
    return stock
    
  } catch {
    throw new Error("Error al obtener el stock del producto");
  }
};
