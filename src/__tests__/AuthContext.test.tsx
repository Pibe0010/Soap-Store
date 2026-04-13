import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { AuthProvider, useAuth, authReducer, AuthActions, initialState } from '../context/AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('authReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = authReducer(initialState, { type: 'UNKNOWN' });
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.loading).toBe(true);
    expect(state.initialized).toBe(false);
  });

  it('handles SET_USER action', () => {
    const userData = { name: 'Test User', email: 'test@example.com' };
    const state = authReducer(initialState, {
      type: AuthActions.SET_USER,
      payload: userData,
    });
    expect(state.user).toEqual(userData);
  });

  it('handles LOGOUT action', () => {
    const loggedInState = { user: { name: 'Test' }, session: {}, loading: false, initialized: true };
    const state = authReducer(loggedInState, { type: AuthActions.LOGOUT });
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.loading).toBe(false);
  });
});

describe('AuthProvider and useAuth', () => {
  it('provides initial state with user null', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });
});