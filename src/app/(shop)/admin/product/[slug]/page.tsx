import { getProductBySlug } from "@/actions";
import { Title } from "../../../../../components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getAllCategories } from "@/actions/categories/get-categories";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;

  // Hacer que 2 o mas promesas se llamen al mismo tiempo para evitar esperas innecesarias
  const [product, data] = await Promise.all([
    getProductBySlug(slug),
    getAllCategories()
  ])

  const { categories } = data;

  if (!product) redirect("/admin/products");

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";

  return (
    <div>
      <Title title={title} />
      <ProductForm product={product} categories={categories ?? []} />
    </div>
  );
}
