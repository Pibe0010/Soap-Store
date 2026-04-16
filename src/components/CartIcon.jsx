import React, { useRef, useEffect } from 'react';
import { Animated, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

/**
 * Cart icon button with item count badge and bounce animation on update.
 * Badge shows current cart item count, "99+" for 100+.
 * Animates with spring bounce when item count changes.
 * Icon size adapts to the provided `size` prop for tab bar consistency.
 *
 * @param {Object} props
 * @param {Function} props.onPress - Callback fired when icon is tapped
 * @param {number} [props.size=24] - Icon size in pixels, constrained to tab bar dimensions
 * @returns {JSX.Element}
 */
export default function CartIcon({ size = 24, testID, focused }) {
  const { totalItems } = useCart();
  const { theme } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    if (totalItems !== prevTotal.current) {
      prevTotal.current = totalItems;
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.2,
          friction: 3,
          tension: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 3,
          tension: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [totalItems]);

  const badgeOffsetX = Math.round(size * -0.33);
  const badgeOffsetY = Math.round(size * -0.29);
  const badgeMinWidth = Math.round(size * 0.75);
  const badgeHeight = Math.round(size * 0.75);
  const badgeFontSize = Math.round(size * 0.42);

  return (
    <View testID={testID} style={{ position: 'relative', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center', transform: [{ scale }] }}>
        <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={theme.colors.primary} />
        {totalItems > 0 && (
          <View style={{
            position: 'absolute',
            top: badgeOffsetY,
            right: badgeOffsetX,
            backgroundColor: theme.colors.error,
            borderRadius: badgeHeight / 2,
            minWidth: badgeMinWidth,
            height: badgeHeight,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 3,
          }}>
            <Text style={{
              color: theme.colors.white,
              fontSize: badgeFontSize,
              fontWeight: 'bold',
            }}>
              {totalItems > 99 ? '99+' : totalItems}
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
