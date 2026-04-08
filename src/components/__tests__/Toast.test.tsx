import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from '../Toast';

const mockHideToast = jest.fn();

jest.mock('../../context/ToastContext', () => ({
  useToast: () => ({
    visible: true,
    message: 'Test message',
    actionLabel: 'Action',
    onAction: mockOnAction,
    hideToast: mockHideToast,
  }),
}));

const mockOnAction = jest.fn();

describe('Toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders message when visible', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Toast />
      </NavigationContainer>
    );
    expect(getByText('Test message')).toBeTruthy();
  });

  it('renders action label', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Toast />
      </NavigationContainer>
    );
    expect(getByText('Action')).toBeTruthy();
  });

  it('calls hideToast on body press', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Toast />
      </NavigationContainer>
    );
    fireEvent.press(getByText('Test message'));
    expect(mockHideToast).toHaveBeenCalled();
  });

  it('returns null when not visible', () => {
    const { useToast } = require('../../context/ToastContext');
    useToast.mockReturnValue({
      visible: false,
      message: '',
      actionLabel: null,
      onAction: null,
      hideToast: mockHideToast,
    });
    const { toJSON } = render(
      <NavigationContainer>
        <Toast />
      </NavigationContainer>
    );
    expect(toJSON()).toBeNull();
  });
});
