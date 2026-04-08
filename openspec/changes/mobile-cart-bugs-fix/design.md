# Design: Fix Mobile Cart Bugs

## High-Level Approach
We will fix the three reported mobile cart bugs by making targeted changes to specific components:
1. **CartIcon.jsx** - Fix tab bar icon sizing and add focused/unfocused state support
2. **AddToCartButton.jsx** - Fix navigation to login screen from any tab
3. **AppNavigator.jsx** - Fix CartScreen header to remove duplication and match other screen headers
4. **CartScreen.jsx** - Remove internal header to rely solely on navigation header

## Detailed Design

### 1. CartIcon Component Fix (`src/components/CartIcon.jsx`)
**Problem**: Icon was being cut off in tab bar and lacked focused/unfocused state handling.

**Solution**:
- Constrain icon size to match other tab icons (maximum 32px)
- Add support for `focused` prop to switch between `cart` and `cart-outline` icons
- Remove external container sizing hacks and use proper centering
- Maintain existing bounce animation and badge functionality
- Preserve testID prop for testing purposes

**Changes**:
```javascript
// Add focused prop destructuring
export default function CartIcon({ size = 24, testID, focused }) {
  // ... existing useEffect and animation logic ...
  
  // Change icon name based on focused state
  <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={theme.colors.primary} />
  
  // Simplified container without external sizing hacks
  return (
    <View testID={testID} style={{ position: 'relative', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* ... animated view with icon and badge ... */}
    </View>
  );
}
```

### 2. AddToCartButton Navigation Fix (`src/components/AddToCartButton.jsx`)
**Problem**: Navigation to 'Login' screen failed when called from tabs other than Home tab because Login is nested within HomeStack.

**Solution**:
- Use navigation.getParent() to access the parent navigator when available
- Navigate to 'InicioTab' screen first, then to 'Login' screen within that stack
- Fallback to direct navigation if parent is not available (should not happen in practice)

**Changes**:
```javascript
const handleAddToCart = () => {
  if (!isLoggedIn) {
    showToast(t.toast.loginToAddCart, t.toast.loginButton, () => {
      // Navigate to Home tab first, then to Login screen within it
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate('InicioTab', { screen: 'Login' });
      } else {
        navigation.navigate('Login'); // fallback
      }
    });
    return;
  }
  addItem(product);
};
```

### 3. AppNavigator CartScreen Header Fix (`src/navigation/AppNavigator.jsx`)
**Problem**: CartScreen was showing both navigation header AND custom header component, causing double height.

**Solution**:
- Change CartScreen options from `headerShown: false` to proper header configuration
- Match the exact header pattern used by other screens (ProductoList, ProductDetail, etc.)
- Include both headerTitle (icon + title) and headerRight (menu button) components

**Changes**:
```javascript
<Stack.Screen
  name="CartScreen"
  component={CartScreen}
  options={() => ({
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons name="cart" size={24} color={theme.colors.primary} />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.text }}>
          {t.cart.title}
        </Text>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 15 }}>
        <Ionicons name="menu" size={28} color={theme.colors.primary} />
      </TouchableOpacity>
    ),
  })}
/>
```

### 4. CartScreen Internal Header Removal (`src/screens/CartScreen.jsx`)
**Problem**: CartScreen was rendering its own Header component in addition to the navigation header.

**Solution**:
- Remove the internal `<Header>` component from both empty state and item list views
- Keep SafeAreaView and Container for proper layout and spacing
- Rely entirely on the navigation header configured in AppNavigator
- Keep the hidden Text element for accessibility/testing purposes in empty state

**Changes**:
Remove these lines from both return statements in CartScreen:
```jsx
<Header>
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
    <Ionicons name="cart" size={24} color={theme.colors.primary} />
    <Title>{t.cart.title} ({totalItems})</Title>
  </View>
  {/* ... ClearButton ... */}
</Header>
```

And from the empty state view, remove the Header wrapper.

## Component Relationships

```
App (Root)
├── ModalProvider (for auth modal)
├── NavigationContainer
│   ├── TabNavigator (Bottom Tabs)
│   │   ├── InicioTab → HomeStack Navigator
│   │   │   ├── ProductListScreen (uses AppNavigator header config)
│   │   │   ├── ProductDetailScreen (uses AppNavigator header config)
│   │   │   ├── CartScreen ← FIXED: Now uses AppNavigator header config
│   │   │   ├── ContactScreen, etc.
│   │   ├── OfertasTab
│   │   ├── CarritoTab ← FIXED: CartIcon now handles focused state
│   │   ├── PerfilTab
│   │   └── AjustesTab
│   └── AuthMenuModal
└── Providers (Cart, Auth, Toast, Favorites)
```

## Implementation Details

### State Management
No changes needed to state management - all fixes are presentation/navigation only.

### Data Flow
- CartIcon: Receives `focused` prop from tabBarIcon configuration
- AddToCartButton: Uses existing `useAuth()` and `useNavigation()` hooks
- AppNavigator: Passes header configuration to CartScreen via options
- CartScreen: No longer renders internal header, relies on navigation header

### Navigation Flow
1. User taps "Add to cart" from any screen
2. AddToCartButton checks login status via useAuth()
3. If not logged in: shows toast with login prompt
4. On toast button press: uses navigation.getParent() to navigate to HomeTab → Login screen
5. If already logged in: calls CartContext.addItem() directly

### Styling and Visuals
- All headers now use identical flex layout: `flexDirection: 'row', alignItems: 'center', gap: 8`
- Icon sizes: 24px for title area, 28px for menu button
- Colors: Primary color for icons, text color for titles
- Spacing: Consistent with existing theme spacing values

## Test Plan

### Unit Tests
- CartIcon: Test focused/unfocused icon switching, size constraints, badge positioning
- AddToCartButton: Test navigation logic from both logged-in and logged-out states
- CartScreen: Verify header comes from navigation, not internal component
- AppNavigator: Verify CartScreen header options match pattern

### Integration Tests
- Verify cart icon displays correctly in tab bar in both focused/unfocused states
- Verify "Add to cart" works from all tabs and shows login when needed
- Verify cart screen shows single header matching other screens
- Verify menu button in cart header opens auth modal correctly

## Acceptance Test Criteria (Manual Verification)
1. [ ] Cart icon in tab bar displays completely (not cut off)
2. [ ] Cart icon switches between outline and solid when tab is selected/unselected
3. [ ] "Add to cart" button works from ProductListScreen (any tab)
4. [ ] "Add to cart" button shows login prompt when not logged in
5. [ ] Login prompt navigation works correctly to Login screen
6. [ ] Cart screen shows single header with: cart icon + "Mi carrito" + menu button
7. [ ] Cart menu button opens auth modal (same as other screens)
8. [ ] All existing tests still pass (except those requiring updates for our changes)

## Dependencies
- React Navigation (already used)
- React Native Vector Icons (already used)
- Existing context providers (CartContext, AuthContext, ModalContext)
- No new libraries or major refactoring required

## Rollback Plan
Since all changes are isolated and minimal:
1. CartIcon.jsx: Revert to previous version (backup available)
2. AddToCartButton.jsx: Revert navigation logic 
3. AppNavigator.jsx: Change CartScreen options back to `headerShown: false`
4. CartScreen.jsx: Restore internal Header component