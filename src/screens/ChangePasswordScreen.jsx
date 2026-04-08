import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/ChangePasswordScreenStyles';

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { changePassword, loading } = useAuth();
  const { isValidPassword } = useFormValidation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!newPassword) {
      errors.newPassword = 'La nueva contraseña es obligatoria';
    } else if (!isValidPassword(newPassword)) {
      errors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'La confirmación es obligatoria';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async () => {
    setLocalError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await changePassword(newPassword);
      Alert.alert(
        '✅',
        'Tu contraseña fue actualizada correctamente.',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setLocalError(error.message || 'No se pudo cambiar la contraseña');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <S.Container>
      <S.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.BackButton onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </S.BackButton>

        <S.Header>
          <Ionicons name="lock-closed-outline" size={60} color={theme.colors.primary} />
          <S.Title>Cambiar contraseña</S.Title>
          <S.Subtitle>
            Ingresá tu nueva contraseña. Por motivos de seguridad, debe ser diferente a la actual.
          </S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={(text) => { setNewPassword(text); setLocalError(null); }}
            secureTextEntry
            error={validationErrors.newPassword}
          />

          <FormInput
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={(text) => { setConfirmPassword(text); setLocalError(null); }}
            secureTextEntry
            error={validationErrors.confirmPassword}
          />

          <S.HintContainer>
            <S.HintIcon>
              <Ionicons name="information-circle-outline" size={16} color={theme.colors.textSecondary} />
            </S.HintIcon>
            <S.HintText>Mínimo 8 caracteres, al menos una mayúscula y un número</S.HintText>
          </S.HintContainer>

          {localError && (
            <S.ErrorContainer>
              <S.ErrorIcon>
                <Ionicons name="alert-circle" size={18} color={theme.colors.error} />
              </S.ErrorIcon>
              <S.ErrorText>{localError}</S.ErrorText>
            </S.ErrorContainer>
          )}

          <S.Button onPress={handleChangePassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <S.ButtonText>Actualizar contraseña</S.ButtonText>
            )}
          </S.Button>
        </S.Form>
      </S.ScrollView>
    </S.Container>
  );
}
