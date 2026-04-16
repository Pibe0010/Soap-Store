import React, { useContext } from 'react';
import {  ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Container }  from '../components/ProtectedRouteStyles';
import { NavigationContext } from '../../navigation/AppNavigator';

export default function ProtectedRoute({ children, fallbackDestination = 'Login' }) {
  const { user, loading, initialized } = useAuth();
  const { theme } = useTheme();
  const navigationRef = useContext(NavigationContext);

  if (!initialized || loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  if (!user) {
    const currentRoute = navigationRef.current?.getState()?.routes?.slice(-1)[0]?.name || 'Home';
    navigationRef.current?.navigate('Login', { intended: currentRoute });
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  if (!user.emailConfirmedAt) {
    navigationRef.current?.navigate('EmailVerification');
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  return children;
}
