import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddToCartButton from '../AddToCartButton';

const mockAddItem = jest.fn();
const mockShowToast = jest.fn();
const mockNavigate = jest.fn();
let mockIsLoggedIn = false;

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
  name: 'Jabón de Lavanda',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

describe('AddToCartButton auth-gated integration', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockShowToast.mockClear();
    mockNavigate.mockClear();
    mockIsLoggedIn = false;
  });

  it('shows toast and does NOT add to cart when unauthenticated', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    fireEvent.press(getByText('Agregar al carrito'));
    expect(mockAddItem).not.toHaveBeenCalled();
    expect(mockShowToast).toHaveBeenCalledWith(
      'Iniciá sesión para agregar al carrito',
      'Iniciar sesión',
      expect.any(Function)
    );
    expect(mockShowToast).toHaveBeenCalledTimes(1);
  });

  it('toast callback navigates to Login', () => {
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    fireEvent.press(getByText('Agregar al carrito'));
    const toastCallback = mockShowToast.mock.calls[0][2];
    toastCallback();
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('adds to cart when authenticated', () => {
    mockIsLoggedIn = true;
    const { getByText } = render(
      <AddToCartButton product={mockProduct} />
    );
    fireEvent.press(getByText('Agregar al carrito'));
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
    expect(mockShowToast).not.toHaveBeenCalled();
  });
});
