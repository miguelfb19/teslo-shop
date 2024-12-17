export const revalidate = 60; // 60 segundos

import { ProductGrid } from "@/components";
import { Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from "@/components";
import { Gender } from "@prisma/client";
import { Metadata } from "next";

interface Props {
  params: Promise<{
    gender: Gender;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

const getSpanishTitle = (gender: string) => {
  
  if (gender == "men") return gender = "hombre";
  if (gender == "women") return gender = "mujer";
  if (gender == "kid") return gender = "niño";
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // read route params
  const gender = (await params).gender;

  // fetch data

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  const spanishGender = getSpanishTitle(gender)

  return {
    title: spanishGender?.toUpperCase() ?? "Producto no encontrado",
    description: `Productos para ${spanishGender}`,
    openGraph: {
      title: spanishGender?.toUpperCase() ?? "Producto no encontrado",
      description: `Productos para ${spanishGender}`,
    },
  };
}

export default async function GenderPage({ searchParams, params }: Props) {
  // Los params y searchParams se ejecutan como un Promise en nextjs 15+
  // por eso es necesario definir el tipado como un Promise en las Props y llamarlo con await
  const { gender } = await params;
  const { page } = await searchParams;

  const pagination = page ? parseInt(page) : 1;

  //   if(gender )

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: pagination,
    gender: gender,
  });

  

  return (
    <div className="px-2">
      <Title title={`Articulos de ${getSpanishTitle(gender)}`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
