// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/supabase';
import { ProductFilters, ProductPage } from '../types/product';

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery<ProductPage, Error>({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
};