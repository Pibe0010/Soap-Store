import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { FavoritesProvider, useFavorites } from '../FavoritesContext';

// Mock the dependencies
jest.mock('../AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    isLoggedIn: true,
  }),
}));

jest.mock('../../hooks/useFavoritesDB', () => ({
  useFavoritesDB: jest.fn().mockReturnValue({
    favorites: [],
    toggleFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    isFavorite: jest.fn(),
    loading: false,
    error: null,
  }),
}));

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

const wrapper = ({ children }) => <FavoritesProvider>{children}</FavoritesProvider>;

describe('FavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with empty favorites', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });
  });

  it('toggleFavorite calls the db function', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    const useFavoritesDBMock = require('../../hooks/useFavoritesDB').useFavoritesDB;
    expect(useFavoritesDBMock).toHaveBeenCalled();
    const instance = useFavoritesDBMock.mock.results[0].value;
    expect(instance.toggleFavorite).toHaveBeenCalledWith(mockProduct);
  });

  it('isFavorite calls the db function', async () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });
    result.current.isFavorite(mockProduct.id);
    const useFavoritesDBMock = require('../../hooks/useFavoritesDB').useFavoritesDB;
    expect(useFavoritesDBMock).toHaveBeenCalled();
    const instance = useFavoritesDBMock.mock.results[0].value;
    expect(instance.isFavorite).toHaveBeenCalledWith(mockProduct.id);
  });
});