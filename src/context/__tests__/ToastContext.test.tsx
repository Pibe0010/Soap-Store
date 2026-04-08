import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ToastProvider, useToast } from '../ToastContext';

const wrapper = ({ children }) => <ToastProvider>{children}</ToastProvider>;

describe('ToastContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts with no toast visible', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    expect(result.current.visible).toBe(false);
    expect(result.current.message).toBe('');
    expect(result.current.actionLabel).toBeNull();
    expect(result.current.onAction).toBeNull();
  });

  it('shows toast with message', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Test message');
    });
    expect(result.current.visible).toBe(true);
    expect(result.current.message).toBe('Test message');
  });

  it('shows toast with action label and callback', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Message', 'Action', callback);
    });
    expect(result.current.visible).toBe(true);
    expect(result.current.actionLabel).toBe('Action');
    expect(result.current.onAction).toBe(callback);
  });

  it('hides toast on hideToast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Test');
    });
    expect(result.current.visible).toBe(true);
    act(() => {
      result.current.hideToast();
    });
    expect(result.current.visible).toBe(false);
    expect(result.current.message).toBe('');
  });

  it('auto-dismisses after timeout', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Test');
    });
    expect(result.current.visible).toBe(true);
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(result.current.visible).toBe(false);
  });

  it('clears previous timer on new showToast', () => {
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('First');
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    act(() => {
      result.current.showToast('Second');
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.visible).toBe(true);
    expect(result.current.message).toBe('Second');
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.visible).toBe(false);
  });

  it('action callback executes', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useToast(), { wrapper });
    act(() => {
      result.current.showToast('Msg', 'Act', callback);
    });
    act(() => {
      result.current.onAction();
    });
    expect(callback).toHaveBeenCalled();
  });
});
