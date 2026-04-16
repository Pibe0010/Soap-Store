import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProduct } from '../hooks/useProduct';
import { useTranslation } from 'react-i18next';
import { Container, Image, Content, Title, Category, Description, Price, ErrorText, RetryText, BackText, ButtonContainer, Label } from '../styles/ProductDetailStyles';
import { theme } from '../styles/theme';
import AddToCartButton from '../components/AddToCartButton';

/**
 * Screen displaying detailed information for a single product.
 * Receives productId via navigation params and fetches product data.
 * All text is in Spanish via centralized translations.
 *
 * @returns {JSX.Element}
 */
export default function ProductDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;

  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  const getTranslatedCategory = (category) => {
    const categories = t('products.categories', { returnObjects: true });
    return categories[category] || category;
  };

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.accent} />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorText>{t('products.errorProduct')}: {error.message}</ErrorText>
        <RetryText onPress={() => refetch()}>
          {t('products.retry')}
        </RetryText>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <ErrorText>{t('products.notFound')}</ErrorText>
        <BackText onPress={() => navigation.goBack()}>
          {t('products.goBack')}
        </BackText>
      </Container>
    );
  }

  return (
    <Container>
      <Image
        source={{ uri: product.imageUrl }}
        onError={() => {
          // Handle image loading error
        }}
      />
      <Content>
        <Title>{product.name}</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Label>{t('products.category')}: </Label>
          <Category>{getTranslatedCategory(product.category)}</Category>
        </View>
        <View style={{ marginTop: 8 }}>
          <Label>{t('products.description')}: </Label>
          <Description>{product.description}</Description>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <Label>{t('products.price')}: </Label>
          <Price>{product.price?.toFixed(2) || '0.00'} {t('products.currency')}</Price>
        </View>
        <ButtonContainer>
          <AddToCartButton product={product} size="medium" />
        </ButtonContainer>
      </Content>
      <BackText onPress={() => navigation.goBack()}>
        {t('products.backToProducts')}
      </BackText>
    </Container>
  );
}
