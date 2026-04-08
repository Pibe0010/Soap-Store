import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ProductDetailScreen from '../ProductDetailScreen';

const mockProduct = {
  id: '1',
  name: 'Lavender Soap',
  description: 'A soothing lavender soap made with natural ingredients',
  price: 8.99,
  category: 'Soap',
  imageUrl: 'https://example.com/soap.jpg',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

const mockAddItem = jest.fn();
const mockGoBack = jest.fn();

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
    isInCart: jest.fn(),
    getItemQuantity: jest.fn(),
    items: [],
    totalItems: 0,
    totalPrice: 0,
  }),
  CartProvider: ({ children }) => children,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: mockGoBack,
  }),
  useRoute: () => ({
    params: { productId: '1' },
  }),
}));

jest.mock('../../hooks/useProduct', () => ({
  useProduct: () => ({
    data: mockProduct,
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('ProductDetailScreen', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockGoBack.mockClear();
  });

  it('renders product name', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('Lavender Soap')).toBeTruthy();
    });
  });

  it('renders product description', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('A soothing lavender soap made with natural ingredients')).toBeTruthy();
    });
  });

  it('renders product category', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('Soap')).toBeTruthy();
    });
  });

  it('renders product price', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('8.99€')).toBeTruthy();
    });
  });

  it('renders add to cart button', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('Add to Cart')).toBeTruthy();
    });
  });

  it('renders back to products link', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      expect(getByText('Back to Products')).toBeTruthy();
    });
  });

  it('calls goBack when back link is pressed', async () => {
    const { getByText } = render(<ProductDetailScreen />);
    await waitFor(() => {
      fireEvent.press(getByText('Back to Products'));
    });
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('renders loading state', () => {
    jest.spyOn(require('../../hooks/useProduct'), 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { toJSON } = render(<ProductDetailScreen />);
    expect(toJSON()).toBeTruthy();

    jest.restoreAllMocks();
  });

  it('renders error state', () => {
    jest.spyOn(require('../../hooks/useProduct'), 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Product not found'),
      refetch: jest.fn(),
    });

    const { getByText } = render(<ProductDetailScreen />);
    expect(getByText('Error loading product: Product not found')).toBeTruthy();
    expect(getByText('Tap to retry')).toBeTruthy();

    jest.restoreAllMocks();
  });

  it('renders not found state', () => {
    jest.spyOn(require('../../hooks/useProduct'), 'useProduct').mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: jest.fn(),
    });

    const { getByText } = render(<ProductDetailScreen />);
    expect(getByText('Product not found')).toBeTruthy();
    expect(getByText('Go back to products')).toBeTruthy();

    jest.restoreAllMocks();
  });
});
