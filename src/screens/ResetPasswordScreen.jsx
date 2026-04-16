import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/index';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/ResetPasswordScreenStyles';

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
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
      setTokenError(t('auth.invalidResetLink'));
    }
  }, [route.params]);

  const validateForm = () => {
    const errors = {};

    if (!password) {
      errors.password = t('auth.newPasswordRequired');
    } else if (!isValidPassword(password)) {
      errors.password = t('auth.passwordMinLength');
    }

    if (!confirmPassword) {
      errors.confirmPassword = t('auth.confirmPasswordRequired');
    } else if (password !== confirmPassword) {
      errors.confirmPassword = t('auth.passwordsNotMatch');
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
        t('auth.passwordResetTitle'),
        t('auth.passwordResetSubtitle'),
        [
          {
            text: t('auth.login'),
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      setLocalError(error.message || t('auth.resetPasswordError'));
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
        <S.Title>{t('auth.invalidLink')}</S.Title>
        <S.Subtitle>{tokenError}</S.Subtitle>
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
          <Ionicons name="lock-closed-outline" size={60} color={theme.colors.primary} />
          <S.Title>{t('auth.newPasswordTitle')}</S.Title>
          <S.Subtitle>
            {t('auth.newPasswordSubtitle')}
          </S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder={t('auth.newPassword')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={validationErrors.password}
          />

          <FormInput
            placeholder={t('auth.confirmNewPassword')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={validationErrors.confirmPassword}
          />

          <S.HintContainer>
            <S.HintIcon>
              <Ionicons name="information-circle-outline" size={16} color={theme.colors.textSecondary} />
            </S.HintIcon>
            <S.HintText>{t('auth.passwordHint')}</S.HintText>
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
              <S.ButtonText>{t('auth.updatePassword')}</S.ButtonText>
            )}
          </S.Button>
        </S.Form>
      </S.ScrollView>
    </S.Container>
  );
}
