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

export type ValidCategory = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";

export interface Country {
  name: string;
  id: string;
}
