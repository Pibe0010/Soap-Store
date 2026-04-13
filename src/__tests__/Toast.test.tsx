import React from 'react';
import { render } from '@testing-library/react-native';
import { ToastProvider } from '../context/ToastContext';
import Toast from '../components/Toast';

const wrapper = ({ children }) => <ToastProvider>{children}</ToastProvider>;

describe('Toast', () => {
  it('should import correctly', () => {
    expect(Toast).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<Toast />, { wrapper });
    expect(toJSON()).toBeDefined();
  });
});
