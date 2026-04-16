/**
 * Unit tests for Supabase Auth Service
 */

import * as authService from '../services/authService';

describe('Supabase Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUpWithEmailPassword', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.signUpWithEmailPassword).toBeDefined();
    });
  });

  describe('signInWithEmailPassword', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.signInWithEmailPassword).toBeDefined();
    });
  });

  describe('signInWithGoogle', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.signInWithGoogle).toBeDefined();
    });
  });

  describe('signInWithApple', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.signInWithApple).toBeDefined();
    });
  });

  describe('signOut', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.signOut).toBeDefined();
    });
  });

  describe('resetPasswordForEmail', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.resetPasswordForEmail).toBeDefined();
    });
  });

  describe('verifyEmailOTP', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.verifyEmailOTP).toBeDefined();
    });
  });

  describe('sendMagicLinkEmail', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.sendMagicLinkEmail).toBeDefined();
    });
  });

  describe('getUser', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.getUser).toBeDefined();
    });
  });

  describe('updateUserPassword', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.updateUserPassword).toBeDefined();
    });
  });

  describe('getSession', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.getSession).toBeDefined();
    });
  });

  describe('resendVerificationEmail', () => {
    itraduction('should be defined', () => {
      expectraduction(authService.resendVerificationEmail).toBeDefined();
    });
  });
});
