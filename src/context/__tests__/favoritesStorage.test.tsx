import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFavorites, saveFavorites } from '../favoritesStorage';
import { FAVORITES_STORAGE_KEY } from '../../constants/storageKeys';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockProduct = { id: '1', name: 'Test', price: 9.99 };

describe('favoritesStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadFavorites', () => {
    it('returns parsed array from AsyncStorage', async () => {
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([mockProduct]));
      const result = await loadFavorites();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(FAVORITES_STORAGE_KEY);
      expect(result).toEqual([mockProduct]);
    });

    it('returns empty array when no data stored', async () => {
      AsyncStorage.getItem.mockResolvedValue(null);
      const result = await loadFavorites();
      expect(result).toEqual([]);
    });

    it('returns empty array on error', async () => {
      AsyncStorage.getItem.mockRejectedValue(new Error('fail'));
      const result = await loadFavorites();
      expect(result).toEqual([]);
    });
  });

  describe('saveFavorites', () => {
    it('writes JSON to AsyncStorage', async () => {
      await saveFavorites([mockProduct]);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        FAVORITES_STORAGE_KEY,
        JSON.stringify([mockProduct])
      );
    });

    it('handles write error silently', async () => {
      AsyncStorage.setItem.mockRejectedValue(new Error('fail'));
      await expect(saveFavorites([mockProduct])).resolves.not.toThrow();
    });
  });
});
