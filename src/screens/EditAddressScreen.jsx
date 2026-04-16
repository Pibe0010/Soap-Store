import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAddresses } from '../hooks/useAddresses';
import { useTheme } from '../context/ThemeContext';
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
  const { t } = useTranslation();
  const { theme } = useTheme();
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
    if (!label.trim()) errs.label = t('address.labelRequired');
    if (!streetAddress.trim()) errs.streetAddress = t('address.streetRequired');
    if (!city.trim()) errs.city = t('address.cityRequired');
    if (!country.trim()) errs.country = t('address.countryRequired');
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
        Alert.alert('✅', t('address.updated'), [
          { text: t('common.accept'), onPress: () => navigation.goBack() },
        ]);
      } else {
        await addAddress(addressData);
        Alert.alert('✅', t('address.added'), [
          { text: t('common.accept'), onPress: () => navigation.goBack() },
        ]);
      }
    } catch (err) {
      console.error('Error saving address:', err);
      Alert.alert(t('common.error'), t('address.saveError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>
          {editingAddress ? t('address.editTitle') : t('address.newTitle')}
        </HeaderTitle>
      </Header>

      <FormContainer>
        <FormGroup>
          <Label>{t('address.name')}</Label>
          <Input
            value={label}
            onChangeText={(text) => { setLabel(text); setErrors({ ...errors, label: null }); }}
            placeholder={t('address.namePlaceholder')}
            autoCapitalize="words"
          />
          {errors.label && <ErrorText>{errors.label}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>{t('address.street')}</Label>
          <Input
            value={streetAddress}
            onChangeText={(text) => { setStreetAddress(text); setErrors({ ...errors, streetAddress: null }); }}
            placeholder={t('address.streetPlaceholder')}
            autoCapitalize="words"
          />
          {errors.streetAddress && <ErrorText>{errors.streetAddress}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>{t('address.apartment')}</Label>
          <Input
            value={apartmentUnit}
            onChangeText={setApartmentUnit}
            placeholder={t('address.optional')}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('address.city')}</Label>
          <Input
            value={city}
            onChangeText={(text) => { setCity(text); setErrors({ ...errors, city: null }); }}
            placeholder={t('address.cityPlaceholder')}
            autoCapitalize="words"
          />
          {errors.city && <ErrorText>{errors.city}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>{t('address.state')}</Label>
          <Input
            value={stateProvince}
            onChangeText={setStateProvince}
            placeholder={t('address.statePlaceholder')}
            autoCapitalize="words"
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('address.postalCode')}</Label>
          <Input
            value={postalCode}
            onChangeText={setPostalCode}
            placeholder={t('address.postalCodePlaceholder')}
            keyboardType="number-pad"
          />
        </FormGroup>

        <FormGroup>
          <Label>{t('address.country')}</Label>
          <Input
            value={country}
            onChangeText={(text) => { setCountry(text); setErrors({ ...errors, country: null }); }}
            placeholder={t('address.countryPlaceholder')}
            autoCapitalize="words"
          />
          {errors.country && <ErrorText>{errors.country}</ErrorText>}
        </FormGroup>

        <DefaultToggle onPress={() => setIsDefault(!isDefault)}>
          <Checkbox checked={isDefault}>
            {isDefault && <Ionicons name="checkmark" size={14} color="#fff" />}
          </Checkbox>
          <DefaultToggleText>{t('address.setAsDefault')}</DefaultToggleText>
        </DefaultToggle>

        <SaveButton onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator size="small" color={theme.colors.white} />
          ) : (
            <SaveButtonText>
              {editingAddress ? t('address.update') : t('address.save')}
            </SaveButtonText>
          )}
        </SaveButton>
      </FormContainer>
    </Container>
  );
}
