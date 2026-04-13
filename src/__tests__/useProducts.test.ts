// Simplest test - just verify module can be imported
import { useProducts } from '../hooks/useProducts';

describe('useProducts', () => {
  it('should be defined', () => {
    expect(useProducts).toBeDefined();
  });
});