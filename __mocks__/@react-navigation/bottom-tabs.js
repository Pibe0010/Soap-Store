// Mock for @react-navigation/bottom-tabs
export const createBottomTabNavigator = () => ({
  Navigator: ({ children }) => children,
  Screen: ({ children }) => children,
});

export const useBottomTabNavigator = () => ({});
