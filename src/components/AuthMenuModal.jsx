import React, { useContext, useRef, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  BackHandler,
  PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import NavigationContext from '../navigation/NavigationContext';
import { checkIsAdmin } from '../services/entities/usersService';
import {
  Overlay,
  OverlayTouchable,
  SlidePanel,
  CloseButton,
  MenuHeader,
  MenuTitle,
  MenuItem,
  MenuItemText,
  MenuDivider,
  UserBadge,
  UserName,
  LogoutText,
  MODAL_WIDTH,
} from '../styles/AuthMenuModalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ANIMATION_DURATION = 300;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;

/**
 * Auth menu modal that slides in from the right edge.
 * Shows navigation options (Contáctanos, Mis pedidos, Ayuda, Favoritos)
 * and conditional auth items (login/register or logout).
 * Auth-gated actions show a toast when user is not logged in.
 * Supports swipe-to-close via PanResponder and overlay tap dismissal.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Callback fired when the modal should close
 * @param {Function} [props.onLoginPress] - Callback fired when login is pressed
 * @param {Function} [props.onRegisterPress] - Callback fired when Registrarse is pressed
 * @returns {JSX.Element|null}
 */
export default function AuthMenuModal({ visible, onClose, onLoginPress, onRegisterPress }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const swipeTranslateX = useRef(new Animated.Value(0)).current;
  const { isLoggedIn, user, logout } = useAuth();
  const { showToast } = useToast();
  const navigationRef = useContext(NavigationContext);
  const isAnimating = useRef(false);
  
  const [isAdmin, setIsAdmin] = React.useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoggedIn && user?.email) {
        try {
          const adminStatus = await checkIsAdmin(user.email);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [isLoggedIn, user]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          swipeTranslateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.timing(swipeTranslateX, {
            toValue: MODAL_WIDTH,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }).start(() => {
            swipeTranslateX.setValue(0);
            onClose();
          });
        } else {
          Animated.spring(swipeTranslateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      isAnimating.current = true;
      swipeTranslateX.setValue(0);
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
      });
    } else {
      isAnimating.current = true;
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: SCREEN_WIDTH,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isAnimating.current = false;
      });
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => subscription.remove();
  }, [visible, onClose]);

  const handleClose = () => {
    if (isAnimating.current) return;
    onClose();
  };

  const handleNavigate = (screenName) => {
    handleClose();
    setTimeout(() => {
      navigationRef?.current?.navigate(screenName);
    }, ANIMATION_DURATION);
  };

  const handleAuthGated = (screenName, toastMessage) => {
    if (!isLoggedIn) {
      showToast(toastMessage, t('toast.loginButton'), () => {
        navigationRef?.current?.navigate('Login');
      });
      handleClose();
      return;
    }
    handleNavigate(screenName);
  };

  const handleLogin = () => {
    handleClose();
    if (onLoginPress) {
      onLoginPress();
    } else {
      setTimeout(() => {
        navigationRef?.current?.navigate('Login');
      }, ANIMATION_DURATION);
    }
  };

  const handleRegister = () => {
    handleClose();
    if (onRegisterPress) {
      onRegisterPress();
    } else {
      setTimeout(() => {
        navigationRef?.current?.navigate('Register');
      }, ANIMATION_DURATION);
    }
  };

  const handleLogout = () => {
    logout();
    handleClose();
    setTimeout(() => {
      navigationRef?.current?.navigate('InicioTab');
    }, ANIMATION_DURATION);
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <Overlay>
        <Animated.View style={{ flex: 1, opacity: overlayOpacity }}>
          <OverlayTouchable activeOpacity={1} onPress={handleClose} />
        </Animated.View>
      </Overlay>

      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: MODAL_WIDTH,
          transform: [
            { translateX },
            { translateX: swipeTranslateX },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <SlidePanel>
          <CloseButton onPress={handleClose}>
            <Ionicons name="close" size={24} color={theme.colors.text} />
          </CloseButton>

          <MenuHeader>
            <MenuTitle>{t('menu.welcome')}</MenuTitle>
          </MenuHeader>

          {isLoggedIn && (
            <UserBadge>
              <Ionicons name="person-circle" size={32} color={theme.colors.primary} />
              <UserName>{user?.name || user?.email || 'Usuario'}</UserName>
            </UserBadge>
          )}

          <MenuItem onPress={() => handleNavigate('ContactScreen')}>
            <Ionicons name="mail-outline" size={24} color={theme.colors.primary} />
            <MenuItemText>{t('menu.contacanos')}</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleAuthGated('MyOrdersScreen', t('toast.loginToSeeOrders'))}>
            <Ionicons name="receipt-outline" size={24} color={theme.colors.primary} />
            <MenuItemText>{t('menu.misPedidos')}</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleAuthGated('HelpScreen', t('toast.loginToSeeHelp'))}>
            <Ionicons name="help-circle-outline" size={24} color={theme.colors.primary} />
            <MenuItemText>{t('menu.ayuda')}</MenuItemText>
          </MenuItem>

          <MenuItem onPress={() => handleNavigate('FavoritesScreen')}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
            <MenuItemText>{t('menu.favoritos')}</MenuItemText>
          </MenuItem>

          {isAdmin && (
            <>
              <MenuDivider />
              <MenuItem onPress={() => handleNavigate('AdminOffersScreen')}>
                <Ionicons name="pricetag" size={24} color={theme.colors.warning} />
                <MenuItemText>{t('ofertas.gestionOfertas')}</MenuItemText>
              </MenuItem>
            </>
          )}

          <MenuDivider />

          {isLoggedIn ? (
            <MenuItem onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
              <LogoutText>{t('menu.cerrarSesion')}</LogoutText>
            </MenuItem>
          ) : (
            <>
              <MenuItem onPress={handleLogin}>
                <Ionicons name="log-in-outline" size={24} color={theme.colors.primary} />
                <MenuItemText>{t('menu.iniciarSesion')}</MenuItemText>
              </MenuItem>

              <MenuItem onPress={handleRegister}>
                <Ionicons name="person-add-outline" size={24} color={theme.colors.primary} />
                <MenuItemText>{t('menu.registrarse')}</MenuItemText>
              </MenuItem>
            </>
          )}
        </SlidePanel>
      </Animated.View>
    </Animated.View>
  );
}
