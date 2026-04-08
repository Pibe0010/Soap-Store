import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ContactScreen from '../ContactScreen';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockOpenURL = jest.fn(() => Promise.resolve());

jest.mock('react-native', () => ({
  Linking: { openURL: mockOpenURL },
  Dimensions: { get: () => ({ width: 375, height: 667 }) },
  StyleSheet: { create: (s) => s },
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  Image: 'Image',
  Alert: { alert: jest.fn() },
  Animated: {
    timing: () => ({ start: (cb) => cb && cb() }),
    parallel: (animations) => ({ start: (cb) => cb && cb() }),
    Value: class { constructor(val) { this._val = val; } setValue() {} },
  },
}));

jest.mock('react-native/Libraries/Image/Image', () => 'Image');

describe('ContactScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<ContactScreen />);
    expect(getByPlaceholderText('Your name')).toBeTruthy();
    expect(getByPlaceholderText('your@email.com')).toBeTruthy();
    expect(getByPlaceholderText('Your message...')).toBeTruthy();
    expect(getByText('Send')).toBeTruthy();
  });

  it('renders contact information', () => {
    const { getByText } = render(<ContactScreen />);
    expect(getByText('Find Us')).toBeTruthy();
    expect(getByText('+1 (555) 123-4567')).toBeTruthy();
    expect(getByText('info@soapstore.com')).toBeTruthy();
    expect(getByText('123 Green Lane, Nature City, NC 10001')).toBeTruthy();
  });

  it('renders social media buttons', () => {
    const { getByText } = render(<ContactScreen />);
    expect(getByText('Follow Us')).toBeTruthy();
  });

  it('shows validation errors when submitting empty form', async () => {
    const { getByText } = render(<ContactScreen />);
    fireEvent.press(getByText('Send'));

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Message is required')).toBeTruthy();
    });
  });

  it('shows email format error for invalid email', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<ContactScreen />);

    fireEvent.changeText(getByPlaceholderText('Your name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('your@email.com'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Your message...'), 'Hello');
    fireEvent.press(getByText('Send'));

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
      expect(queryByText('Name is required')).toBeNull();
      expect(queryByText('Message is required')).toBeNull();
    });
  });

  it('opens mailto: link on valid form submission', async () => {
    const { getByPlaceholderText, getByText } = render(<ContactScreen />);

    fireEvent.changeText(getByPlaceholderText('Your name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('your@email.com'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Your message...'), 'Hello there');
    fireEvent.press(getByText('Send'));

    await waitFor(() => {
      expect(mockOpenURL).toHaveBeenCalledWith(
        expect.stringContaining('mailto:info@soapstore.com')
      );
    });
  });

  it('clears form after successful submission', async () => {
    const { getByPlaceholderText, getByText } = render(<ContactScreen />);

    const nameInput = getByPlaceholderText('Your name');
    const emailInput = getByPlaceholderText('your@email.com');
    const messageInput = getByPlaceholderText('Your message...');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(messageInput, 'Hello');
    fireEvent.press(getByText('Send'));

    await waitFor(() => {
      expect(nameInput.props.value).toBe('');
      expect(emailInput.props.value).toBe('');
      expect(messageInput.props.value).toBe('');
    });
  });
});
