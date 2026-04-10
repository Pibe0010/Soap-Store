import { render } from '@testing-library/react-native';
import AddToCartButton from '../components/AddToCartButton';

describe('AddToCartAuth Integration', () => {
  it('should import AddToCartButton correctly', () => {
    expect(AddToCartButton).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<AddToCartButton productId="1" />);
    expect(toJSON()).toBeDefined();
  });
});
