import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getActiveOffers } from '../services/entities/offersService';
import { addToCart } from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { checkPurchaseLimit } from '../services/entities/offerPurchasesService';

const OFFERS_TAB_TEXT = 'Ofertas';

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
      // Check purchase limit
      const { canPurchase, remaining } = await checkPurchaseLimit(user.id, offer.id);
      
      if (!canPurchase) {
        Alert.alert('Límite alcanzado', `Ya compraste el máximo de ${4} ofertas de este producto.`);
        return;
      }

      // Add to cart with offer price
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
      <TouchableOpacity
        style={[styles.card, { backgroundColor: theme.colors.card }]}
        onPress={() => handleAddToCart(offer)}
        disabled={isSoldOut}
      >
        {offer.products?.image_url && (
          <Image
            source={{ uri: offer.products.image_url }}
            style={styles.image}
          />
        )}
        
        <View style={styles.cardContent}>
          <Text style={[styles.productName, { color: theme.colors.text }]}}>
            {offer.products?.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>
              ${offer.original_price}
            </Text>
            {offer.discount_percentage > 0 && (
              <View style={[styles.discountBadge, { backgroundColor: theme.colors.success + '20' }]}>
                <Text style={[styles.discountText, { color: theme.colors.success }]}>
                  -{offer.discount_percentage}%
                </Text>
              </View>
            )}
          </View>
          
          <Text style={[styles.offerPrice, { color: theme.colors.primary }]}>
            ${offer.offer_price}
          </Text>
          
          {remaining <= 10 && remaining > 0 && (
            <Text style={[styles.lowStock, { color: theme.colors.warning }]}>
              ¡Solo quedan {remaining}!
            </Text>
          )}
          
          {isSoldOut && (
            <Text style={[styles.soldOut, { color: theme.colors.error }]}>
              Agotado
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={offers}
        renderItem={renderOfferCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pricetag-outline" size={80} color={theme.colors.disabled} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              {t('ofertas.empty')}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  offerPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  lowStock: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  soldOut: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});