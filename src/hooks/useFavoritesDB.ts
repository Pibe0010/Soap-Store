import { useState, useEffect, useCallback } from 'react';
import { getFavoritesByUserId, addFavorite, removeFavorite } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

/**
 * Hook that provides database-backed favorites functionality
 * 
 * @returns {Object} Favorites state and actions
 */
export const useFavoritesDB = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load favorites when user changes
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const favs = await getFavoritesByUserId(user.id);
        setFavorites(favs);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  // Toggle favorite - optimistically update UI, then sync with DB
  const toggleFavorite = useCallback(async (product: any) => {
    if (!user) return;

    const productId = product?.id;
    if (!productId) {
      setError('Product ID is missing');
      return;
    }

    try {
      const isCurrentlyFavorited = favorites.some(
        (fav) => fav.productId === productId
      );

      // Optimistically update UI
      if (isCurrentlyFavorited) {
        setFavorites((prev) => prev.filter((fav) => fav.productId !== productId));
        await removeFavorite(user.id, productId);
      } else {
        setFavorites((prev) => [...prev, { productId, id: productId }]);
        await addFavorite({
          userId: user.id,
          productId,
        });
      }

      // Refresh from DB to ensure consistency
      const freshFavorites = await getFavoritesByUserId(user.id);
      setFavorites(freshFavorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle favorite');
      try {
        const freshFavorites = await getFavoritesByUserId(user.id);
        setFavorites(freshFavorites);
      } catch {
        // Silent fail on refresh after error
      }
      throw err;
    }
  }, [user, favorites]);

  // Remove favorite by product ID
  const removeFavoriteById = useCallback(async (productId: string) => {
    if (!user) return;

    if (!productId) {
      setError('Product ID is required to remove favorite');
      return;
    }

    try {
      setFavorites((prev) => prev.filter((fav) => fav.productId !== productId));
      await removeFavorite(user.id, productId);

      const freshFavorites = await getFavoritesByUserId(user.id);
      setFavorites(freshFavorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
      try {
        const freshFavorites = await getFavoritesByUserId(user.id);
        setFavorites(freshFavorites);
      } catch {
        // Silent fail on refresh after error
      }
      throw err;
    }
  }, [user]);

  // Check if product is favorited
  const isFavorited = useCallback((productId: string) => {
    if (!productId) return false;
    return favorites.some((fav) => fav.productId === productId);
  }, [favorites]);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    removeFavorite: removeFavoriteById,
    isFavorite: isFavorited,
  };
};

export default useFavoritesDB;
