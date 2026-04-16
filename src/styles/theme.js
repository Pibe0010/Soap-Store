// src/styles/theme.js

// Light theme (default)
export const lightTheme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#F44336',
    text: '#212121',
    textSecondary: '#757575',
    accent: '#0066ff',
    disabled: '#cccccc',
    white: '#FFFFFF',
    star: '#FFD700',
    warning: '#F59E0B',
    info: '#3B82F6',
    success: '#10B981',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  typography: {
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  dark: false,
};

// Dark theme
export const darkTheme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    accent: '#4DA6FF',
    disabled: '#666666',
    white: '#FFFFFF',
    star: '#FFD700',
    warning: '#F59E0B',
    info: '#3B82F6',
    success: '#10B981',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  typography: {
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  dark: true,
};

// Default theme (alias for lightTheme for backwards compatibility)
export const theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#8BC34A',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#F44336',
    text: '#212121',
    textSecondary: '#757575',
    accent: '#0066ff',
    disabled: '#cccccc',
    white: '#FFFFFF',
    star: '#FFD700',
    warning: '#F59E0B',
    info: '#3B82F6',
    success: '#10B981',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  typography: {
    fontSizes: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 24,
      xxxl: 32,
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
};
