// src/services/entities/offersService.js
import { supabase } from '../supabaseClient';

/**
 * Offers Service - CRUD operations for offers
 */

export const createOffer = async (offerData) => {
  const {
    product_id,
    admin_id,
    original_price,
    discount_percentage = 0,
    max_quantity_per_user = 4,
    max_total_quantity,
    start_date,
    end_date,
  } = offerData;

  // Calculate offer price
  const offer_price = original_price * (1 - discount_percentage / 100);

  const { data, error } = await supabase
    .from('offers')
    .insert({
      product_id,
      admin_id,
      original_price,
      discount_percentage,
      offer_price,
      max_quantity_per_user,
      max_total_quantity,
      start_date,
      end_date,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getActiveOffers = async () => {
  // Auto-expire offers that have ended
  await expireOffers();
  
  const { data, error } = await supabase
    .from('offers')
    .select(`
      *,
      products (
        id,
        name,
        description,
        image_url,
        category
      )
    `)
    .eq('is_active', true)
    .gt('end_date', new Date().toISOString())
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getOffersByProduct = async (productId) => {
  // Auto-expire offers that have ended
  await expireOffers();
  
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('product_id', productId)
    .eq('is_active', true)
    .gt('end_date', new Date().toISOString())
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  return data;
};

export const getAllOffers = async () => {
  // First, auto-expire offers that have ended
  await expireOffers();
  
  const { data, error } = await supabase
    .from('offers')
    .select(`
      *,
      products (
        id,
        name,
        image_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Auto-expire offers that have passed their end date
 */
export const expireOffers = async () => {
  const { data, error } = await supabase
    .from('offers')
    .select('id')
    .eq('is_active', true)
    .lt('end_date', new Date().toISOString());

  if (error) throw error;
  if (!data || data.length === 0) return [];

  // Update all expired offers to inactive
  const expiredIds = data.map(o => o.id);
  const { error: updateError } = await supabase
    .from('offers')
    .update({ is_active: false })
    .in('id', expiredIds);

  if (updateError) throw updateError;
  return expiredIds;
};

export const updateOffer = async (id, updates) => {
  // Recalculate offer_price if original_price or discount changed
  if (updates.original_price || updates.discount_percentage) {
    const { data: current } = await supabase
      .from('offers')
      .select('original_price, discount_percentage')
      .eq('id', id)
      .single();

    const original_price = updates.original_price ?? current.original_price;
    const discount_percentage = updates.discount_percentage ?? current.discount_percentage;
    updates.offer_price = original_price * (1 - discount_percentage / 100);
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('offers')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteOffer = async (id) => {
  const { error } = await supabase
    .from('offers')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

export const incrementSoldQuantity = async (id, quantity = 1) => {
  const { data, error } = await supabase
    .from('offers')
    .select('sold_quantity')
    .eq('id', id)
    .single();

  if (error) throw error;

  const { error: updateError } = await supabase
    .from('offers')
    .update({ sold_quantity: data.sold_quantity + quantity })
    .eq('id', id);

  if (updateError) throw updateError;
  return true;
};

export const checkOfferAvailable = async (offerId) => {
  const { data, error } = await supabase
    .from('offers')
    .select('max_total_quantity, sold_quantity, end_date, is_active')
    .eq('id', offerId)
    .single();

  if (error) throw error;

  const available = data.is_active &&
    new Date(data.end_date) > new Date() &&
    data.sold_quantity < data.max_total_quantity;

  return {
    available,
    remaining: data.max_total_quantity - data.sold_quantity,
  };
};