import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getActiveOffers } from '../services/entities/offersService';
import { useCart } from '../context/CartContext';
import { checkPurchaseLimit } from '../services/entities/offerPurchasesService';

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const ListContainer = styled.View`
  padding: ${(props) => props.theme.spacing.sm}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Card = styled.TouchableOpacity`
  width: 48%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.colors.card};
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 120px;
  resize-mode: cover;
`;

const CardContent = styled.View`
  padding: ${(props) => props.theme.spacing.md}px;
`;

const ProductName = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 4px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing.sm}px;
`;

const OriginalPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  text-decoration-line: line-through;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const DiscountBadge = styled.View`
  padding: 2px 6px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.success}20;
`;

const DiscountText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.success};
`;

const OfferPrice = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.xl}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-top: 4px;
`;

const LowStock = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.sm}px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.warning};
  margin-top: 4px;
`;

const SoldOut = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.md}px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.error};
  margin-top: 4px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 80px;
`;

const EmptyText = styled.Text`
  font-size: ${(props) => props.theme.typography.fontSizes.lg}px;
  text-align: center;
  margin-top: ${(props) => props.theme.spacing.lg}px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

/**
 * Offers screen - displays products on sale
 * Shows discounted prices, original prices, and limit info
 */
export default function OffersScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { addItem: addToCart } = useCart();
  
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const data = await getActiveOffers();
      setOffers(data || []);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (offer) => {
    if (!user) {
      Alert.alert(t('perfil.loginPrompt'));
      return;
    }

    try {
      const { canPurchase, remaining } = await checkPurchaseLimit(user.id, offer.id);
      
      if (!canPurchase) {
        Alert.alert('Límite alcanzado', `Ya compraste el máximo de ofertas de este producto.`);
        return;
      }

      addToCart({
        id: offer.product_id,
        name: offer.products?.name,
        price: offer.offer_price,
        image_url: offer.products?.image_url,
        quantity: 1,
        is_offer: true,
        offer_id: offer.id,
        original_price: offer.original_price,
        discount_percentage: offer.discount_percentage,
      }, 1);

      Alert.alert('Añadido', 'Producto añadido al carrito con oferta');
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'No se pudo añadir al carrito');
    }
  };

  const renderOfferCard = ({ item: offer }) => {
    const remaining = offer.max_total_quantity - offer.sold_quantity;
    const isSoldOut = remaining <= 0;
    
    return (
      <Card 
        onPress={() => handleAddToCart(offer)}
        disabled={isSoldOut}
      >
        {offer.products?.image_url && (
          <ProductImage source={{ uri: offer.products.image_url }} />
        )}
        
        <CardContent>
          <ProductName>{offer.products?.name}</ProductName>
          
          <PriceContainer>
            <OriginalPrice>${offer.original_price}</OriginalPrice>
            {offer.discount_percentage > 0 && (
              <DiscountBadge>
                <DiscountText>-{offer.discount_percentage}%</DiscountText>
              </DiscountBadge>
            )}
          </PriceContainer>
          
          <OfferPrice>${offer.offer_price}</OfferPrice>
          
          {remaining <= 10 && remaining > 0 && (
            <LowStock>Solo quedan {remaining}!</LowStock>
          )}
          
          {isSoldOut && (
            <SoldOut>Agotado</SoldOut>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Container>
      <FlatList
        data={offers}
        renderItem={renderOfferCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={ListContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyContainer>
            <Ionicons name="pricetag-outline" size={80} color={theme.colors.disabled} />
            <EmptyText>{t('ofertas.empty')}</EmptyText>
          </EmptyContainer>
        }
      />
    </Container>
  );
}