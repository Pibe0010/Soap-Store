import { render } from '@testing-library/react-native';
import ProductListScreen from '../screens/ProductListScreen';

describe('ProductListScreen', () => {
  it('should import correctly', () => {
    expect(ProductListScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProductListScreen />);
    expect(toJSON()).toBeDefined();
  });
});
