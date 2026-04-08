/**
 * Unit tests for Supabase Auth Service
 */

jest.mock('@supabase/supabase-js');
jest.mock('expo-auth-session');
jest.mock('@react-native-async-storage/async-storage');

const { supabase } = require('../supabase');

describe('Supabase Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUpWithEmailPassword', () => {
    it('should sign up a new user successfully', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = { access_token: 'token123' };
      supabase.auth.signUp.mockResolvedValue({ data: { user: mockUser, session: mockSession }, error: null });

      const result = await supabase.signUpWithEmailPassword('test@example.com', 'password123');

      expect(result).toEqual({
        user: expect.objectContaining({ email: 'test@example.com' }),
        session: expect.objectContaining({ accessToken: 'token123' })
      });
    });

    it('should throw error on sign up failure', async () => {
      supabase.auth.signUp.mockResolvedValue({ data: null, error: { message: 'User already registered' } });

      await expect(supabase.signUpWithEmailPassword('test@example.com', 'password123'))
        .rejects.toThrow('User already registered');
    });
  });

  describe('signInWithEmailPassword', () => {
    it('should sign in user successfully', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      const mockSession = { access_token: 'token123' };
      supabase.auth.signInWithPassword.mockResolvedValue({ data: { user: mockUser, session: mockSession }, error: null });

      const result = await supabase.signInWithEmailPassword('test@example.com', 'password123');

      expect(result).toEqual({
        user: expect.objectContaining({ email: 'test@example.com' }),
        session: expect.objectContaining({ accessToken: 'token123' })
      });
    });

    it('should throw error on sign in failure', async () => {
      supabase.auth.signInWithPassword.mockResolvedValue({ data: null, error: { message: 'Invalid login credentials' } });

      await expect(supabase.signInWithEmailPassword('test@example.com', 'wrongpassword'))
        .rejects.toThrow('Invalid login credentials');
    });
  });

  describe('signInWithGoogle', () => {
    it('should sign in with Google successfully', async () => {
      const mockUser = { id: '1', email: 'test@gmail.com' };
      const mockSession = { access_token: 'token123' };
      supabase.auth.signInWithOAuth.mockResolvedValue({ data: { user: mockUser, session: mockSession }, error: null });

      const result = await supabase.signInWithGoogle();

      expect(result).toEqual({
        user: expect.objectContaining({ email: 'test@gmail.com' }),
        session: expect.objectContaining({ accessToken: 'token123' })
      });
      expect(AuthSession.makeRedirectUri).toHaveBeenCalledWith({ useProxy: true });
    });

    it('should throw error on Google sign in failure', async () => {
      supabase.auth.signInWithOAuth.mockResolvedValue({ data: null, error: { message: 'Provider error' } });

      await expect(supabase.signInWithGoogle())
        .rejects.toThrow('Provider error');
    });
  });

  describe('resetPasswordForEmail', () => {
    it('should send password reset email successfully', async () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

      await expect(supabase.resetPasswordForEmail('test@example.com'))
        .resolves.toBeUndefined();

      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@example.com', {
        redirectTo: 'soapstore://update-password'
      });
    });

    it('should throw error on reset password email failure', async () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({ error: { message: 'Failed to send email' } });

      await expect(supabase.resetPasswordForEmail('test@example.com'))
        .rejects.toThrow('Failed to send email');
    });
  });

  describe('sendMagicLinkEmail', () => {
    it('should send magic link email successfully', async () => {
      supabase.auth.signInWithOtp.mockResolvedValue({ error: null });

      await expect(supabase.sendMagicLinkEmail('test@example.com'))
        .resolves.toBeUndefined();

      expect(supabase.auth.signInWithOtp).toHaveBeenCalledWith('test@example.com', {
        options: { emailRedirectTo: 'soapstore://verify-email' }
      });
    });

    it('should throw error on magic link email failure', async () => {
      supabase.auth.signInWithOtp.mockResolvedValue({ error: { message: 'Failed to send magic link' } });

      await expect(supabase.sendMagicLinkEmail('test@example.com'))
        .rejects.toThrow('Failed to send magic link');
    });
  });

  describe('verifyEmailOTP', () => {
    it('should verify email OTP successfully', async () => {
      const mockData = { user: { id: '1', email: 'test@example.com' } };
      supabase.auth.verifyOTP.mockResolvedValue({ data: mockData, error: null });

      const result = await supabase.verifyEmailOTP('test@example.com', 'token123');

      expect(result).toEqual(mockData);
      expect(supabase.auth.verifyOTP).toHaveBeenCalledWith({
        email: 'test@example.com',
        token: 'token123',
        type: 'email'
      });
    });

    it('should throw error on OTP verification failure', async () => {
      supabase.auth.verifyOTP.mockResolvedValue({ data: null, error: { message: 'Invalid token' } });

      await expect(supabase.verifyEmailOTP('test@example.com', 'invalidtoken'))
        .rejects.toThrow('Invalid token');
    });
  });

  describe('updateUserPassword', () => {
    it('should update user password successfully', async () => {
      const mockData = { user: { id: '1', email: 'test@example.com' } };
      supabase.auth.updateUser.mockResolvedValue({ data: mockData, error: null });

      const result = await supabase.updateUserPassword('newpassword123');

      expect(result).toEqual(mockData);
      expect(supabase.auth.updateUser).toHaveBeenCalledWith({ password: 'newpassword123' });
    });

    it('should throw error on password update failure', async () => {
      supabase.auth.updateUser.mockResolvedValue({ data: null, error: { message: 'Weak password' } });

      await expect(supabase.updateUserPassword('weak'))
        .rejects.toThrow('Weak password');
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      supabase.auth.signOut.mockResolvedValue({ error: null });

      await expect(supabase.signOut())
        .resolves.toBeUndefined();

      expect(supabase.auth.signOut).toHaveBeenCalled();
    });

    it('should throw error on sign out failure', async () => {
      supabase.auth.signOut.mockResolvedValue({ error: { message: 'Sign out failed' } });

      await expect(supabase.signOut())
        .rejects.toThrow('Sign out failed');
    });
  });
});