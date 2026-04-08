import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddToCartButton from '../AddToCartButton';

const mockAddItem = jest.fn();
const mockShowToast = jest.fn();
const mockNavigate = jest.fn();
let mockIsLoggedIn = true;

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: mockIsLoggedIn,
  }),
}));

jest.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

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

describe('AddToCartButton', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockShowToast.mockClear();
    mockNavigate.mockClear();
    mockIsLoggedIn = true;
  });

  it('renders Spanish text "Agregar al carrito"', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    expect(getByText('Agregar al carrito')).toBeTruthy();
  });

  it('calls addItem with product when pressed and user is logged in', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    fireEvent.press(getByText('Agregar al carrito'));
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it('shows toast when user is not logged in', () => {
    mockIsLoggedIn = false;
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    fireEvent.press(getByText('Agregar al carrito'));
    expect(mockAddItem).not.toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledTimes(1);
    expect(mockShowToast).toHaveBeenCalledWith(
      'Iniciá sesión para agregar al carrito',
      'Iniciar sesión',
      expect.any(Function)
    );
  });

  it('renders with small size variant', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} size="small" />
    );
    expect(getByText('Agregar al carrito')).toBeTruthy();
  });

  it('renders with medium size by default', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    expect(getByText('Agregar al carrito')).toBeTruthy();
  });
});
