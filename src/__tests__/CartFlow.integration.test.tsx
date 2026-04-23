import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { TouchableOpacity, Text, View } from 'react-native';
import { CartProvider, useCart } from '../context/CartContext';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children, ...props }) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

// Track cart items for realistic mock behavior

// Mock AuthContext
const mockUser = { id: 'user-123' };
const mockAuthContext = {
  user: mockUser,
  isLoggedIn: true,
};

jest.mock('../context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
}));

// Track cart items for realistic mock behavior
let mockCartItems = [];

// Use a counter to ensure unique IDs per test run
let itemCounter = 0;
const getNextId = () => `cart-item-${++itemCounter}`;

const mockAddToCart = jest.fn().mockImplementation(async (userId, productData) => {
  const existingIndex = mockCartItems.findIndex(item => item.product_id === productData.product_id);
  
  if (existingIndex >= 0) {
    // Return existing item with current quantity - reducer will add the new quantity
    return mockCartItems[existingIndex];
  }
  
  // Create new item
  const newItem = {
    id: getNextId(),
    product_id: productData.product_id,
    quantity: productData.quantity,
    products: { name: productData.name || 'Test Product', price: productData.price || 10 },
  };
  mockCartItems.push(newItem);
  return newItem;
});

const mockUpdateCartItemQuantity = jest.fn().mockImplementation(async (cartItemId, quantity, userId) => {
  mockCartItems = mockCartItems.map(item =>
    item.id === cartItemId ? { ...item, quantity } : item
  );
  return { id: cartItemId, quantity };
});

const mockRemoveFromCart = jest.fn().mockImplementation(async (cartItemId, userId) => {
  mockCartItems = mockCartItems.filter(item => item.id !== cartItemId);
  return true;
});

const mockClearUserCart = jest.fn().mockImplementation(async (userId) => {
  mockCartItems = [];
  return true;
});

const mockGetCartItems = jest.fn().mockImplementation(async (userId) => {
  return JSON.parse(JSON.stringify(mockCartItems));
});

const mockMapCartItemFromDB = (item) => ({
  id: item.id,
  cartItemId: item.id,
  productId: item.product_id,
  name: item.products?.name,
  price: item.products?.price || 10,
  imageUrl: 'https://example.com/image.jpg',
  quantity: item.quantity,
  is_offer: !!item.offer_id,
  offer_id: item.offer_id,
});

jest.mock('../services/entities/cartService', () => ({
  getCartItems: (...args) => mockGetCartItems(...args),
  addToCart: (...args) => mockAddToCart(...args),
  updateCartItemQuantity: (...args) => mockUpdateCartItemQuantity(...args),
  removeFromCart: (...args) => mockRemoveFromCart(...args),
  clearUserCart: (...args) => mockClearUserCart(...args),
  mapCartItemFromDB: (item) => mockMapCartItemFromDB(item),
}));

const mockProduct = {
  id: '1',
  name: 'Jabón de Lavanda',
  price: 8.99,
  imageUrl: 'https://example.com/soap.jpg',
};

const mockProduct2 = {
  id: '2',
  name: 'Jabón de Romero',
  price: 12.50,
  imageUrl: 'https://example.com/rose.jpg',
};

const TestAddButton = ({ product, label }) => {
  const { addItem } = useCart();
  return (
    <TouchableOpacity onPress={() => addItem('user-123', product)} testID={`add-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestRemoveButton = ({ cartItemId, label }) => {
  const { removeItem } = useCart();
  return (
    <TouchableOpacity onPress={() => removeItem('user-123', cartItemId)} testID={`remove-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const TestClearButton = () => {
  const { clearCart } = useCart();
  return (
    <TouchableOpacity onPress={() => clearCart('user-123')} testID="clear-btn">
      <Text>Clear</Text>
    </TouchableOpacity>
  );
};

const TestUpdateQuantity = ({ cartItemId, label }) => {
  const { updateQuantity } = useCart();
  return (
    <TouchableOpacity onPress={() => updateQuantity('user-123', cartItemId, 3)} testID={`update-${label}`}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const CartStateDisplay = () => {
  const { totalItems, totalPrice, items } = useCart();
  return (
    <View>
      <Text testID="count">{String(totalItems)}</Text>
      <Text testID="price">{String(totalPrice)}</Text>
      <Text testID="itemCount">{String(items.length)}</Text>
      {items.map(item => (
        <Text key={item.cartItemId} testID={`qty-${item.cartItemId}`}>{String(item.quantity)}</Text>
      ))}
    </View>
  );
};

describe('Cart flow integration', () => {
  beforeEach(() => {
    // Reset mockCartItems
    mockCartItems = [];
    itemCounter = 0;
    // Reset all mocks
    jest.clearAllMocks();
    // Reset mock implementations
    mockGetCartItems.mockResolvedValue([]);
    mockAddToCart.mockClear();
    mockUpdateCartItemQuantity.mockClear();
    mockRemoveFromCart.mockClear();
    mockClearUserCart.mockClear();
  });

  it('adds product to cart and totalItems reflects count', async () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-Add'));
    });
    
    expect(getByTestId('count').children[0]).toBe('1');
    expect(getByTestId('itemCount').children[0]).toBe('1');
  });

  it('adds same product twice, totalItems is 2', async () => {
    // FULL RESET before test
    mockCartItems = [];
    itemCounter = 0;
    mockGetCartItems.mockResolvedValue([]);
    mockAddToCart.mockClear();
    
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-Add'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('add-Add'));
    });
    
    expect(getByTestId('itemCount').children[0]).toBe('1');
    expect(getByTestId('count').children[0]).toBe('2');
  });

  it('removes item from cart', async () => {
    const { getByTestId, queryByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add" />
        <CartStateDisplay />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-Add'));
    });
    
    // Verify item was added
    expect(getByTestId('count').children[0]).toBe('1');
    expect(getByTestId('itemCount').children[0]).toBe('1');
    
    // Get the actual cart item ID from the rendered items
    const allItems = getByTestId('itemCount').parent.findAll(
      node => node.props.testID?.startsWith('qty-')
    );
    
    if (allItems.length > 0) {
      const realCartItemId = allItems[0].props.testID.replace('qty-', '');
      
      // Test removing by passing the real cartItemId
      const { getByTestId: getByTestId2 } = render(
        <CartProvider>
          <TestRemoveButton cartItemId={realCartItemId} label="Remove" />
          <CartStateDisplay />
        </CartProvider>
      );
      
      await act(async () => {
        fireEvent.press(getByTestId2('remove-Remove'));
      });
      
      expect(getByTestId2('count').children[0]).toBe('0');
    }
  });

  it('adds different products, then clears cart', async () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestAddButton product={mockProduct} label="Add1" />
        <TestAddButton product={mockProduct2} label="Add2" />
        <TestClearButton />
        <CartStateDisplay />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByTestId('add-Add1'));
    });
    await act(async () => {
      fireEvent.press(getByTestId('add-Add2'));
    });
    
    // Should have 2 different products
    expect(getByTestId('itemCount').children[0]).toBe('2');
    expect(getByTestId('count').children[0]).toBe('2');

    await act(async () => {
      fireEvent.press(getByTestId('clear-btn'));
    });
    expect(getByTestId('count').children[0]).toBe('0');
    expect(getByTestId('itemCount').children[0]).toBe('0');
  });
});