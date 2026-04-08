// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/supabase';

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};