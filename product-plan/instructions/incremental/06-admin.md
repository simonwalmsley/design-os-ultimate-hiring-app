# Milestone 6: Admin

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete; Milestones 2-5 recommended so there is real data to administer

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

Implement Admin - the staff-only area for super admins and coaches to run the platform.

## Overview

This is where staff operate the platform. The Admin Dashboard surfaces platform-wide KPIs and a recent activity feed. Client Management is the account list, with a pending-approvals panel for gating new users into the app, and expandable rows showing each account's users and threads. AI Configuration assigns an AI provider and model to each of the four phases, with cost indicators to guide the choice.

**Key Functionality:**
- A dashboard with platform KPIs, a recent activity feed, and a pending-approvals callout
- Approve or reject pending users (this is the gate from Milestone 2's Pending state to Active)
- A searchable, filterable client account list with expandable rows
- Deactivate or reactivate accounts and individual users
- Assign an AI provider/model per phase, with a save state

## Recommended Approach: Test-Driven Development

Write tests first based on `product-plan/sections/admin/tests.md` - it covers approvals, expanding accounts, activate/deactivate, search/filter, and the AI config save state.

## What to Implement

### Components

Copy from `product-plan/sections/admin/components/`:
- `AdminDashboard`, `ClientManagement`, `AiConfiguration` - the three views
- `AccountRow`, `ApprovalCard`, `ActivityItem`, `PhaseModelRow`, `KpiCard`, `StatusPill`, `ThreadStatusPill`, `CostBadge` - building blocks

These render at `/admin` and `/admin/ai`, gated to admin/coach roles.

### Data Layer

The components use `Account` (with nested `AccountUser` and `AccountThread`), `PendingApproval`, `ActivityEvent`, `AdminSummary`, `AiProvider`, `AiModel`, and `PhaseAiConfig` (see `types.ts`). You will need:
- Queries that aggregate the dashboard KPIs and the activity feed
- A query for pending profiles (status `pending`)
- A query that returns accounts with their users and threads for the expandable list
- Account and profile status mutation endpoints
- An AI provider/model catalogue and per-phase config storage (this drives the model used in Conversational Phases and Rankings)

### Callbacks

- Dashboard: `onApprove`, `onReject`, `onViewAllClients`
- Client Management: `onApprove`, `onReject`, `onSearch`, `onFilterStatus`, `onToggleAccountStatus`, `onToggleUserStatus`, `onOpenThread`
- AI Configuration: `onChangeModel`, `onSave`

### Empty States

- **No pending approvals:** the Dashboard callout shows an "all caught up" message; the Client Management panel is hidden entirely
- **Account with no threads:** the expanded row shows a "No threads yet" message in the threads column
- **Filtered to nothing:** a "No accounts match" message

## Files to Reference

- `product-plan/sections/admin/README.md`
- `product-plan/sections/admin/tests.md`
- `product-plan/sections/admin/components/`
- `product-plan/sections/admin/types.ts`
- `product-plan/sections/admin/sample-data.json`
- `product-plan/sections/admin/AdminDashboard.png`, `ClientManagement.png`, `AiConfiguration.png`

## Expected User Flows

### Flow 1: Approve a New User
1. Admin sees a pending user in the Dashboard callout or the Client Management panel
2. Admin clicks "Approve" (`onApprove`) or "Reject" (`onReject`)
3. **Outcome:** The user's status moves to Active (approve) - completing the gate from Milestone 2 - or the request is declined

### Flow 2: Manage a Client Account
1. Admin opens Client Management, searches or filters the list
2. Admin expands an account to see its users and threads
3. Admin deactivates a user (`onToggleUserStatus`) or the whole account (`onToggleAccountStatus`)
4. **Outcome:** Account and user statuses update; an open thread can be opened via `onOpenThread`

### Flow 3: Configure AI Models
1. Admin opens AI Configuration and reviews the model assigned to each phase
2. Admin changes a phase's model (`onChangeModel`); the Save button enables
3. Admin clicks "Save changes" (`onSave`)
4. **Outcome:** The new per-phase model config is persisted and used by the AI in later phases

## Done When

- [ ] Tests written for key flows (success and failure paths)
- [ ] All tests pass
- [ ] All three views render with real data
- [ ] Approve/reject moves users through the approval gate
- [ ] Account list search, filter, and expand work
- [ ] Account and user activate/deactivate work
- [ ] AI Configuration changes persist and the save state behaves correctly
- [ ] Empty states render properly (no approvals, no threads, no matches)
- [ ] Admin routes are gated to admin/coach roles
- [ ] Matches the visual design
- [ ] Responsive on mobile
