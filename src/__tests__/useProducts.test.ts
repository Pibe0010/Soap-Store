import { useProducts } from '../hooks/useProducts';
import type { ProductPage } from '../types/product';

describe('useProducts', () => {
  it('should be defined', () => {
    expect(useProducts).toBeDefined();
  });

  it('should return a function', () => {
    const result = useProducts();
    expect(typeof result).toBe('object');
  });
});
