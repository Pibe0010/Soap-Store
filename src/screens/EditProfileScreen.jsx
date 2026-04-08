import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/index';
import { t } from '../constants/translations';
import { theme } from '../styles/theme';
import {
  Container,
  Header,
  AvatarContainer,
  AvatarImage,
  AvatarIcon,
  HeaderTitle,
  FormContainer,
  FormGroup,
  Label,
  Input,
  InputDisabled,
  SaveButton,
  SaveButtonText,
  ErrorText,
} from '../styles/EditProfileScreenStyles';

/**
 * Edit profile screen allowing users to update their name, phone, and avatar.
 * Email is read-only as it's tied to authentication.
 *
 * @returns {JSX.Element}
 */
export default function EditProfileScreen() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.userMetadata?.name || '');
  const [phone, setPhone] = useState(user?.userMetadata?.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.userMetadata?.avatar_url || '');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Función para elegir y subir imagen
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUploading(true);
      try {
        const uri = result.assets[0].uri;
        const fileName = `avatar-${user.id}-${Date.now()}.jpg`;

        // 1. Leer la imagen como base64 (funciona con content:// en Android)
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: 'base64',
        });

        // 2. Convertir base64 a Uint8Array (formato binario que Supabase acepta)
        const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

        // 3. Subir a Supabase Storage (bucket: 'avatars')
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, bytes, {
            contentType: 'image/jpeg',
            upsert: true,
          });

        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          throw uploadError;
        }

        // 4. Obtener URL pública
        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        const newAvatarUrl = publicUrlData.publicUrl;
        setAvatarUrl(newAvatarUrl);

        // 5. Actualizar metadata del usuario
        await supabase.auth.updateUser({
          data: { avatar_url: newAvatarUrl },
        });

        Alert.alert('Éxito', 'Foto de perfil actualizada');
      } catch (err) {
        console.error('Error uploading avatar:', err);
        Alert.alert('Error', 'No se pudo subir la imagen. Verificá que el bucket "avatars" exista en Supabase Storage.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setError(null);
    setSaving(true);

    try {
      // Actualizar datos en auth.users
      await supabase.auth.updateUser({
        data: { name: fullName.trim(), phone: phone.trim(), avatar_url: avatarUrl },
      });

      // Actualizar en public.users
      await supabase
        .from('users')
        .update({
          name: fullName.trim(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      Alert.alert('✅', t.perfil.editProfile.success);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(t.perfil.editProfile.error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <Header>
        <AvatarContainer onPress={pickImage} disabled={uploading}>
          {avatarUrl ? (
            <AvatarImage source={{ uri: avatarUrl }} />
          ) : (
            <Ionicons name="person" size={56} color={theme.colors.primary} />
          )}
          {uploading ? (
            <ActivityIndicator size="small" color="#fff" style={{ position: 'absolute' }} />
          ) : (
            <AvatarIcon>
              <Ionicons name="camera" size={16} color={theme.colors.white} />
            </AvatarIcon>
          )}
        </AvatarContainer>
        <HeaderTitle>{t.perfil.editProfile.title}</HeaderTitle>
      </Header>

      <FormContainer>
        <FormGroup>
          <Label>{t.perfil.editProfile.fullName}</Label>
          <Input
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              setError(null);
            }}
            placeholder="Tu nombre completo"
            autoCapitalize="words"
          />
          {error && <ErrorText>{error}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>{t.perfil.editProfile.email}</Label>
          <InputDisabled
            value={user?.email || ''}
            editable={false}
            selectTextOnFocus={false}
          />
          <ErrorText>{t.perfil.editProfile.emailHint}</ErrorText>
        </FormGroup>

        <FormGroup>
          <Label>{t.perfil.editProfile.phone}</Label>
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="+54 11 1234-5678"
            keyboardType="phone-pad"
          />
        </FormGroup>

        <SaveButton onPress={handleSave} disabled={saving}>
          <SaveButtonText>
            {saving ? t.perfil.editProfile.saving : t.perfil.editProfile.save}
          </SaveButtonText>
        </SaveButton>
      </FormContainer>
    </Container>
  );
}
