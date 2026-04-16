import React from 'react';
import { Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useOrders } from '../hooks/useOrders';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import {
  Container,
  Header,
  AvatarContainer,
  UserName,
  UserEmail,
  StatsContainer,
  StatItem,
  StatValue,
  StatLabel,
  Section,
  SectionTitle,
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuItemArrow,
  LogoutButton,
  LogoutText,
  EmptyContainer,
  EmptyText,
} from '../styles/PerfilScreenStyles';

/**
 * User profile screen showing account info, stats, and settings.
 * Shows a guest prompt when not authenticated.
 *
 * @returns {JSX.Element}
 */
export default function PerfilScreen() {
  const { t } = useTranslation();
  const { user, isLoggedIn, logout } = useAuth();
  const { favorites } = useFavorites();
  const { orders } = useOrders();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      t('perfil.logout'),
      t('perfil.logoutConfirm'),
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { text: t('perfil.logout'), onPress: logout, style: 'destructive' },
      ]
    );
  };

  const handleNavigate = (screen) => {
    if (screen === 'ChangePassword') {
      navigation.navigate('ChangePassword');
    } else if (screen === 'EditProfile') {
      navigation.navigate('EditProfile');
    } else if (screen === 'Addresses') {
      navigation.navigate('Addresses');
    }
    // Add more navigation handlers as screens are implemented
  };

  if (!isLoggedIn || !user) {
    return (
      <EmptyContainer>
        <Ionicons name="person-outline" size={80} color={theme.colors.disabled} />
        <EmptyText>{t('perfil.loginPrompt')}</EmptyText>
      </EmptyContainer>
    );
  }

  const displayName = user.userMetadata?.name || user.email?.split('@')[0] || t('perfil.guest');

  return (
    <Container>
      <Header>
        <AvatarContainer>
          {user?.userMetadata?.avatar_url ? (
            <Image
              source={{ uri: user.userMetadata.avatar_url }}
              style={{ width: '100%', height: '100%', borderRadius: 45 }}
            />
          ) : (
            <Ionicons name="person" size={48} color={theme.colors.primary} />
          )}
        </AvatarContainer>
        <UserName>{displayName}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </Header>

      <StatsContainer>
        <StatItem>
          <StatValue>{orders.length}</StatValue>
          <StatLabel>{t('perfil.stats.orders')}</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{favorites.length}</StatValue>
          <StatLabel>{t('perfil.stats.favorites')}</StatLabel>
        </StatItem>
      </StatsContainer>

      <SectionTitle>{t('perfil.sections.account')}</SectionTitle>
      <Section>
        <MenuItem onPress={() => handleNavigate('EditProfile')}>
          <MenuItemIcon bgColor={theme.colors.primary + '20'}>
            <Ionicons name="person-outline" size={22} color={theme.colors.primary} />
          </MenuItemIcon>
          <MenuItemText>{t('perfil.menu.editProfile')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>

        <MenuItem onPress={() => handleNavigate('ChangePassword')}>
          <MenuItemIcon bgColor={theme.colors.warning + '20'}>
            <Ionicons name="lock-closed-outline" size={22} color={theme.colors.warning} />
          </MenuItemIcon>
          <MenuItemText>{t('perfil.menu.changePassword')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>

        <MenuItem onPress={() => handleNavigate('Addresses')}>
          <MenuItemIcon bgColor={theme.colors.info + '20'}>
            <Ionicons name="location-outline" size={22} color={theme.colors.info} />
          </MenuItemIcon>
          <MenuItemText>{t('perfil.menu.addresses')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>
      </Section>

      <SectionTitle>{t('perfil.sections.preferences')}</SectionTitle>
      <Section>
        <MenuItem onPress={() => handleNavigate('Notifications')}>
          <MenuItemIcon bgColor={theme.colors.success + '20'}>
            <Ionicons name="notifications-outline" size={22} color={theme.colors.success} />
          </MenuItemIcon>
          <MenuItemText>{t('perfil.menu.notifications')}</MenuItemText>
          <MenuItemArrow>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </MenuItemArrow>
        </MenuItem>
      </Section>

      <LogoutButton onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={theme.colors.error} />
        <LogoutText>{t('perfil.logout')}</LogoutText>
      </LogoutButton>
    </Container>
  );
}
