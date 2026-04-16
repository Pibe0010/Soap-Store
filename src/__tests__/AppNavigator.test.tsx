// Simple test - verify i18n module works
import i18n from '../i18n';

describe('i18n module', () => {
  it('should load without errors', () => {
    expect(i18n).toBeDefined();
  });
  
  it('should have translations loaded', async () => {
    // Test Spanish
    await i18n.changeLanguage('es');
    const esTranslation = i18n.t('products.title');
    expect(esTranslation).toBeDefined();
    
    // Test English
    await i18n.changeLanguage('en');
    const enTranslation = i18n.t('products.title');
    expect(enTranslation).toBeDefined();
  });
});