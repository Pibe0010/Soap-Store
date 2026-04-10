import { render } from '@testing-library/react-native';
import AppNavigator from '../navigation/AppNavigator';

describe('AppNavigator', () => {
  it('should import correctly', () => {
    expect(AppNavigator).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<AppNavigator />);
    expect(toJSON()).toBeDefined();
  });
});
