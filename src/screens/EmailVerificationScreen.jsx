import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { theme } from '../styles/theme';
import { supabase } from '../services/index';
import * as S from '../styles/EmailVerificationScreenStyles';

export default function EmailVerificationScreen({ navigation, route }) {
  const { user, loading: authLoading } = useAuth();
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (user?.emailConfirmedAt) {
      setStatus('verified');
      const intended = route.params?.intended ?? 'MainTabs';
      setTimeout(() => {
        if (intended) {
          navigation.navigate(intended);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
          });
        }
      }, 1500);
    }
  }, [user, navigation]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendVerification = async () => {
    if (resendCooldown > 0 || !user?.email) return;

    setVerificationLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) throw error;

      setResendCooldown(60);
      Alert.alert('Éxito', 'El email de verificación ha sido reenviado.');
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo reenviar el email.');
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (authLoading) {
    return (
      <S.Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </S.Container>
    );
  }

  if (status === 'verified') {
    return (
      <S.Container>
        <Ionicons name="checkmark-circle" size={80} color={theme.colors.primary} />
        <S.Title>¡Email verificado!</S.Title>
        <S.Subtitle>Redirigiendo...</S.Subtitle>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Ionicons name="mail-unread-outline" size={80} color={theme.colors.primary} />
      <S.Title>Verificá tu email</S.Title>
      <S.Subtitle>
        Te enviamos un email de verificación a:
      </S.Subtitle>
      <S.Email>{user?.email || 'tu email'}</S.Email>
      <S.Instruction>
        Hacé clic en el enlace del email para verificar tu cuenta.
      </S.Instruction>

      <S.Button
        onPress={handleResendVerification}
        disabled={verificationLoading || resendCooldown > 0}
      >
        {verificationLoading ? (
          <ActivityIndicator size="small" color={theme.colors.white} />
        ) : (
          <S.ButtonText>
            {resendCooldown > 0
              ? `Reenviar en ${resendCooldown}s`
              : 'Reenviar email de verificación'}
          </S.ButtonText>
        )}
      </S.Button>

      <S.BackButton onPress={handleGoBack}>
        <S.BackButtonText>Volver atrás</S.BackButtonText>
      </S.BackButton>
    </S.Container>
  );
}
