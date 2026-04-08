# Spec: Fix Mobile Cart Bugs

## Problem Statement
Users reported three specific issues with the mobile shopping cart in the Soap-Store application:
1. Cart icon was being cut off in the bottom tab bar
2. "Add to cart" functionality was not working properly (navigation issues)
3. Cart screen header was too tall due to duplicate headers

## Requirements

### Functional Requirements
1. **Cart Icon Display**: The cart icon in the bottom tab bar must display completely without being cut off, matching the size and behavior of other tab icons
2. **Add to Cart Functionality**: When users tap "Add to cart" on any product, the action must successfully add the item to the cart and navigate appropriately to the login screen if needed
3. **Cart Header**: The cart screen must display a single header consistent with other screens in the application, not a duplicated header

### Non-Functional Requirements
1. **Visual Consistency**: The cart icon in tabs must behave identically to other tab icons (focused/unfocused states, sizing)
2. **Navigation Consistency**: All screen headers must follow the same visual pattern as the Home (Inicio) screen header
3. **Backward Compatibility**: Existing functionality must not be broken by these fixes
4. **Performance**: Changes should not negatively impact app performance

### User Stories
- As a user, I want to see the complete cart icon in the tab bar so I can easily identify my cart
- As a user, I want to be able to add products to my cart from any screen without navigation errors
- As a user, I want the cart screen header to match the style of other screen headers for visual consistency

## Acceptance Criteria

### Cart Icon Fix
- [ ] Cart icon in tab bar displays completely without clipping
- [ ] Cart icon size matches other tab icons (max 32px)
- [ ] Cart icon responds to touch interactions properly
- [ ] Cart badge positioning remains correct relative to icon size

### Add to Cart Fix
- [ ] Tapping "Add to cart" on any product screen successfully adds item to cart
- [ ] When user is not logged in, tapping "Add to cart" shows login prompt and navigates to login screen
- [ ] Navigation to login works correctly from any tab (not just Home tab)
- [ ] Cart updates correctly reflect added items

### Cart Header Fix
- [ ] Cart screen displays only one header (no duplication)
- [ ] Cart header matches the visual style of Home screen header:
  - Icon on left (cart icon, 24px, primary color)
  - Section title centered (18px, bold, text color)
  - Menu button on right (28px, primary color)
- [ ] Header height matches other screen headers
- [ ] Header functionality (menu button opens auth modal) works correctly

## Constraints and Assumptions
- The application uses React Navigation v6+ for tab and stack navigation
- The CartContext manages cart state correctly (no changes needed to cart logic)
- Login screen is located within the HomeStack (InicioTab) navigator
- All other tab icons use focused/unfocused icon pairs (e.g., home/home-outline)
- The fix must maintain compatibility with existing tests (minimal test updates acceptable)

## Dependencies
- No new dependencies required
- Uses existing React Navigation, React Native, and Expo Vector Icons
- Relies on existing CartContext, AuthContext, and navigation structure

## Risks and Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Navigation changes break existing flows | Low | High | Test navigation from all tabs |
| Header changes affect other screens | Low | Medium | Only modify CartScreen header |
| Icon size changes affect layout | Low | Low | Constrain size to match other tabs |
| Test failures due to changes | Medium | Low | Update affected tests minimally |

## Open Questions
None - all requirements are clear and implementable with existing codebase structure.