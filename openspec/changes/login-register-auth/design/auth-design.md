# Technical Design: Authentication System

## Architecture Overview

The authentication system follows a layered architecture that integrates with Supabase Auth while maintaining clean separation of concerns between UI, business logic, and data access layers.

### High-Level Components

1. **Presentation Layer** (React Native Screens & Components)
   - LoginScreen, RegisterScreen, EmailVerificationScreen
   - ForgotPasswordScreen, ResetPasswordScreen, ChangePasswordScreen
   - SocialLoginButtons (Google/Apple)
   - AuthenticatedRoute/ProtectedRoute components

2. **Service Layer** (Auth Service)
   - Supabase client wrapper with authentication methods
   - Token management and session handling
   - Email verification and password reset flows

3. **State Management Layer** (React Context)
   - AuthContext for global authentication state
   - User profile data persistence
   - Session status tracking

4. **Data Access Layer** (Supabase)
   - Direct integration with Supabase Auth
   - User metadata storage
   - Email verification token handling

### Technology Stack

- **Frontend**: React Native with Expo
- **Backend**: Supabase (PostgreSQL + GoTrue Auth)
- **State Management**: React Context API
- **Storage**: AsyncStorage (secure session persistence)
- **Navigation**: React Navigation 6.x
- **UI**: React Native Paper + Custom Components

## Data Flow Diagrams

### User Registration Flow
```
User -> Registration Screen -> Auth Service -> Supabase Auth
                            <- Email sent <- Supabase Email Service
                            -> Verification Required Screen
                            <- User clicks email link ->
                            <- Email verified -> Supabase Auth
                            -> Home Screen
```

### Login Flow (Email/Password)
```
User -> Login Screen -> Auth Service -> Supabase Auth (validate credentials)
                            <- Session created ->
                            -> Check email verification status
                            -> (if unverified) -> Email Verification Screen
                            -> (if verified) -> Home Screen
                            <- User data ->
                            -> Update Auth Context
```

### Social Login Flow (Google/Apple)
```
User -> Social Login Button -> Auth Service -> Supabase Auth (OAuth Provider)
                            <- OAuth callback ->
                            -> Check/Sync user data
                            -> Check email verification status
                            -> (if unverified) -> Email Verification Screen
                            -> (if verified) -> Home Screen
                            <- User data ->
                            -> Update Auth Context
```

### Password Reset Flow
```
User -> Forgot Password Screen -> Auth Service -> Supabase Auth (send reset email)
                            <- Email sent <- Supabase Email Service
                            -> Reset Instructions Screen
                            <- User clicks email link ->
                            -> Reset Password Screen ->
                            -> Auth Service -> Supabase Auth (validate token + update password)
                            <- Password updated ->
                            -> Login Screen
```

## Component Breakdown and Interactions

### Core Components

1. **AuthService.js**
   - Wrapper around Supabase client for authentication operations
   - Methods: signUp, signIn, signOut, sendPasswordReset, verifyOAuth, etc.
   - Handles token storage and retrieval
   - Manages session persistence with AsyncStorage

2. **AuthContext.js**
   - React Context provider for authentication state
   - Provides: user data, loading states, authentication functions
   - Persists session data to secure storage
   - Listens to Supabase auth state changes

3. **Screens**
   - **LoginScreen**: Email/password form with social login options
   - **RegisterScreen**: Registration form with validation
   - **EmailVerificationScreen**: Shows verification status with resend option
   - **ForgotPasswordScreen**: Email input for password reset
   - **ResetPasswordScreen**: Token validation and new password form
   - **ChangePasswordScreen**: For authenticated users to change password
   - **ProtectedRoute**: Wrapper component that checks auth/verification status
   - **AuthenticatedRoute**: Wrapper that redirects unauthenticated users to login

4. **Components**
   - **SocialLoginButton**: Reusable button for Google/Apple login
   - **FormInput**: Custom input component with validation
   - **AuthLoadingScreen**: Splash screen while checking auth state

### Component Interactions

