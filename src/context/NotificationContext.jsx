import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/index';
import { useAuth } from './AuthContext';

// Lazy load expo-notifications to avoid crashes in Expo Go
let Notifications = null;
let isExpoGo = true;

try {
  const notifs = require('expo-notifications');
  Notifications = notifs;
  
  // eslint-disable-next-line no-unused-vars
  const consts = require('expo-constants');
  isExpoGo = consts?.executionEnvironment === 'storeClient';
} catch (e) {
  console.log('Running in Expo Go - notifications disabled');
}

// Configure notification handler only for development builds
if (Notifications && !isExpoGo) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

const NOTIFICATIONS_PREFS_KEY = '@soap-store-notifications-prefs';
const PENDING_TOKEN_KEY = '@soap-store-pending-token';

const defaultContextValue = {
  pushEnabled: false,
  emailEnabled: false,
  expoToken: null,
  permissionsGranted: false,
  isLoading: true,
  setPushEnabled: () => {},
  setEmailEnabled: () => {},
  requestPermissions: () => {},
};

/**
 * Notification Context that manages:
 * - Permission request and status
 * - Device push token (Expo Push Token)
 * - User preferences (push/email notifications)
 * - Token storage in Supabase when user is authenticated
 */
export const NotificationContext = createContext(defaultContextValue);

/**
 * Provider component for notification context
 * Handles permissions, token management, and preference persistence
 */
export function NotificationProvider({ children }) {
  const { user, isLoggedIn } = useAuth();
  
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [expoToken, setExpoToken] = useState(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, []);

  // Save preferences when they change
  useEffect(() => {
    if (!isLoading) {
      savePreferences();
    }
  }, [pushEnabled, emailEnabled]);

  // Handle token and user authentication
  useEffect(() => {
    if (expoToken && user) {
      saveTokenToSupabase();
    }
  }, [expoToken, user]);

  const loadPreferences = async () => {
    try {
      // Load stored preferences
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_PREFS_KEY);
      if (stored) {
        const prefs = JSON.parse(stored);
        setPushEnabled(prefs.pushEnabled ?? false);
        setEmailEnabled(prefs.emailEnabled ?? false);
      }

      // Check if we have a pending token to register
      const pendingToken = await AsyncStorage.getItem(PENDING_TOKEN_KEY);
      if (pendingToken) {
        setExpoToken(pendingToken);
      }

      // Check current permissions status (only if not Expo Go and Notifications available)
      if (!isExpoGo && Notifications) {
        const { status } = await Notifications.getPermissionsAsync();
        setPermissionsGranted(status === 'granted');
      }
      
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    try {
      const prefs = {
        pushEnabled,
        emailEnabled,
      };
      await AsyncStorage.setItem(NOTIFICATIONS_PREFS_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.error('Error saving notification preferences:', error);
    }
  };

  const requestPermissions = async () => {
    // Push notifications don't work in Expo Go, return false
    if (isExpoGo || !Notifications) {
      console.log('Push notifications require a development build, not Expo Go');
      return false;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      if (existingStatus === 'granted') {
        setPermissionsGranted(true);
        return true;
      }

      const { status } = await Notifications.requestPermissionsAsync();
      const granted = status === 'granted';
      setPermissionsGranted(granted);
      
      if (granted) {
        // Get the push token
        const token = await Notifications.getExpoPushTokenAsync();
        setExpoToken(token.data);
        
        // Save pending token for later use
        await AsyncStorage.setItem(PENDING_TOKEN_KEY, token.data);
        
        // If user is already logged in, save to Supabase immediately
        if (user) {
          await saveTokenToSupabase();
        }
      }
      
      return granted;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  };

  const saveTokenToSupabase = async () => {
    if (!expoToken || !user) return;

    try {
      // Check if token already exists
      const { data: existing } = await supabase
        .from('device_tokens')
        .select('id')
        .eq('user_id', user.id)
        .eq('token', expoToken)
        .maybeSingle();

      if (!existing) {
        // Insert new token
        await supabase
          .from('device_tokens')
          .insert({
            user_id: user.id,
            token: expoToken,
            platform: 'expo',
            enabled: pushEnabled,
            email_enabled: emailEnabled,
          });
      } else {
        // Update existing token preferences
        await supabase
          .from('device_tokens')
          .update({
            enabled: pushEnabled,
            email_enabled: emailEnabled,
          })
          .eq('user_id', user.id)
          .eq('token', expoToken);
      }

      // Clear pending token
      await AsyncStorage.removeItem(PENDING_TOKEN_KEY);
    } catch (error) {
      console.error('Error saving token to Supabase:', error);
    }
  };

  // Update token preferences when they change
  useEffect(() => {
    if (user && expoToken) {
      updateTokenPreferences();
    }
  }, [pushEnabled, emailEnabled]);

  const updateTokenPreferences = async () => {
    if (!user || !expoToken) return;

    try {
      await supabase
        .from('device_tokens')
        .update({
          enabled: pushEnabled,
          email_enabled: emailEnabled,
        })
        .eq('user_id', user.id)
        .eq('token', expoToken);
    } catch (error) {
      console.error('Error updating token preferences:', error);
    }
  };

  // Clean up tokens when user logs out
  useEffect(() => {
    if (!isLoggedIn && expoToken) {
      // Optionally disable notifications when logged out
      setPushEnabled(false);
    }
  }, [isLoggedIn]);

  const value = {
    pushEnabled,
    emailEnabled,
    expoToken,
    permissionsGranted,
    isLoading,
    isExpoGo,
    setPushEnabled,
    setEmailEnabled,
    requestPermissions,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

/**
 * Hook to access notification context
 * @returns {Object} { pushEnabled, emailEnabled, expoToken, permissionsGranted, isLoading, setPushEnabled, setEmailEnabled, requestPermissions }
 */
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}