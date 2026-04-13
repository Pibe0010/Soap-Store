import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider } from './src/context/ToastContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { LanguageProvider } from './src/context/LanguageContext';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import * as Linking from 'expo-linking';
import { useRef } from 'react';

const queryClient = new QueryClient();

export default function App() {
  // useURL maneja automáticamente cold start y warm start de deep links
  const url = Linking.useURL();
  const navigationRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <ToastProvider>
                <NavigationContainer ref={navigationRef}>
                  <AppNavigator 
                    initialUrl={url} 
                    navigationRef={navigationRef} 
                  />
                </NavigationContainer>
                <StatusBar style="auto" />
              </ToastProvider>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
