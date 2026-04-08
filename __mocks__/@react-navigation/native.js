// Mock for @react-navigation/native
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  replace: jest.fn(),
  setOptions: jest.fn(),
};

const mockRoute = {
  params: {},
  key: 'test-key',
  name: 'TestScreen',
};

export const useNavigation = () => mockNavigation;
export const useRoute = () => mockRoute;
export const NavigationContainer = ({ children }) => children;

export const __mockNavigation = mockNavigation;
export const __setMockRouteParams = (params) => {
  mockRoute.params = params;
};
export const __resetMocks = () => {
  mockNavigation.navigate.mockClear();
  mockNavigation.goBack.mockClear();
  mockNavigation.push.mockClear();
  mockNavigation.pop.mockClear();
  mockNavigation.replace.mockClear();
  mockNavigation.setOptions.mockClear();
  mockRoute.params = {};
};
