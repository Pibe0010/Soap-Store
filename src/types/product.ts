// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  limit?: number;
  offset?: number;
}

export interface ProductPage {
  data: Product[];
  total: number;
  limit: number;
  offset: number;
}
