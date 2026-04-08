// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Supabase client with AsyncStorage for session persistence
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Product mapper
export const mapProductFromDB = (dbProduct) => ({
  id: dbProduct.id,
  name: dbProduct.name,
  description: dbProduct.description,
  price: dbProduct.price,
  category: dbProduct.category,
  imageUrl: dbProduct.image_url,
  createdAt: dbProduct.created_at,
  updatedAt: dbProduct.updated_at,
});

// User mapper
export const mapUserFromDB = (dbUser) => ({
  id: dbUser.id,
  email: dbUser.email,
  fullName: dbUser.full_name,
  phone: dbUser.phone,
  avatarUrl: dbUser.avatar_url,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
});

// Address mapper
export const mapAddressFromDB = (dbAddress) => ({
  id: dbAddress.id,
  userId: dbAddress.user_id,
  label: dbAddress.label,
  streetAddress: dbAddress.street_address,
  apartmentUnit: dbAddress.apartment_unit,
  city: dbAddress.city,
  stateProvince: dbAddress.state_province,
  postalCode: dbAddress.postal_code,
  country: dbAddress.country,
  isDefault: dbAddress.is_default,
  createdAt: dbAddress.created_at,
  updatedAt: dbAddress.updated_at,
});

// Favorite mapper
export const mapFavoriteFromDB = (dbFavorite) => ({
  id: dbFavorite.id,
  userId: dbFavorite.user_id,
  productId: dbFavorite.product_id,
  createdAt: dbFavorite.created_at,
});

// Order mapper
export const mapOrderFromDB = (dbOrder) => ({
  id: dbOrder.id,
  userId: dbOrder.user_id,
  status: dbOrder.status,
  subtotal: dbOrder.subtotal,
  tax: dbOrder.tax,
  shippingCost: dbOrder.shipping_cost,
  total: dbOrder.total,
  paymentStatus: dbOrder.payment_status,
  paymentMethod: dbOrder.payment_method,
  shippingAddressId: dbOrder.shippingAddressId,
  billingAddressId: dbOrder.billingAddressId,
  notes: dbOrder.notes,
  createdAt: dbOrder.created_at,
  updatedAt: dbOrder.updated_at,
});

// Order item mapper
export const mapOrderItemFromDB = (dbOrderItem) => ({
  id: dbOrderItem.id,
  orderId: dbOrderItem.order_id,
  productId: dbOrderItem.product_id,
  quantity: dbOrderItem.quantity,
  unitPrice: dbOrderItem.unit_price,
  totalPrice: dbOrderItem.total_price,
  createdAt: dbOrderItem.created_at,
});

// Auth user mapper
export const mapAuthUserFromDB = (dbUser) => ({
  id: dbUser.id,
  email: dbUser.email,
  emailConfirmedAt: dbUser.email_confirmed_at,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
  userMetadata: dbUser.user_metadata,
  appMetadata: dbUser.app_metadata,
});

// Auth session mapper
export const mapAuthSessionFromDB = (dbSession) => ({
  accessToken: dbSession.access_token,
  refreshToken: dbSession.refresh_token,
  expiresAt: dbSession.expires_at,
});