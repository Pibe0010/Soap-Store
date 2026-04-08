import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useProduct } from '../hooks/useProduct';
import { t } from '../constants/translations';
import { Container, Image, Content, Title, Category, Description, Price, ErrorText, RetryText, BackText, ButtonContainer } from '../styles/ProductDetailStyles';
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
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;

  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

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
        <ErrorText>{t.products.errorProduct}: {error.message}</ErrorText>
        <RetryText onPress={() => refetch()}>
          {t.products.retry}
        </RetryText>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <ErrorText>{t.products.notFound}</ErrorText>
        <BackText onPress={() => navigation.goBack()}>
          {t.products.goBack}
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
        <Category>{product.category}</Category>
        <Description>{product.description}</Description>
        <Price>{product.price?.toFixed(2) || '0.00'}€</Price>
        <ButtonContainer>
          <AddToCartButton product={product} size="medium" />
        </ButtonContainer>
      </Content>
      <BackText onPress={() => navigation.goBack()}>
        {t.products.backToProducts}
      </BackText>
    </Container>
  );
}
