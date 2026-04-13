import React from 'react';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import ProductDetailScreen from '../screens/ProductDetailScreen';

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
      <FavoritesProvider>{children}</FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

describe('ProductDetailScreen', () => {
  it('should import correctly', () => {
    expect(ProductDetailScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProductDetailScreen />, { wrapper });
    expect(toJSON()).toBeDefined();
  });
});
