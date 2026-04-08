import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAVORITES_STORAGE_KEY } from '../constants/storageKeys';

/**
 * Loads the favorites array from AsyncStorage.
 * @returns {Promise<Array>} Array of favorite product objects, or empty array on error
 */
export async function loadFavorites() {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Saves the favorites array to AsyncStorage.
 * @param {Array} favorites - Array of favorite product objects
 * @returns {Promise<void>}
 */
export async function saveFavorites(favorites) {
  try {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Silently fail — next save will retry
  }
}
