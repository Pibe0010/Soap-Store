import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ToastProvider } from '../context/ToastContext';
import AppNavigator from '../navigation/AppNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <ToastProvider>{children}</ToastProvider>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

describe('AppNavigator', () => {
  it('should import correctly', () => {
    expect(AppNavigator).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<AppNavigator />, { wrapper });
    expect(toJSON()).toBeDefined();
  });
});
