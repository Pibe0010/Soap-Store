// src/services/entities/usersService.js
import { supabase, mapUserFromDB } from '../supabaseClient';

/**
 * Users CRUD operations
 */

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data ? mapUserFromDB(data) : null;
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data ? mapUserFromDB(data) : null;
};

export const createUser = async (userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        email: userData.email,
        full_name: userData.fullName,
        phone: userData.phone,
        avatar_url: userData.avatarUrl,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapUserFromDB(data);
};

export const updateUser = async (id, userData) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      full_name: userData.fullName,
      phone: userData.phone,
      avatar_url: userData.avatarUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return mapUserFromDB(data);
};