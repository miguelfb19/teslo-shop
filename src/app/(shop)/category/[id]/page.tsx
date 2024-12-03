// import { notFound } from "next/navigation";

import { initialData } from "@/seed/seed";
import { ProductGrid } from "../../../../components/products/product-grid/ProductGrid";
import { titleFont } from "@/config/fonts";
import { Title } from "../../../../components/ui/title/Title";

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = initialData.products;
  const productsCategory = products.filter((product) => product.gender == id);

  const title = (gender: string) => {
    if (gender == "men") gender = "hombre";
    if (gender == "women") gender = "mujer";
    if (gender == "kid") gender = "niño";

    return <Title title={`Articulos de ${gender}`} />;
  };

  return (
    <div className="px-2">
      {title(id)}
      <ProductGrid products={productsCategory} />
    </div>
  );
}
