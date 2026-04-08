// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/index';

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};