export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: ValidType;
  gender: ValidCategory;
  categoryId: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: Size;
  inStock: number;
  quantity: number;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

export type ValidCategory = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
export type Gender = "men" | "women" | "kid" | "unisex"

export interface Country {
  name: string;
  id: string;
}
