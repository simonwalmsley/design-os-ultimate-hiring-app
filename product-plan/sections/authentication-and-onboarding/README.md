# Authentication & Onboarding

## Overview

Pre-auth screens (1-8) and first-sign-in onboarding (9-10). Covers sign in, sign up, email verification, pending approval, the forgot password flow (request, check email, reset form, expired link), business details capture, and the four-tile how-it-works introduction. All pre-auth screens are standalone centred cards on a dark background with no shell. Onboarding screens overlay the shell with a dimmed background.

## User Flows

- Sign in with email/password, routing to threads (client) or admin dashboard (admin)
- Sign up with name, email, password - verification email sent, then pending approval state
- Forgot password: request reset, check email, set new password
- Expired link handling for both verification and reset cases
- First sign-in onboarding: business details form, then four-tile how-it-works overview
- Account inactive and session expired edge states

## Design Decisions

- Pre-auth screens (1-8) are standalone centred cards on `#0a0a0a`, max width ~420px, no sidebar or top bar. The product mark "Ultimate Hiring Process" sits centred above each card.
- Onboarding screens (9-10) render with the post-auth shell visible but dimmed behind an `rgba(0,0,0,0.5)` overlay. Step 1 overlay is ~560px wide; Step 2 is ~800px with a 2x2 tile grid.
- Yellow `#ffcd05` is used for primary buttons only, never as text on light backgrounds.
- Inline validation errors render in `#dc2828`. Toasts cover session expiry, resend confirmations, and reset success.
- Auth state machine: Unverified -> Pending -> Active / Inactive.

## Data Used

**Entities:** `Profile`, `Account`, `OnboardingPhase`

**From global model:** `Profile` and `Account`. `OnboardingPhase` is section-specific static content for the How It Works screen.

## Visual Reference

Screenshots are included for all ten screens: `sign-in.png`, `sign-up.png`, `check-your-email.png`, `pending-approval.png`, `forgot-password-request.png`, `forgot-password-check-email.png`, `reset-password.png`, `expired-link.png`, `onboarding-business-details.png`, `onboarding-how-it-works.png`.

## Components Provided

- `SignIn` - email/password sign in form
- `SignUp` - name/email/password registration form
- `CheckYourEmail` - post sign-up verification prompt
- `PendingApproval` - awaiting-admin-approval state
- `ForgotPasswordRequest` - request a password reset
- `ForgotPasswordCheckEmail` - reset email sent confirmation
- `ResetPassword` - set a new password
- `ExpiredLink` - expired verification/reset link state
- `OnboardingBusinessDetails` - first sign-in business details form
- `OnboardingHowItWorks` - four-tile process introduction

All ten screens accept callbacks from `AuthenticationProps` or `OnboardingProps` (see `types.ts`).

## Callback Props

| Callback | Description |
|----------|-------------|
| `onSignIn` | Called when the user submits the sign in form |
| `onSignUp` | Called when the user submits the sign up form |
| `onForgotPassword` | Called when the user requests a password reset |
| `onResetPassword` | Called when the user sets a new password |
| `onResendEmail` | Called when the user clicks resend verification or reset email |
| `onSignOut` | Called when the user clicks sign out |
| `onSubmitBusinessDetails` | Called when the user submits business details in onboarding Step 1 |
| `onCompleteOnboarding` | Called when the user finishes onboarding Step 2 |
