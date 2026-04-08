import { useState, useEffect, useCallback } from 'react';
import { getAddressesByUserId, createAddress, updateAddress, deleteAddress } from '../services/index';
import { useAuth } from '../context/AuthContext';

/**
 * Hook for managing user addresses
 * 
 * @returns {Object} Addresses state and CRUD operations
 */
export const useAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load addresses when user changes
  const loadAddresses = useCallback(async () => {
    if (!user) {
      setAddresses([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userAddresses = await getAddressesByUserId(user.id);
      setAddresses(userAddresses);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const addAddress = useCallback(async (addressData: any) => {
    if (!user) return null;

    try {
      const newAddress = await createAddress({
        ...addressData,
        userId: user.id
      });
      
      // Update local state
      setAddresses(prev => [newAddress, ...prev]);
      return newAddress;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create address');
      throw err;
    }
  }, [user]);

  const updateAddressFn = useCallback(async (id: string, addressData: any) => {
    if (!user) return null;

    try {
      const updatedAddress = await updateAddress(id, {
        ...addressData
      });
      
      // Update local state
      setAddresses(prev => 
        prev.map(addr => addr.id === id ? updatedAddress : addr)
      );
      return updatedAddress;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update address');
      throw err;
    }
  }, [user]);

  const removeAddress = useCallback(async (id: string) => {
    if (!user) return;

    try {
      await deleteAddress(id);
      
      // Update local state
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete address');
      throw err;
    }
  }, [user]);

  return {
    addresses,
    loading,
    error,
    addAddress,
    updateAddress: updateAddressFn,
    removeAddress,
    refresh: loadAddresses,
    // Helper to get default address
    defaultAddress: addresses.find(addr => addr.isDefault) || null
  };
};

export default useAddresses;