```
AuthService <--(uses)--> Supabase JS Client
AuthContext <--(calls)--> AuthService
AuthContext <--(provides)--> All Screens
LoginScreen <--(dispatches)--> AuthContext (login)
RegisterScreen <--(dispatches)--> AuthContext (register)
EmailVerificationScreen <--(subscribes)--> AuthContext (verification status)
ProtectedRoute <--(reads)--> AuthContext (user.verified)
SocialLoginButton <--(calls)--> AuthService (signInWithProvider)
```

## State Management Approach

### Auth Context Structure
```javascript
{
  user: {
    id: string,
    email: string,
    email_confirmed_at: timestamp | null,
    created_at: timestamp,
    updated_at: timestamp,
    user_metadata: object,
    app_metadata: object
  },
  session: {
    access_token: string,
    refresh_token: string,
    expires_at: timestamp
  } | null,
  loading: boolean,
  initialized: boolean
}
```

### State Persistence
- Session tokens stored securely using AsyncStorage with encryption
- Auth state initialized on app launch by checking secure storage
- Automatic token refresh handled by Supabase client
- Logout clears all auth data from storage and context

### State Updates
- Supabase auth state change listener updates context in real-time
- Manual refresh on explicit user actions (login/logout)
- Automatic recovery when app resumes from background

## Security Implementation Details

### Password Security
- Never store or transmit passwords in plain text
- Supabase handles password hashing using bcrypt
- Password strength validation client-side (minimum 8 chars, mix of types)
- Rate limiting inherited from Supabase (configurable via dashboard)

### Token Security
- Access tokens stored in memory only during session
- Refresh tokens stored securely in AsyncStorage (iOS Keychain/Android Keystore equivalent)
- Token expiration handled by Supabase (typically 1 hour access, longer refresh)
- Secure token renewal using refresh token rotation

### Communication Security
- All Supabase communications use HTTPS/TLS
- Environment variables for Supabase URL and anon key (never hardcoded)
- No sensitive data logged to console

### Email Security
- Verification and reset tokens expire after 24 hours (Supabase default)
- Password reset does not reveal email existence (security by obscurity)
- Email verification required for all auth methods (email, Google, Apple)
- Hidden email support for Apple Sign In (uses proxy email)

### Session Management
- Session persistence across app restarts
- Automatic silent refresh when possible
- Clear redirect to login on session expiration
- Single session per user (new login invalidates previous sessions)

## API Contract with Supabase

### Authentication Methods Used

1. **signUp(email, password, options)**
   - Creates new user account
   - Sends verification email if email_confirm true
   - Returns user session on success

2. **signInWithPassword(email, password)**
   - Authenticates user with email/password
   - Returns user session
   - Respects email confirmation requirements

3. **signInWithProvider(provider)**
   - Google: signInWithProvider('google')
   - Apple: signInWithProvider('apple')
   - Handles OAuth flow and token exchange
   - Returns user session

4. **signOut()**
   - Invalidates current session
   - Clears tokens from client

5. **resetPasswordForEmail(email)**
   - Sends password reset email
   - Does not reveal if email exists

6. **verifyOAuth(token, type)**
   - Verifies email via token from email link
   - Type: 'signup' or 'recovery'

7. **updateUser(attributes)**
   - Updates user password
   - Requires authentication

### User Data Model
Stored in Supabase `auth.users` table:
- id (UUID)
- email
- encrypted_password
- email_confirmed_at
- invited_at
- confirmation_token
- confirmation_sent_at
- recovery_token
- recovery_sent_at
- email_change_token_new
- email_change
- email_change_sent_at
- last_sign_in_at
- raw_app_meta_data
- raw_user_meta_data
- is_super_admin
- role
- aud
- confirmed_at
- created_at
- updated_at
- phone
- phone_confirmed_at
- phone_change
- phone_change_token
- phone_change_sent_at
- is_anonymous
- is_sso_user
- deleted_at
- is_super_admin
- email_change_token_current
- email_change_confirm_status

### Session Data
Stored in memory and secure storage:
- access_token (JWT)
- refresh_token
- expires_at
- user (from JWT payload)

## UI/UX Flow Descriptions

### Onboarding Flow
1. App launch → AuthLoadingScreen (checks session)
2. If no session → LoginScreen
3. If session exists but email not verified → EmailVerificationScreen
4. If session exists and email verified → Home Screen

