# Test Instructions: Authentication & Onboarding

These test-writing instructions are framework-agnostic. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

This section covers the pre-auth screens (sign in, sign up, email verification, pending approval, forgot password flow, expired links) and first-sign-in onboarding (business details, how-it-works). Key things to test: form submission and validation, the auth state machine (Unverified -> Pending -> Active / Inactive), email-flow callbacks, and onboarding completion.

---

## User Flow Tests

### Flow 1: Sign In

#### Success Path

**Setup:** A registered, active user exists.

**Steps:**
1. User navigates to the sign in screen
2. User sees the "Ultimate Hiring Process" mark and the sign in card
3. User enters a valid email and password
4. User clicks the sign in button

**Expected Results:**
- [ ] `onSignIn` is called with the entered email and password
- [ ] On success, a client is routed to Hiring Threads; an admin is routed to the Admin Dashboard

#### Failure Path: Wrong Credentials

**Setup:** Sign in will be rejected.

**Expected Results:**
- [ ] An inline error appears in `#dc2828` (for example "Email or password is incorrect")
- [ ] The password field is cleared or left for retry; the email is preserved
- [ ] The submit button remains enabled

#### Failure Path: Inactive Account

**Setup:** The account status is `inactive`.

**Expected Results:**
- [ ] The user is shown the account inactive state rather than being routed into the app

### Flow 2: Sign Up

#### Success Path

**Steps:**
1. User navigates to the sign up screen
2. User enters full name, email, and password
3. User submits the form

**Expected Results:**
- [ ] `onSignUp` is called with full name, email, and password
- [ ] The user is shown the Check Your Email screen

#### Failure Path: Validation Errors

**Steps:** User submits with an empty required field or an invalid email.

**Expected Results:**
- [ ] The invalid field shows an inline error in `#dc2828`
- [ ] The form is not submitted; `onSignUp` is not called

### Flow 3: Forgot Password

**Steps:**
1. User clicks the forgot password link on sign in
2. User enters their email and submits (`onForgotPassword` is called)
3. User sees the Check Email screen
4. User follows the reset link to the Reset Password screen, enters a new password, and submits (`onResetPassword` is called)

**Expected Results:**
- [ ] Each callback fires with the correct arguments
- [ ] A success toast appears after the password is reset
- [ ] An expired reset link routes to the Expired Link screen instead

### Flow 4: First Sign-In Onboarding

**Steps:**
1. A newly active user lands on Onboarding Step 1 (business details)
2. User fills in business name, industry, location, and phone, then submits (`onSubmitBusinessDetails` is called with the details)
3. User sees Onboarding Step 2 (how-it-works, four tiles)
4. User clicks "Let's start" (`onCompleteOnboarding` is called)

**Expected Results:**
- [ ] The business details payload matches `Omit<Account, 'id'>`
- [ ] The shell is visible but dimmed behind the onboarding overlay
- [ ] Completing Step 2 routes the user into the app

---

## Empty State Tests

This section is form-driven rather than list-driven, so empty states are mainly empty/partial forms:

### Empty Form Submission

**Expected Results:**
- [ ] Submitting any auth form with empty required fields shows inline validation, not a blank failure
- [ ] Focus moves to the first invalid field

### Pending Approval State

**Setup:** A user with status `pending`.

**Expected Results:**
- [ ] The Pending Approval screen explains the account is awaiting admin approval
- [ ] A resend option is available and calls `onResendEmail`

---

## Component Interaction Tests

### SignIn / SignUp / ResetPassword

- [ ] Each renders the product mark above the card
- [ ] Each card is a centred standalone layout (no shell), max width ~420px
- [ ] Submit buttons use the yellow `#ffcd05` primary style
- [ ] Password fields mask input

### CheckYourEmail / ForgotPasswordCheckEmail / PendingApproval / ExpiredLink

- [ ] Each shows a clear status message and the relevant next action
- [ ] Resend actions call `onResendEmail`

### OnboardingHowItWorks

- [ ] Renders the four onboarding phases from the `onboardingPhases` prop in a 2x2 tile grid

---

## Edge Cases

- [ ] Session expired: a toast notifies the user and routes them to sign in
- [ ] Expired verification link and expired reset link both route to the Expired Link screen
- [ ] Long business names and email addresses do not break the card layout
- [ ] Toggling between sign in and sign up preserves no stale validation errors

---

## Accessibility Checks

- [ ] All form fields have associated labels
- [ ] Validation errors are announced to screen readers
- [ ] The whole flow is keyboard navigable; focus is managed on screen transitions
- [ ] Colour is not the only signal for validation errors

---

## Sample Test Data

```typescript
const mockProfile = {
  id: 'user-001',
  fullName: 'James Ryan',
  email: 'james.ryan@pattersonplumbing.com.au',
  role: 'client',
  status: 'active',
  accountId: 'account-001',
}

const mockPendingProfile = { ...mockProfile, id: 'user-002', status: 'pending' }
const mockInactiveProfile = { ...mockProfile, id: 'user-003', status: 'inactive' }

const mockOnboardingPhases = [
  { id: 'phase-1', title: 'Clarity of Role', icon: 'target', body: '...' },
  // ... four total
]
```

---

## Notes for Test Implementation

- Mock the auth API to test success, wrong-credentials, and inactive-account paths
- Verify each callback prop is called with the exact argument shape from `types.ts`
- Test the auth state machine transitions explicitly: Unverified -> Pending -> Active, and Active -> Inactive
- Test that toasts appear for session expiry, resend confirmation, and reset success
