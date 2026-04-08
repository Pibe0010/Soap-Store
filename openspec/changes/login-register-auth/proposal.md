# Proposal: Implement Authentication System with Email Verification Mandatory, Google/Apple Social Login, and Password Management

## Intent
Implement a secure authentication system that allows users to browse products freely but requires verified email authentication for sensitive actions (add to cart, favorites, orders, settings). The system will support email/password, Google, and Apple authentication with mandatory email verification, password change/reset functionality, and proper security measures.

## Scope
**Included:**
- Email/password authentication (sign up, sign in, sign out)
- Google authentication (social login)
- Apple authentication (social login)
- Mandatory email verification before accessing protected actions
- Password change functionality
- Password reset functionality with security guidance
- Protected route guarding for: add to cart, favorites, orders, settings
- Email verification flow (verification, resend verification)
- Session management and persistence
- Security best practices (rate limiting, secure tokens, etc.)

**Excluded:**
- Admin/user roles (all users have same permissions)
- Two-factor authentication (beyond email verification)
- Social login beyond Google and Apple
- Username-based login (email-only)

## Approach
**Service Layer Integration:** 
- Enhance `src/services/supabase.js` with comprehensive auth methods
- Use Supabase Auth for all authentication flows

**State Management:**
- Enhance `src/context/AuthContext.jsx` to handle Supabase auth state
- Track user, session, email verification status
- Provide loading/error states

**UI Screens:**
- Create functional `LoginScreen.jsx` with email/password form + Google/Apple buttons
- Create `RegisterScreen.jsx` with registration form
- Create `VerifyEmailScreen.jsx` for email verification flow
- Create `ResetPasswordScreen.jsx` for password reset
- Create `ChangePasswordScreen.jsx` for password change

**Navigation & Route Protection:**
- Update `src/navigation/AppNavigator.jsx` to include auth routes
- Implement route protection mechanism for sensitive actions
- Connect `AuthMenuModal.jsx` to functional auth handlers

**Protected Actions:**
- Add to cart
- Access favorites
- View orders
- Modify settings
- Any action requiring user identity or personal data

## Affected Areas
1. `src/services/supabase.js` - Add auth methods (signIn, signUp, signOut, social auth, password reset/change, etc.)
2. `src/context/AuthContext.jsx` - Connect to Supabase auth, manage session state
3. `src/screens/LoginScreen.jsx` - Replace placeholder with functional login
4. `src/screens/RegisterScreen.jsx` - Create new registration screen
5. `src/screens/VerifyEmailScreen.jsx` - Email verification screen
6. `src/screens/ResetPasswordScreen.jsx` - Password reset screen
7. `src/screens/ChangePasswordScreen.jsx` - Password change screen
8. `src/navigation/AppNavigator.jsx` - Add auth routes and protect protected routes
9. `src/components/AuthMenuModal.jsx` - Connect to functional auth handlers
10. Any components that perform protected actions (will need route protection)

## Dependencies
- Supabase project with Auth enabled
- Google provider configured in Supabase (requires Google Cloud project)
- Apple provider configured in Supabase (requires Apple Developer account)
- Expo configuration for deep linking (if needed for social auth)

## Security Considerations
- Rate limiting on auth attempts (handled by Supabase)
- Secure session handling (Supabase handles JWT tokens securely)
- Email verification required before accessing protected data
- Password strength requirements (Supabase enforced)
- Protection against brute force (Supabase built-in)
- Session expiration and refresh handling
- CSRF protection (handled by Supabase)
- HTTPS enforcement (Supabase enforces)

## Risks and Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Social auth configuration errors | Medium | High | Follow Supabase docs carefully, test thoroughly |
| Email delivery delays/failures | Low | Medium | Provide resend verification option, clear error messages |
| User confusion about verification requirement | Low | Low | Clear UI messaging about why verification is needed |
| Token expiration causing logout | Low | Medium | Implement silent token refresh where possible |
| Social auth revocation by user | Low | Low | Handle gracefully, offer email/password fallback |

## Next Steps
After proposal approval, proceed to:
1. `/sdd-spec` - Write detailed specifications with Given/When/Then scenarios
2. `/sdd-design` - Create technical design document
3. `/sdd-tasks` - Break down into implementation tasks
4. `/sdd-apply` - Implement the authentication system
5. `/sdd-verify` - Verify implementation matches spec

## Assumptions
- Supabase project is already set up and accessible via environment variables
- Email service is configured in Supabase for verification/password reset emails
- Basic UI components (inputs, buttons) are available from existing component library
- User understands they need to configure Google/Apple providers in Supabase dashboard