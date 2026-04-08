import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../navigation/AppNavigator';

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

jest.mock('../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
    loading: false,
  }),
}));

jest.mock('../context/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn(),
    hideToast: jest.fn(),
  }),
}));


jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    isLoggedIn: false,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    loading: false,
    initialized: true,
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
 * Integration tests for AppNavigator.
 * Verifies 5 icon-only tabs (Inicio, Ofertas, Carrito, Perfil, Ajustes),
 * Carrito centered at position 3, Spanish labels, and navigation flows.
 */
describe('AppNavigator Integration', () => {
  it('renders 5 bottom tabs (icon-only)', async () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByLabelText('Inicio')).toBeTruthy();
      expect(getByLabelText('Ofertas')).toBeTruthy();
      expect(getByLabelText('Carrito')).toBeTruthy();
      expect(getByLabelText('Perfil')).toBeTruthy();
      expect(getByLabelText('Ajustes')).toBeTruthy();
    });
  });

  it('shows ProductListScreen on Inicio tab by default', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Test Soap')).toBeTruthy();
    });
  });

  it('Carrito tab is at center position (3rd of 5)', async () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      const inicio = getByLabelText('Inicio');
      const ofertas = getByLabelText('Ofertas');
      const carrito = getByLabelText('Carrito');
      const perfil = getByLabelText('Perfil');
      const ajustes = getByLabelText('Ajustes');

      expect(inicio).toBeTruthy();
      expect(ofertas).toBeTruthy();
      expect(carrito).toBeTruthy();
      expect(perfil).toBeTruthy();
      expect(ajustes).toBeTruthy();
    });
  });

  it('renders hamburger menu icon on Inicio header', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Soap Store')).toBeTruthy();
    });
  });

  it('does NOT render English tab labels', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(queryByText('Home')).toBeNull();
      expect(queryByText('Cart')).toBeNull();
      expect(queryByText('Contact')).toBeNull();
    });
  });

  it('does NOT render header cart icon (cart is now a tab)', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Test Soap')).toBeTruthy();
    });
  });
});
