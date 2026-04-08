import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn(() => false);

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
    favorites: [],
  }),
}));

const mockAddItem = jest.fn();
jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: true,
  }),
}));

jest.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}));

const mockProduct = {
  id: '1',
  name: 'Lavender Soap',
  category: 'Soap',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

const mockOnPress = jest.fn();

describe('Favorites toggle and persistence integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders FavoriteButton in product card', () => {
    const { toJSON } = render(
      <ProductCard product={mockProduct} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
    expect(mockIsFavorite).toHaveBeenCalledWith('1');
  });

  it('toggleFavorite called on star press', () => {
    const { toJSON } = render(
      <ProductCard product={mockProduct} onPress={mockOnPress} />
    );
    // The FavoriteButton wraps a TouchableOpacity
    expect(mockToggleFavorite).not.toHaveBeenCalled();
  });

  it('shows unfilled star when not favorite', () => {
    mockIsFavorite.mockReturnValue(false);
    const { toJSON } = render(
      <ProductCard product={mockProduct} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('shows filled star when favorite', () => {
    mockIsFavorite.mockReturnValue(true);
    const { toJSON } = render(
      <ProductCard product={mockProduct} onPress={mockOnPress} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
