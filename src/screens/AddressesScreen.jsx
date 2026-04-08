import React from 'react';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAddresses } from '../hooks/useAddresses';
import { t } from '../constants/translations';
import { theme } from '../styles/theme';
import {
  Container,
  Header,
  HeaderTitle,
  EmptyContainer,
  EmptyText,
  EmptySubtext,
  AddressCard,
  AddressHeader,
  AddressLabel,
  DefaultBadge,
  DefaultBadgeText,
  AddressLine,
  AddressActions,
  ActionButton,
  ActionButtonText,
  AddButton,
  AddButtonText,
} from '../styles/AddressesScreenStyles';

/**
 * Screen displaying user's saved addresses.
 * Allows adding, editing, deleting, and setting default address.
 *
 * @returns {JSX.Element}
 */
export default function AddressesScreen() {
  const { addresses, loading, removeAddress, updateAddress, refresh } = useAddresses();
  const navigation = useNavigation();

  // Recargar direcciones cuando la pantalla gana foco (después de agregar/editar)
  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleDelete = (address) => {
    Alert.alert(
      'Eliminar dirección',
      `¿Eliminar "${address.label}"?`,
      [
        { text: t.cart.cancel, style: 'cancel' },
        { text: 'Eliminar', onPress: () => removeAddress(address.id), style: 'destructive' },
      ]
    );
  };

  const handleEdit = (address) => {
    navigation.navigate('EditAddress', { address });
  };

  const handleSetDefault = async (address) => {
    await updateAddress(address.id, { isDefault: true });
  };

  const handleAdd = () => {
    navigation.navigate('EditAddress', {});
  };

  const formatAddress = (addr) => {
    const parts = [];
    if (addr.streetAddress) parts.push(addr.streetAddress);
    if (addr.apartmentUnit) parts.push(addr.apartmentUnit);
    const cityParts = [];
    if (addr.city) cityParts.push(addr.city);
    if (addr.stateProvince) cityParts.push(addr.stateProvince);
    if (addr.postalCode) cityParts.push(addr.postalCode);
    if (cityParts.length > 0) parts.push(cityParts.join(', '));
    if (addr.country) parts.push(addr.country);
    return parts.join('\n');
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <HeaderTitle>{t.perfil.menu.addresses}</HeaderTitle>
        </Header>
        <EmptyContainer>
          <EmptyText>Cargando direcciones...</EmptyText>
        </EmptyContainer>
      </Container>
    );
  }

  if (addresses.length === 0) {
    return (
      <Container>
        <Header>
          <HeaderTitle>{t.perfil.menu.addresses}</HeaderTitle>
        </Header>
        <EmptyContainer>
          <Ionicons name="location-outline" size={80} color={theme.colors.disabled} />
          <EmptyText>No tenés direcciones guardadas</EmptyText>
          <EmptySubtext>Agregá una dirección para agilizar tus compras</EmptySubtext>
        </EmptyContainer>
        <AddButton onPress={handleAdd}>
          <Ionicons name="add-circle" size={24} color={theme.colors.white} />
          <AddButtonText>Agregar dirección</AddButtonText>
        </AddButton>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>{t.perfil.menu.addresses}</HeaderTitle>
      </Header>

      {addresses.map((addr) => (
        <AddressCard key={addr.id} isDefault={addr.isDefault}>
          <AddressHeader>
            <AddressLabel>{addr.label}</AddressLabel>
            {addr.isDefault && (
              <DefaultBadge>
                <DefaultBadgeText>Principal</DefaultBadgeText>
              </DefaultBadge>
            )}
          </AddressHeader>

          {formatAddress(addr).split('\n').map((line, i) => (
            <AddressLine key={i}>{line}</AddressLine>
          ))}

          <AddressActions>
            {!addr.isDefault && (
              <ActionButton
                bgColor={theme.colors.info + '20'}
                onPress={() => handleSetDefault(addr)}
              >
                <Ionicons name="star-outline" size={14} color={theme.colors.info} />
                <ActionButtonText textColor={theme.colors.info}>Principal</ActionButtonText>
              </ActionButton>
            )}
            <ActionButton
              bgColor={theme.colors.warning + '20'}
              onPress={() => handleEdit(addr)}
            >
              <Ionicons name="create-outline" size={14} color={theme.colors.warning} />
              <ActionButtonText textColor={theme.colors.warning}>Editar</ActionButtonText>
            </ActionButton>
            <ActionButton
              bgColor={theme.colors.error + '20'}
              onPress={() => handleDelete(addr)}
            >
              <Ionicons name="trash-outline" size={14} color={theme.colors.error} />
              <ActionButtonText textColor={theme.colors.error}>Eliminar</ActionButtonText>
            </ActionButton>
          </AddressActions>
        </AddressCard>
      ))}

      <AddButton onPress={handleAdd}>
        <Ionicons name="add-circle" size={24} color={theme.colors.white} />
        <AddButtonText>Agregar dirección</AddButtonText>
      </AddButton>
    </Container>
  );
}
