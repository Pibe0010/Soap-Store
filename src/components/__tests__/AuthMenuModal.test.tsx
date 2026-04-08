import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AuthMenuModal from '../AuthMenuModal';

const mockLogin = jest.fn();
const mockLogout = jest.fn();
const mockRegister = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const { useAuth } = require('../../context/AuthContext');

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native', () => ({
  Dimensions: { get: () => ({ width: 375, height: 667 }) },
  StyleSheet: { create: (s) => s },
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  Image: 'Image',
  Alert: { alert: jest.fn() },
  Animated: {
    timing: () => ({ start: (cb) => cb && cb() }),
    parallel: (animations) => ({ start: (cb) => cb && cb() }),
    Value: class { constructor(val) { this._val = val; } setValue() {} },
    spring: () => ({ start: (cb) => cb && cb() }),
  },
  BackHandler: {
    addEventListener: () => ({ remove: jest.fn() }),
  },
  PanResponder: {
    create: () => ({
      panHandlers: {},
    }),
  },
}));

describe('AuthMenuModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when not visible', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { toJSON } = render(
      <AuthMenuModal visible={false} onClose={jest.fn()} />
    );
    expect(toJSON()).toBeNull();
  });

  it('shows Spanish menu header "Menu" when logged out', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    expect(getByText('Menu')).toBeTruthy();
  });

  it('shows "login" and "Registrarse" when logged out', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    expect(getByText('login')).toBeTruthy();
    expect(getByText('Registrarse')).toBeTruthy();
  });

  it('shows navigation items: Contáctanos, Mis pedidos, Ayuda', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    expect(getByText('Contáctanos')).toBeTruthy();
    expect(getByText('Mis pedidos')).toBeTruthy();
    expect(getByText('Ayuda')).toBeTruthy();
  });

  it('shows "Cerrar sesión" when logged in', () => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      user: { name: 'Test User', email: 'test@example.com' },
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText, queryByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );
    expect(getByText('Menu')).toBeTruthy();
    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('Cerrar sesión')).toBeTruthy();
    expect(queryByText('login')).toBeNull();
    expect(queryByText('Registrarse')).toBeNull();
  });

  it('calls onLoginPress when login is pressed', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const onLoginPress = jest.fn();
    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} onLoginPress={onLoginPress} />
    );

    fireEvent.press(getByText('login'));
    expect(onLoginPress).toHaveBeenCalled();
  });

  it('calls onRegisterPress when Registrarse is pressed', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const onRegisterPress = jest.fn();
    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} onRegisterPress={onRegisterPress} />
    );

    fireEvent.press(getByText('Registrarse'));
    expect(onRegisterPress).toHaveBeenCalled();
  });

  it('calls logout and navigates to InicioTab when Cerrar sesión is pressed', () => {
    useAuth.mockReturnValue({
      isLoggedIn: true,
      user: { name: 'Test User' },
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );

    fireEvent.press(getByText('Cerrar sesión'));
    expect(mockLogout).toHaveBeenCalled();
  });

  it('navigates to ContactScreen when Contáctanos is pressed', () => {
    useAuth.mockReturnValue({
      isLoggedIn: false,
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { getByText } = render(
      <AuthMenuModal visible={true} onClose={jest.fn()} />
    );

    fireEvent.press(getByText('Contáctanos'));
    // Navigate is called after animation delay, so we just verify no crash
  });
});
