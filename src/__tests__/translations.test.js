import { t } from '../constants/translations';

/**
 * Unit tests for centralized Spanish translations.
 * Verifies all required keys exist, values are non-empty Spanish strings,
 * and specific user-provided text mappings are correct.
 */
describe('translations', () => {
  describe('structure', () => {
    it('has all required top-level sections', () => {
      expect(t).toHaveProperty('tabs');
      expect(t).toHaveProperty('menu');
      expect(t).toHaveProperty('cart');
      expect(t).toHaveProperty('contact');
      expect(t).toHaveProperty('products');
      expect(t).toHaveProperty('addToCart');
      expect(t).toHaveProperty('ofertas');
      expect(t).toHaveProperty('perfil');
      expect(t).toHaveProperty('ajustes');
      expect(t).toHaveProperty('pedidos');
      expect(t).toHaveProperty('ayuda');
      expect(t).toHaveProperty('common');
    });

    it('has all tab keys', () => {
      expect(t.tabs).toHaveProperty('inicio');
      expect(t.tabs).toHaveProperty('ofertas');
      expect(t.tabs).toHaveProperty('perfil');
      expect(t.tabs).toHaveProperty('ajustes');
    });

    it('has all menu keys', () => {
      expect(t.menu).toHaveProperty('welcome');
      expect(t.menu).toHaveProperty('contacanos');
      expect(t.menu).toHaveProperty('misPedidos');
      expect(t.menu).toHaveProperty('ayuda');
      expect(t.menu).toHaveProperty('iniciarSesion');
      expect(t.menu).toHaveProperty('registrarse');
      expect(t.menu).toHaveProperty('cerrarSesion');
    });

    it('has all cart keys', () => {
      expect(t.cart).toHaveProperty('title');
      expect(t.cart).toHaveProperty('empty');
      expect(t.cart).toHaveProperty('emptySubtitle');
      expect(t.cart).toHaveProperty('clear');
      expect(t.cart).toHaveProperty('total');
      expect(t.cart).toHaveProperty('checkout');
      expect(t.cart).toHaveProperty('remove');
      expect(t.cart).toHaveProperty('cancel');
    });

    it('has all contact keys', () => {
      expect(t.contact).toHaveProperty('title');
      expect(t.contact).toHaveProperty('name');
      expect(t.contact).toHaveProperty('email');
      expect(t.contact).toHaveProperty('message');
      expect(t.contact).toHaveProperty('send');
      expect(t.contact).toHaveProperty('findUs');
      expect(t.contact).toHaveProperty('followUs');
    });

    it('has all products keys', () => {
      expect(t.products).toHaveProperty('allCategories');
      expect(t.products).toHaveProperty('selectCategory');
      expect(t.products).toHaveProperty('close');
      expect(t.products).toHaveProperty('detailTitle');
      expect(t.products).toHaveProperty('error');
      expect(t.products).toHaveProperty('retry');
      expect(t.products).toHaveProperty('empty');
    });
  });

  describe('user-specified text mappings', () => {
    it('maps "All Categories" to "Categorías"', () => {
      expect(t.products.allCategories).toBe('Categorías');
    });

    it('maps "Add to Cart" to "añadir al carrito"', () => {
      expect(t.addToCart).toBe('añadir al carrito');
    });

    it('maps "Welcome" to "Menu"', () => {
      expect(t.menu.welcome).toBe('Menu');
    });

    it('maps "login" to "login"', () => {
      expect(t.menu.iniciarSesion).toBe('login');
    });

    it('maps "register" to "Registrarse"', () => {
      expect(t.menu.registrarse).toBe('Registrarse');
    });

    it('maps "contact" to "contacto"', () => {
      expect(t.menu.contacanos).toBe('Contáctanos');
      expect(t.contact.title).toBe('Contáctanos');
    });

    it('maps "Your cart is empty" to "Tu carrito está vacío"', () => {
      expect(t.cart.empty).toBe('Tu carrito está vacío');
    });

    it('maps "Add products to get started" to "Añade un producto para continuar"', () => {
      expect(t.cart.emptySubtitle).toBe('Añade un producto para continuar');
    });

    it('maps tab names correctly', () => {
      expect(t.tabs.inicio).toBe('Inicio');
      expect(t.tabs.ofertas).toBe('Ofertas');
      expect(t.tabs.perfil).toBe('Perfil');
      expect(t.tabs.ajustes).toBe('Ajustes');
    });

    it('maps Logout to "Cerrar sesión"', () => {
      expect(t.menu.cerrarSesion).toBe('Cerrar sesión');
    });
  });

  describe('no English strings remain', () => {
    const englishWords = [
      'Login', 'Register', 'Welcome', 'Cart', 'Checkout',
      'Contact Us', 'Home', 'Add to Cart', 'All Categories',
      'My Cart', 'Clear', 'Remove', 'Send', 'Close',
      'Select Category', 'Back to Products', 'Error loading',
    ];

    const flattenStrings = (obj, prefix = '') => {
      const strings = [];
      for (const [key, value] of Object.entries(obj)) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'string') {
          strings.push({ path, value });
        } else if (typeof value === 'object' && value !== null) {
          strings.push(...flattenStrings(value, path));
        }
      }
      return strings;
    };

    it('does not contain common English words', () => {
      const allStrings = flattenStrings(t);
      for (const { path, value } of allStrings) {
        for (const english of englishWords) {
          expect(value).not.toBe(english);
        }
      }
    });
  });
});
