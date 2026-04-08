import { useState } from 'react';

export const useFormValidation = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? null : 'Please enter a valid email address');
    return isValid;
  };

  const isValidPassword = (password: string) => {
    const isValid = password.length >= 8;
    setPasswordError(isValid ? null : 'Password must be at least 8 characters');
    return isValid;
  };

  return { isValidEmail, isValidPassword, emailError, passwordError };
};