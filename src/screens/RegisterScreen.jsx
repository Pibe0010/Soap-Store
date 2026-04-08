import React, { useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import FormInput from '../components/FormInput';
import { useFormValidation } from '../hooks/useFormValidation';
import * as S from '../styles/RegisterScreenStyles';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { register, loading } = useAuth();
  const { isValidEmail, isValidPassword } = useFormValidation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!isValidEmail(email)) {
      errors.email = 'Ingresá un email válido';
    }
    if (!password) {
      errors.password = 'La contraseña es obligatoria';
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
      'User already registered': 'Este email ya está registrado',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      'Signup requires a valid password': 'La contraseña no es válida',
      default: error.message || 'Ocurrió un error al registrarse',
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
          <S.Title>Crear cuenta</S.Title>
          <S.Subtitle>Completá tus datos para registrarte</S.Subtitle>
        </S.Header>

        <S.Form>
          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={validationErrors.email}
          />
          <FormInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={validationErrors.password}
          />
          <FormInput
            placeholder="Confirmar contraseña"
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

          <S.Button onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <S.ButtonText>Registrarse</S.ButtonText>
            )}
          </S.Button>
        </S.Form>

        <S.FooterContainer>
          <S.Footer>
            <S.FooterText>¿Ya tenés cuenta?</S.FooterText>
            <S.LoginButton onPress={() => navigation.goBack()}>
              <S.LoginLink>Iniciar sesión</S.LoginLink>
            </S.LoginButton>
          </S.Footer>
        </S.FooterContainer>
      </ScrollView>
    </S.Container>
  );
}
