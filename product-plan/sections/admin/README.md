# Admin

## Overview

The staff-only admin area for super admins and coaches running the platform. Three views: an Admin Dashboard with platform KPIs and a recent activity feed, Client Management for the client account list and approving pending users, and AI Configuration for choosing the AI model used in each phase.

## User Flows

- Admin opens the Admin Dashboard and sees platform-wide KPIs and a recent activity feed
- Admin clicks through to Client Management to see all client accounts
- Admin reviews pending user approvals - each showing the person, their business, and requested role - and approves or rejects them
- Admin scans the client account list and filters or searches it
- Admin expands a client account to see its users and threads
- Admin deactivates or reactivates a client account or user
- Admin opens AI Configuration and reviews the AI model assigned to each of the four phases
- Admin changes the provider/model for a phase from the available options, each shown with a cost indicator
- Admin saves the AI configuration

## Design Decisions

- Client detail is an expandable row, not a separate screen - keeps the section to three screen designs.
- AI Configuration is a single editable page with an internal dirty/saved state; the Save button disables when there are no unsaved changes.
- The dashboard's "Needs Attention" callout reuses the same `ApprovalCard` as the Client Management pending-approvals panel.
- Status pills: Active (green), Pending (amber), Inactive/Unverified (muted). Model cost badges: Low (green), Medium (amber), High (red).

## Data Used

**Entities:** `Account` (with nested `AccountUser` and `AccountThread`), `PendingApproval`, `ActivityEvent`, `AdminSummary`, `AiProvider`, `AiModel`, `PhaseAiConfig`

**From global model:** `Account`, `Profile` (as `AccountUser` and `PendingApproval`), `Hiring Thread` (as `AccountThread`), `AI Provider Config`. `ActivityEvent` and `AdminSummary` are section-specific aggregates.

## Visual Reference

Screenshots: `AdminDashboard.png`, `ClientManagement.png`, `AiConfiguration.png`.

## Components Provided

- `AdminDashboard` - KPI row, recent activity feed, "Needs Attention" pending-approvals callout
- `ClientManagement` - pending-approvals panel, search and status filter, expandable account list
- `AiConfiguration` - per-phase provider/model selectors with cost indicators and a save state
- `AccountRow` - expandable account row (users + threads + activate/deactivate)
- `ApprovalCard`, `ActivityItem`, `PhaseModelRow`, `KpiCard`, `StatusPill`, `ThreadStatusPill`, `CostBadge` - building blocks

## Callback Props

**Admin Dashboard (`AdminDashboardProps`):** `onApprove`, `onReject`, `onViewAllClients`.

**Client Management (`ClientManagementProps`):**

| Callback | Description |
|----------|-------------|
| `onApprove` / `onReject` | Approve or reject a pending person |
| `onSearch` | Search the account list |
| `onFilterStatus` | Filter the account list by status |
| `onToggleAccountStatus` | Deactivate or reactivate an account |
| `onToggleUserStatus` | Deactivate or reactivate a user on an account |
| `onOpenThread` | Open a hiring thread from an expanded account |

**AI Configuration (`AiConfigurationProps`):** `onChangeModel`, `onSave`.
