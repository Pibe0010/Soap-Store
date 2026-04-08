import React, { useContext, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useToast } from '../context/ToastContext';
import { ToastContainer, ToastMessage, ToastAction } from '../styles/ToastStyles';
import NavigationContext from '../navigation/NavigationContext';

/**
 * Animated toast notification component.
 * Appears at the top of the screen with slide-down + fade animation.
 * Tap anywhere on the toast to dismiss.
 * If an action label is provided, tapping it triggers the action callback
 * (e.g., navigate to Login) and dismisses the toast.
 *
 * @returns {JSX.Element|null}
 */
export default function Toast() {
  const { visible, message, actionLabel, onAction, hideToast } = useToast();
  const navigationRef = useContext(NavigationContext);
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const handlePress = () => {
    hideToast();
  };

  const handleAction = () => {
    hideToast();
    if (onAction) {
      onAction();
    } else {
      navigationRef.current?.navigate('Login');
    }
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
    >
      <ToastContainer activeOpacity={0.9} onPress={handlePress}>
        <ToastMessage>{message}</ToastMessage>
        {actionLabel && (
          <ToastAction onPress={handleAction}>{actionLabel}</ToastAction>
        )}
      </ToastContainer>
    </Animated.View>
  );
}
