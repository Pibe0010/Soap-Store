import React from 'react';
import { FlatList, Alert, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import {
  Container,
  Header,
  Title,
  EmptyText,
  ItemContainer,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemPrice,
  ItemQuantity,
  QuantityControls,
  QuantityButton,
  QuantityText,
  RemoveButton,
  Footer,
  TotalText,
  ClearButton,
  ClearButtonText,
  CheckoutButton,
  CheckoutButtonText,
} from '../styles/CartScreenStyles';

/**
 * Screen component displaying the shopping cart with item management.
 * Wrapped in SafeAreaView to prevent header overlap with device status bar.
 * Shows empty state with icon when no items; otherwise renders item list with
 * quantity controls, remove buttons, total, and checkout action.
 * All text is in Rioplatense Spanish via centralized translations.
 *
 * @returns {JSX.Element}
 */
export default function CartScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const handleRemoveItem = (itemId) => {
    Alert.alert(
      t('cart.remove'),
      t('cart.removeConfirm'),
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { text: t('cart.remove'), onPress: () => removeItem(user.id, itemId), style: 'destructive' },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      t('cart.clear'),
      t('cart.clearConfirm'),
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { text: t('cart.clear'), onPress: () => clearCart(user.id), style: 'destructive' },
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(t('cart.checkout'), t('cart.checkout'));
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="cart-outline" size={80} color={theme.colors.disabled} />
          <EmptyText>{t('cart.empty')}</EmptyText>
          <EmptyText>{t('cart.emptySubtitle')}</EmptyText>
          {/* Hidden title for accessibility and testing */}
          <Text style={{ position: 'absolute', left: -9999 }}>{t('cart.title')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <ItemContainer>
      <ItemImage source={{ uri: item.imageUrl }} />
      <ItemInfo>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price?.toFixed(2) || '0.00'}€</ItemPrice>
        <QuantityControls>
<QuantityButton onPress={() => updateQuantity(user.id, item.cartItemId, item.quantity - 1)}>
              </QuantityButton>
              <QuantityText>{item.quantity}</QuantityText>
              <QuantityButton onPress={() => updateQuantity(user.id, item.cartItemId, item.quantity + 1)}>
            <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
          </QuantityButton>
        </QuantityControls>
      </ItemInfo>
      <RemoveButton onPress={() => handleRemoveItem(item.id)}>
        <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
      </RemoveButton>
    </ItemContainer>
  );

   return (
       <SafeAreaView style={{ flex: 1, backgroundColor: theme.dark ? theme.colors.background : theme.colors.background, }} edges={['top']}>
         <Container style={{ flex: 1 }}>
           <Header>
             <Title>{t('cart.title')}</Title>
             <ClearButton onPress={handleClearCart}>
               <Ionicons name="trash-outline" size={20} color={theme.colors.error} style={{ marginRight: 6 }} />
               <ClearButtonText>{t('cart.clear')}</ClearButtonText>
             </ClearButton>
           </Header>
           <FlatList
             data={items}
             renderItem={renderItem}
             keyExtractor={(item) => item.id}
             contentContainerStyle={{ paddingBottom: 16 }}
             style={{ flex: 1 }}
           />
           <Footer>
             <TotalText>{t('cart.total')}: {totalPrice.toFixed(2)}€</TotalText>
             <CheckoutButton onPress={handleCheckout}>
               <Ionicons name="card-outline" size={20} color={theme.colors.white} style={{ marginRight: 8 }} />
               <CheckoutButtonText>{t('cart.checkout')}</CheckoutButtonText>
             </CheckoutButton>
           </Footer>
         </Container>
       </SafeAreaView>
    );
}
