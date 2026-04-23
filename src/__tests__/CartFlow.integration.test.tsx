import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { CartProvider, useCart } from '../context/CartContext';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

jest.mock('../services/entities/cartService', () => ({
  getCartItems: jest.fn().mockResolvedValue([]),
  addToCart: jest.fn().mockResolvedValue({ id: 'cart-item-1', product_id: '1', quantity: 1, products: { name: 'Test Product', price: 10 } }),
  updateCartItemQuantity: jest.fn().mockResolvedValue({}),
  removeFromCart: jest.fn().mockResolvedValue(true),
  clearUserCart: jest.fn().mockResolvedValue(true),
  mapCartItemFromDB: (item) => ({
    cartItemId: item.id,
    productId: item.product_id,
    name: item.products?.name,
    price: item.products?.price || 10,
    quantity: item.quantity,
    is_offer: !!item.offer_id,
    offer_id: item.offer_id,
  }),
}));

// Mock AuthContext
const mockUser = { id: 'user-123' };
const mockAuthContext = {
  user: mockUser,
  isLoggedIn: true,
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

const mockProduct = {
  id: '1',
  name: 'Jabón de Lavanda',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

const mockProduct2 = {
  id: '2',
  name: 'Jabón de Romero',
  price: 12.50,
  imageUrl: 'https://example.com/rose.jpg',
};

const TestAddButton = ({ product, label }) => {
  const { addItem } = useCart();
  return (
    <TouchableOpacity onPress={() => addItem('user-123', product)} testID={`add-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestRemoveButton = ({ cartItemId, label }) => {
  const { removeItem } = useCart();
  return (
    <TouchableOpacity onPress={() => removeItem('user-123', cartItemId)} testID={`remove-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestClearButton = () => {
  const { clearCart } = useCart();
  return (
    <TouchableOpacity onPress={() => clearCart('user-123')} testID="clear-btn">
      <Text>Clear</Text>
    </TouchableOpacity>
  );
};

const TestUpdateQuantity = ({ cartItemId, label }) => {
  const { updateQuantity } = useCart();
  return (
    <TouchableOpacity onPress={() => updateQuantity('user-123', cartItemId, 3)} testID={`update-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const CartStateDisplay = () => {
  const { totalItems, totalPrice, items } = useCart();
  return (
    <View>
      <Text testID="count">{String(totalItems)}</Text>
      <Text testID="price">{String(totalPrice)}</Text>
      <Text testID="itemCount">{String(items.length)}</Text>
      {items.map(item => (
        <Text key={item.cartItemId} testID={`qty-${item.cartItemId}`}>{String(item.quantity)}</Text>
      ))}
    </View>
  );
};

describe('Cart flow integration', () => {
  it('adds product to cart and totalItems reflects count', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('count').children[0]).toBe('1');
    expect(getByTestId('itemCount').children[0]).toBe('1');
  });

  it('adds same product twice, quantity is 2', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('qty-cart-item-1').children[0]).toBe('2');
    expect(getByTestId('count').children[0]).toBe('2');
  });

  it('removes item from cart', () => {
    const { getByTestId, queryByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <TestRemoveButton cartItemId="cart-item-1" label="Remove" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('count').children[0]).toBe('1');

    fireEvent.press(getByTestId('remove-Remove'));
    expect(getByTestId('count').children[0]).toBe('0');
  });

  it('clears entire cart', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add1" />
        <TestAddButton product={mockProduct2} label="Add2" />
        <TestClearButton />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add1'));
    fireEvent.press(getByTestId('add-Add2'));
    expect(getByTestId('count').children[0]).toBe('2');

    fireEvent.press(getByTestId('clear-btn'));
    expect(getByTestId('count').children[0]).toBe('0');
  });
});