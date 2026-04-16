# Authentication & Onboarding Specification

## Overview
Pre-auth screens (1-8) and first-sign-in onboarding (9-10). Covers sign in, sign up, email verification, pending approval, forgot password flow (request, check email, reset form, expired link), business details capture, and the four-tile how-it-works introduction. All pre-auth screens are standalone centred cards on dark background with no shell. Onboarding screens overlay the shell with a dimmed background.

## User Flows
- Sign in with email/password, routing to threads (client) or admin dashboard (admin)
- Sign up with name, email, password — verification email sent, then pending approval state
- Forgot password: request reset, check email, set new password
- Expired link handling for both verification and reset cases
- First sign-in onboarding: business details form, then four-tile how-it-works overview
- Account inactive and session expired edge states

## UI Requirements
- Pre-auth screens (1-8): standalone centred cards on #0a0a0a background, no sidebar, no top bar, max width ~420px
- Product mark "Ultimate Hiring Process" centred above each card
- Onboarding screens (9-10): post-auth shell visible but dimmed with rgba(0,0,0,0.5) overlay
- Onboarding Step 1 overlay max width ~560px, Step 2 overlay max width ~800px with 2x2 tile grid
- Yellow #ffcd05 for primary buttons only, never as text on light backgrounds
- Inline validation errors in #dc2828
- Toast notifications for session expiry, resend confirmations, password reset success
- Auth state machine: Unverified -> Pending -> Active / Inactive

## Configuration
- shell: false
