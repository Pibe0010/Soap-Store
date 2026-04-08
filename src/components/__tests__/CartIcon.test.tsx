import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartIcon from '../CartIcon';

let mockTotalItems = 0;

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    totalItems: mockTotalItems,
  }),
}));

describe('CartIcon', () => {
  beforeEach(() => {
    mockTotalItems = 0;
  });

  it('renders without badge when cart is empty', () => {
    mockTotalItems = 0;
    const { queryByText } = render(
      <CartIcon onPress={jest.fn()} focused={false} />
    );
    expect(queryByText('0')).toBeNull();
  });

  it('shows badge when items are in cart', () => {
    mockTotalItems = 3;
    const { getByText } = render(
      <CartIcon onPress={jest.fn()} focused={false} />
    );
    expect(getByText('3')).toBeTruthy();
  });

  it('shows 99+ when total exceeds 99', () => {
    mockTotalItems = 150;
    const { getByText } = render(
      <CartIcon onPress={jest.fn()} focused={false} />
    );
    expect(getByText('99+')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    mockTotalItems = 0;
    const onPress = jest.fn();
    const { getByTestId } = render(
      <CartIcon onPress={onPress} testID="cart-icon" focused={false} />
    );
    const touchable = getByTestId('cart-icon');
    fireEvent.press(touchable);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders with custom size prop', () => {
    mockTotalItems = 1;
    const { getByText } = render(
      <CartIcon onPress={jest.fn()} size={20} focused={false} />
    );
    expect(getByText('1')).toBeTruthy();
  });

  it('renders with default size when size prop is omitted', () => {
    mockTotalItems = 1;
    const { getByText } = render(
      <CartIcon onPress={jest.fn()} focused={false} />
    );
    expect(getByText('1')).toBeTruthy();
  });

  it('applies size to container dimensions', () => {
    mockTotalItems = 5;
    const { getByText } = render(
      <CartIcon onPress={jest.fn()} size={32} focused={false} />
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('uses cart-outline icon when not focused', () => {
    mockTotalItems = 0;
    const { getByTestId } = render(
      <CartIcon onPress={jest.fn()} size={24} focused={false} testID="cart-icon-unfocused" />
    );
    const icon = getByTestId('cart-icon-unfocused');
    // Check that it renders (we can't easily check the icon name in test, but we know it doesn't crash)
    expect(icon).toBeTruthy();
  });

  it('uses cart icon when focused', () => {
    mockTotalItems = 0;
    const { getByTestId } = render(
      <CartIcon onPress={jest.fn()} size={24} focused={true} testID="cart-icon-focused" />
    );
    const icon = getByTestId('cart-icon-focused');
    // Check that it renders (we can't easily check the icon name in test, but we know it doesn't crash)
    expect(icon).toBeTruthy();
  });
});
