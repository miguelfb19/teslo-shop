export const revalidate = 60 // 60 segundos

import { titleFont } from "@/config/fonts";
import { Title } from "@/components";
import { ProductGrid } from "../../components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";
import { Pagination } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const pagination = page ? parseInt(page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pagination,
  });
  

  if (products.length === 0) redirect("/?page=5");
  if (pagination <= 0 || isNaN(pagination)) redirect("/?page=1");

  return (
    <div className={`${titleFont.className} px-2`}>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </div>
  );
}
