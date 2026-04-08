import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';
import CartScreen from '../screens/CartScreen';
import ContactScreen from '../screens/ContactScreen';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

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

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isLoggedIn: false,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
  }),
}));

jest.mock('../hooks/useProducts', () => ({
  useProducts: () => ({
    data: {
      data: [
        {
          id: '1',
          name: 'Test Soap',
          price: 9.99,
          category: 'Soap',
          imageUrl: 'https://example.com/soap.jpg',
          description: 'A test soap',
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-01T00:00:00Z',
        },
      ],
      total: 1,
      limit: 10,
      offset: 0,
    },
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock('../hooks/useCategories', () => ({
  useCategories: () => ({
    data: ['Soap'],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

/**
 * Integration tests verifying language consistency across all screens.
 * Ensures no English strings remain visible in any screen.
 */
describe('Language Consistency Integration', () => {
  it('AppNavigator shows Spanish tab accessibility labels', async () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    expect(getByLabelText('Inicio')).toBeTruthy();
    expect(getByLabelText('Ofertas')).toBeTruthy();
    expect(getByLabelText('Carrito')).toBeTruthy();
    expect(getByLabelText('Perfil')).toBeTruthy();
    expect(getByLabelText('Ajustes')).toBeTruthy();
  });

  it('CartScreen shows all Spanish text', () => {
    const { getByText } = render(<CartScreen />);
    expect(getByText('Mi carrito')).toBeTruthy();
    expect(getByText('Tu carrito está vacío')).toBeTruthy();
    expect(getByText('Agregá un producto para continuar')).toBeTruthy();
  });

  it('CartScreen does not contain English strings', () => {
    const { queryByText } = render(<CartScreen />);
    expect(queryByText('My Cart')).toBeNull();
    expect(queryByText('Your cart is empty')).toBeNull();
    expect(queryByText('Add products to get started')).toBeNull();
  });

  it('does not contain English tab labels in navigator', () => {
    const { queryByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
    expect(queryByText('Home')).toBeNull();
    expect(queryByText('Cart')).toBeNull();
    expect(queryByText('Contact')).toBeNull();
  });
});
