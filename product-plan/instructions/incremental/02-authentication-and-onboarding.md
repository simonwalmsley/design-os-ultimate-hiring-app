# Milestone 2: Authentication & Onboarding

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colours, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components - use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development - write tests first using `tests.md` instructions
- The components are props-based and ready to integrate - focus on the backend and data layer

---

## Goal

Implement Authentication & Onboarding - the pre-auth screens and first-sign-in onboarding that get a user into the app.

## Overview

This is the front door. New users sign up, verify their email, and wait for admin approval before they can access anything. Returning users sign in and are routed to their threads (or the admin dashboard). The forgot-password flow handles resets, including expired links. Once approved and signed in for the first time, users complete a short onboarding: business details, then a four-tile introduction to the hiring process.

**Key Functionality:**
- Email/password sign in with role-based routing (client to threads, admin to admin dashboard)
- Sign up with email verification and an admin-approval gate
- Forgot password flow: request, check email, reset, expired link handling
- First sign-in onboarding: business details capture, then a how-it-works overview
- Auth state machine: Unverified -> Pending -> Active / Inactive

## Recommended Approach: Test-Driven Development

Before implementing, write tests first based on `product-plan/sections/authentication-and-onboarding/tests.md`. It covers the sign in, sign up, forgot password, and onboarding flows including failure and validation paths.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/authentication-and-onboarding/components/`:

- `SignIn`, `SignUp`, `CheckYourEmail`, `PendingApproval`
- `ForgotPasswordRequest`, `ForgotPasswordCheckEmail`, `ResetPassword`, `ExpiredLink`
- `OnboardingBusinessDetails`, `OnboardingHowItWorks`

Pre-auth screens (1-8) render as standalone centred cards on `#0a0a0a` with no shell. Onboarding screens (9-10) render with the shell visible but dimmed behind an overlay.

### Data Layer

The components use `Profile`, `Account`, and `OnboardingPhase` (see `types.ts`). You will need:
- A users/profiles table with role and status
- An accounts table for business details
- Email sending for verification and password reset
- Token generation and expiry for verification and reset links

### Callbacks

Wire up these user actions (see `AuthenticationProps` and `OnboardingProps`):
- `onSignIn(email, password)` - authenticate and route by role
- `onSignUp(fullName, email, password)` - create the profile, send verification, route to Check Your Email
- `onForgotPassword(email)` - send a reset email
- `onResetPassword(newPassword)` - set the new password, show a success toast
- `onResendEmail()` - resend the verification or reset email
- `onSignOut()` - clear the session
- `onSubmitBusinessDetails(details)` - save the account details
- `onCompleteOnboarding()` - mark onboarding done, route into the app

### Empty States

This section is form-driven. The key "empty" cases are empty/partial form submissions - show inline validation in `#dc2828`, do not submit, and move focus to the first invalid field.

## Files to Reference

- `product-plan/sections/authentication-and-onboarding/README.md`
- `product-plan/sections/authentication-and-onboarding/tests.md`
- `product-plan/sections/authentication-and-onboarding/components/`
- `product-plan/sections/authentication-and-onboarding/types.ts`
- `product-plan/sections/authentication-and-onboarding/sample-data.json`
- The ten screenshots in `product-plan/sections/authentication-and-onboarding/`

## Expected User Flows

### Flow 1: Sign Up and Get Approved
1. User fills in name, email, password on `SignUp` and submits
2. `onSignUp` fires; user sees `CheckYourEmail`
3. User verifies; status moves to Pending; user sees `PendingApproval`
4. **Outcome:** An admin approves the user (Admin section); status becomes Active

### Flow 2: Sign In
1. User enters credentials on `SignIn` and submits
2. `onSignIn` fires; backend authenticates
3. **Outcome:** A client routes to Hiring Threads, an admin to the Admin Dashboard; an inactive account is blocked with the inactive state

### Flow 3: Reset a Forgotten Password
1. User clicks forgot password, enters their email (`onForgotPassword`)
2. User sees `ForgotPasswordCheckEmail`, follows the link to `ResetPassword`
3. User sets a new password (`onResetPassword`)
4. **Outcome:** Success toast; user can sign in. An expired link routes to `ExpiredLink`.

### Flow 4: First Sign-In Onboarding
1. A newly active user lands on `OnboardingBusinessDetails`
2. User submits business details (`onSubmitBusinessDetails`)
3. User sees `OnboardingHowItWorks` and clicks "Let's start" (`onCompleteOnboarding`)
4. **Outcome:** Onboarding is marked complete; user enters the app at Hiring Threads

## Done When

- [ ] Tests written for sign in, sign up, forgot password, and onboarding flows (success and failure paths)
- [ ] All tests pass
- [ ] Components render with real data
- [ ] Validation errors display inline; empty submissions are blocked
- [ ] The auth state machine is enforced (Unverified -> Pending -> Active / Inactive)
- [ ] Role-based routing works after sign in
- [ ] All callbacks are wired to backend calls
- [ ] Matches the visual design
- [ ] Responsive on mobile
