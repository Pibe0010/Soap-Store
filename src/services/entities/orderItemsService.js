// src/services/entities/orderItemsService.js
import { supabase, mapOrderItemFromDB, mapProductFromDB } from '../supabaseClient';

/**
 * Order Items CRUD operations
 */

export const getOrderItemsByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, products(*)')
    .eq('order_id', orderId);

  if (error) {
    throw error;
  }

  return data
    ? data.map((item) => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        totalPrice: item.total_price,
        createdAt: item.created_at,
        product: item.products
          ? mapProductFromDB(item.products)
          : null,
      }))
    : [];
};

export const createOrderItem = async (orderItemData) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert([
      {
        order_id: orderItemData.orderId,
        product_id: orderItemData.productId,
        quantity: orderItemData.quantity,
        unit_price: orderItemData.unit_price,
        total_price: orderItemData.total_price,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapOrderItemFromDB(data);
};

export const updateOrderItem = async (id, orderItemData) => {
  const { data, error } = await supabase
    .from('order_items')
    .update({
      quantity: orderItemData.quantity,
      unit_price: orderItemData.unitPrice,
      total_price: orderItemData.total_price,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapOrderItemFromDB(data);
};

export const deleteOrderItem = async (id) => {
  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};