### Registration Flow
1. User taps "Sign Up" on LoginScreen → RegisterScreen
2. User enters email and password → Form validation
3. On submit → AuthService.signUp() → Success message
4. Automatic redirect to EmailVerificationScreen
5. Shows "Check your email" message with resend option

### Login Flow
1. User enters email and password on LoginScreen
2. Form validation → AuthService.signInWithPassword()
3. If successful:
   - If email verified → Home Screen
   - If email not verified → EmailVerificationScreen with "Verification required" message
4. If failed → Error message (invalid credentials)

### Social Login Flow
1. User taps Google/Apple button
2. OAuth flow opens in browser/system
3. Upon successful auth:
   - If new user → Account created + verification email sent → EmailVerificationScreen
   - If existing user:
     - If email verified → Home Screen
     - If email not verified → EmailVerificationScreen
4. If OAuth fails → Error message shown

### Email Verification Flow
1. Screen shows status: "We sent a verification email to [email]"
2. Button: "Resend Verification Email"
3. Automatic detection of verification status (listens to auth state)
4. On verification success → Redirect to intended destination (or Home)
5. Shows success message: "Email verified successfully!"

### Password Reset Flow
1. User taps "Forgot Password?" on LoginScreen → ForgotPasswordScreen
2. User enters email → Form validation
3. On submit → AuthService.resetPasswordForEmail() → Success message (non-revealing)
4. Shows: "If your email exists in our system, you'll receive reset instructions"
5. User clicks email link → ResetPasswordScreen (pre-filled with token)
6. User enters new password → Validation → AuthService.updateUser()
7. On success → Redirect to LoginScreen with success message

### Protected Access Flow
1. User attempts to access protected route (cart, favorites, etc.)
2. ProtectedRoute component checks:
   - No session → Redirect to LoginScreen (preserve intended destination)
   - Session exists but email not verified → Redirect to EmailVerificationScreen
   - Session exists and email verified → Allow access to protected content
3. After successful verification/login → Redirect to originally intended destination

## Error Handling and Logging

### Error Categories

