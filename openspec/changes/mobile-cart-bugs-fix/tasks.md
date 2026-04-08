# Tasks: Fix Mobile Cart Bugs

## CartIcon Component Fixes
1. [ ] Update CartIcon to accept and use focused prop
   - Modify function signature to accept focused parameter
   - Implement conditional icon name: focused ? 'cart' : 'cart-outline'
   - Ensure size prop is used correctly without external container constraints

2. [ ] Fix CartIcon sizing for tab bar consistency
   - Remove external View container with margin/padding hacks
   - Use proper centering with width/height equal to size prop
   - Ensure icon displays completely without clipping

3. [ ] Update CartIcon tests to include focused prop
   - Add test cases for focused=true and focused=false scenarios
   - Verify icon name changes based on focused state
   - Ensure all existing tests still pass

## AddToCartButton Navigation Fixes
4. [ ] Fix navigation logic in AddToCartButton
   - Replace direct navigation.navigate('Login') with parent-aware navigation
   - Implement logic to navigate to HomeTab → Login screen when needed
   - Keep fallback to direct navigation for edge cases

5. [ ] Update AddToCartButton tests for navigation fix
   - Mock navigation.getParent() to return valid parent navigator
   - Test that navigation goes to InicioTab then Login screen
   - Verify fallback behavior when parent is null

## AppNavigator Header Configuration Fixes
6. [ ] Configure CartScreen header options in AppNavigator
   - Change from headerShown: false to proper headerTitle/headerRight configuration
   - Match exact header pattern used by other screens (ProductoList, etc.)
   - Include cart icon (24px), title, and menu button (28px)

7. [ ] Verify AppNavigator header consistency
   - Ensure CartScreen header matches Inicio header pattern exactly
   - Confirm same spacing, colors, and component layout
   - Validate menu button functionality opens auth modal

## CartScreen Internal Header Removal
8. [ ] Remove internal Header component from CartScreen empty state
   - Remove Header wrapper around cart icon and title in empty state view
   - Keep SafeAreaView and Container for proper layout
   - Maintain hidden Text element for accessibility/testing

9. [ ] Remove internal Header component from CartScreen item list view
   - Remove Header wrapper that duplicated navigation header
   - Keep FlatList, Footer, and Container for content layout
   - Rely entirely on navigation header configured in AppNavigator

10. [ ] Update CartScreen tests for header removal
    - Modify tests to account for missing internal header
    - Ensure hidden title text test still passes
    - Verify SafeAreaView wrapping test still works

## Integration and Verification
11. [ ] Test tab bar icon behavior in both states
    - Verify cart icon shows outline when tab is unfocused
    - Verify cart icon shows solid when tab is focused
    - Confirm icon size matches other tab icons

12. [ ] Test add to cart functionality from all tabs
    - Verify works from ProductListScreen (Home tab)
    - Verify works from OfertasTab, PerfilTab, AjustesTab
    - Confirm login navigation works correctly from each tab

13. [ ] Verify cart header consistency
    - Check CartScreen header matches Inicio header dimensions
    - Confirm visual alignment of icon, title, and menu button
    - Validate menu button opens same auth modal as other screens

14. [ ] Run all related tests to ensure no regressions
    - CartIcon tests: 7/7 should pass
    - AddToCartButton tests: 5/5 should pass
    - CartScreen tests: 4/4 should pass
    - AppNavigator tests: Verify no new failures introduced

## Deliverables
- Fixed CartIcon component with proper tab bar behavior
- Fixed AddToCartButton with correct cross-tab navigation
- Fixed AppNavigator to provide proper header for CartScreen
- Fixed CartScreen to use navigation header only
- All tests passing or updated appropriately
- Documentation of changes in spec and design files