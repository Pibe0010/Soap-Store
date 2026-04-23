// src/services/entities/cartService.js
import { supabase } from '../supabaseClient';

/**
 * Cart Service - CRUD operations for cart items in database
 */

export const getCartItems = async (userId) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (
        id,
        name,
        description,
        price,
        category,
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const addToCart = async (userId, productData) => {
  const {
    product_id,
    quantity = 1,
    offer_id = null,
    original_price = null,
    discount_percentage = 0,
  } = productData;

  // Check if item already exists in cart
  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('product_id', product_id)
    .single();

  if (existing) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Insert new item
  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      user_id: userId,
      product_id,
      quantity,
      offer_id,
      original_price,
      discount_percentage,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCartItemQuantity = async (cartItemId, quantity, userId) => {
  if (quantity <= 0) {
    return removeFromCart(cartItemId, userId);
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeFromCart = async (cartItemId, userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId)
    .eq('user_id', userId);

  if (error) throw error;
  return true;
};

export const clearUserCart = async (userId) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
  return true;
};

export const getCartItemCount = async (userId) => {
  const { data, error, count } = await supabase
    .from('cart_items')
    .select('quantity', { count: 'exact' })
    .eq('user_id', userId);

  if (error) throw error;
  return data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
};

export const getCartTotal = async (userId) => {
  const items = await getCartItems(userId);
  
  return items.reduce((total, item) => {
    const price = item.offer_id ? (item.original_price || item.products?.price) * (1 - (item.discount_percentage || 0) / 100) : item.products?.price;
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Map cart item from DB to app format
 */
export const mapCartItemFromDB = (dbItem) => ({
  id: dbItem.id,
  cartItemId: dbItem.id,
  productId: dbItem.product_id,
  name: dbItem.products?.name,
  description: dbItem.products?.description,
  price: dbItem.products?.price,
  category: dbItem.products?.category,
  image_url: dbItem.products?.image_url,
  quantity: dbItem.quantity,
  is_offer: !!dbItem.offer_id,
  offer_id: dbItem.offer_id,
  original_price: dbItem.original_price,
  discount_percentage: dbItem.discount_percentage,
  offer_price: dbItem.offer_id && dbItem.original_price
    ? dbItem.original_price * (1 - (dbItem.discount_percentage || 0) / 100)
    : dbItem.products?.price,
  created_at: dbItem.created_at,
});