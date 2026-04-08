import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../context/CartContext';

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
  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('1');
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(8.99);
  });

  it('increments quantity when adding existing item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.totalPrice).toBe(17.98);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });
    expect(result.current.items).toHaveLength(2);
    act(() => {
      result.current.removeItem('1');
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('2');
  });

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.updateQuantity('1', 5);
    });
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalItems).toBe(5);
    expect(result.current.totalPrice).toBe(44.95);
  });

  it('prevents quantity from going below 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.updateQuantity('1', 0);
    });
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
    });
    expect(result.current.totalItems).toBe(2);
    act(() => {
      result.current.clearCart();
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it('checks if product is in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.isInCart('1')).toBe(false);
    act(() => {
      result.current.addItem(mockProduct);
    });
    expect(result.current.isInCart('1')).toBe(true);
    expect(result.current.isInCart('2')).toBe(false);
  });

  it('gets item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.getItemQuantity('1')).toBe(0);
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct);
    });
    expect(result.current.getItemQuantity('1')).toBe(2);
  });

  it('calculates total price with multiple items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
      result.current.addItem(mockProduct2);
      result.current.addItem(mockProduct2);
    });
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPrice).toBeCloseTo(33.99);
  });

  it('rejects product without id', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({ name: 'No ID Soap' });
    });
    expect(result.current.items).toHaveLength(0);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[CartContext] addItem: invalid product payload',
      { name: 'No ID Soap' }
    );
    consoleWarnSpy.mockRestore();
  });

  it('rejects null product', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(null);
    });
    expect(result.current.items).toHaveLength(0);
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });

  it('rejects undefined product', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(undefined);
    });
    expect(result.current.items).toHaveLength(0);
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });

  it('accepts product with id 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem({ id: 0, name: 'Free Sample', price: 0 });
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(0);
  });

  it('adds different products independently', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => {
      result.current.addItem(mockProduct);
    });
    act(() => {
      result.current.addItem(mockProduct2);
    });
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(2);
  });
});
