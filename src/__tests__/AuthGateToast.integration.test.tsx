import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthMenuModal from '../components/AuthMenuModal';

const mockShowToast = jest.fn();
const mockLogin = jest.fn();

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isLoggedIn: false,
    user: null,
    logout: jest.fn(),
    login: mockLogin,
  }),
}));

jest.mock('../context/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

const mockNavigation = { navigate: jest.fn() };
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => mockNavigation,
}));

const renderWithNav = (component) =>
  render(<NavigationContainer>{component}</NavigationContainer>);

describe('Auth-gated toast integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows toast when unauthenticated user taps Mis pedidos', () => {
    const { getByText } = renderWithNav(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Mis pedidos'));
    expect(mockShowToast).toHaveBeenCalledWith(
      'Iniciá sesión para ver tus pedidos',
      'Iniciar sesión',
      expect.any(Function)
    );
  });

  it('shows toast when unauthenticated user taps Ayuda', () => {
    const { getByText } = renderWithNav(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Ayuda'));
    expect(mockShowToast).toHaveBeenCalledWith(
      'Iniciá sesión para acceder a ayuda',
      'Iniciar sesión',
      expect.any(Function)
    );
  });

  it('does NOT show toast for Contáctanos (no auth required)', () => {
    const { getByText } = renderWithNav(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Contáctanos'));
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ContactScreen');
  });

  it('does NOT show toast for Favoritos (no auth required)', () => {
    const { getByText } = renderWithNav(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Favoritos'));
    expect(mockShowToast).not.toHaveBeenCalled();
    expect(mockNavigation.navigate).toHaveBeenCalledWith('FavoritesScreen');
  });
});

describe('Authenticated user bypasses toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates directly when authenticated user taps Mis pedidos', () => {
    jest.doMock('../context/AuthContext', () => ({
      useAuth: () => ({
        isLoggedIn: true,
        user: { name: 'Test' },
        logout: jest.fn(),
      }),
    }));
    const { getByText } = renderWithNav(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    fireEvent.press(getByText('Mis pedidos'));
    expect(mockShowToast).not.toHaveBeenCalled();
  });
});
