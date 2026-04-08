import React, { createContext, useContext, useReducer, useRef, useCallback } from 'react';

/**
 * @typedef {Object} ToastState
 * @property {boolean} visible - Whether the toast is currently visible
 * @property {string} message - The message to display
 * @property {string|null} actionLabel - Label for the action button (e.g., "Iniciar sesión")
 * @property {Function|null} onAction - Callback when the action button is pressed
 */

const initialState = {
  visible: false,
  message: '',
  actionLabel: null,
  onAction: null,
};

const ToastActions = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};

function toastReducer(state, action) {
  switch (action.type) {
    case ToastActions.SHOW:
      return {
        visible: true,
        message: action.payload.message,
        actionLabel: action.payload.actionLabel || null,
        onAction: action.payload.onAction || null,
      };
    case ToastActions.HIDE:
      return initialState;
    default:
      return state;
  }
}

const ToastContext = createContext();

const TOAST_AUTO_DISMISS_MS = 4000;

/**
 * Provider component for toast notification state management.
 * Renders above all screens in the component tree.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);
  const timerRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Shows a toast notification at the top of the screen.
   * @param {string} message - The message to display
   * @param {string} [actionLabel] - Optional action button label
   * @param {Function} [onAction] - Optional callback for the action button
   */
  const showToast = useCallback((message, actionLabel, onAction) => {
    clearTimer();
    dispatch({ type: ToastActions.SHOW, payload: { message, actionLabel, onAction } });
    timerRef.current = setTimeout(() => {
      dispatch({ type: ToastActions.HIDE });
      timerRef.current = null;
    }, TOAST_AUTO_DISMISS_MS);
  }, [clearTimer]);

  /**
   * Hides the current toast notification.
   */
  const hideToast = useCallback(() => {
    clearTimer();
    dispatch({ type: ToastActions.HIDE });
  }, [clearTimer]);

  const value = {
    visible: state.visible,
    message: state.message,
    actionLabel: state.actionLabel,
    onAction: state.onAction,
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast context. Must be used within a ToastProvider.
 * @returns {Object} Toast state and actions
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export { ToastContext };
