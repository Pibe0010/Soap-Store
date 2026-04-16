import React, { useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/RegisterScreenStyles';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { register, loading } = useAuth();
  const { isValidEmail, isValidPassword } = useFormValidation();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = t('auth.emailRequired');
    } else if (!isValidEmail(email)) {
      errors.email = t('auth.invalidEmail');
    }
    if (!password) {
      errors.password = t('auth.passwordRequired');
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

  const handleRegister = async () => {
    setLocalError(null);
    if (!validateForm()) return;
    try {
      await register(email, password);
      navigation.navigate('EmailVerification');
    } catch (error) {
      setLocalError(mapAuthError(error));
    }
  };

  const mapAuthError = (error) => {
    const errorMessages = {
      'User already registered': t('auth.alreadyRegistered'),
      'Password should be at least 6 characters': t('auth.passwordMinLength'),
      'Signup requires a valid password': t('auth.invalidPassword'),
      default: error.message || t('auth.registerError'),
    };
    return errorMessages[error.message] || errorMessages.default;
  };

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <S.BackButton onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </S.BackButton>

        <S.Header>
          <Ionicons name="person-add" size={60} color={theme.colors.primary} />
          <S.Title>{t('auth.createAccount')}</S.Title>
          <S.Subtitle>{t('auth.registerSubtitle')}</S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={validationErrors.email}
          />
          <FormInput
            placeholder={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={validationErrors.password}
          />
          <FormInput
            placeholder={t('auth.confirmPassword')}
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

          <S.Button onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <S.ButtonText>{t('auth.register')}</S.ButtonText>
            )}
          </S.Button>
        </S.Form>

        <S.FooterContainer>
          <S.Footer>
            <S.FooterText>{t('auth.alreadyAccount')}</S.FooterText>
            <S.LoginButton onPress={() => navigation.goBack()}>
              <S.LoginLink>{t('auth.login')}</S.LoginLink>
            </S.LoginButton>
          </S.Footer>
        </S.FooterContainer>
      </ScrollView>
    </S.Container>
  );
}
