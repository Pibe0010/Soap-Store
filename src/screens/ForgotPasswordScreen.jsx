import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/ForgotPasswordScreenStyles';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const { resetPassword, loading } = useAuth();
  const { isValidEmail, emailError } = useFormValidation();

  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    setLocalError(null);

    if (!email.trim()) {
      setLocalError('El email es obligatorio');
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      setLocalError('No se pudo enviar el email de recuperación');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (success) {
    return (
      <S.Container>
        <Ionicons name="mail-done-outline" size={80} color={theme.colors.primary} />
        <S.Title>Revisá tu email</S.Title>
        <S.Subtitle>
          Si el email existe en nuestro sistema, vas a recibir las instrucciones para restablecer tu contraseña.
        </S.Subtitle>
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
          <Ionicons name="key-outline" size={60} color={theme.colors.primary} />
          <S.Title>¿Olvidaste tu contraseña?</S.Title>
          <S.Subtitle>
            Ingresá tu email y te enviaremos las instrucciones para restablecerla.
          </S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={emailError}
          />

          {localError && (
            <S.ErrorContainer>
              <Ionicons name="alert-circle" size={18} color={theme.colors.error} />
              <S.ErrorText>{localError}</S.ErrorText>
            </S.ErrorContainer>
          )}

          <S.Button onPress={handleResetPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <S.ButtonText>Enviar email</S.ButtonText>
            )}
          </S.Button>
        </S.Form>
      </S.ScrollView>
    </S.Container>
  );
}
