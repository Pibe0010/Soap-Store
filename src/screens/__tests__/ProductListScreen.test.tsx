import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProductListScreen from '../ProductListScreen';

const mockProducts = [
  {
    id: '1',
    name: 'Lavender Soap',
    description: 'A soothing lavender soap',
    price: 8.99,
    category: 'Soap',
    imageUrl: 'https://example.com/soap.jpg',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Rose Soap',
    description: 'A fragrant rose soap',
    price: 12.5,
    category: 'Soap',
    imageUrl: 'https://example.com/rose.jpg',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Shampoo Bar',
    description: 'Natural shampoo bar',
    price: 15.0,
    category: 'Shampoo',
    imageUrl: 'https://example.com/shampoo.jpg',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    isInCart: jest.fn(),
    getItemQuantity: jest.fn(),
    items: [],
    totalItems: 0,
    totalPrice: 0,
  }),
}));

jest.mock('../../context/ModalContext', () => ({
  useModal: () => ({
    modalVisible: false,
    setModalVisible: jest.fn(),
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  useRoute: () => ({
    params: { productId: '1' },
  }),
}));

jest.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    data: { data: mockProducts, total: 3, limit: 10, offset: 0 },
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    data: ['Soap', 'Shampoo'],
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('ProductListScreen', () => {
  it('renders product list', async () => {
    const { getByText } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByText('Lavender Soap')).toBeTruthy();
      expect(getByText('Rose Soap')).toBeTruthy();
      expect(getByText('Shampoo Bar')).toBeTruthy();
    });
  });

  it('renders product prices', async () => {
    const { getByText } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByText('8.99€')).toBeTruthy();
      expect(getByText('12.50€')).toBeTruthy();
      expect(getByText('15.00€')).toBeTruthy();
    });
  });

  it('renders product categories', async () => {
    const { getAllByText } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getAllByText('Soap')).toHaveLength(2);
      expect(getAllByText('Shampoo')).toHaveLength(1);
    });
  });

  it('renders category filter', async () => {
    const { getByText } = render(<ProductListScreen />);
    await waitFor(() => {
      expect(getByText('All Categories')).toBeTruthy();
    });
  });

  it('renders loading state', () => {
    jest.spyOn(require('../../hooks/useProducts'), 'useProducts').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { toJSON } = render(<ProductListScreen />);
    expect(toJSON()).toBeTruthy();

    jest.restoreAllMocks();
  });

  it('renders error state', () => {
    const mockError = new Error('Network error');
    jest.spyOn(require('../../hooks/useProducts'), 'useProducts').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: mockError,
      refetch: jest.fn(),
    });

    const { getByText } = render(<ProductListScreen />);
    expect(getByText('Error loading products: Network error')).toBeTruthy();
    expect(getByText('Tap to retry')).toBeTruthy();

    jest.restoreAllMocks();
  });

  it('renders empty state', () => {
    jest.spyOn(require('../../hooks/useProducts'), 'useProducts').mockReturnValue({
      data: { data: [], total: 0, limit: 10, offset: 0 },
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = render(<ProductListScreen />);
    expect(getByText('No products available')).toBeTruthy();

    jest.restoreAllMocks();
  });
});
