import React from 'react';
import { View, Text } from 'react-native';
import { Container, ProductImage, Content, Title, Category, Price, ButtonContainer, Label } from '../styles/ProductCardStyles';
import AddToCartButton from './AddToCartButton';
import FavoriteButton from './FavoriteButton';
import { useTranslation } from 'react-i18next';

/**
 * Card component displaying a product with image, name, category, price,
 * favorite toggle, and add-to-cart action.
 * @param {Object} props
 * @param {Object} props.product - Product data object
 * @param {string} props.product.id - Unique product identifier
 * @param {string} props.product.name - Product name
 * @param {string} props.product.category - Product category
 * @param {number} props.product.price - Product price
 * @param {string} props.product.imageUrl - Product image URL
 * @param {Function} props.onPress - Callback fired when card is tapped
 * @param {Function} [props.onLongPress] - Callback fired when card is long pressed
 * @returns {JSX.Element}
 */
export default function ProductCard({ product, onPress, onLongPress }) {
  const { t } = useTranslation();
  
  const getTranslatedCategory = (category) => {
    const categories = t('products.categories', { returnObjects: true });
    return categories[category] || category;
  };
  
  return (
    <Container onPress={onPress} onLongPress={onLongPress}>
      <View style={{ position: 'relative' }}>
        <ProductImage
          source={{ uri: product.imageUrl }}
        />
        <View style={{ position: 'absolute', top: 8, right: 8 }}>
          <FavoriteButton product={product} size={24} />
        </View>
      </View>
      <Content>
        <Title>{product.name}</Title>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Label>{t('products.category')}: </Label>
          <Category>{getTranslatedCategory(product.category)}</Category>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Label>{t('products.price')}: </Label>
          <Price>{product.price?.toFixed(2) || '0.00'} {t('products.currency')}</Price>
        </View>
        <ButtonContainer>
          <AddToCartButton product={product} size="small" />
        </ButtonContainer>
      </Content>
    </Container>
  );
}
