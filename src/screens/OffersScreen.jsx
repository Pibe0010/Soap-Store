import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { t } from '../constants/translations';
import { theme } from '../styles/theme';

/**
 * Placeholder screen for promotions and offers.
 * Displays a Spanish empty state message when no offers are available.
 *
 * @returns {JSX.Element}
 */
export default function OfertasScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <Ionicons name="pricetag-outline" size={80} color={theme.colors.disabled} />
      <Text style={{
        fontSize: 18,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: 16,
      }}>
        {t.ofertas.empty}
      </Text>
    </View>
  );
}
