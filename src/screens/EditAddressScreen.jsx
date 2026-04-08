import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddresses } from '../hooks/useAddresses';
import { theme } from '../styles/theme';
import {
  Container,
  Header,
  HeaderTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorText,
  SaveButton,
  SaveButtonText,
  DefaultToggle,
  DefaultToggleText,
  Checkbox,
} from '../styles/AddressesScreenStyles';

/**
 * Screen for adding or editing a user address.
 *
 * @returns {JSX.Element}
 */
export default function EditAddressScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addAddress, updateAddress, loading } = useAddresses();
  const editingAddress = route.params?.address;

  const [label, setLabel] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartmentUnit, setApartmentUnit] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [isDefault, setIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar datos si estamos editando
  useEffect(() => {
    if (editingAddress) {
      setLabel(editingAddress.label || '');
      setStreetAddress(editingAddress.streetAddress || '');
      setApartmentUnit(editingAddress.apartmentUnit || '');
      setCity(editingAddress.city || '');
      setStateProvince(editingAddress.stateProvince || '');
      setPostalCode(editingAddress.postalCode || '');
      setCountry(editingAddress.country || 'Argentina');
      setIsDefault(editingAddress.isDefault || false);
    }
  }, [editingAddress]);

  const validate = () => {
    const errs = {};
    if (!label.trim()) errs.label = 'El nombre es obligatorio (ej: Casa, Trabajo)';
    if (!streetAddress.trim()) errs.streetAddress = 'La dirección es obligatoria';
    if (!city.trim()) errs.city = 'La ciudad es obligatoria';
    if (!country.trim()) errs.country = 'El país es obligatorio';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const addressData = {
        label: label.trim(),
        streetAddress: streetAddress.trim(),
        apartmentUnit: apartmentUnit.trim() || null,
        city: city.trim(),
        stateProvince: stateProvince.trim() || null,
        postalCode: postalCode.trim() || null,
        country: country.trim(),
        isDefault,
      };

      if (editingAddress) {
        await updateAddress(editingAddress.id, addressData);
        Alert.alert('✅', 'Dirección actualizada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await addAddress(addressData);
        Alert.alert('✅', 'Dirección agregada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.error('Error saving address:', err);
      Alert.alert('Error', 'No se pudo guardar la dirección');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>
          {editingAddress ? 'Editar dirección' : 'Nueva dirección'}
        </HeaderTitle>
      </Header>

      <FormContainer>
        <FormGroup>
          <Label>Nombre *</Label>
          <Input
            value={label}
            onChangeText={(text) => { setLabel(text); setErrors({ ...errors, label: null }); }}
            placeholder="Ej: Casa, Trabajo, Mamá"
            autoCapitalize="words"
          />
          {errors.label && <ErrorText>{errors.label}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Dirección *</Label>
          <Input
            value={streetAddress}
            onChangeText={(text) => { setStreetAddress(text); setErrors({ ...errors, streetAddress: null }); }}
            placeholder="Calle y número"
            autoCapitalize="words"
          />
          {errors.streetAddress && <ErrorText>{errors.streetAddress}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Depto / Piso / Torre</Label>
          <Input
            value={apartmentUnit}
            onChangeText={setApartmentUnit}
            placeholder="Opcional"
          />
        </FormGroup>

        <FormGroup>
          <Label>Ciudad *</Label>
          <Input
            value={city}
            onChangeText={(text) => { setCity(text); setErrors({ ...errors, city: null }); }}
            placeholder="Ciudad"
            autoCapitalize="words"
          />
          {errors.city && <ErrorText>{errors.city}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Provincia</Label>
          <Input
            value={stateProvince}
            onChangeText={setStateProvince}
            placeholder="Provincia"
            autoCapitalize="words"
          />
        </FormGroup>

        <FormGroup>
          <Label>Código Postal</Label>
          <Input
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder="Ej: 1425"
            keyboardType="number-pad"
          />
        </FormGroup>

        <FormGroup>
          <Label>País *</Label>
          <Input
            value={country}
            onChangeText={(text) => { setCountry(text); setErrors({ ...errors, country: null }); }}
            placeholder="País"
            autoCapitalize="words"
          />
          {errors.country && <ErrorText>{errors.country}</ErrorText>}
        </FormGroup>

        <DefaultToggle onPress={() => setIsDefault(!isDefault)}>
          <Checkbox checked={isDefault}>
            {isDefault && <Ionicons name="checkmark" size={14} color="#fff" />}
          </Checkbox>
          <DefaultToggleText>Establecer como dirección principal</DefaultToggleText>
        </DefaultToggle>

        <SaveButton onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <SaveButtonText>
              {editingAddress ? 'Actualizar dirección' : 'Guardar dirección'}
            </SaveButtonText>
          )}
        </SaveButton>
      </FormContainer>
    </Container>
  );
}
