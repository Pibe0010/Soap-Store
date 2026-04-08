// src/services/supabase.js
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

/**
 * Mapper: Converts database columns (snake_case) to JS properties (camelCase)
 */
const mapProductFromDB = (dbProduct) => ({
  id: dbProduct.id,
  name: dbProduct.name,
  description: dbProduct.description,
  price: dbProduct.price,
  category: dbProduct.category,
  imageUrl: dbProduct.image_url,  // Map image_url -> imageUrl
  createdAt: dbProduct.created_at,
  updatedAt: dbProduct.updated_at,
});

const mapUserFromDB = (dbUser) => ({
  id: dbUser.id,
  email: dbUser.email,
  fullName: dbUser.full_name,
  phone: dbUser.phone,
  avatarUrl: dbUser.avatar_url,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
});

const mapAddressFromDB = (dbAddress) => ({
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

const mapFavoriteFromDB = (dbFavorite) => ({
  id: dbFavorite.id,
  userId: dbFavorite.user_id,
  productId: dbFavorite.product_id,
  createdAt: dbFavorite.created_at,
});

const mapOrderFromDB = (dbOrder) => ({
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

const mapOrderItemFromDB = (dbOrderItem) => ({
  id: dbOrderItem.id,
  orderId: dbOrderItem.order_id,
  productId: dbOrderItem.product_id,
  quantity: dbOrderItem.quantity,
  unitPrice: dbOrderItem.unit_price,
  totalPrice: dbOrderItem.total_price,
  createdAt: dbOrderItem.created_at,
});

/**
 * Auth mappers
 */
const mapAuthUserFromDB = (dbUser) => ({
  id: dbUser.id,
  email: dbUser.email,
  emailConfirmedAt: dbUser.email_confirmed_at,
  createdAt: dbUser.created_at,
  updatedAt: dbUser.updated_at,
  userMetadata: dbUser.user_metadata,
  appMetadata: dbUser.app_metadata,
});

const mapAuthSessionFromDB = (dbSession) => ({
  accessToken: dbSession.access_token,
  refreshToken: dbSession.refresh_token,
  expiresAt: dbSession.expires_at,
});

/**
 * Products CRUD
 */
export const getProducts = async (filters = {}) => {
  let query = supabase.from('products').select('*', { count: 'exact' });

  // Apply filters
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

  // Map database data to JavaScript format
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

/**
 * Categories - Get all unique product categories
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .order('category');

  if (error) {
    throw error;
  }

  // Extract unique categories and filter out null values
  const categories = data
    ? [...new Set(data.map(item => item.category).filter(Boolean))]
    : [];

  return categories;
};

/**
 * Users CRUD
 */
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data ? mapUserFromDB(data) : null;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
    throw error;
  }

  return data ? mapUserFromDB(data) : null;
};

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email: userData.email,
        full_name: userData.fullName,
        phone: userData.phone,
        avatar_url: userData.avatarUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapUserFromDB(data);
};

export const updateUser = async (id, userData) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      full_name: userData.fullName,
      phone: userData.phone,
      avatar_url: userData.avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapUserFromDB(data);
};

/**
 * Addresses CRUD
 */
export const getAddressesByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ? data.map(mapAddressFromDB) : [];
};

export const getAddressById = async (id) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const createAddress = async (addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .insert([
      {
        user_id: addressData.userId,
        label: addressData.label,
        street_address: addressData.streetAddress,
        apartment_unit: addressData.apartmentUnit,
        city: addressData.city,
        state_province: addressData.stateProvince,
        postal_code: addressData.postalCode,
        country: addressData.country,
        is_default: addressData.isDefault,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const updateAddress = async (id, addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .update({
      label: addressData.label,
      street_address: addressData.streetAddress,
      apartment_unit: addressData.apartmentUnit,
      city: addressData.city,
      state_province: addressData.stateProvince,
      postal_code: addressData.postalCode,
      country: addressData.country,
      is_default: addressData.isDefault,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const deleteAddress = async (id) => {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};

/**
 * Favorites CRUD
 */
export const getFavoritesByUserId = async (userId) => {
  // Hacemos un join con la tabla products para traer los detalles del producto
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

  // Mapeamos a la estructura que espera la app
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
    console.error('[removeFavorite] userId o productId es undefined/null', { userId, productId });
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
    return false; // Not found means not a favorite
  }

  if (error) {
    throw error;
  }

  return !!data;
};

/**
 * Orders CRUD
 */
export const getOrdersByUserId = async (userId, filters = {}) => {
  let query = supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  // Apply filters
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

/**
 * Order Items CRUD
 */
export const getOrderItemsByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, products(*)') // Join with products to get product details
    .eq('order_id', orderId);

  if (error) {
    throw error;
  }

  // Map order items with embedded product data
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

/**
 * Auth CRUD
 */
export const signUpWithEmailPassword = async (email, password, userData = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
      },
    },
  });

  if (error) {
    throw error;
  }

  // Map the user data
  const user = data.user ? mapAuthUserFromDB(data.user) : null;
  const session = data.session ? mapAuthSessionFromDB(data.session) : null;

  return {
    user,
    session,
  };
};

export const signInWithEmailPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Map the user and session data
  const user = data.user ? mapAuthUserFromDB(data.user) : null;
  const session = data.session ? mapAuthSessionFromDB(data.session) : null;

  return {
    user,
    session,
  };
};

export const signInWithGoogle = async () => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,  
      },
    });
    if (error) {
      throw error;
    }
    const user = data.user ? mapAuthUserFromDB(data.user) : null;
    const session = data.session ? mapAuthSessionFromDB(data.session) : null;
    return { user, session };
  } catch (error) {
    console.error('Error en signInWithGoogle:', error);
    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectUrl,
      },
    });
    if (error) {
      throw error;
    }
    const user = data.user ? mapAuthUserFromDB(data.user) : null;
    const session = data.session ? mapAuthSessionFromDB(data.session) : null;
    return { user, session };
  } catch (error) {
    console.error('Error en signInWithApple:', error);
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  };
};

export const resetPasswordForEmail = async (email) => {
  try {
    // Usamos redirectTo específico que debe coincidir con Additional redirect URL en Supabase
    const redirectUrl = `soapstore://update-password`;
    console.log('DEBUG resetPasswordForEmail: redirectUrl =', redirectUrl);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error en resetPasswordForEmail:', error);
    throw error;
  }
};

export const verifyEmailOTP = async (email, token) => {
  const { data, error } = await supabase.auth.verifyOTP({
    email,
    token,
    type: 'email',
  });

  if (error) {
    throw error;
  };

  return data;
};

export const sendMagicLinkEmail = async (email) => {
  try {
    // Para enlaces de verificación de email, usamos nuestro esquema de deep linking directo
    const redirectUrl = `soapstore://verify-email`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error en sendMagicLinkEmail:', error);
    throw error;
  }
};

export const getUser = async (accessToken) => {
  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    throw error;
  };

  return mapAuthUserFromDB(data.user);
};

export const updateUserPassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    throw error;
  };

  return data;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  };

  return data.session ? {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresAt: data.session.expires_at,
    user: mapAuthUserFromDB(data.session.user),
  } : null;
};

export const resendVerificationEmail = async (email) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    throw error;
  };
};