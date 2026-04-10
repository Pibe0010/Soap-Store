import { render } from '@testing-library/react-native';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Soap',
  description: 'A test soap',
  price: 5.99,
  category: 'Test',
  imageUrl: 'http://example.com/image.jpg',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

describe('ProductCard', () => {
  it('should import correctly', () => {
    expect(ProductCard).toBeDefined();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProductCard product={mockProduct} />);
    expect(toJSON()).toBeDefined();
  });
});
