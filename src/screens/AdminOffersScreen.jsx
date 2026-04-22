import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getProducts } from '../services/entities/productsService';
import { getAllOffers, createOffer, updateOffer, deleteOffer } from '../services/entities/offersService';
import OfferCard from '../components/AdminOfferCard';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  Section,
  SectionTitle,
  Card,
  DropdownTrigger,
  DropdownText,
  DropdownMenu,
  DropdownItem,
  DropdownItemText,
  DropdownItemPrice,
  InputLabel,
  InputRow,
  InputWrapper,
  Input,
  DateInput,
  DateText,
  SubmitButton,
  SubmitButtonText,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  Backdrop,
} from '../styles/AdminOffersStyles';

export default function AdminOffersScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user, isLoggedIn } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Form state
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      const productsResult = await getProducts();
      const offersResult = await getAllOffers();
      const productsArray = productsResult?.data || [];
      const offersArray = Array.isArray(offersResult) ? offersResult : offersResult?.data || [];
      setProducts(productsArray);
      setOffers(offersArray);
    } catch (error) {
      console.error('Error loading data:', error);
      setProducts([]);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setOriginalPrice(product.price.toString());
    setIsDropdownOpen(false);
  };

  const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  };

  const handleCreateOffer = async () => {
    if (!selectedProduct || !originalPrice || !maxTotal || !endDate) {
      Alert.alert(t('common.error'), t('ofertas.errorCamposRequeridos'));
      return;
    }
    if (!isValidDate(endDate)) {
      Alert.alert(t('common.error'), t('ofertas.fechaInvalida'));
      return;
    }
    try {
      await createOffer({
        product_id: selectedProduct.id,
        admin_id: user.id,
        original_price: parseFloat(originalPrice),
        discount_percentage: parseInt(discountPercentage) || 0,
        max_quantity_per_user: parseInt(maxPerUser) || 4,
        max_total_quantity: parseInt(maxTotal),
        start_date: new Date().toISOString(),
        end_date: new Date(endDate).toISOString(),
      });
      Alert.alert('✓', t('ofertas.ofertaCreada'));
      resetForm();
      loadData();
    } catch (error) {
      Alert.alert(t('common.error'), t('ofertas.errorCrearOferta'));
    }
  };

  const handleDeleteOffer = (offerId) => {
    Alert.alert(t('common.confirm'), t('ofertas.confirmarEliminar'), [
      { text: t('cart.cancel'), style: 'cancel' },
      { text: t('address.delete'), style: 'destructive', onPress: async () => {
        try {
          await deleteOffer(offerId);
          loadData();
        } catch (error) {
          Alert.alert(t('common.error'), t('ofertas.errorEliminar'));
        }
      }},
    ]);
  };

  const handleToggleActive = async (offer) => {
    try {
      await updateOffer(offer.id, { is_active: !offer.is_active });
      loadData();
    } catch (error) {
      Alert.alert(t('common.error'), t('ofertas.errorActualizar'));
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setOriginalPrice('');
    setDiscountPercentage('0');
    setMaxPerUser('4');
    setMaxTotal('');
    setEndDate('');
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Container><EmptyText>{t('perfil.loginPrompt')}</EmptyText></Container>
      </SafeAreaView>
    );
  }

  const selectedProductName = selectedProduct ? `${selectedProduct.name} - ${t('ofertas.currency')}${selectedProduct.price}` : t('ofertas.seleccionarProducto');

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surface }}>
      <Container>
        <Header>
          <HeaderTitle>{t('ofertas.gestionOfertas')}</HeaderTitle>
          <HeaderSubtitle>{t('ofertas.gestionOfertasSubtitle')}</HeaderSubtitle>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Section>
            <SectionTitle>{t('ofertas.crearNuevaOferta')}</SectionTitle>
            <Card>
              <InputLabel>{t('ofertas.seleccionarProducto')}</InputLabel>
              <DropdownTrigger onPress={() => setIsDropdownOpen(!isDropdownOpen)} selected={!!selectedProduct}>
                <DropdownText selected={!!selectedProduct}>{selectedProductName}</DropdownText>
                <Ionicons name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.textSecondary} />
              </DropdownTrigger>

              {isDropdownOpen && (
                <>
                  <Backdrop onPress={() => setIsDropdownOpen(false)} />
                  <DropdownMenu>
                    {products.length === 0 ? (
                      <DropdownItem><DropdownItemText>{t('ofertas.noProductos')}</DropdownItemText></DropdownItem>
                    ) : (
                      products.map((product) => (
                        <DropdownItem key={product.id} onPress={() => handleSelectProduct(product)} $selected={selectedProduct?.id === product.id}>
                          <DropdownItemText>{product.name}</DropdownItemText>
                          <DropdownItemPrice>{t('ofertas.currency')}{product.price}</DropdownItemPrice>
                        </DropdownItem>
                      ))
                    )}
                  </DropdownMenu>
                </>
              )}

              <InputRow>
                <InputWrapper>
                  <InputLabel>{t('ofertas.precioOriginal')} ({t('ofertas.currency')})</InputLabel>
                  <Input value={originalPrice} onChangeText={setOriginalPrice} keyboardType="numeric" placeholder="0.00" placeholderTextColor={theme.colors.textSecondary} />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('ofertas.descuento')} (%)</InputLabel>
                  <Input value={discountPercentage} onChangeText={setDiscountPercentage} keyboardType="numeric" placeholder="0" placeholderTextColor={theme.colors.textSecondary} />
                </InputWrapper>
              </InputRow>

              <InputRow>
                <InputWrapper>
                  <InputLabel>{t('ofertas.maxPorUsuario')}</InputLabel>
                  <Input value={maxPerUser} onChangeText={setMaxPerUser} keyboardType="numeric" placeholder="4" placeholderTextColor={theme.colors.textSecondary} />
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>{t('ofertas.cantidadTotal')}</InputLabel>
                  <Input value={maxTotal} onChangeText={setMaxTotal} keyboardType="numeric" placeholder="100" placeholderTextColor={theme.colors.textSecondary} />
                </InputWrapper>
              </InputRow>

              <InputLabel>{t('ofertas.fechaFin')}</InputLabel>
              <Input
                value={endDate}
                onChangeText={setEndDate}
                placeholder={t('ofertas.fechaFinPlaceholder')}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numbers-and-punctuation"
              />

              <SubmitButton onPress={handleCreateOffer}>
                <SubmitButtonText>{t('ofertas.crearOferta')}</SubmitButtonText>
              </SubmitButton>
            </Card>
          </Section>

          <Section>
            <SectionTitle>{t('ofertas.ofertasExistentes')}</SectionTitle>
            {offers.length === 0 ? (
              <EmptyContainer>
                <EmptyIcon><Ionicons name="pricetag-outline" size={40} color={theme.colors.primary} /></EmptyIcon>
                <EmptyText>{t('ofertas.noHayOfertas')}</EmptyText>
              </EmptyContainer>
            ) : (
              offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} onToggleActive={handleToggleActive} onDelete={handleDeleteOffer} />
              ))
            )}
          </Section>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}