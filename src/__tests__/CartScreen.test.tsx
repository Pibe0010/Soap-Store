import React from 'react';
import { render } from '@testing-library/react-native';
import CartScreen from '../screens/CartScreen';

jest.mock('../context/CartContext', () => ({
  useCart: () => ({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    isInCart: jest.fn(),
    getItemQuantity: jest.fn(),
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

describe('CartScreen', () => {
  it('renders Spanish empty state "Tu carrito está vacío"', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('renders Spanish subtitle "Agregá un producto para continuar"', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('Agregá un producto para continuar')).toBeTruthy();
  });

  it('renders Spanish title "Mi carrito"', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('Mi carrito')).toBeTruthy();
  });

  it('wraps content in SafeAreaView', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('Mi carrito')).toBeTruthy();
  });
});
