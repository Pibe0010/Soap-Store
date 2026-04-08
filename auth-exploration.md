## Exploration: Login and Register Functionality with Social Auth and Email Verification

### Current State
The Soap-Store app currently has:
- An AuthContext.jsx that manages authentication state (user, isLoggedIn) with login, logout, and register functions that only update React state
- A Supabase service file (src/services/supabase.js) with the Supabase client initialized but lacking authentication methods (signIn, signUp, etc.)
- A placeholder LoginScreen.jsx with no actual login functionality
- No RegisterScreen.jsx file exists
- Navigation configured in AppNavigator.jsx with a Login route but no Register route
- AuthMenuModal.jsx that shows login/register options in the menu but with empty callback functions
- Environment variables configured for Supabase (URL and anon key)
- No social authentication (Google/Apple) or email verification implementation

### Affected Areas
- `src/context/AuthContext.jsx` — Needs to be updated to integrate with Supabase auth methods
- `src/services/supabase.js` — Requires implementation of auth methods (email/password, Google, Apple)
- `src/screens/LoginScreen.jsx` — Needs implementation of login form with Supabase auth
- `src/screens/RegisterScreen.jsx` — Needs to be created with registration form and email verification
- `src/navigation/AppNavigator.jsx` — Needs to add Register route
- `src/components/AuthMenuModal.jsx` — Needs to connect login/register callbacks to actual navigation/screens

### Approaches

#### 1. **Direct Supabase Integration Approach**
- Implement auth methods directly in supabase.js using Supabase auth API
- Update AuthContext to call these methods instead of just updating state
- Create functional LoginScreen and RegisterScreen with form handling
- Add Google/Apple authentication using Supabase's built-in providers
- Implement email verification flow using Supabase's email change/confirmation features

**Pros:**
- Leverages Supabase's built-in auth capabilities
- Centralized auth logic in service layer
- Follows existing code patterns in supabase.js
- Supabase handles token management and security

**Cons:**
- Requires significant implementation across multiple files
- Need to handle loading/error states in UI
- Must implement email verification flows manually

**Effort:** High

#### 2. **Supabase UI Components Approach**
- Use @supabase/supabase-js with pre-built UI components (if available)
- Implement auth using Supabase's auth helpers
- Reduce custom UI code by leveraging Supabase's auth UI

**Pros:**
- Less custom UI code to write
- Supabase maintains auth UI components
- Consistent look and feel

**Cons:**
- May not match existing app design/theme
- Less control over user experience
- Need to investigate if Supabase provides React Native UI components

**Effort:** Medium (but requires investigation of available components)

#### 3. **Hybrid Approach**
- Use Supabase for auth logic but keep custom UI
- Implement email/password manually
- Use Supabase magic link or OAuth for social auth
- Implement custom email verification UI

**Pros:**
- Balance of control and leveraging Supabase capabilities
- Can maintain existing UI patterns
- Flexible implementation

**Cons:**
- Still requires significant implementation
- Need to manage multiple auth approaches

**Effort:** High

### Recommendation
**Approach 1 (Direct Supabase Integration)** is recommended because:
1. The app already has Supabase configured and initialized
2. Supabase provides comprehensive auth APIs that match requirements
3. It allows maintaining full control over UI/UX to match existing design
4. The service layer pattern is already established in supabase.js
5. Email verification flows are well-documented in Supabase

Implementation should proceed in this order:
1. Implement auth methods in supabase.js (signInEmail, signUpEmail, signInGoogle, signInApple, etc.)
2. Update AuthContext to use these methods and handle auth state properly
3. Create RegisterScreen with email verification flow
4. Enhance LoginScreen with proper form handling
5. Update navigation to include Register route
6. Connect AuthMenuModal to actual navigation
7. Implement email verification handling

### Risks
- **Security considerations**: Proper handling of auth tokens and user data
- **User experience complexity**: Email verification adds steps to registration flow
- **Social auth configuration**: Requires proper setup in Supabase dashboard and native configuration
- **Error handling**: Need to properly handle and display auth errors to users
- **Token persistence**: Ensuring auth state persists across app restarts

### Ready for Proposal
Yes - sufficient investigation has been completed to propose specific implementation changes for adding login/register with social auth and email verification.
