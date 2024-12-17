import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {

  try {
    const productStock = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
    })
  
    return productStock?.inStock ?? 0
    
  } catch (error) {
    throw new Error("Error al obtener el stock del producto", {cause: error});
  }
};
