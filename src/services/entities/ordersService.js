// src/services/entities/ordersService.js
import { supabase, mapOrderFromDB } from '../supabaseClient';

/**
 * Orders CRUD operations
 */

export const getOrdersByUserId = async (userId, filters = {}) => {
  let query = supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (filters.status) {
    query = query.eq('status', filters.status);
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

  return {
    data: data ? data.map(mapOrderFromDB) : [],
    total: count || 0,
    limit: filters.limit || 10,
    offset: filters.offset || 0,
  };
};

export const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return mapOrderFromDB(data);
};

export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: orderData.userId,
        status: orderData.status,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        shipping_cost: orderData.shippingCost,
        total: orderData.total,
        payment_status: orderData.paymentStatus,
        payment_method: orderData.paymentMethod,
        shipping_address_id: orderData.shippingAddressId,
        billing_address_id: orderData.billingAddressId,
        notes: orderData.notes,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapOrderFromDB(data);
};

export const updateOrder = async (id, orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: orderData.status,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping_cost: orderData.shippingCost,
      total: orderData.total,
      payment_status: orderData.paymentStatus,
      payment_method: orderData.paymentMethod,
      shipping_address_id: orderData.shippingAddressId,
      billing_address_id: orderData.billingAddressId,
      notes: orderData.notes,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapOrderFromDB(data);
};