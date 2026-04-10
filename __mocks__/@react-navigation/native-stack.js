// Mock for @react-navigation/native-stack
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockSetOptions = jest.fn();

export const createNativeStackNavigator = () => ({
  Navigator: ({ children }) => children,
  Screen: ({ children }) => children,
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    push: mockPush,
    replace: mockReplace,
    setOptions: mockSetOptions,
  }),
  useRoute: () => ({
    params: {},
  }),
});

export const __resetMocks = () => {
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  mockPush.mockClear();
  mockReplace.mockClear();
  mockSetOptions.mockClear();
};
