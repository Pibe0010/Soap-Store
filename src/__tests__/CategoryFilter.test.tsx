import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryFilter from '../components/CategoryFilter';

const mockCategories = ['Soap', 'Shampoo', 'Lotion'];

jest.mock('@react-native-picker/picker', () => {
  const { View, Text } = require('react-native');
  return {
    Picker: ({ children, onValueChange, selectedValue }) => (
      <View testID="picker">{children}</View>
    ),
    Picker: {
      Item: ({ label, value }) => <Text>{label}</Text>,
    },
  };
});

describe('CategoryFilter', () => {
  it('renders selected category on button', () => {
    const { getByText } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Soap"
        onCategoryChange={jest.fn()}
      />
    );
    expect(getByText('Soap')).toBeTruthy();
  });

  it('renders "Categorías" instead of "All Categories"', () => {
    const { getByText } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Categorías"
        onCategoryChange={jest.fn()}
      />
    );
    expect(getByText('Categorías')).toBeTruthy();
  });

  it('shows Spanish modal title "Seleccionar categoría"', () => {
    const { getByText } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Categorías"
        onCategoryChange={jest.fn()}
      />
    );
    fireEvent.press(getByText('Categorías'));
    expect(getByText('Seleccionar categoría')).toBeTruthy();
  });

  it('shows Spanish "Cerrar" close button', () => {
    const { getByText } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Categorías"
        onCategoryChange={jest.fn()}
      />
    );
    fireEvent.press(getByText('Categorías'));
    expect(getByText('Cerrar')).toBeTruthy();
  });

  it('closes modal when Cerrar is pressed', () => {
    const { getByText, queryByText } = render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Categorías"
        onCategoryChange={jest.fn()}
      />
    );
    fireEvent.press(getByText('Categorías'));
    expect(getByText('Seleccionar categoría')).toBeTruthy();
    fireEvent.press(getByText('Cerrar'));
    expect(queryByText('Seleccionar categoría')).toBeNull();
  });

  it('handles empty categories array', () => {
    const { getByText } = render(
      <CategoryFilter
        categories={[]}
        selectedCategory="Categorías"
        onCategoryChange={jest.fn()}
      />
    );
    expect(getByText('Categorías')).toBeTruthy();
  });
});
