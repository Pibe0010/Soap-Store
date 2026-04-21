import React, { useState, useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getActiveOffers } from '../services/entities/offersService';
import { useCart } from '../context/CartContext';
import { checkPurchaseLimit } from '../services/entities/offerPurchasesService';
import {
  Container,
  Card,
  ProductImage,
  CardContent,
  ProductName,
  PriceContainer,
  OriginalPrice,
  DiscountBadge,
  DiscountText,
  OfferPrice,
  LowStock,
  SoldOut,
  EmptyContainer,
  EmptyText,
  ListContainer,
  Row,
} from '../styles/OffersScreenStyles';

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
        columnWrapperStyle={Row}
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