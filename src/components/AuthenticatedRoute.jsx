import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Container } from '../components/AuthenticatedRouteStyles';
import { NavigationContext } from '../../navigation/AppNavigator';

export default function AuthenticatedRoute({ children }) {
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

  if (user && user.emailConfirmedAt) {
    const intended = navigationRef.current?.getState()?.routes?.slice(-1)[0]?.params?.intended;
    if (intended) {
      navigationRef.current?.navigate(intended);
    } else {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  return children;
}
