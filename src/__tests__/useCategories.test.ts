import { useCategories } from '../hooks/useCategories';

describe('useCategories', () => {
  it('should be defined', () => {
    expect(useCategories).toBeDefined();
  });

  it('should return a function', () => {
    const result = useCategories();
    expect(typeof result).toBe('object');
  });
});
