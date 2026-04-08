# Design: Soap Store UI Enhancements

## Technical Approach

Six incremental enhancements built on existing patterns: Context API for state (CartContext/AuthContext model), Styled Components for UI, React Navigation for routing, Animated API for micro-interactions, and AsyncStorage for local persistence. Each domain is self-contained, minimizing cross-cutting concerns.

## Architecture Decisions

### Decision: Favorites State via Context + AsyncStorage

**Choice**: New `FavoritesContext` using `useReducer` (matching CartContext pattern) with AsyncStorage persistence via `useEffect` sync.
**Alternatives considered**: TanStack Query with AsyncStorage as "API", Zustand, MMKV
**Rationale**: CartContext already proves this pattern works. AsyncStorage is in Expo SDK natively. No server sync needed — favorites are local-only. TanStack Query adds unnecessary complexity for non-remote data.

### Decision: Toast via Context-Driven Overlay

**Choice**: New `ToastContext` with imperative API (`showToast(message, action)`) rendering an absolute-positioned Animated.View at screen top, managed at App.js level.
**Alternatives considered**: react-native-toast-message library, per-screen inline toast, React Navigation overlays
**Rationale**: Zero new dependencies. Context pattern matches existing codebase. Renders above all screens via placement outside NavigationContainer. Imperative API avoids prop drilling.

### Decision: Cart Badge — Enhance Existing

**Choice**: Keep existing CartIcon badge implementation (already renders red circle, 99+ cap). Add `Animated.View` spring animation on `totalItems` change for visual feedback.
**Alternatives considered**: Third-party badge component, custom Canvas draw
**Rationale**: Existing implementation at `src/components/CartIcon.jsx:20-40` already satisfies all spec scenarios (count display, hidden when empty, 99+). Only enhancement needed is animation on count change.

### Decision: Star Animation via Animated API

**Choice**: `Animated.sequence` + `Animated.parallel` in `ProductCard` for scale (1.0→1.3→1.0) and color interpolation on press. No `react-native-reanimated` dependency.
**Alternatives considered**: react-native-reanimated, Lottie, moti
**Rationale**: Expo ships Animated API natively. Reanimated adds install complexity. Scale + color is simple enough for plain Animated. Matches existing animation pattern in AuthMenuModal.

### Decision: Hamburger Menu — Overlay Touch Target

**Choice**: Increase `CloseButton` touch target from 48x48 to 56x56dp. Overlay already has full-screen `TouchableOpacity` — verify minimum 44dp hit area.
**Alternatives considered**: Custom hitSlop prop, Gesture Handler root tap
**Rationale**: Existing CloseButton at `AuthMenuModalStyles.jsx:32-41` is already 48x48dp (exceeds 44dp spec). Swipe-to-close via PanResponder is already implemented at `AuthMenuModal.jsx:55-84`. Enhancement: add `hitSlop` to overlay for edge cases.

## Data Flow

