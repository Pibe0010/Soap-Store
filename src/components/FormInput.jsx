import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function FormInput({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  autoCapitalize = 'none',
  keyboardType = 'default',
  placeholderTextColor = '#aaa',
  error,
  style,
  ...props 
}) {
  const { theme } = useTheme();
  
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholderTextColor={placeholderTextColor}
        style={[
          {
            borderWidth: 1,
            borderColor: error ? theme.colors.error : '#ccc',
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}
