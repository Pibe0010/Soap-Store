import { render } from '@testing-library/react-native';
import Toast from '../components/Toast';

describe('Toast', () => {
  it('should import correctly', () => {
    expect(Toast).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<Toast />);
    expect(toJSON()).toBeDefined();
  });
});
