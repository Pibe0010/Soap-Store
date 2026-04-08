// src/services/authService.js
import { supabase, mapAuthUserFromDB, mapAuthSessionFromDB } from './supabaseClient';
import * as AuthSession from 'expo-auth-session';

/**
 * Authentication operations
 */

export const signUpWithEmailPassword = async (email, password, userData = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { ...userData },
    },
  });

  if (error) {
    throw error;
  }

  const user = data.user ? mapAuthUserFromDB(data.user) : null;
  const session = data.session ? mapAuthSessionFromDB(data.session) : null;

  return { user, session };
};

export const signInWithEmailPassword = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  const user = data.user ? mapAuthUserFromDB(data.user) : null;
  const session = data.session ? mapAuthSessionFromDB(data.session) : null;

  return { user, session };
};

export const signInWithGoogle = async () => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
    const user = data.user ? mapAuthUserFromDB(data.user) : null;
    const session = data.session ? mapAuthSessionFromDB(data.session) : null;
    return { user, session };
  } catch (error) {
    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
    const user = data.user ? mapAuthUserFromDB(data.user) : null;
    const session = data.session ? mapAuthSessionFromDB(data.session) : null;
    return { user, session };
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPasswordForEmail = async (email) => {
  try {
    const redirectUrl = 'soapstore://update-password';
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

export const verifyEmailOTP = async (email, token) => {
  const { data, error } = await supabase.auth.verifyOTP({
    email,
    token,
    type: 'email',
  });
  if (error) throw error;
  return data;
};

export const sendMagicLinkEmail = async (email) => {
  try {
    const redirectUrl = 'soapstore://verify-email';
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl },
    });
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (accessToken) => {
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error) throw error;
  return mapAuthUserFromDB(data.user);
};

export const updateUserPassword = async (password) => {
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session ? {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresAt: data.session.expires_at,
    user: mapAuthUserFromDB(data.session.user),
  } : null;
};

export const resendVerificationEmail = async (email) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  if (error) throw error;
};