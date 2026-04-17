import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider } from './src/context/ToastContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { NotificationProvider } from './src/context/NotificationContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import * as Linking from 'expo-linking';
import { useRef } from 'react';

const queryClient = new QueryClient();

// Wrapper to connect styled-components ThemeProvider to our ThemeContext
function StyledThemeWrapper({ children }) {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}

// StatusBar that responds to dark mode
function AppStatusBar() {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <StatusBar 
      style={isDarkMode ? 'light' : 'dark'} 
    />
  );
}

export default function App() {
  // useURL maneja automáticamente cold start y warm start de deep links
  const url = Linking.useURL();
  const navigationRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <StyledThemeWrapper>
          <LanguageProvider>
            <AuthProvider>
              <NotificationProvider>
                <FavoritesProvider>
                  <CartProvider>
                    <ToastProvider>
                      <NavigationContainer ref={navigationRef}>
                        <AppNavigator 
                          initialUrl={url} 
                          navigationRef={navigationRef} 
                        />
                      </NavigationContainer>
                      <AppStatusBar />
                    </ToastProvider>
                  </CartProvider>
                </FavoritesProvider>
              </NotificationProvider>
            </AuthProvider>
          </LanguageProvider>
        </StyledThemeWrapper>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
