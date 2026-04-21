// src/services/entities/offerPurchasesService.js
import { supabase } from '../supabaseClient';

/**
 * Offer Purchases Service - Track user purchases of offers
 */

export const purchaseOffer = async (offerId, userId, quantity = 1) => {
  const { data, error } = await supabase
    .from('offer_purchases')
    .insert({
      offer_id: offerId,
      user_id: userId,
      quantity,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserPurchases = async (userId, offerId = null) => {
  let query = supabase
    .from('offer_purchases')
    .select('*')
    .eq('user_id', userId);

  if (offerId) {
    query = query.eq('offer_id', offerId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

export const checkPurchaseLimit = async (userId, offerId) => {
  // Get the offer's max quantity per user
  const { data: offer, error: offerError } = await supabase
    .from('offers')
    .select('max_quantity_per_user')
    .eq('id', offerId)
    .single();

  if (offerError) throw offerError;

  // Get user's purchases for this offer
  const { data: purchases, error: purchaseError } = await supabase
    .from('offer_purchases')
    .select('quantity')
    .eq('user_id', userId)
    .eq('offer_id', offerId);

  if (purchaseError) throw purchaseError;

  const totalPurchased = purchases?.reduce((sum, p) => sum + p.quantity, 0) || 0;
  const remaining = offer.max_quantity_per_user - totalPurchased;

  return {
    canPurchase: remaining > 0,
    remaining,
    maxPerUser: offer.max_quantity_per_user,
    totalPurchased,
  };
};

export const getUserTotalSpentOnOffers = async (userId) => {
  const { data, error } = await supabase
    .from('offer_purchases')
    .select(`
      quantity,
      offers (
        offer_price
      )
    `)
    .eq('user_id', userId);

  if (error) throw error;

  const total = data?.reduce((sum, item) => {
    return sum + (item.quantity * item.offers?.offer_price || 0);
  }, 0) || 0;

  return total;
};

export const hasUserReachedLimit = async (userId, offerId) => {
  const { canPurchase } = await checkPurchaseLimit(userId, offerId);
  return !canPurchase;
};