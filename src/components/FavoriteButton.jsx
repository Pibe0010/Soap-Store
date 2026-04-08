import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const STAR_COLOR_DEFAULT = '#BDBDBD';
const STAR_COLOR_FAVORITE = '#FF3B30';

/**
 * Animated heart/favorite button component.
 * On press: scales to 1.3x then bounces back to 1.0x when adding a favorite,
 * or scales to 0.7x then returns to 1.0x when removing.
 * Toggles color between gray (unfilled) and red (#FF3B30).
 *
 * @param {Object} props
 * @param {Object} props.product - Product object to toggle as favorite
 * @param {string} props.product.id - Unique product identifier
 * @param {string} [props.size=28] - Icon size in pixels
 * @returns {JSX.Element}
 */
export default function FavoriteButton({ product, size = 28 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    const targetScale = fav ? 0.7 : 1.3;

    Animated.sequence([
      Animated.timing(scale, {
        toValue: targetScale,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1.0,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorite(product);
  };

  return (
    <TouchableOpacity onPress={handlePress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={fav ? 'heart' : 'heart-outline'}
          size={size}
          color={fav ? STAR_COLOR_FAVORITE : STAR_COLOR_DEFAULT}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
