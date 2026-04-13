// Simplest possible test - just verify the module can be imported
import { useCategories } from '../hooks/useCategories';

describe('useCategories', () => {
  it('should be defined', () => {
    expect(useCategories).toBeDefined();
  });
});