// src/hooks/useProduct.ts
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/index';

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Only execute if there is an ID
  });
};