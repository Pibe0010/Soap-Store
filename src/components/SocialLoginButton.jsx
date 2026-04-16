import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SocialLoginButton({ provider, onPress, loading }) {
  const { theme } = useTheme();
  let iconName, backgroundColor;
  if (provider === 'google') {
    iconName = 'google';
    backgroundColor = '#dd4b39';
  } else if (provider === 'apple') {
    iconName = 'apple';
    backgroundColor = '#000000';
  } else {
    iconName = 'question';
    backgroundColor = theme.colors.textSecondary;
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={loading}
      style={[
        styles.button,
        { backgroundColor }
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
      ) : (
        <MaterialCommunityIcons name={iconName} size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
      )}
      <Text style={styles.text}>
        Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
