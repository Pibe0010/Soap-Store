import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getActiveOffers } from '../services/entities/offersService';
import { useCart } from '../context/CartContext';
import { checkPurchaseLimit } from '../services/entities/offerPurchasesService';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  ListContainer,
  Card,
  ImageContainer,
  ProductImage,
  DiscountBadge,
  DiscountBadgeText,
  SoldOutOverlay,
  SoldOutText,
  CardInner,
  CardContent,
  CardTop,
  ProductName,
  PriceContainer,
  OriginalPrice,
  OfferPrice,
  TimerContainer,
  TimerText,
  StockContainer,
  StockText,
  StockValue,
  ProgressBar,
  ProgressFill,
  CardBottom,
  AddButton,
  AddButtonText,
  AddButtonDisabled,
  AddButtonDisabledText,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
} from '../styles/OffersScreenStyles';

/**
 * Calculate time remaining until date
 */
const getTimeRemaining = (endDate) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;
  
  if (diff <= 0) return null;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

/**
 * Offers screen - displays products on sale
 * Shows discounted prices, countdown timer, and limit info
 */
export default function OffersScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addItem: addToCart } = useCart();
  
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    loadOffers();
  }, []);

  // Update countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      offers.forEach(offer => {
        newTimes[offer.id] = getTimeRemaining(offer.end_date);
      });
      setTimeRemaining(newTimes);
    }, 60000);
    
    return () => clearInterval(interval);
  }, [offers]);

  const loadOffers = async () => {
    try {
      const data = await getActiveOffers();
      setOffers(data || []);
      
      const initialTimes = {};
      (data || []).forEach(offer => {
        initialTimes[offer.id] = getTimeRemaining(offer.end_date);
      });
      setTimeRemaining(initialTimes);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (offer) => {
    if (!user) {
      showToast(t('toast.loginToAddCart'), t('auth.login'), () => {});
      return;
    }

    try {
      const { canPurchase } = await checkPurchaseLimit(user.id, offer.id);
      
      if (!canPurchase) {
        showToast(t('ofertas.limiteAlcanzado'));
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

      showToast(t('ofertas.añadidoCarrito'));
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast(t('ofertas.errorCarrito'));
    }
  };

  const renderOfferCard = ({ item: offer }) => {
    const remaining = offer.max_total_quantity - offer.sold_quantity;
    const soldPercent = Math.round((offer.sold_quantity / offer.max_total_quantity) * 100);
    const isSoldOut = remaining <= 0;
    const timeLeft = timeRemaining[offer.id];
    const isUrgent = remaining <= 5;
    
    return (
      <Card>
        <CardInner>
          <ImageContainer>
            {offer.products?.image_url ? (
              <ProductImage source={{ uri: offer.products.image_url }} />
            ) : (
              <ProductImage source={require('../../assets/icon.png')} />
            )}
            
            {offer.discount_percentage > 0 && (
              <DiscountBadge>
                <DiscountBadgeText>-{offer.discount_percentage}%</DiscountBadgeText>
              </DiscountBadge>
            )}
            
            {isSoldOut && (
              <SoldOutOverlay>
                <SoldOutText>AGOTADO</SoldOutText>
              </SoldOutOverlay>
            )}
          </ImageContainer>
          
          <CardContent>
            <CardTop>
              <ProductName numberOfLines={2}>{offer.products?.name}</ProductName>
              
              <PriceContainer>
                <OriginalPrice>{t('ofertas.currency')}{offer.original_price}</OriginalPrice>
                <OfferPrice>{t('ofertas.currency')}{offer.offer_price}</OfferPrice>
              </PriceContainer>
              
              {timeLeft && (
                <TimerContainer>
                  <Ionicons name="time-outline" size={14} color={theme.colors.warning} />
                  <TimerText>{timeLeft} Tiempo limite</TimerText>
                </TimerContainer>
              )}
              
              <StockContainer>
                <Ionicons 
                  name="cube" 
                  size={14} 
                  color={theme.colors.textSecondary} 
                />
                <StockText>{remaining} {t('ofertas.disponibles')}</StockText>
              </StockContainer>
              
              <ProgressBar>
                <ProgressFill percent={soldPercent} />
              </ProgressBar>
            </CardTop>
            
            <CardBottom>
              {isSoldOut ? (
                <AddButtonDisabled>
                  <AddButtonDisabledText>{t('ofertas.agotado')}</AddButtonDisabledText>
                </AddButtonDisabled>
              ) : (
                <AddButton onPress={() => handleAddToCart(offer)}>
                  <Ionicons name="cart" size={18} color="#fff" />
                  <AddButtonText>{t('addToCart')}</AddButtonText>
                </AddButton>
              )}
            </CardBottom>
          </CardContent>
        </CardInner>
      </Card>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Container>
        <Header>
          <HeaderTitle>{t('tabs.ofertas')}</HeaderTitle>
          <HeaderSubtitle>{t('ofertas.headerSubtitle')}</HeaderSubtitle>
        </Header>

        <FlatList
          data={offers}
          renderItem={renderOfferCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={ListContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyContainer>
              <EmptyIcon>
                <Ionicons name="pricetag-outline" size={50} color={theme.colors.primary} />
              </EmptyIcon>
              <EmptyText>{t('ofertas.empty')}</EmptyText>
            </EmptyContainer>
          }
        />
      </Container>
    </SafeAreaView>
  );
}