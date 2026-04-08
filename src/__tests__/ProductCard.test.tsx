import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../components/ProductCard';

// Mock dependencies
jest.mock('../context/CartContext', () => ({
  useCart: () => ({
    addItem: jest.fn(),
  }),
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

const mockProduct = {
  id: '1',
  name: 'Lavender Soap',
  description: 'A soothing lavender soap',
  price: 8.99,
  category: 'Soap',
  imageUrl: 'https://example.com/soap.jpg',
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-01T00:00:00Z',
};

describe('ProductCard', () => {
  it('renders product name', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} onPress={jest.fn()} />
    );
    expect(getByText('Lavender Soap')).toBeTruthy();
  });

  it('renders product category', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} onPress={jest.fn()} />
    );
    expect(getByText('Soap')).toBeTruthy();
  });

  it('renders formatted price', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} onPress={jest.fn()} />
    );
    expect(getByText('8.99€')).toBeTruthy();
  });

  it('renders price with zero when price is undefined', () => {
    const productNoPrice = { ...mockProduct, price: undefined };
    const { getByText } = render(
      <ProductCard product={productNoPrice} onPress={jest.fn()} />
    );
    expect(getByText('0.00€')).toBeTruthy();
  });

  it('calls onPress when card is tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ProductCard product={mockProduct} onPress={onPress} />
    );
    fireEvent.press(getByText('Lavender Soap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
