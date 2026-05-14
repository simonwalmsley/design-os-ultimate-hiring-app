# Admin Specification

## Overview
Section 5, the staff-only admin area for super admins and coaches running the platform. Three views: an Admin Dashboard with platform KPIs and a recent activity feed, Client Management for the client account list and approving pending users, and AI Configuration for choosing the AI model used in each phase.

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

## UI Requirements
- Admin Dashboard: page header, KPI card row (Total Clients, Active Threads, Applicants Processed, Pending Approvals), recent activity feed (timestamped events with type icons), a "needs attention" callout for pending approvals
- Client Management: pending-approvals panel at the top with approve/reject actions, client account list below with search and status filter
- Client account row: business name, industry, location, user count and thread count (JetBrains Mono), status pill, joined date, expandable to show the account's users and threads
- Approval card: person name, business, requested role, applied date, Approve and Reject buttons
- Status pills: Active (green), Pending (amber), Inactive/Unverified (muted)
- AI Configuration: one row per phase (1-4) showing the phase name, the currently assigned provider and model, and a selector to change it
- Provider/model options grouped by provider (Anthropic, OpenAI, Google), each showing a cost indicator
- AI Configuration save action with a clear saved/unsaved state

## Configuration
- shell: true
