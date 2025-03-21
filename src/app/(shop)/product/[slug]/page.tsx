export const revalidate = 604800; // 7 días

import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AddToCart } from "./ui/AddToCart";
import { getProductBySlug } from "@/actions/products/getProductBySlug";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { StockLabel } from "@/components/product/stock-label/StockLabel";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Slideshow Mobile */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block sm:hidden"
        />

        {/* Slideshow Desktop */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden sm:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        {/* Description */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
