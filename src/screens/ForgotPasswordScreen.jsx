import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/ForgotPasswordScreenStyles';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { resetPassword, loading } = useAuth();
  const { isValidEmail, emailError } = useFormValidation();

  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    setLocalError(null);

    if (!email.trim()) {
      setLocalError(t('auth.emailRequired'));
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error) {
      setLocalError(t('auth.resetEmailError'));
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (success) {
    return (
      <S.Container>
        <Ionicons name="mail-done-outline" size={80} color={theme.colors.primary} />
        <S.Title>{t('auth.checkEmail')}</S.Title>
        <S.Subtitle>
          {t('auth.checkEmailSubtitle')}
        </S.Subtitle>
        <S.Button onPress={handleGoBack}>
          <S.ButtonText>{t('auth.backToLogin')}</S.ButtonText>
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
          <S.Title>{t('auth.forgotPassword')}</S.Title>
          <S.Subtitle>
            {t('auth.forgotPasswordSubtitle')}
          </S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder={t('auth.email')}
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
              <S.ButtonText>{t('auth.sendEmail')}</S.ButtonText>
            )}
          </S.Button>
        </S.Form>
      </S.ScrollView>
    </S.Container>
  );
}
