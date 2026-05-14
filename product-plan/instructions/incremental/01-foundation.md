# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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

Set up the foundational elements: design tokens, data model types, routing structure, and the application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind v4 configuration and the dark-first surface system
- See `product-plan/design-system/fonts.md` for the Inter + JetBrains Mono setup

The components are built with Tailwind CSS v4 (no `tailwind.config.js`) and are dark mode first against a `#0a0a0a` base. JetBrains Mono is applied inline wherever numerics appear - make sure it is loaded.

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for the canonical interface definitions
- See `product-plan/data-model/README.md` for entity relationships
- Note: each section ships its own `types.ts` shaped for its UI; field names diverge slightly between sections. Treat `data-model/types.ts` as canonical and reconcile section shapes against it.

### 3. Routing Structure

Create routes for each area:

- `/sign-in`, `/sign-up`, `/verify-email`, `/pending-approval`, `/forgot-password`, `/reset-password` - pre-auth screens (no shell)
- `/onboarding` - first sign-in onboarding (shell visible but dimmed)
- `/threads` - Hiring Threads (default landing for clients)
- `/threads/:threadId` - a hiring thread, hosting the Conversational Phases (Phases 1-3) and Rankings Dashboard (Phase 4)
- `/profile` - Profile
- `/admin` - Admin Dashboard (admin only)
- `/admin/ai` - AI Configuration (admin only)

Placeholder pages are fine at this milestone.

### 4. Application Shell

Copy the shell component from `product-plan/shell/components/` to your project:

- `AppShell.tsx` - the complete, self-contained shell (icon rail, mobile drawer, secondary phase sidebar, top bar, breadcrumbs, user menu). Built with `@headlessui/react` and `@heroicons/react` only.
- `index.ts` - exports `AppShell` and the `PhaseItem` / `PhaseState` types.

**Wire Up Navigation:**

- `onNavigate` - connect to your router
- `onLogout` - connect to your auth sign-out
- `activeNav` - set to the current top-level nav item
- `activeThread` + `phases` - when inside a thread, pass the thread name and its phase sub-list so the secondary sidebar shows
- `isAdmin` - gate the admin-only nav items
- `user` - pass `{ name, email?, imageUrl? }` for the user menu

Pre-auth and onboarding screens render outside or overlaid on the shell - see the Authentication & Onboarding milestone.

## Files to Reference

- `product-plan/design-system/` - design tokens
- `product-plan/data-model/` - type definitions and relationships
- `product-plan/shell/README.md` - shell design intent and props
- `product-plan/shell/components/` - the `AppShell` component

## Done When

- [ ] Design tokens are configured (Tailwind v4, dark-first, fonts loaded)
- [ ] Data model types are defined
- [ ] Routes exist for all areas (placeholder pages are fine)
- [ ] `AppShell` renders with navigation
- [ ] Navigation links to the correct routes
- [ ] The user menu shows user info and signs out
- [ ] The secondary phase sidebar shows when inside a thread
- [ ] Responsive on mobile (rail collapses to a drawer)
