# Application Shell Specification

## Overview
Sidebar navigation shell for the Ultimate Hiring Process. The sidebar is the primary navigation surface, with a top bar providing breadcrumbs and user controls. Pre-auth screens (sign in, sign up, pending approval) bypass the shell entirely and render as centred cards on a dark background.

## Navigation Structure
- Hiring Threads → Thread list and management (default landing for clients)
- Profile → Business details and personal settings
- Admin Dashboard → KPIs, client list, recent activity (admin only)
- AI Configuration → Model selection per phase (admin only)

Inside a hiring thread, the sidebar expands a phase sub-list:
- Phase 1: Clarity of Role (Completed / Current / Locked)
- Phase 2: Advertise for Role (Completed / Current / Locked)
- Phase 3: Role Outcomes (Completed / Current / Locked)
- Phase 4: Ranking (Completed / Current / Locked)
- Phases 5-9: Post-MVP (dashed, not clickable)

## User Menu
Top-right of the top bar. Shows user avatar (initials fallback) and name. Dropdown contains Sign Out action.

## Layout Pattern
Sidebar + top bar. Sidebar is fixed-width on desktop (256px), collapsible to hamburger on mobile. Top bar spans the content area with breadcrumb navigation. Content area fills remaining space.

## Responsive Behavior
- **Desktop:** Persistent sidebar (256px) + top bar + content area
- **Tablet:** Sidebar collapses to hamburger menu, overlay on toggle
- **Mobile:** Hamburger menu, full-width content

## Design Notes
- Dark mode is the default. Light mode available via toggle at bottom of sidebar.
- Yellow (#FFCB05) is used for active nav items, focus rings, and the dark/light toggle accent.
- Admin-only nav items appear below a divider in the sidebar.
- Phase states use distinct visual treatments: Completed (tick icon), Current (yellow highlight), Locked (lock icon, greyed), Post-MVP (dashed border, greyed).
- User identity block sits at the bottom of the sidebar above the dark/light toggle.
