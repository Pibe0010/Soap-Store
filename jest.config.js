module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^expo/virtual/env.js$': '<rootDir>/__mocks__/expo/virtual/env.js',
    '^expo/src/winter/(.*)$': '<rootDir>/__mocks__/expo/src/winter/$1',
    '^expo/src/winter$': '<rootDir>/__mocks__/expo/src/winter/index.ts',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
  modulePathIgnorePatterns: [],
  roots: ['<rootDir>/src'],
  resolver: undefined,
};
