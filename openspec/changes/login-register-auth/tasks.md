# Tasks: Implement Authentication System with Email Verification Mandatory, Google/Apple Social Login, and Password Management

## Phase 1: Infrastructure and Setup

- [x] 1.1 Install dependencies: @supabase/supabase-js, @react-native-async-storage/async-storage, expo-auth-session, @react-native-google-signin/google-signin, react-native-apple-authentication
- [x] 1.2 Configure Supabase environment variables (.env)
- [ ] 1.3 Enable Email Auth provider with confirmation required in Supabase
- [ ] 1.4 Configure Google/Apple OAuth providers in Supabase dashboard
- [ ] 1.5 Set up deep linking for mobile OAuth redirect
- [x] 1.6 Initialize Supabase client singleton in src/services/supabase.js
- [x] 1.7 Configure AsyncStorage for secure session persistence

## Phase 2: Service Layer Updates (src/services/supabase.js)

- [x] 2.1 Implement signUp(email, password) with email confirmation
- [x] 2.2 Implement signInWithPassword(email, password)
- [x] 2.3 Implement signInWithProvider(provider) for Google/Apple (Google implemented, Apple added)
- [x] 2.4 Implement signOut() to terminate session
- [x] 2.5 Implement resetPasswordForEmail(email)
- [x] 2.6 implement verifyOAuth(token, type) for email verification
- [x] 2.7 Implement updateUser({password}) for password changes
- [x] 2.8 Add error mapping for user-friendly messages
- [x] 2.9 Implement token storage/retrieval with AsyncStorage
- [x] 2.10 Add session persistence with automatic refresh

## Phase 3: Context Updates (src/context/AuthContext.jsx)

- [x] 3.1 Create AuthContext with user, session, loading, initialized state
- [x] 3.2 Implement AuthProvider wrapping the application
- [x] 3.3 Add auth methods: signIn, signUp, signOut, resetPassword, verifyEmail, changePassword
- [x] 3.4 Initialize session from secure storage on app launch
- [x] 3.5 Add Supabase auth state listener for real-time updates
- [x] 3.6 Implement loading states for auth operations
- [x] 3.7 Track email verification status via user.email_confirmed_at
- [x] 3.8 Handle automatic recovery from background

## Phase 4: UI Screens Creation/Update

- [x] 4.1 Create LoginScreen with email/password form + social buttons
- [x] 4.2 Create RegisterScreen with validation
- [x] 4.3 Create EmailVerificationScreen with status/resend
- [x] 4.4 Create ForgotPasswordScreen for reset email input
- [x] 4.5 Create ResetPasswordScreen for token/password reset
- [x] 4.6 Create ChangePasswordScreen for password updates
- [x] 4.7 Implement email/password validation
- [x] 4.8 Add loading/error states to all screens
- [x] 4.9 Create reusable FormInput component
- [x] 4.10 Create useFormValidation hook
- [x] 4.11 Create SocialLoginButton for Google/Apple

## Phase 5: Navigation Updates

- [x] 5.1 Update AppNavigator to include auth routes
- [x] 5.2 Implement AuthStack (login/register/forgot/reset/change)
- [x] 5.3 Implement AppStack with protected screens
- [x] 5.4 Create ProtectedRoute checking auth + verification
- [x] 5.5 Create AuthenticatedRoute redirecting to login
- [x] 5.6 Set up conditional rendering by auth state
- [x] 5.7 Preserve intended destination after login/verification
- [x] 5.8 Connect AuthMenuModal to auth handlers

## Phase 6: Protected Actions Implementation

- [x] 6.1 Wrap CartScreen with ProtectedRoute
- [x] 6.2 Wrap FavoritesScreen with ProtectedRoute
- [x] 6.3 Wrap OrdersScreen with ProtectedRoute
- [x] 6.4 Wrap SettingsScreen with ProtectedRoute
- [x] 6.5 Redirect to intended destination post-auth/verification
- [x] 6.6 Show verification required msg for unverified access
- [x] 6.7 Ensure protected actions check auth + verification

## Phase 7: Testing and Verification

- [x] 7.1 Unit test AuthService methods (signUp, signIn, social auth, reset/change) - Archivo creado: src/services/__tests__/supabase.test.js
- [ ] 7.2 Integration test auth flows (registration, login, social, verification)
- [ ] 7.3 Test email verification flow (register → email → link → verified)
- [ ] 7.4 Test password reset flow (request → email → token → update)
- [ ] 7.5 Test protected route access (unauth → login, unverified → verify, verified → access)
- [ ] 7.6 Test session persistence (login → restart → maintained)
- [ ] 7.7 Test logout (clear session → redirect)
- [ ] 7.8 Test error cases (invalid creds, existing email, weak pwd, expired tokens)
- [ ] 7.9 Verify social login with Google/Apple providers
- [ ] 7.10 Performance test auth ops within required timeframes

(End of file - total 83 lines)
