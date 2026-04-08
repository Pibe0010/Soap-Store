import React, { createContext, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFavoritesDB } from '../hooks/useFavoritesDB';

/**
 * Context for managing user favorites with database persistence.
 * Replaces AsyncStorage-backed implementation with Supabase favorites table.
 * 
 * @typedef {Object} FavoritesContextValue
 * @property {Array} favorites - Array of favorite product objects
 * @property {Function} toggleFavorite - Toggles a product in favorites
 * @property {Function} removeFavorite - Removes a product from favorites by ID
 * @property {Function} isFavorite - Checks if a product is in favorites
 */
const FavoritesContext = createContext();

/**
 * Provider component that manages favorites state with Supabase persistence.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const { 
    favorites, 
    toggleFavorite, 
    removeFavorite, 
    isFavorite,
    loading,
    error
  } = useFavoritesDB();

  // Log errors for debugging (in production, consider sending to error tracking)
  if (error) {
    console.error('[FavoritesContext] Error:', error);
  }

  // Provide the same interface as the previous AsyncStorage-based implementation
  const value = {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites context. Must be used within a FavoritesProvider.
 * 
 * @returns {Object} Favorites state and actions { favorites, toggleFavorite, removeFavorite, isFavorite }
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

export { FavoritesContext };