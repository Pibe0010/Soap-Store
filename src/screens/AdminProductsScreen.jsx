import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/entities/productsService';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  Section,
  SectionTitle,
  Card,
  InputLabel,
  InputRow,
  InputWrapper,
  Input,
  TextArea,
  SubmitButton,
  SubmitButtonText,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDetails,
  BadgesRow,
  StockBadge,
  StockText,
  ActiveBadge,
  ActiveText,
  ActionButtons,
  ActionButton,
  EmptyContainer,
  EmptyIcon,
  EmptyText,
  CategorySelect,
  CategoryChip,
  CategoryChipText,
  ToggleRow,
  ToggleLabel,
  Toggle,
} from '../styles/AdminProductsStyles';

const AVAILABLE_CATEGORIES = ['Jabones Premium', 'Jabones Artesanales'];

export default function AdminProductsScreen() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { user, isLoggedIn } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Jabones Premium');
  const [stock, setStock] = useState('0');
  const [imageUrl, setImageUrl] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await getProducts({ showInactive: true });
      setProducts(result?.data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !price || !category) {
      Alert.alert(t('common.error'), t('ofertas.errorCamposRequeridos'));
      return;
    }

    try {
      const productData = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        stock: parseInt(stock) || 0,
        imageUrl: imageUrl.trim(),
        isActive,
      };

      if (isEditing && editingId) {
        await updateProduct(editingId, productData);
        Alert.alert('✓', 'Producto actualizado correctamente');
      } else {
        await createProduct(productData);
        Alert.alert('✓', 'Producto creado correctamente');
      }

      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert(t('common.error'), 'No se pudo guardar el producto');
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setEditingId(product.id);
    setName(product.name || '');
    setDescription(product.description || '');
    setPrice(product.price?.toString() || '');
    setCategory(product.category || 'Jabones Premium');
    setStock(product.stock?.toString() || '0');
    setImageUrl(product.imageUrl || '');
    setIsActive(product.isActive ?? true);
  };

  const handleDelete = (productId) => {
    Alert.alert(
      t('common.confirm'),
      '¿Eliminar este producto? Esta acci��n no se puede deshacer.',
      [
        { text: t('cart.cancel'), style: 'cancel' },
        { 
          text: t('address.delete'), 
          style: 'destructive', 
          onPress: async () => {
            try {
              await deleteProduct(productId);
              loadProducts();
            } catch (error) {
              Alert.alert(t('common.error'), 'No se pudo eliminar el producto');
            }
          }
        },
      ]
    );
  };

  const handleToggleActive = async (product) => {
    try {
      await updateProduct(product.id, { isActive: !product.isActive });
      loadProducts();
    } catch (error) {
      Alert.alert(t('common.error'), 'No se pudo actualizar el producto');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Jabones Premium');
    setStock('0');
    setImageUrl('');
    setIsActive(true);
    setIsEditing(false);
    setEditingId(null);
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.surface }}>
        <Container><EmptyText>{t('perfil.loginPrompt')}</EmptyText></Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Container>
        <Header>
          <HeaderTitle>Gestión de Productos</HeaderTitle>
          <HeaderSubtitle>Crea y gestiona los productos de tu tienda</HeaderSubtitle>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Section>
            <SectionTitle>{isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}</SectionTitle>
            <Card>
              <InputLabel>Nombre del producto *</InputLabel>
              <Input 
                value={name} 
                onChangeText={setName} 
                placeholder="Ej: Jabón de Lavanda"
                placeholderTextColor={theme.colors.textSecondary}
              />

              <InputLabel>Descripción</InputLabel>
              <TextArea 
                value={description} 
                onChangeText={setDescription}
                placeholder="Describe las propiedades del producto..."
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={3}
              />

              <InputLabel>Precio (€) *</InputLabel>
              <Input 
                value={price} 
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor={theme.colors.textSecondary}
              />

              <InputLabel>Categoría *</InputLabel>
              <CategorySelect>
                {AVAILABLE_CATEGORIES.map((cat) => (
                  <CategoryChip 
                    key={cat} 
                    $selected={category === cat}
                    onPress={() => setCategory(cat)}
                  >
                    <CategoryChipText $selected={category === cat}>
                      {t(`products.categories.${cat}`) || cat}
                    </CategoryChipText>
                  </CategoryChip>
                ))}
              </CategorySelect>

              <InputLabel>Stock (unidades)</InputLabel>
              <Input 
                value={stock} 
                onChangeText={setStock}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={theme.colors.textSecondary}
              />

              <InputLabel>URL de imagen</InputLabel>
              <Input 
                value={imageUrl} 
                onChangeText={setImageUrl}
                placeholder="https://ejemplo.com/imagen.jpg"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="url"
              />

              <ToggleRow>
                <ToggleLabel>Producto activo (visible en app)</ToggleLabel>
                <Toggle 
                  value={isActive} 
                  onValueChange={setIsActive}
                  trackColor={{ true: theme.colors.primary }}
                />
              </ToggleRow>

              <SubmitButton onPress={handleSubmit}>
                <SubmitButtonText>
                  {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
                </SubmitButtonText>
              </SubmitButton>

              {isEditing && (
                <SubmitButton 
                  onPress={resetForm} 
                  style={{ backgroundColor: theme.colors.error, marginTop: 8 }}
                >
                  <SubmitButtonText>Cancelar edición</SubmitButtonText>
                </SubmitButton>
              )}
            </Card>
          </Section>

          <Section>
            <SectionTitle>Productos Existentes ({products.length})</SectionTitle>
            {products.length === 0 ? (
              <EmptyContainer>
                <EmptyIcon>
                  <Ionicons name="cube-outline" size={40} color={theme.colors.primary} />
                </EmptyIcon>
                <EmptyText>No hay productos registrados</EmptyText>
              </EmptyContainer>
            ) : (
              products.map((product) => {
                const isOutOfStock = !product.stock || product.stock <= 0;
                return (
                  <ProductCard key={product.id}>
                    {product.imageUrl ? (
                      <ProductImage source={{ uri: product.imageUrl }} />
                    ) : (
                      <View style={{ 
                        width: 70, 
                        height: 70, 
                        borderRadius: 8, 
                        backgroundColor: theme.colors.background,
                        marginRight: 12,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Ionicons name="image-outline" size={24} color={theme.colors.disabled} />
                      </View>
                    )}
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductDetails>
                        {t('products.category')}: {t(`products.categories.${product.category}`) || product.category}
                      </ProductDetails>
                      <ProductDetails>
                        {t('products.price')}: {product.price?.toFixed(2) || '0.00'}€
                      </ProductDetails>
                      <BadgesRow>
                        <StockBadge $outOfStock={isOutOfStock}>
                          <StockText $outOfStock={isOutOfStock}>
                            Stock: {product.stock || 0}
                          </StockText>
                        </StockBadge>
                        <ActiveBadge $active={product.isActive}>
                          <ActiveText $active={product.isActive}>
                            {product.isActive ? 'Activo' : 'Inactivo'}
                          </ActiveText>
                        </ActiveBadge>
                      </BadgesRow>
                    </ProductInfo>
                    <ActionButtons>
                      <ActionButton onPress={() => handleToggleActive(product)}>
                        <Ionicons 
                          name={product.isActive ? 'eye-off-outline' : 'eye-outline'} 
                          size={18} 
                          color={theme.colors.textSecondary} 
                        />
                      </ActionButton>
                      <ActionButton onPress={() => handleEdit(product)}>
                        <Ionicons name="create-outline" size={18} color={theme.colors.primary} />
                      </ActionButton>
                      <ActionButton $variant="danger" onPress={() => handleDelete(product.id)}>
                        <Ionicons name="trash-outline" size={18} color={theme.colors.error} />
                      </ActionButton>
                    </ActionButtons>
                  </ProductCard>
                );
              })
            )}
          </Section>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
}