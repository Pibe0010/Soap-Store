import { render } from '@testing-library/react-native';
import AuthMenuModal from '../components/AuthMenuModal';

describe('AuthMenuModal', () => {
  it('should import correctly', () => {
    expect(AuthMenuModal).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<AuthMenuModal visible={false} onClose={() => {}} />);
    expect(toJSON()).toBeDefined();
  });
});
