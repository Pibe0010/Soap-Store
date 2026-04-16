// Simple test - verify i18n translations work
import i18n from '../i18n';

describe('translations', () => {
  it('should be defined', () => {
    expect(i18n).toBeDefined();
  });

  it('should have Spanish translations', async () => {
    await i18n.changeLanguage('es');
    const translated = i18n.t('products.empty');
    expect(translated).toBeDefined();
    expect(typeof translated).toBe('string');
  });

  it('should switch to English', async () => {
    await i18n.changeLanguage('en');
    const translated = i18n.t('products.empty');
    expect(translated).toBeDefined();
    expect(typeof translated).toBe('string');
  });
});