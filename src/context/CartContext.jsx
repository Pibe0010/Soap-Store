import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './AuthContext';
import { 
  getCartItems, 
  addToCart as addToCartDB, 
  updateCartItemQuantity as updateQuantityDB,
  removeFromCart as removeFromCartDB,
  clearUserCart,
  mapCartItemFromDB
} from '../services/entities/cartService';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: true,
};

const CartActions = {
  SET_LOADING: 'SET_LOADING',
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
};

/**
 * Cart reducer handling all cart operations
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CartActions.SET_LOADING:
      return { ...state, loading: action.payload };

    case CartActions.LOAD_CART: {
      const items = action.payload.map(mapCartItemFromDB);
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = items.reduce((sum, item) => sum + (item.offer_price || item.price) * item.quantity, 0);
      return { ...state, items, totalItems, totalPrice, loading: false };
    }

    case CartActions.ADD_ITEM: {
      const newItem = mapCartItemFromDB(action.payload);
      const existingIndex = state.items.findIndex(item => item.productId === newItem.productId);
      
      let newItems;
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) => 
          index === existingIndex 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        newItems = [...state.items, newItem];
      }
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.offer_price || item.price) * item.quantity, 0);
      return { ...state, items: newItems, totalItems, totalPrice };
    }

    case CartActions.UPDATE_ITEM: {
      const newItems = state.items.map(item =>
        item.cartItemId === action.payload.cartItemId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.offer_price || item.price) * item.quantity, 0);
      return { ...state, items: newItems, totalItems, totalPrice };
    }

    case CartActions.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.cartItemId !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.offer_price || item.price) * item.quantity, 0);
      return { ...state, items: newItems, totalItems, totalPrice };
    }

    case CartActions.CLEAR_CART:
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
};

const CartContext = createContext();

/**
 * Provider component that wraps the app with cart state management.
 * Cart is synced with Supabase database.
 * Automatically loads cart when user logs in.
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  // Load cart when user changes (login/logout)
  useEffect(() => {
    const loadCartForUser = async () => {
      if (user?.id) {
        try {
          const items = await getCartItems(user.id);
          dispatch({ type: CartActions.LOAD_CART, payload: items });
        } catch (error) {
          console.error('[CartContext] Failed to load cart:', error);
          dispatch({ type: CartActions.SET_LOADING, payload: false });
        }
      } else {
        // User logged out - clear cart
        dispatch({ type: CartActions.CLEAR_CART });
        dispatch({ type: CartActions.SET_LOADING, payload: false });
      }
    };

    loadCartForUser();
  }, [user?.id]);

  /**
   * Add a product to the cart
   */
  const addItem = useCallback(async (userId, product) => {
    if (!userId) {
      console.warn('[CartContext] Cannot add item: user not logged in');
      return;
    }

    try {
      const result = await addToCartDB(userId, {
        product_id: product.id,
        quantity: product.quantity || 1,
        offer_id: product.offer_id,
        original_price: product.original_price,
        discount_percentage: product.discount_percentage,
      });
      
      // Update local state with the result
      dispatch({ type: CartActions.ADD_ITEM, payload: result });
    } catch (error) {
      console.error('[CartContext] Failed to add item:', error);
      throw error;
    }
  }, []);

  /**
   * Update quantity of a cart item
   */
  const updateQuantity = useCallback(async (userId, cartItemId, quantity) => {
    if (!userId) return;

    try {
      if (quantity <= 0) {
        await removeFromCartDB(cartItemId, userId);
        dispatch({ type: CartActions.REMOVE_ITEM, payload: cartItemId });
      } else {
        await updateQuantityDB(cartItemId, quantity, userId);
        dispatch({ type: CartActions.UPDATE_ITEM, payload: { cartItemId, quantity } });
      }
    } catch (error) {
      console.error('[CartContext] Failed to update quantity:', error);
      throw error;
    }
  }, []);

  /**
   * Remove a product from the cart
   */
  const removeItem = useCallback(async (userId, cartItemId) => {
    if (!userId) return;

    try {
      await removeFromCartDB(cartItemId, userId);
      dispatch({ type: CartActions.REMOVE_ITEM, payload: cartItemId });
    } catch (error) {
      console.error('[CartContext] Failed to remove item:', error);
      throw error;
    }
  }, []);

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback(async (userId) => {
    if (!userId) return;

    try {
      await clearUserCart(userId);
      dispatch({ type: CartActions.CLEAR_CART });
    } catch (error) {
      console.error('[CartContext] Failed to clear cart:', error);
      throw error;
    }
  }, []);

  /**
   * Check if a product is in the cart
   */
  const isInCart = useCallback((productId) => {
    return state.items.some(item => item.productId === productId);
  }, [state.items]);

  /**
   * Get quantity of a specific product in cart
   */
  const getItemQuantity = useCallback((productId) => {
    const item = state.items.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  }, [state.items]);

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    loading: state.loading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook to access cart context
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartContext };