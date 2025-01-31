import { countries, initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //   Borrar registros previos

  await prisma.orderAddress.deleteMany()
  await prisma.orderItems.deleteMany()
  await prisma.order.deleteMany()
  await prisma.userAddress.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  
  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // <string = shirt, string = id>

  //   Productos

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Images

    const imagesData = images.map((img) => ({
      url: img,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  //  Countries

  await prisma.country.createMany({
    data:countries
  })

  console.log("Seed successful executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
