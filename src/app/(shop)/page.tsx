import { titleFont } from "@/config/fonts";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { ProductGrid } from '../../components/products/product-grid/ProductGrid';

const products = initialData.products

export default function Home() {
  return (
    <div className={`${titleFont.className}`}>
      <Title title="Tienda" subtitle="Todos los productos"/>
      <ProductGrid products={products}/>
    </div>
  );
}
