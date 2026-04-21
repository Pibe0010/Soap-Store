import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons }  from '@expo/vector-icons';
import { useAuth }  from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import NavigationContext from './NavigationContext';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import ContactScreen from '../screens/ContactScreen';
import OffersScreen from '../screens/OffersScreen';
import PerfilScreen from '../screens/PerfilScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import HelpScreen from '../screens/HelpScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EmailVerificationScreen from '../screens/EmailVerificationScreen';
import AuthMenuModal from '../components/AuthMenuModal';
import CartIcon from '../components/CartIcon';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddressesScreen from '../screens/AddressesScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import { LoadingContainer } from '../styles/AppNavigatorStyles';
import Toast from '../components/Toast';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

// MenuButton component - wraps the menu icon in a TouchableOpacity
// Note: Uses useNavigation internally via React Navigation context when rendered in navigation context
const MenuButton = ({ onPress }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={{ marginRight: 15 }}>
      <Ionicons name="menu" size={28} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

function HomeStack({ setModalVisible }) {
const { t } = useTranslation();
  const { theme } = useTheme();
  
  const screenOptions = {
    headerStyle: {
      backgroundColor: theme.dark ? theme.colors.surface : theme.colors.background,
    },
    headerTintColor: theme.colors.primary,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShadowVisible: false,
  };
  
  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen
      name="ProductList"
        component={ProductListScreen}
        options={() => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="leaf" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                Soap Store
              </Text>
            </View>
          ),
          headerRight: () => <MenuButton onPress={() => setModalVisible(true)} />,
        })}
        
      />
      <AppStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={() => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="pricetag" size={20} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('products.detailTitle')}
              </Text>
            </View>
          ),
          headerRight: () => <MenuButton onPress={() => setModalVisible(true)} />,
        })}
      />
      <AppStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="cart" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('cart.title')}
              </Text>
            </View>
          ),
          headerRight: () => <MenuButton onPress={() => setModalVisible(true)} />,
        })}
      />
      <AppStack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="mail" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('contact.title')}
              </Text>
            </View>
          ),
        }}
      />
      <AppStack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="receipt" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('menu.misPedidos')}
              </Text>
            </View>
          ),
        }}
      />
      <AppStack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="help-circle" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('ayuda.title')}
              </Text>
            </View>
          ),
        }}
      />
      <AppStack.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="heart" size={24} color={theme.colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.primary }}>
                {t('favoritos.title')}
              </Text>
            </View>
          ),
        }}
      />
    </AppStack.Navigator>
  );
}

function MainTabs({ setModalVisible }) {
  const { t } = useTranslation();
  const { isLoggedIn, user } = useAuth();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.dark ? theme.colors.surface : theme.colors.background,
          borderTopColor: theme.dark ? '#FFFFFF20' : '#FFFFFF20',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="InicioTab"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarAccessibilityLabel: t('tabs.inicio'),
        }}
      >
        {() => <HomeStack setModalVisible={setModalVisible} />}
      </Tab.Screen>

      <Tab.Screen
        name="OfertasTab"
        component={OffersScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'pricetag' : 'pricetag-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarAccessibilityLabel: t('tabs.ofertas'),
        }}
      />

      <Tab.Screen
        name="CarritoTab"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CartIcon onPress={null} size={size} focused={focused} />
          ),
          tabBarAccessibilityLabel: t('tabs.carrito'),
        }}
      />

      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarAccessibilityLabel: t('tabs.perfil'),
        }}
      />

      <Tab.Screen
        name="AjustesTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarAccessibilityLabel: t('tabs.ajustes'),
        }}
      />
    </Tab.Navigator>
  );
}

function LoadingScreen() {
  const { theme } = useTheme();
  return (
    <LoadingContainer>
      <Ionicons name="leaf" size={60} color={theme.colors.background} />
      <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
    </LoadingContainer>
  );
}

export default function AppNavigator({ initialUrl = null, navigationRef = null }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, user, loading, initialized } = useAuth();

  // Handle deep link navigation on initial load
  useEffect(() => {
    if (initialUrl) {
      console.log('Processing deep link:', initialUrl);
      // Parse the URL to determine which screen to navigate to
      if (initialUrl.includes('update-password')) {
        // This is a password reset link from email
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'ResetPassword' }],
        });
      } else if (initialUrl.includes('verify-email')) {
        // This is an email verification link
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'EmailVerification' }],
        });
      } else if (initialUrl === 'soapstore://') {
        // Generic app open, go to main tabs if authenticated, otherwise login
        if (isLoggedIn && user?.email_confirmed_at) {
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
        } else if (isLoggedIn) {
          // Logged in but email not verified
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'EmailVerification' }],
          });
        } else {
          // Not logged in
          navigationRef.current?.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }
    }
  }, [initialUrl]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
     <NavigationContext.Provider value={navigationRef}>
       <View style={{ flex: 1 }}>
         <View style={{ flex: 1 }}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="MainTabs">
                {() => <MainTabs setModalVisible={setModalVisible} />}
              </RootStack.Screen>
              <RootStack.Screen name="HelpSupportScreen" component={HelpSupportScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="HelpScreen" component={HelpScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="ContactScreen" component={ContactScreen} options={{ headerShown: false }} />
              <RootStack.Screen name="Login" component={LoginScreen} />
              <RootStack.Screen name="Register" component={RegisterScreen} />
              <RootStack.Screen name="EmailVerification" component={EmailVerificationScreen} />
              <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
              <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
              <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
              <RootStack.Screen name="EditProfile" component={EditProfileScreen} />
              <RootStack.Screen name="Addresses" component={AddressesScreen} />
              <RootStack.Screen name="EditAddress" component={EditAddressScreen} />
           </RootStack.Navigator>
         </View>

         <AuthMenuModal
           visible={modalVisible}
           onClose={() => setModalVisible(false)}
         />
         <Toast />
       </View>
     </NavigationContext.Provider>
  );
}

