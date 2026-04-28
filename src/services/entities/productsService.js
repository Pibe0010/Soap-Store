// src/services/entities/productsService.js
import { supabase, mapProductFromDB } from '../supabaseClient';

/**
 * Products CRUD operations
 */

export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*', { count: 'exact' });

  // Default filter: only active products (unless showInactive is true)
  if (!filters.showInactive) {
    query = query.eq('is_active', true);
  }

  if (filters.category && filters.category !== 'All Categories') {
    query = query.eq('category', filters.category);
  }
  if (filters.id) {
    query = query.eq('id', filters.id);
  }
  if (filters.limit && filters.limit > 0) {
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
    limit: filters.limit || 100,
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

/**
 * Create a new product
 */
export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      image_url: productData.imageUrl,
      stock: productData.stock ?? 0,
      is_active: productData.isActive ?? true,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapProductFromDB(data);
};

/**
 * Update an existing product
 */
export const updateProduct = async (id, productData) => {
  const updateData = {};
  
  if (productData.name !== undefined) updateData.name = productData.name;
  if (productData.description !== undefined) updateData.description = productData.description;
  if (productData.price !== undefined) updateData.price = productData.price;
  if (productData.category !== undefined) updateData.category = productData.category;
  if (productData.imageUrl !== undefined) updateData.image_url = productData.imageUrl;
  if (productData.stock !== undefined) updateData.stock = productData.stock;
  if (productData.isActive !== undefined) updateData.is_active = productData.isActive;

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapProductFromDB(data);
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
};

/**
 * Update product stock (for orders)
 */
export const updateStock = async (id, quantity) => {
  // Get current stock
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', id)
    .single();

  if (fetchError) {
    throw fetchError;
  }

  const newStock = (product.stock || 0) + quantity;
  
  const { data, error } = await supabase
    .from('products')
    .update({ stock: Math.max(0, newStock) })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapProductFromDB(data);
};