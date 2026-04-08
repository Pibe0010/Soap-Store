// src/services/entities/productsService.js
import { supabase, mapProductFromDB } from '../supabaseClient';

/**
 * Products CRUD operations
 */

export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*', { count: 'exact' });

  if (filters.category && filters.category !== 'All Categories') {
    query = query.eq('category', filters.category);
  }
  if (filters.id) {
    query = query.eq('id', filters.id);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  const mappedData = data ? data.map(mapProductFromDB) : [];

  return {
    data: mappedData,
    total: count || 0,
    limit: filters.limit || 10,
    offset: filters.offset || 0,
  };
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return mapProductFromDB(data);
};

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .order('category');

  if (error) {
    throw error;
  }

  const categories = data
    ? [...new Set(data.map(item => item.category).filter(Boolean))]
    : [];

  return categories;
};