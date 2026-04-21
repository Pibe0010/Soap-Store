import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../services/entities/productsService';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../services/entities/offersService';
import {
  AdminContainer,
  Header,
  HeaderTitle,
  Section,
  SectionTitle,
  FormContainer,
  InputLabel,
  Input,
  InputRow,
  SmallInput,
  SubmitButton,
  SubmitButtonText,
  OfferCard,
  OfferInfo,
  OfferTitle,
  OfferDetails,
  DiscountBadge,
  DiscountText,
  ActionButtons,
  IconButton,
  EmptyText,
} from './AdminOffersStyles';

/**
 * Admin screen for managing offers
 * Only accessible to admin users
 */
export default function AdminOffersScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user, isLoggedIn } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [selectedProduct, setSelectedProduct] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('0');
  const [maxPerUser, setMaxPerUser] = useState('4');
  const [maxTotal, setMaxTotal] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, offersData] = await Promise.all([
        getProducts(),
        getAllOffers(),
      ]);
      setProducts(productsData || []);
      setOffers(offersData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (productId, price) => {
    setSelectedProduct(productId);
    setOriginalPrice(price.toString());
  };

  const handleCreateOffer = async () => {
    if (!selectedProduct || !originalPrice || !maxTotal || !endDate) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      const startDate = new Date().toISOString();
      const endDateISO = new Date(endDate).toISOString();
      
      await createOffer({
        product_id: selectedProduct,
        admin_id: user.id,
        original_price: parseFloat(originalPrice),
        discount_percentage: parseInt(discountPercentage) || 0,
        max_quantity_per_user: parseInt(maxPerUser) || 4,
        max_total_quantity: parseInt(maxTotal),
        start_date: startDate,
        end_date: endDateISO,
      });

      Alert.alert('Éxito', 'Oferta creada correctamente');
      resetForm();
      loadData();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la oferta');
      console.error(error);
    }
  };

  const handleDeleteOffer = async (offerId) => {
    Alert.alert(
      'Confirmar',
      '¿Eliminar esta oferta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteOffer(offerId);
              loadData();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar');
            }
          },
        },
      ]
    );
  };

  const handleToggleActive = async (offer) => {
    try {
      await updateOffer(offer.id, { is_active: !offer.is_active });
      loadData();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar');
    }
  };

  const resetForm = () => {
    setSelectedProduct('');
    setOriginalPrice('');
    setDiscountPercentage('0');
    setMaxPerUser('4');
    setMaxTotal('');
    setEndDate('');
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <AdminContainer>
          <EmptyText>{t('perfil.loginPrompt')}</EmptyText>
        </AdminContainer>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top']}>
      <AdminContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <HeaderTitle>Gestión de Ofertas</HeaderTitle>
          </Header>

          <Section>
            <SectionTitle>Crear Nueva Oferta</SectionTitle>
            <FormContainer>
              <InputLabel>Seleccionar Producto</InputLabel>
              {products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handleSelectProduct(product.id, product.price)}
                  style={{
                    padding: 12,
                    backgroundColor: selectedProduct === product.id 
                      ? theme.colors.primary + '20' 
                      : theme.colors.background,
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ color: theme.colors.text }}>
                    {product.name} - ${product.price}
                  </Text>
                </TouchableOpacity>
              ))}

              <InputRow>
                <SmallInput>
                  <InputLabel>Precio Original ($)</InputLabel>
                  <Input
                    value={originalPrice}
                    onChangeText={setOriginalPrice}
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                </SmallInput>
                <SmallInput>
                  <InputLabel>Descuento (%)</InputLabel>
                  <Input
                    value={discountPercentage}
                    onChangeText={setDiscountPercentage}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                </SmallInput>
              </InputRow>

              <InputRow>
                <SmallInput>
                  <InputLabel>Máx por Usuario</InputLabel>
                  <Input
                    value={maxPerUser}
                    onChangeText={setMaxPerUser}
                    keyboardType="numeric"
                    placeholder="4"
                  />
                </SmallInput>
                <SmallInput>
                  <InputLabel>Cantidad Total</InputLabel>
                  <Input
                    value={maxTotal}
                    onChangeText={setMaxTotal}
                    keyboardType="numeric"
                    placeholder="100"
                  />
                </SmallInput>
              </InputRow>

              <InputLabel>Fecha Fin (YYYY-MM-DD)</InputLabel>
              <Input
                value={endDate}
                onChangeText={setEndDate}
                placeholder="2024-12-31"
              />

              <SubmitButton onPress={handleCreateOffer}>
                <SubmitButtonText>Crear Oferta</SubmitButtonText>
              </SubmitButton>
            </FormContainer>
          </Section>

          <Section>
            <SectionTitle>Ofertas Existentes</SectionTitle>
            {offers.length === 0 ? (
              <EmptyText>No hay ofertas creadas</EmptyText>
            ) : (
              offers.map((offer) => (
                <OfferCard key={offer.id}>
                  <OfferInfo>
                    <OfferTitle>
                      {offer.products?.name || 'Producto'}
                      {offer.discount_percentage > 0 && (
                        <DiscountBadge>
                          <DiscountText>-{offer.discount_percentage}%</DiscountText>
                        </DiscountBadge>
                      )}
                    </OfferTitle>
                    <OfferDetails>
                      ${offer.original_price} → ${offer.offer_price} | 
                      Vendidas: {offer.sold_quantity}/{offer.max_total_quantity}
                    </OfferDetails>
                    <OfferDetails>
                      Fin: {new Date(offer.end_date).toLocaleDateString()} | 
                      {offer.is_active ? 'Activa' : 'Inactiva'}
                    </OfferDetails>
                  </OfferInfo>
                  <ActionButtons>
                    <IconButton onPress={() => handleToggleActive(offer)}>
                      <Ionicons
                        name={offer.is_active ? 'eye-off' : 'eye'}
                        size={20}
                        color={theme.colors.text}
                      />
                    </IconButton>
                    <IconButton onPress={() => handleDeleteOffer(offer.id)}>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color={theme.colors.error}
                      />
                    </IconButton>
                  </ActionButtons>
                </OfferCard>
              ))
            )}
          </Section>
        </ScrollView>
      </AdminContainer>
    </SafeAreaView>
  );
}