import React, { useEffect } from 'react';
import { Pressable, Animated } from 'react-native';
import styled from 'styled-components/native';

const ToggleWrapper = styled.View`
  width: 50px;
  height: 28px;
  border-radius: 14px;
  justify-content: center;
  padding-horizontal: 3px;
`;

const Thumb = styled(Animated.View)`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: #FFFFFF;
`;

/**
 * Reusable Toggle Switch component with iOS-style animation
 * @param {boolean} active - Current toggle state
 * @param {Function} onPress - Callback when pressed
 * @param {boolean} disabled - Whether disabled
 */
export default function ToggleSwitch({ active = false, onPress, disabled = false }) {
  const animatedValue = React.useRef(new Animated.Value(active ? 22 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: active ? 22 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [active, animatedValue]);

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  // Determine background color based on state - use theme from styled-components
  const backgroundColor = disabled 
    ? '#cccccc' 
    : (active ? '#4CAF50' : '#b3b3b3');

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <ToggleWrapper style={{ backgroundColor }}>
        <Thumb
          style={{
            transform: [{ translateX: animatedValue }],
          }}
        />
      </ToggleWrapper>
    </Pressable>
  );
}