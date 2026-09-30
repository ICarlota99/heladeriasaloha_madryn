export type CategorySlug = 'cakes' | 'cones' | 'desserts' | 'flavors' | 'pints';

export interface Category {
  id: number;
  name: CategorySlug;
}

export interface Product {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  image: string;
  in_stock?: boolean;
  category_id?: number;
  flavors?: Flavor[];
  size?: string;
  type?: string;
}

export interface Flavor {
  id: string;
  name: string;
  image: string;
  new?: boolean;
}

export interface FlavorCategory {
  category: string;
  flavors: Flavor[];
}

export type FlavorAccent = 'peach' | 'rose' | 'sky' | 'blush';

export interface FeaturedFlavor {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  accent: FlavorAccent;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BucketSize {
  size: string;
  label: string;
  maxFlavors: number;
  price: number;
  image: string;
}

export type PaymentMethod = 'cash' | 'transfer';

export interface CheckoutFormData {
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface CheckoutFormErrors {
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface ProductsResponse {
  categories: Category[];
  products: Product[];
}

export type ShopAccent = 'orange' | 'coral' | 'yellow' | 'teal';

export interface ShopCategory {
  to: string;
  src: string;
  alt: string;
  label: string;
  description: string;
  accent: ShopAccent;
  icon: string;
}
