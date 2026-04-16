import React from 'react';
import { FlatList, useWindowDimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import ProductCard from '../components/ProductCard';
import {
  Container,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
} from '../styles/FavoritesScreenStyles';

export default function FavoritesScreen() {
  const { t } = useTranslation();
  const { favorites, removeFavorite } = useFavorites();
  const { width } = useWindowDimensions();
  const numColumns = width < 480 ? 1 : width < 768 ? 2 : 3;
  const navigation = useNavigation();

  const handleRemove = (favorite) => {
    // La estructura viene como { id, userId, productId, product }
    const productId = favorite.productId;
    const productName = favorite.product?.name || 'producto';

    if (!productId) {
      console.error('[FavoritesScreen] Cannot remove: productId is missing', favorite);
      return;
    }

    Alert.alert(
      t('favoritos.remove'),
      `¿Eliminar "${productName}" de favoritos?`,
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { text: t('cart.confirm'), onPress: () => removeFavorite(productId), style: 'destructive' },
      ]
    );
  };

  if (favorites.length === 0) {
    return (
      <EmptyContainer>
        <Ionicons name="heart-outline" size={80} color={theme.colors.disabled} />
        <EmptyText>{t('favoritos.empty')}</EmptyText>
        <EmptySubtext>{t('favoritos.emptySubtitle')}</EmptySubtext>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.productId || item.id)}
        renderItem={({ item }) => {
          // item viene como { id, userId, productId, product }
          // ProductCard espera un objeto product con id, name, category, price, imageUrl
          const productData = item.product || {
            id: item.productId,
            name: item.name,
            category: item.category,
            price: item.price,
            imageUrl: item.imageUrl,
          };

          return (
            <ProductCard
              product={productData}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.productId })}
              onLongPress={() => handleRemove(item)}
            />
          );
        }}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </Container>
  );
}
