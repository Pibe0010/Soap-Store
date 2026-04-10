import { t } from '../constants/translations';

describe('translations', () => {
  it('should import correctly', () => {
    expect(t).toBeDefined();
  });

  it('should have tabs property', () => {
    expect(t.tabs).toBeDefined();
  });
});
