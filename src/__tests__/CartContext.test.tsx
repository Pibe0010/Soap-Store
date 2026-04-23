import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../context/CartContext';

// Mock products data for price lookups
const mockProductsData = {
  '1': { name: 'Lavender Soap', price: 8.99 },
  '2': { name: 'Rose Soap', price: 12.50 },
};

// Mock cartService
let mockCartItems = [];
let itemCounter = 0;
const getNextId = () => `cart-item-${++itemCounter}`;

const mockAddToCart = jest.fn().mockImplementation(async (userId, productData) => {
  const existingIndex = mockCartItems.findIndex(item => item.product_id === productData.product_id);
  
  if (existingIndex >= 0) {
    return mockCartItems[existingIndex];
  }
  
  const productInfo = mockProductsData[productData.product_id] || { name: 'Test Product', price: 10 };
  
  const newItem = {
    id: getNextId(),
    product_id: productData.product_id,
    quantity: productData.quantity,
    products: { name: productInfo.name, price: productInfo.price },
  };
  mockCartItems.push(newItem);
  return newItem;
});

const mockUpdateCartItemQuantity = jest.fn().mockImplementation(async (cartItemId, quantity, userId) => {
  if (quantity <= 0) {
    mockCartItems = mockCartItems.filter(item => item.id !== cartItemId);
    return true;
  }
  mockCartItems = mockCartItems.map(item =>
    item.id === cartItemId ? { ...item, quantity } : item
  );
  return { id: cartItemId, quantity };
});

const mockRemoveFromCart = jest.fn().mockImplementation(async (cartItemId, userId) => {
  mockCartItems = mockCartItems.filter(item => item.id !== cartItemId);
  return true;
});

const mockClearUserCart = jest.fn().mockImplementation(async (userId) => {
  mockCartItems = [];
  return true;
});

const mockGetCartItems = jest.fn().mockImplementation(async (userId) => {
  return JSON.parse(JSON.stringify(mockCartItems));
});

const mockMapCartItemFromDB = (item) => ({
  id: item.id,
  cartItemId: item.id,
  productId: item.product_id,
  name: item.products?.name,
  price: item.products?.price || 10,
  imageUrl: 'https://example.com/image.jpg',
  quantity: item.quantity,
});

jest.mock('../services/entities/cartService', () => ({
  getCartItems: (...args) => mockGetCartItems(...args),
  addToCart: (...args) => mockAddToCart(...args),
  updateCartItemQuantity: (...args) => mockUpdateCartItemQuantity(...args),
  removeFromCart: (...args) => mockRemoveFromCart(...args),
  clearUserCart: (...args) => mockClearUserCart(...args),
  mapCartItemFromDB: (item) => mockMapCartItemFromDB(item),
}));

// Mock AuthContext
const mockUser = { id: 'test-user-123' };

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    isLoggedIn: true,
  }),
}));

const mockProduct = {
  id: '1',
  name: 'Lavender Soap',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

const mockProduct2 = {
  id: '2',
  name: 'Rose Soap',
  price: 12.50,
  imageUrl: 'https://example.com/rose.jpg',
};

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartContext', () => {
  beforeEach(() => {
    mockCartItems = [];
    itemCounter = 0;
    jest.clearAllMocks();
    mockGetCartItems.mockResolvedValue([]);
  });

  describe('basic operations', () => {
    it('starts with empty cart', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        // Wait for initial load
        await new Promise(resolve => setTimeout(resolve, 10));
      });
      
      expect(result.current.items).toEqual([]);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });

    it('adds item to cart', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].productId).toBe('1');
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.totalItems).toBe(1);
    });

    it('increments quantity when adding existing item', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.totalItems).toBe(2);
    });

    it('removes item from cart', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      
      expect(result.current.items).toHaveLength(2);
      
      await act(async () => {
        await result.current.removeItem(mockUser.id, result.current.items[0].cartItemId);
      });
      
      expect(result.current.items).toHaveLength(1);
    });

    it('updates item quantity', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      const cartItemId = result.current.items[0].cartItemId;
      
      await act(async () => {
        await result.current.updateQuantity(mockUser.id, cartItemId, 5);
      });
      
      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.totalItems).toBe(5);
    });

    it('prevents quantity from going below 1 when using updateQuantity', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      const cartItemId = result.current.items[0].cartItemId;
      
      await act(async () => {
        await result.current.updateQuantity(mockUser.id, cartItemId, 0);
      });
      
      // quantity 0 should remove the item
      expect(result.current.items.some(item => item.cartItemId === cartItemId)).toBe(false);
    });

    it('clears the cart', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      
      expect(result.current.totalItems).toBe(2);
      
      await act(async () => {
        await result.current.clearCart(mockUser.id);
      });
      
      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.totalPrice).toBe(0);
    });
  });

  describe('query methods', () => {
    it('checks if product is in cart', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      expect(result.current.isInCart('1')).toBe(false);
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      expect(result.current.isInCart('1')).toBe(true);
      expect(result.current.isInCart('2')).toBe(false);
    });

    it('gets item quantity', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      expect(result.current.getItemQuantity('1')).toBe(0);
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      
      expect(result.current.getItemQuantity('1')).toBe(2);
    });
  });

  describe('price calculations', () => {
    it('calculates total price correctly', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      
      expect(result.current.totalPrice).toBeCloseTo(21.49);
    });

    it('calculates total price with multiple items', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      
      expect(result.current.totalItems).toBe(3);
      expect(result.current.totalPrice).toBeCloseTo(33.99);
    });
  });

  describe('adds different products independently', () => {
    it('adds multiple different products', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct);
      });
      await act(async () => {
        await result.current.addItem(mockUser.id, mockProduct2);
      });
      
      expect(result.current.items).toHaveLength(2);
      expect(result.current.totalItems).toBe(2);
    });
  });

  describe('handles user not logged in', () => {
    it('does nothing when adding item without userId', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.addItem(null, mockProduct);
      });
      
      expect(result.current.items).toHaveLength(0);
    });

    it('does nothing when updating without userId', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.updateQuantity(null, 'any-id', 5);
      });
      
      expect(mockUpdateCartItemQuantity).not.toHaveBeenCalled();
    });

    it('does nothing when removing without userId', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.removeItem(null, 'any-id');
      });
      
      expect(mockRemoveFromCart).not.toHaveBeenCalled();
    });

    it('does nothing when clearing without userId', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      await act(async () => {
        await result.current.clearCart(null);
      });
      
      expect(mockClearUserCart).not.toHaveBeenCalled();
    });
  });
});