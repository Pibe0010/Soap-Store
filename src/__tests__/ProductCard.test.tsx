// Simplest possible test - just verify the module can be imported
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  it('should be defined', () => {
    expect(ProductCard).toBeDefined();
  });
});