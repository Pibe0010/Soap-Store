import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoritesScreen from '../FavoritesScreen';

const mockRemoveFavorite = jest.fn();
const mockFavorites = [
  { id: '1', name: 'Lavender Soap', price: 8.99, imageUrl: 'https://example.com/soap.jpg' },
  { id: '2', name: 'Rose Soap', price: 12.50, imageUrl: 'https://example.com/rose.jpg' },
];

jest.mock('../../context/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: mockFavorites,
    removeFavorite: mockRemoveFavorite,
  }),
}));

describe('FavoritesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders favorites when they exist', () => {
    const { getByText } = render(<FavoritesScreen />);
    expect(getByText('Lavender Soap')).toBeTruthy();
    expect(getByText('Rose Soap')).toBeTruthy();
  });

  it('renders product prices', () => {
    const { getByText } = render(<FavoritesScreen />);
    expect(getByText('8.99€')).toBeTruthy();
    expect(getByText('12.50€')).toBeTruthy();
  });

  it('renders remove buttons', () => {
    const { getAllByText } = render(<FavoritesScreen />);
    const removeButtons = getAllByText('Eliminar');
    expect(removeButtons).toHaveLength(2);
  });

  it('calls removeFavorite on remove press', () => {
    const { getAllByText } = render(<FavoritesScreen />);
    const removeButtons = getAllByText('Eliminar');
    fireEvent.press(removeButtons[0]);
    expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
  });
});

describe('FavoritesScreen - empty state', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no favorites', () => {
    const { useFavorites } = require('../../context/FavoritesContext');
    useFavorites.mockReturnValue({
      favorites: [],
      removeFavorite: mockRemoveFavorite,
    });
    const { getByText } = render(<FavoritesScreen />);
    expect(getByText('No tenés productos favoritos')).toBeTruthy();
    expect(getByText('Agregá productos tocando el ícono de estrella')).toBeTruthy();
  });
});
