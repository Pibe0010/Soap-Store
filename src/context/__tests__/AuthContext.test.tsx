import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider, useAuth, authReducer, AuthActions, initialState } from '../AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('authReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = authReducer(initialState, { type: 'UNKNOWN' });
    expect(state).toEqual({ user: null, isLoggedIn: false });
  });

  it('handles LOGIN action', () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const state = authReducer(initialState, {
      type: AuthActions.LOGIN,
      payload: userData,
    });
    expect(state.user).toEqual(userData);
    expect(state.isLoggedIn).toBe(true);
  });

  it('handles LOGOUT action', () => {
    const loggedInState = { user: { name: 'Test' }, isLoggedIn: true };
    const state = authReducer(loggedInState, { type: AuthActions.LOGOUT });
    expect(state.user).toBeNull();
    expect(state.isLoggedIn).toBe(false);
  });

  it('handles REGISTER action', () => {
    const userData = { name: 'New User', email: 'new@example.com' };
    const state = authReducer(initialState, {
      type: AuthActions.REGISTER,
      payload: userData,
    });
    expect(state.user).toEqual(userData);
    expect(state.isLoggedIn).toBe(true);
  });
});

describe('AuthProvider and useAuth', () => {
  it('provides initial state with user null and isLoggedIn false', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('logs in a user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const userData = { name: 'Test User', email: 'test@example.com' };
    act(() => {
      result.current.login(userData);
    });
    expect(result.current.user).toEqual(userData);
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('logs out a user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login({ name: 'Test' });
    });
    expect(result.current.isLoggedIn).toBe(true);
    act(() => {
      result.current.logout();
    });
    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('registers a new user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const userData = { name: 'New User', email: 'new@example.com' };
    act(() => {
      result.current.register(userData);
    });
    expect(result.current.user).toEqual(userData);
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});
