import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../services/supabase';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/ResetPasswordScreenStyles';

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { isValidPassword, passwordError } = useFormValidation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const { token, type } = route.params || {};
    if (!token || type !== 'recovery') {
      setTokenError('El enlace de recuperación no es válido o expiró.');
    }
  }, [route.params]);

  const validateForm = () => {
    const errors = {};

    if (!password) {
      errors.password = 'La nueva contraseña es obligatoria';
    } else if (!isValidPassword(password)) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'La confirmación es obligatoria';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleResetPassword = async () => {
    setLocalError(null);

    if (tokenError) return;

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      Alert.alert(
        'Contraseña actualizada',
        'Tu contraseña fue actualizada. Por motivos de seguridad, te recomendamos cambiarla periódicamente.',
        [
          {
            text: 'Iniciar sesión',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      setLocalError(error.message || 'No se pudo restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (tokenError) {
    return (
      <S.Container>
        <Ionicons name="alert-circle" size={80} color={theme.colors.error} />
        <S.Title>Enlace inválido</S.Title>
        <S.Subtitle>{tokenError}</S.Subtitle>
        <S.Button onPress={handleGoBack}>
          <S.ButtonText>Volver al login</S.ButtonText>
        </S.Button>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.BackButton onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </S.BackButton>

        <S.Header>
          <Ionicons name="lock-closed-outline" size={60} color={theme.colors.primary} />
          <S.Title>Nueva contraseña</S.Title>
          <S.Subtitle>
            Ingresá tu nueva contraseña. Por motivos de seguridad, debe ser diferente a la anterior.
          </S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder="Nueva contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={validationErrors.password}
          />

          <FormInput
            placeholder="Confirmar nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

          <S.Button onPress={handleResetPassword} disabled={loading}>
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
