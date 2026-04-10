import { render } from '@testing-library/react-native';
import ProductDetailScreen from '../screens/ProductDetailScreen';

describe('ProductDetailScreen', () => {
  it('should import correctly', () => {
    expect(ProductDetailScreen).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProductDetailScreen />);
    expect(toJSON()).toBeDefined();
  });
});
