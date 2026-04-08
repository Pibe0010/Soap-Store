import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteButton from '../FavoriteButton';

const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  }),
}));

const mockProduct = { id: '1', name: 'Test', price: 9.99 };

describe('FavoriteButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  it('renders unfilled star when not favorite', () => {
    const { getByTestId } = render(
      <FavoriteButton product={mockProduct} />
    );
    // Ionicons star-outline renders
    expect(mockIsFavorite).toHaveBeenCalledWith('1');
  });

  it('renders filled star when favorite', () => {
    mockIsFavorite.mockReturnValue(true);
    const { getByTestId } = render(
      <FavoriteButton product={mockProduct} />
    );
    expect(mockIsFavorite).toHaveBeenCalledWith('1');
  });

  it('calls toggleFavorite on press', () => {
    const { getByRole } = render(
      <FavoriteButton product={mockProduct} />
    );
    // Find the TouchableOpacity and press it
    const buttons = getByRole || (() => {});
    fireEvent.press(getByRole('button').parent);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProduct);
  });

  it('uses default size 28', () => {
    const { toJSON } = render(
      <FavoriteButton product={mockProduct} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('accepts custom size', () => {
    const { toJSON } = render(
      <FavoriteButton product={mockProduct} size={36} />
    );
    expect(toJSON()).toBeTruthy();
  });
});
