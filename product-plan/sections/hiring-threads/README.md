# Hiring Threads

## Overview

The home screen for authenticated clients. Shows either an empty state (chat-starter style for first-time users) or a populated dashboard with KPI cards, filters, and thread cards. This is the hub for creating, resuming, and managing hiring threads.

## User Flows

- First-time user sees the empty state, types a role name, clicks "Get Started" to create their first thread
- Returning user sees the populated dashboard with all their threads, KPIs, filters, and status pills
- Click "+ New Hiring Thread" to create another thread via the same role-input flow
- Click any thread card to resume where they left off (session resumption)
- Filter threads by status, search by role or business name, sort by last updated/role/applicant count
- Thread cards with a "Needs update" tag open on the first phase with a pending regeneration banner

## Design Decisions

- Empty state is a centred chat-starter feel, not an HR dashboard: a headline, a role input, and a Get Started button.
- Populated state: page title, "+ New Hiring Thread" button, 3 KPI cards (Active Threads, Total Applicants, Shortlisted), a filter bar (status dropdown, search, sort), and a thread card list.
- Thread cards show role, business and location, a phase badge, applicant/shortlisted/reviewed counts in JetBrains Mono, a progress bar, last updated, and a colour-coded status pill. The whole card is clickable.
- Status pill colours: Setup in progress (amber `#ff8907`), Waiting for applicants (muted), Ranking in progress (blue `#1a6ef4`), Shortlist ready (green `#16a249`), Hire closed (muted).

## Data Used

**Entities:** `HiringThread`, `ThreadKPIs`

**From global model:** `Hiring Thread`. `ThreadKPIs` is a section-specific summary computed across the account's threads.

## Visual Reference

Screenshots: `hiring-threads-empty.png`, `hiring-threads-populated.png`.

## Components Provided

- `HiringThreadsEmpty` - the first-time empty state with the role-input starter
- `HiringThreadsPopulated` - the full dashboard: KPIs, filter bar, and thread card list

## Callback Props

| Callback | Description |
|----------|-------------|
| `onCreateThread` | Called with a role title when the user starts a new thread |
| `onOpenThread` | Called with a thread id when the user clicks a thread card to resume |
| `onFilterStatus` | Called when the user filters by status |
| `onSearch` | Called when the user searches by role or business |
| `onSort` | Called when the user changes the sort order |
