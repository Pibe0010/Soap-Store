// src/services/entities/addressesService.js
import { supabase, mapAddressFromDB } from '../supabaseClient';

/**
 * Addresses CRUD operations
 */

export const getAddressesByUserId = async (userId) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ? data.map(mapAddressFromDB) : [];
};

export const getAddressById = async (id) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const createAddress = async (addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .insert([
      {
        user_id: addressData.userId,
        label: addressData.label,
        street_address: addressData.streetAddress,
        apartment_unit: addressData.apartmentUnit,
        city: addressData.city,
        state_province: addressData.stateProvince,
        postal_code: addressData.postalCode,
        country: addressData.country,
        is_default: addressData.isDefault,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const updateAddress = async (id, addressData) => {
  const { data, error } = await supabase
    .from('addresses')
    .update({
      label: addressData.label,
      street_address: addressData.streetAddress,
      apartment_unit: addressData.apartmentUnit,
      city: addressData.city,
      state_province: addressData.stateProvince,
      postal_code: addressData.postalCode,
      country: addressData.country,
      is_default: addressData.isDefault,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapAddressFromDB(data);
};

export const deleteAddress = async (id) => {
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
};