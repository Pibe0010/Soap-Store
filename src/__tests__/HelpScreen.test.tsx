import { render } from '@testing-library/react-native';
import HelpScreen from '../screens/HelpScreen';

describe('HelpScreen', () => {
  it('should import correctly', () => {
    expect(HelpScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<HelpScreen />);
    expect(toJSON()).toBeDefined();
  });
});
