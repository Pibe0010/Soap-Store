import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { ToastProvider } from '../context/ToastContext';
import ProductListScreen from '../screens/ProductListScreen';

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

describe('ProductListScreen', () => {
  it('should import correctly', () => {
    expect(ProductListScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProductListScreen />, { wrapper });
    expect(toJSON()).toBeDefined();
  });
});
