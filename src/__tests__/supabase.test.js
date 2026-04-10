/**
 * Unit tests for Supabase Auth Service
 */

import * as authService from '../services/authService';

describe('Supabase Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUpWithEmailPassword', () => {
    it('should be defined', () => {
      expect(authService.signUpWithEmailPassword).toBeDefined();
    });
  });

  describe('signInWithEmailPassword', () => {
    it('should be defined', () => {
      expect(authService.signInWithEmailPassword).toBeDefined();
    });
  });

  describe('signInWithGoogle', () => {
    it('should be defined', () => {
      expect(authService.signInWithGoogle).toBeDefined();
    });
  });

  describe('signInWithApple', () => {
    it('should be defined', () => {
      expect(authService.signInWithApple).toBeDefined();
    });
  });

  describe('signOut', () => {
    it('should be defined', () => {
      expect(authService.signOut).toBeDefined();
    });
  });

  describe('resetPasswordForEmail', () => {
    it('should be defined', () => {
      expect(authService.resetPasswordForEmail).toBeDefined();
    });
  });

  describe('verifyEmailOTP', () => {
    it('should be defined', () => {
      expect(authService.verifyEmailOTP).toBeDefined();
    });
  });

  describe('sendMagicLinkEmail', () => {
    it('should be defined', () => {
      expect(authService.sendMagicLinkEmail).toBeDefined();
    });
  });

  describe('getUser', () => {
    it('should be defined', () => {
      expect(authService.getUser).toBeDefined();
    });
  });

  describe('updateUserPassword', () => {
    it('should be defined', () => {
      expect(authService.updateUserPassword).toBeDefined();
    });
  });

  describe('getSession', () => {
    it('should be defined', () => {
      expect(authService.getSession).toBeDefined();
    });
  });

  describe('resendVerificationEmail', () => {
    it('should be defined', () => {
      expect(authService.resendVerificationEmail).toBeDefined();
    });
  });
});
