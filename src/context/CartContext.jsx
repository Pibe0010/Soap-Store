import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = '@soapstore_cart';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const CartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

/**
 * Cart reducer handling add, remove, update quantity, and clear actions.
 * Recalculates totalItems and totalPrice after each mutation.
 *
 * @param {Object} state - Current cart state
 * @param {Array} state.items - Cart items with quantity
 * @param {number} state.totalItems - Sum of all item quantities
 * @param {number} state.totalPrice - Sum of (price * quantity) for all items
 * @param {Object} action - Dispatched action with type and payload
 * @returns {Object} New state
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case CartActions.LOAD_CART: {
      const items = action.payload || [];
      return {
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
    }

    case CartActions.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      let newItems;
      if (existingItem) {
        // If item already exists, increment quantity
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item does not exist, add new item
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
    }

    case CartActions.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
    }

    case CartActions.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };
    }

    case CartActions.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext();

/**
 * Provider component that wraps the app with cart state management.
 * Persists cart to AsyncStorage so it survives app restarts.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsed = JSON.parse(storedCart);
          dispatch({ type: CartActions.LOAD_CART, payload: parsed });
        }
      } catch (error) {
        console.error('[CartContext] Failed to load cart:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        if (state.items.length === 0) {
          await AsyncStorage.removeItem(CART_STORAGE_KEY);
        } else {
          await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
        }
      } catch (error) {
        console.error('[CartContext] Failed to save cart:', error);
      }
    };

    saveCart();
  }, [state.items]);

  /**
   * Add a product to the cart or increment its quantity if already present.
   * Validates that product has an id before dispatching.
   * Logs a warning if the payload is invalid and does not dispatch.
   *
   * @param {Object} product - Product to add
   * @param {string|number} product.id - Unique product identifier
   * @param {string} [product.name] - Product display name
   * @param {number} [product.price] - Product unit price
   * @param {string} [product.imageUrl] - Product image URL
   */
  const addItem = (product) => {
    if (!product || typeof product.id === 'undefined') {
      console.warn('[CartContext] addItem: invalid product payload', product);
      return;
    }
    try {
      dispatch({ type: CartActions.ADD_ITEM, payload: product });
    } catch (error) {
      console.error('[CartContext] addItem: dispatch failed', error);
    }
  };

  /**
   * Remove a product from the cart by its id.
   * @param {string|number} productId - Id of the product to remove
   */
  const removeItem = (productId) => {
    dispatch({ type: CartActions.REMOVE_ITEM, payload: productId });
  };

  /**
   * Update the quantity of a cart item. Minimum quantity is 1.
   * @param {string|number} productId - Id of the product to update
   * @param {number} quantity - New quantity (clamped to minimum 1)
   */
  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CartActions.UPDATE_QUANTITY, payload: { id: productId, quantity } });
  };

  /**
   * Remove all items from the cart and reset totals.
   */
  const clearCart = () => {
    dispatch({ type: CartActions.CLEAR_CART });
  };

  /**
   * Check if a product is currently in the cart.
   * @param {string|number} productId - Product id to check
   * @returns {boolean} True if product is in cart
   */
  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  /**
   * Get the quantity of a specific product in the cart.
   * @param {string|number} productId - Product id to look up
   * @returns {number} Quantity in cart, or 0 if not present
   */
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    addItem,
    removeItem,
    updateQuantity,
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
 * Hook to access cart context. Must be used within a CartProvider.
 * @returns {Object} Cart state and actions
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
