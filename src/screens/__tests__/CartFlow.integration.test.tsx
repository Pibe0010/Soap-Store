import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { CartProvider, useCart } from '../../context/CartContext';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

const mockProduct = {
  id: '1',
  name: 'Jabón de Lavanda',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

const mockProduct2 = {
  id: '2',
  name: 'Jabón de Romero',
  price: 12.50,
  imageUrl: 'https://example.com/rose.jpg',
};

const TestAddButton = ({ product, label }) => {
  const { addItem } = useCart();
  return (
    <TouchableOpacity onPress={() => addItem(product)} testID={`add-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestRemoveButton = ({ productId, label }) => {
  const { removeItem } = useCart();
  return (
    <TouchableOpacity onPress={() => removeItem(productId)} testID={`remove-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestClearButton = () => {
  const { clearCart } = useCart();
  return (
    <TouchableOpacity onPress={clearCart} testID="clear-btn">
      <Text>Clear</Text>
    </TouchableOpacity>
  );
};

const CartStateDisplay = () => {
  const { totalItems, totalPrice, items } = useCart();
  return (
    <View>
      <Text testID="count">{String(totalItems)}</Text>
      <Text testID="price">{String(totalPrice)}</Text>
      <Text testID="itemCount">{String(items.length)}</Text>
      {items.map(item => (
        <Text key={item.id} testID={`qty-${item.id}`}>{String(item.quantity)}</Text>
      ))}
    </View>
  );
};

describe('Cart flow integration', () => {
  it('adds product to cart and totalItems reflects count', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('count').children[0]).toBe('1');
    expect(getByTestId('itemCount').children[0]).toBe('1');
  });

  it('adds same product twice, quantity is 2', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('qty-1').children[0]).toBe('2');
    expect(getByTestId('count').children[0]).toBe('2');
  });

  it('adds different products independently', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add1" />
        <TestAddButton product={mockProduct2} label="Add2" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add1'));
    fireEvent.press(getByTestId('add-Add2'));
    expect(getByTestId('itemCount').children[0]).toBe('2');
    expect(getByTestId('count').children[0]).toBe('2');
  });

  it('removes product and badge updates to 0', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <TestRemoveButton productId="1" label="Remove" />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    expect(getByTestId('count').children[0]).toBe('1');
    fireEvent.press(getByTestId('remove-Remove'));
    expect(getByTestId('count').children[0]).toBe('0');
  });

  it('clears cart and all totals reset', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <TestAddButton product={mockProduct2} label="Add2" />
        <TestClearButton />
        <CartStateDisplay />
      </CartProvider>
    );

    fireEvent.press(getByTestId('add-Add'));
    fireEvent.press(getByTestId('add-Add2'));
    fireEvent.press(getByTestId('clear-btn'));
    expect(getByTestId('count').children[0]).toBe('0');
    expect(getByTestId('price').children[0]).toBe('0');
    expect(getByTestId('itemCount').children[0]).toBe('0');
  });
});
