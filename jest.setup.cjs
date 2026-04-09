// MOCK EXPO WINTER MODULES FIRST - before any expoRequire
// These must be set up before the expo preset tries to load them
jest.mock('expo/src/winter/FormData', () => ({
  installFormDataPatch: jest.fn(),
  default: { append: jest.fn() },
}));

jest.mock('expo/src/winter/runtime.native.ts', () => ({}));
jest.mock('expo/src/winter', () => ({ default: {} }));
jest.mock('expo-modules-core/src/polyfill/dangerous-internal', () => ({
  installExpoGlobalPolyfill: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Dimensions directly to avoid native module chain issues
jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
  const dimensions = {
    window: { width: 375, height: 667, scale: 2, fontScale: 2 },
    screen: { width: 375, height: 667, scale: 2, fontScale: 2 },
  };
  return {
    __esModule: true,
    default: {
      get: jest.fn((dim) => dim ? dimensions[dim] : dimensions),
      addEventListener: jest.fn(() => ({ remove: jest.fn() })),
      removeEventListener: jest.fn(),
      set: jest.fn(),
    },
  };
});

// Mock expo virtual env module
jest.mock('expo/virtual/env.js', () => ({ env: {} }), { virtual: true });
