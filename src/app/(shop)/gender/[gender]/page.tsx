export const revalidate = 60; // 60 segundos

import { ProductGrid } from "@/components";
import { Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from "@/components";
import { Gender } from "@prisma/client";

interface Props {
  params: Promise<{
    gender: Gender;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function GenderPage({ searchParams, params }: Props) {
  // Los params y searchParams se ejecutan como un Promise en nextjs 15+ 
  // por eso es necesario definir el tipado como un Promise en las Props y llamarlo con await
  const { gender } = await params
  const { page } = await searchParams

  const pagination = page ? parseInt(page) : 1;

  //   if(gender )

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pagination,
    gender: gender,
  });

  const title = (gender: string) => {
    if (gender == "men") gender = "hombre";
    if (gender == "women") gender = "mujer";
    if (gender == "kid") gender = "niño";

    return <Title title={`Articulos de ${gender}`} />;
  };

  return (
    <div className="px-2">
      {title(gender)}
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
