// src/services/entities/favoritesService.js
import { supabase, mapFavoriteFromDB } from '../supabaseClient';

/**
 * Favorites CRUD operations
 */

export const getFavoritesByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select(`
      id, 
      user_id, 
      product_id, 
      created_at,
      products (
        id,
        name,
        category,
        price,
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data
    ? data.map((fav) => ({
        id: fav.id,
        userId: fav.user_id,
        productId: fav.product_id,
        createdAt: fav.created_at,
        product: fav.products ? {
          id: fav.products.id,
          name: fav.products.name,
          category: fav.products.category,
          price: fav.products.price,
          imageUrl: fav.products.image_url || '',
        } : null,
      }))
    : [];
};

export const addFavorite = async (favoriteData) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([
      {
        user_id: favoriteData.userId,
        product_id: favoriteData.productId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapFavoriteFromDB(data);
};

export const removeFavorite = async (userId, productId) => {
  if (!userId || !productId) {
    throw new Error('userId y productId son requeridos para eliminar un favorito');
  }

  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) {
    throw error;
  }
};

export const isFavorite = async (userId, productId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .match({ user_id: userId, product_id: productId })
    .single();

  if (error && error.code === 'PGRST116') {
    return false;
  }

  if (error) {
    throw error;
  }

  return !!data;
};