```
CartBadge:
  CartContext (totalItems) ──→ CartIcon ──→ Animated.View (spring on change)

Toast:
  Any Screen ──→ useToast().show() ──→ ToastContext ──→ ToastOverlay (App.js)
                                                 │
                                        Animated.View (top of screen)
                                                 │
                                    tap dismiss / action → navigation

Favorites:
  ProductCard ──→ toggleFavorite(productId) ──→ FavoritesContext (useReducer)
                                                       │
                                              AsyncStorage.setItem (sync)
                                                       │
                                              FavoritesScreen ──→ FlatList (same grid as catalog)

StarAnimation:
  onPress ──→ Animated.sequence(scale 1→1.3→1.0) ──→ toggleFavorite()
            ──→ color interpolation (gray → #FFD700)

HamburgerMenu (existing):
  PanResponder ──→ swipeTranslateX ──→ threshold check ──→ onClose
  Overlay ──→ TouchableOpacity (44dp+ hit area) ──→ onClose
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/context/FavoritesContext.jsx` | Create | useReducer-based context for favorites with AsyncStorage persistence |
| `src/context/ToastContext.jsx` | Create | Toast state context with show/hide API |
| `src/components/ToastOverlay.jsx` | Create | Absolute-positioned Animated toast at screen top, dismissible, action button |
| `src/components/FavoriteButton.jsx` | Create | Star icon with scale+color animation, wired to FavoritesContext |
| `src/screens/FavoritesScreen.jsx` | Create | FlatList grid of favorited products with delete-on-swipe |
| `src/components/CartIcon.jsx` | Modify | Add Animated spring on totalItems change |
| `src/components/AuthMenuModal.jsx` | Modify | Add Favoritos menu item, auth-gate Mis pedidos/Ayuda with toast |
| `src/components/AddToCartButton.jsx` | Modify | Auth check → showToast if not logged in |
| `src/screens/HelpScreen.jsx` | Modify | Centered title+body with proper padding (24dp horizontal, 16dp vertical) |
| `src/constants/translations.js` | Modify | Add favorites, toast strings |
| `src/styles/FavoritesStyles.jsx` | Create | Styled Components for FavoritesScreen |
| `src/styles/ToastStyles.jsx` | Create | Styled Components for toast overlay |
| `src/styles/FavoriteButtonStyles.jsx` | Create | Styled wrapper for animated star |
| `App.js` | Modify | Wrap with FavoritesProvider and ToastProvider |

## Interfaces / Contracts

```typescript
// FavoritesContext
interface FavoritesState {
  items: Product[];
}
interface FavoritesContextValue {
  favorites: Product[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isLoading: boolean; // true until AsyncStorage hydrates
}

// ToastContext
interface ToastConfig {
  message: string;
  actionLabel?: string;     // e.g. "Iniciar sesión"
  onAction?: () => void;    // navigation callback
  duration?: number;        // default 4000ms
}
interface ToastContextValue {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  visible: boolean;
}

// FavoriteButton props
interface FavoriteButtonProps {
  product: Product;
  size?: number; // default 24
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | FavoritesContext reducer (add/remove/toggle) | Mock AsyncStorage, dispatch actions, assert state |
| Unit | ToastContext show/hide lifecycle | Call showToast, verify visible state, mock timers |
| Unit | FavoriteButton animation triggers | Mock Animated, verify sequence called on press |
| Unit | CartIcon badge animation | Verify Animated.spring called when totalItems changes |
| Integration | FavoritesScreen loads from AsyncStorage | Mock AsyncStorage.getItem, verify FlatList renders |
| Integration | Auth-gated actions show toast for unauthenticated | Mock AuthContext isLoggedIn=false, tap menu item, verify toast |
| Integration | HelpScreen renders centered with padding | Snapshot test with correct styles |
| E2E | Full favorites flow: add → view → delete → restart | Manual test on device |

## Migration / Rollout

No data migration required. AsyncStorage keys:
- `@soap_store_favorites` — JSON array of Product objects

Rollback: git revert. AsyncStorage key is additive — no existing data affected.

## Edge Cases

| Scenario | Handling |
|----------|----------|
| AsyncStorage quota exceeded | Catch error, show console warning, don't crash |
| Favorite a product then it's removed from catalog | Display with stale data, allow delete |
| Rapid star taps (animation race) | `isAnimating` ref guard (same pattern as AuthMenuModal) |
| Toast while another toast is visible | Replace current toast (reset timer) |
| Cart badge > 99 | Display "99+" (already handled in CartIcon) |
| App kill during favorites write | AsyncStorage is atomic per call — worst case: last toggle lost |
| Empty favorites after deleting all | Show empty state "No tenés productos favoritos" |

## Open Questions

- [ ] Should favorites require auth? Spec implies local-only (AsyncStorage), no auth gate needed.
- [ ] Favorites screen accessible only from hamburger menu, or also as a tab? Spec says hamburger menu item.
- [ ] Should HelpScreen body content be hardcoded or fetched? Spec implies static content with proper layout.
