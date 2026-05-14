# Application Shell

## Overview

Sidebar navigation shell for Ultimate Hiring Process. The sidebar is the primary navigation surface, with a top bar providing breadcrumbs and user controls. Pre-auth screens (sign in, sign up, pending approval) bypass the shell entirely and render as centred cards on a dark background.

## Navigation Structure

- Hiring Threads - thread list and management (default landing for clients)
- Profile - business details and personal settings
- Admin Dashboard - KPIs, client list, recent activity (admin only)
- AI Configuration - model selection per phase (admin only)

Inside a hiring thread, the sidebar expands a phase sub-list (Phase 1: Clarity of Role, Phase 2: Advertise for Role, Phase 3: Role Outcomes, Phase 4: Ranking, plus post-MVP phases). Each phase shows a state: Completed (tick), Current (yellow highlight), Locked (lock icon, greyed), or Post-MVP (dashed, not clickable).

## Layout Pattern

A three-column layout: a fixed icon rail on the left, an optional secondary sidebar (the phase sub-list, shown only inside a thread), and the main content area with a top bar. The top bar carries breadcrumbs and the user menu.

## Responsive Behaviour

- Desktop: persistent icon rail + optional secondary sidebar + top bar + content
- Tablet/mobile: rail collapses to a hamburger menu with an overlay drawer; content goes full-width

## Design Notes

- Dark mode is the default (`#0a0a0a` base).
- Yellow (`#ffcd05`) is used for active nav items and focus rings.
- Admin-only nav items appear below a divider.
- The user menu sits top-right in the top bar with an avatar (initials fallback) and a Sign Out action.

## Components Provided

- `AppShell` - the complete shell. Self-contained: it implements the icon rail, mobile drawer, secondary phase sidebar, top bar, breadcrumbs, and user menu inline. Built with `@headlessui/react` and `@heroicons/react` only.
- `index.ts` - exports `AppShell` plus the `PhaseItem` and `PhaseState` types.

## AppShell Props

| Prop | Description |
|------|-------------|
| `children` | The section content to render in the main area |
| `breadcrumbs` | String array shown in the top bar |
| `activeThread` | When set (and `activeNav` is "Hiring Threads"), the secondary phase sidebar shows |
| `activeNav` | The currently active top-level nav item |
| `phases` | The phase sub-list for the active thread (`PhaseItem[]`) |
| `isAdmin` | Whether to show the admin-only nav items |
| `user` | `{ name, email?, imageUrl? }` for the user menu |
| `onNavigate` | Called with an href when a nav item is clicked |
| `onLogout` | Called when the user signs out |

## Visual Reference

No shell screenshot is included in this export. Render `AppShell` with a section's components as `children` to see the full app experience.

## Integration Notes

Wire `onNavigate` to your router and `onLogout` to your auth sign-out. The shell is presentational - it does not own routing or auth state. Pre-auth and onboarding screens from the Authentication & Onboarding section render outside or overlaid on the shell (see that section's README).
