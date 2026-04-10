// Mock Supabase services
jest.mock('./src/services/index', () => ({
  getSession: jest.fn().mockResolvedValue(null),
  signInWithEmailPassword: jest.fn().mockResolvedValue({ user: null, session: null }),
  signUpWithEmailPassword: jest.fn().mockResolvedValue({ user: null, session: null }),
  signInWithGoogle: jest.fn().mockResolvedValue({ user: null, session: null }),
  signInWithApple: jest.fn().mockResolvedValue({ user: null, session: null }),
  signOut: jest.fn().mockResolvedValue(undefined),
  resetPasswordForEmail: jest.fn().mockResolvedValue(undefined),
  updateUserPassword: jest.fn().mockResolvedValue({}),
  getUser: jest.fn().mockResolvedValue(null),
  getProducts: jest.fn().mockResolvedValue({ data: [], total: 0 }),
  getProductById: jest.fn().mockResolvedValue(null),
  getCategories: jest.fn().mockResolvedValue([]),
  getUserById: jest.fn().mockResolvedValue(null),
  createUser: jest.fn().mockResolvedValue({}),
  updateUser: jest.fn().mockResolvedValue({}),
  getAddressesByUserId: jest.fn().mockResolvedValue([]),
  createAddress: jest.fn().mockResolvedValue({}),
  updateAddress: jest.fn().mockResolvedValue({}),
  deleteAddress: jest.fn().mockResolvedValue(undefined),
  getFavoritesByUserId: jest.fn().mockResolvedValue([]),
  addFavorite: jest.fn().mockResolvedValue({}),
  removeFavorite: jest.fn().mockResolvedValue(undefined),
  isFavorite: jest.fn().mockResolvedValue(false),
  getOrdersByUserId: jest.fn().mockResolvedValue({ data: [], total: 0 }),
  getOrderById: jest.fn().mockResolvedValue(null),
  createOrder: jest.fn().mockResolvedValue({}),
  updateOrder: jest.fn().mockResolvedValue({}),
  getOrderItemsByOrderId: jest.fn().mockResolvedValue([]),
  createOrderItem: jest.fn().mockResolvedValue({}),
  updateOrderItem: jest.fn().mockResolvedValue({}),
  deleteOrderItem: jest.fn().mockResolvedValue(undefined),
  supabase: {
    auth: {
      signUp: jest.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
      signInWithOAuth: jest.fn().mockResolvedValue({ data: { user: null, session: null }, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      resetPasswordForEmail: jest.fn().mockResolvedValue({ error: null }),
      verifyOTP: jest.fn().mockResolvedValue({ data: {}, error: null }),
      signInWithOtp: jest.fn().mockResolvedValue({ error: null }),
      updateUser: jest.fn().mockResolvedValue({ data: {}, error: null }),
      getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      resend: jest.fn().mockResolvedValue({ error: null }),
    },
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      match: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: null }),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
      then: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
  },
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    NavigationContainer: ({ children }) => children,
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

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
