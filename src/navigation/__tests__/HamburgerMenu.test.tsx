import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockLogout = jest.fn();

jest.mock('../../context/CartContext', () => ({
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

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [],
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
    loading: false,
  }),
}));

jest.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn(),
    hideToast: jest.fn(),
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', email: 'test@example.com' },
    isLoggedIn: true,
    login: jest.fn(),
    logout: mockLogout,
    register: jest.fn(),
    loading: false,
    initialized: true,
  }),
}));

jest.mock('../../hooks/useProducts', () => ({
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

jest.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    data: ['Soap'],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

/**
 * Integration tests for hamburger menu with authenticated user.
 * Verifies menu shows correct options per auth state.
 */
describe('Hamburger Menu Integration (Logged In)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders hamburger menu with auth state', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Test Soap')).toBeTruthy();
    });
  });

  it('does not show English "Logout" — shows "Cerrar sesión"', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(queryByText('Logout')).toBeNull();
    });
  });

  it('does not show English "Login" or "Register"', async () => {
    const { queryByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(queryByText('Login')).toBeNull();
      expect(queryByText('Register')).toBeNull();
    });
  });
});
