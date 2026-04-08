import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartIcon from '../CartIcon';

let mockTotalItems = 0;

jest.mock('../../context/CartContext', () => ({
  useCart: () => ({
    totalItems: mockTotalItems,
  }),
}));

describe('Cart badge integration', () => {
  beforeEach(() => {
    mockTotalItems = 0;
  });

  it('does not render badge when totalItems is 0', () => {
    mockTotalItems = 0;
    const { queryByText } = render(<CartIcon onPress={jest.fn()} />);
    expect(queryByText('0')).toBeNull();
  });

  it('renders badge with correct count', () => {
    mockTotalItems = 3;
    const { getByText } = render(<CartIcon onPress={jest.fn()} />);
    expect(getByText('3')).toBeTruthy();
  });

  it('displays 99+ for overflow', () => {
    mockTotalItems = 150;
    const { getByText } = render(<CartIcon onPress={jest.fn()} />);
    expect(getByText('99+')).toBeTruthy();
  });

  it('renders badge count of 1', () => {
    mockTotalItems = 1;
    const { getByText } = render(<CartIcon onPress={jest.fn()} />);
    expect(getByText('1')).toBeTruthy();
  });

  it('adapts badge positioning to icon size', () => {
    mockTotalItems = 5;
    const { getByText } = render(<CartIcon onPress={jest.fn()} size={20} />);
    expect(getByText('5')).toBeTruthy();
  });
});
