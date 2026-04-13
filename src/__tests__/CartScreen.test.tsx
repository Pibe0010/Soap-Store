import React from 'react';
import { render } from '@testing-library/react-native';
import { CartProvider } from '../context/CartContext';
import CartScreen from '../screens/CartScreen';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

describe('CartScreen', () => {
  it('should import correctly', () => {
    expect(CartScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<CartScreen />, { wrapper });
    expect(toJSON()).toBeDefined();
  });
});
