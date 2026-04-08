# Tasks: Contact + Tab Navigation + Auth Hamburger Menu

## Phase 1: Infrastructure

- [ ] 1.1 Run `npx expo install @react-navigation/bottom-tabs` — verify no peer dep conflicts
- [ ] 1.2 Create `src/context/AuthContext.jsx` — useReducer pattern matching CartContext (LOGIN, LOGOUT, REGISTER actions; state: `{ user, isLoggedIn }`)
- [ ] 1.3 Create `src/context/__tests__/AuthContext.test.tsx` — test reducer: login sets `isLoggedIn:true`, logout clears user, register sets user
- [ ] 1.4 Create `src/styles/ContactScreenStyles.jsx` — styled-components for form inputs, info section, social icons using theme.js constants
- [ ] 1.5 Create `src/styles/AuthMenuModalStyles.jsx` — styled-components for modal overlay, slide panel, menu items, using theme.js constants

## Phase 2: Core Implementation

- [ ] 2.1 Create `src/screens/ContactScreen.jsx` — form with Name, Email, Message fields; "Enviar" button; static info (phone, email, address); social icons (Instagram, Facebook, WhatsApp); JSDoc on component
- [ ] 2.2 Add form validation logic to ContactScreen — inline errors for empty fields, email regex check before mailto: trigger
- [ ] 2.3 Create `src/components/AuthMenuModal.jsx` — right-slide animation via `Animated.timing` with `useNativeDriver:true`; overlay dismiss; conditional Login/Register (logged out) vs Logout (logged in); JSDoc on component
- [ ] 2.4 Modify `src/navigation/AppNavigator.jsx` — replace flat Stack with BottomTabNavigator (Home, Cart, Contáctanos tabs); Home tab wraps HomeStack (ProductList + ProductDetail); hamburger icon in HomeStack header opens AuthMenuModal; remove CartIcon from headers
- [ ] 2.5 Modify `App.js` — wrap app tree with `AuthProvider` (inside QueryClientProvider, outside NavigationContainer)
- [ ] 2.6 Verify existing `navigation.navigate('ProductDetail', { product })` calls still work inside nested HomeStack — no changes needed if route names preserved

## Phase 3: Testing

- [ ] 3.1 Add unit tests to `src/context/__tests__/AuthContext.test.tsx` — test `useAuth()` hook throws outside provider; test initial state is `{ user: null, isLoggedIn: false }`
- [ ] 3.2 Create `src/screens/__tests__/ContactScreen.test.tsx` — render form fields; submit empty triggers validation errors; valid input opens mailto:
- [ ] 3.3 Create `src/components/__tests__/AuthMenuModal.test.tsx` — logged out renders Login+Register; logged in renders Logout; overlay press calls onClose; Login press navigates + closes modal
- [ ] 3.4 Create `src/navigation/__tests__/AppNavigator.test.tsx` — tab bar renders 3 tabs; Home tab active by default; tab switch shows correct screen; ProductDetail pushes within HomeStack with back button
- [ ] 3.5 Manual verification — full flow: launch app → navigate tabs → open hamburger → login → verify Logout appears → logout → verify Login/Register returns

## Phase 4: Documentation & Cleanup

- [ ] 4.1 Add JSDoc to `AuthContext.jsx` — document AuthProvider, useAuth, reducer actions
- [ ] 4.2 Add JSDoc to `AuthMenuModal.jsx` — document props, animation behavior, conditional rendering
- [ ] 4.3 Add JSDoc to `ContactScreen.jsx` — document form fields, validation, mailto: fallback
- [ ] 4.4 Standardize all user-facing strings to English (button labels, headers, error messages)
- [ ] 4.5 Remove `CartIcon` import from `AppNavigator.jsx` if no longer used in headers

## Dependency Map

```
1.1 (install) ──→ 2.4 (AppNavigator)
1.2 (AuthContext) ──→ 2.3 (AuthMenuModal), 2.5 (App.js)
1.4 (ContactStyles) ──→ 2.1 (ContactScreen)
1.5 (ModalStyles) ──→ 2.3 (AuthMenuModal)
2.1 + 2.2 (ContactScreen) ──→ 3.2 (Contact tests)
2.3 (AuthMenuModal) ──→ 3.3 (Modal tests)
2.4 (AppNavigator) ──→ 3.4 (Navigation tests)
```

## Effort Estimates

| Phase | Tasks | Estimated Effort |
|-------|-------|-----------------|
| Phase 1 | 5 | ~30 min (infra + styles) |
| Phase 2 | 6 | ~60 min (core logic + wiring) |
| Phase 3 | 5 | ~45 min (unit + integration) |
| Phase 4 | 5 | ~15 min (docs + cleanup) |
| **Total** | **21** | **~2.5 hours** |