1. **Validation Errors** (client-side)
   - Invalid email format
   - Weak password (doesn't meet requirements)
   - Form field empty
   - Passwords don't match
   - Handled by displaying inline form errors

2. **Authentication Errors** (Supabase responses)
   - Invalid credentials
   - Email already registered
   - Session expired
   - Provider error (Google/Apple)
   - Handled by showing toast/error dialog with retry option

3. **Network Errors**
   - No internet connection
   - Request timeout
   - Server unavailable
   - Handled by showing connection error with retry option

4. **Unexpected Errors**
   - Caught by error boundaries
   - Logged to monitoring service (if configured)
   - Show generic error message to user

### Error Handling Implementation

```javascript
// In AuthService methods
try {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return { success: true, data };
} catch (error) {
  // Map Supabase errors to user-friendly messages
  const message = mapAuthErrorToUserMessage(error);
  throw new AuthError(message, error.code);
}

// In screens
const handleSubmit = async () => {
  setLoading(true);
  try {
    await authService.signUp(email, password);
    navigation.navigate('EmailVerification');
  } catch (error) {
    showErrorToast(error.message);
  } finally {
    setLoading(false);
  }
};
```

### Logging Strategy
- Authentication events logged to console in development
- Production: Send to error monitoring service (Sentry, etc.)
- Logged events:
  - Login success/failure
  - Registration success/failure
  - Social login success/failure
  - Email verification success/failure
  - Password reset/request success/failure
  - Logout events
  - Session expiration/refresh events
- No sensitive data (passwords, tokens) ever logged

## Performance Considerations

### Authentication Operations
- Target: <3 seconds for login/registration under normal conditions
- Optimizations:
  - Minimize round trips (Supabase handles most logic server-side)
  - Optimistic UI updates where appropriate
  - Pre-fetch user metadata when possible
  - Cache non-sensitive user data briefly

### Email Operations
- Target: <10 seconds for email delivery
- Relies on Supabase email service performance
- Provide immediate UI feedback ("Sending email...") while waiting
- Disable resend button briefly after sending to prevent spam

### State Management
- Minimize context re-renders by splitting context
  - AuthContext (user/session)
  - LoadingContext (separate loading states)
- Use useMemo/useCallback for expensive computations
- Avoid passing large objects as props unnecessarily

### Storage Operations
- AsyncStorage operations are asynchronous
- Don't block UI thread on storage reads/writes during auth flows
- Batch storage operations when possible (login/logout)

### Network Optimization
- Reuse Supabase client instance (singleton)
- Connection pooling handled by Supabase
- Request deduplication for rapid successive calls
- Consider offline queue for non-critical auth-related actions

## Diagrams and Models (Text-Based)

### Component Hierarchy
```
App
├── AuthProvider (AuthContext)
│   ├── AuthLoadingScreen (splash/checking auth state)
│   ├── NavigationContainer
│   │   ├── RootNavigator (Stack Navigator)
│   │   │   ├── AuthStack (conditionally shown)
│   │   │   │   ├── LoginScreen
│   │   │   │   ├── RegisterScreen
│   │   │   │   ├── ForgotPasswordScreen
│   │   │   │   ├── ResetPasswordScreen
│   │   │   │   └── ChangePasswordScreen
│   │   │   └── AppStack (conditionally shown)
│   │   │       ├── HomeScreen
│   │   │       ├── ProductListScreen
│   │   │       ├── ProductDetailScreen
│   │   │       ├── CartScreen
│   │   │       ├── FavoritesScreen
│   │   │       ├── OrdersScreen
│   │   │       └── SettingsScreen
│   │   │       *(All protected by ProtectedRoute wrapper)*
│   │   └── EmailVerificationScreen (shown conditionally)
│   └── SocialLoginButtons (reusable component)
└── ToastProvider (for feedback messages)
```

### Data Flow Model
```
[User Action] 
     ↓
[UI Component] → (Form Validation)
     ↓
[AuthService Method] → Supabase Auth API
     ↓
[Supabase Response] ← (Success/Error)
     ↓
[AuthService] → (Process Response, Store Tokens)
     ↓
[AuthContext Update] → (User Data, Session State)
     ↓
[UI Re-render] → (Show appropriate screen/state)
```

### Session Lifecycle Model
```
APP START
     ↓
Check Secure Storage for Session
     ↓
Session Found? ──No──→ Show AuthLoading → Check again on resume
     │
     Yes
     ↓
Validate Session with Supabase (silent refresh if needed)
     ↓
Session Valid? ──No──→ Clear Storage → Show Login Screen
     │
     Yes
     ↓
Update Auth Context with User Data
     ↓
Check Email Verification Status
     ↓
Email Verified? ──No──→ Show Email Verification Screen
     │
     Yes
     ↓
Show Appropriate Screen (Home or intended destination)
     ↓
[APP RUNNING]
     ↓
Listen for Auth State Changes (Supabase listener)
     ↓
[LOGOUT/EXPIRATION]
     ↓
Clear Storage & Context → Show Login Screen
```

## Implementation Notes

### Supabase Configuration Requirements
1. Enable Email Auth provider
2. Configure Email settings (SMTP or Supabase email service)
3. Enable Google provider with OAuth credentials
4. Enable Apple provider with OAuth credentials (Services ID, Key ID, private key)
5. Set JWT expiration (default 1 hour access token)
6. Set email confirmation required: TRUE
7. Configure URL settings for deep linking (mobile OAuth redirects)
8. Enable email change confirmation (for security)

### Environment Variables
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Dependencies to Install
- `@supabase/supabase-js` (Supabase client)
- `@react-native-async-storage/async-storage` (secure storage)
- `expo-auth-session` (for OAuth flows on mobile)
- `@react-native-google-signin/google-signin` (alternative Google auth)
- `react-native-apple-authentication` (Apple Sign In)

### Testing Considerations
- Unit tests for AuthService methods (mock Supabase)
- Integration tests for auth flows (with mocked Supabase)
- End-to-end testing of critical paths (login, registration, verification)
- Error case testing (network failures, invalid tokens, etc.)
- Performance testing of auth operations under various network conditions

This technical design provides a comprehensive blueprint for implementing the authentication system as specified, ensuring security, usability, and maintainability while leveraging Supabase's robust authentication infrastructure.