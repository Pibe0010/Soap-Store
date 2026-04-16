import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import SocialLoginButton from '../components/SocialLoginButton';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/LoginScreenStyles';

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { login, loginWithGoogle, loading, user } = useAuth();
  const { isValidEmail, isValidPassword, emailError, passwordError } = useFormValidation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleLogin = async () => {
    setLocalError(null);
    if (!email.trim()) {
      setLocalError(t('auth.emailRequired'));
      return;
    }
    if (!isValidEmail(email)) {
      return;
    }
    if (!password) {
      setLocalError(t('auth.passwordRequired'));
      return;
    }
    try {
      await login(email, password);
      // If login succeeds but email not verified, redirect to verification
      // This will be caught by the useEffect below when user state updates
    } catch (error) {
      // Handle specific error cases
      if (error.message === 'Email not confirmed') {
        // Even though login failed due to unconfirmed email, we still want to show verification screen
        // Navigate to verification screen with intended destination
        navigation.navigate('EmailVerification', { intended: 'MainTabs' });
      } else {
        setLocalError(mapAuthError(error));
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError(null);
    try {
      await loginWithGoogle();
      // Redirect will be handled by useEffect watching user changes
    } catch (error) {
      // Handle specific error for Google login too
      if (error.message === 'Email not confirmed') {
        navigation.navigate('EmailVerification', { intended: 'MainTabs' });
      } else {
        setLocalError(mapAuthError(error));
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const mapAuthError = (error) => {
    const errorMessages = {
      'Invalid login credentials': t('auth.invalidCredentials'),
      'Email not confirmed': t('auth.emailNotConfirmed'),
      'User already registered': t('auth.alreadyRegistered'),
      default: error.message || t('auth.loginError'),
    };
    return errorMessages[error.message] || errorMessages.default;
  };

  useEffect(() => {
    if (user) {
      if (!user?.emailConfirmedAt) {
        navigation.navigate('EmailVerification', { intended: 'MainTabs' });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    }
  }, [user, navigation]);

  return (
    <S.Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <S.Content>
          <S.Header>
            <S.Logo>
              <Ionicons name="leaf" size={60} color={theme.colors.primary} />
            </S.Logo>
            <S.Title>Soap Store</S.Title>
            <S.Subtitle>{t('auth.loginSubtitle')}</S.Subtitle>
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
            <FormInput
              placeholder={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={passwordError}
            />

            {localError && (
              <S.ErrorContainer>
                <S.ErrorIcon>
                  <Ionicons name="alert-circle" size={18} color={theme.colors.error} />
                </S.ErrorIcon>
                <S.ErrorText>{localError}</S.ErrorText>
              </S.ErrorContainer>
            )}

            <S.Button onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <S.ButtonText>{t('auth.login')}</S.ButtonText>
              )}
            </S.Button>

            <S.ForgotPassword onPress={() => navigation.navigate('ForgotPassword')}>
              <S.ForgotPasswordText>{t('auth.forgotPassword')}</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Form>

          <S.DividerContainer>
            <S.DividerLine />
            <S.DividerText>{t('common.or')}</S.DividerText>
            <S.DividerLine />
          </S.DividerContainer>

          <S.SocialButtons>
            <SocialLoginButton provider="google" onPress={handleGoogleLogin} loading={loading} />
          </S.SocialButtons>

          <S.FooterContainer>
            <S.Footer>
              <S.FooterText>{t('auth.noAccount')}</S.FooterText>
              <S.RegisterButton onPress={() => navigation.navigate('Register')}>
                <S.RegisterLink>{t('auth.register')}</S.RegisterLink>
              </S.RegisterButton>
            </S.Footer>
          </S.FooterContainer>
        </S.Content>
      </ScrollView>
    </S.Container>
  );
}
