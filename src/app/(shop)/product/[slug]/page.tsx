export const revalidate = 604800; // 7 días

import { titleFont } from "@/config/fonts";
import { SizeSelector } from "@/components";
import { notFound } from "next/navigation";
import { QuantitySelector } from "@/components";
import { ProductSlideshow } from "@/components";
import { ProductMobileSlideshow } from "@/components";
import { getProductBySlug } from "@/actions";
import { StockLabel } from "@/components";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? 'Producto no encontrado',
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

        {/* Tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Cantidad */}
        <QuantitySelector quantity={2} />

        {/* Boton Add to Cart */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Description */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
