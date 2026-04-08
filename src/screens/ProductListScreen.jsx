import React, { useState } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { useNavigation } from '@react-navigation/native';
import { t } from '../constants/translations';
import { Container, ListContentContainer, ErrorText, RetryText, EmptyText } from '../styles/ProductListStyles';
import { theme } from '../styles/theme';

/**
 * Main screen displaying the product catalog with category filtering and responsive grid layout.
 * Adapts grid columns based on screen width: 1 col (<480px), 2 cols (480-768px), 3 cols (>768px).
 * All text is in Spanish via centralized translations.
 *
 * @returns {JSX.Element}
 */
export default function ProductListScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { width } = useWindowDimensions();
  const numColumns = width < 480 ? 1 : width < 768 ? 2 : 3;
  const filters = selectedCategory ? { category: selectedCategory } : {};
  const { data, isLoading, isError, error, refetch } = useProducts(filters);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const navigation = useNavigation();

  if (isLoading || isLoadingCategories) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorText>{t.products.error}: {error.message}</ErrorText>
        <RetryText onPress={() => refetch()}>
          {t.products.retry}
        </RetryText>
      </Container>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Container>
        <EmptyText>{t.products.empty}</EmptyText>
      </Container>
    );
  }

  return (
    <Container>
      <CategoryFilter
        categories={categories || []}
        selectedCategory={selectedCategory ?? t.products.allCategories}
        onCategoryChange={setSelectedCategory}
      />

      <FlatList
        data={data.data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 16 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refetch()} />
        }
      />
    </Container>
  );
}
