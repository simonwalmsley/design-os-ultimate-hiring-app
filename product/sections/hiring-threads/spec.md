# Hiring Threads Specification

## Overview
The home screen for authenticated clients. Shows either an empty state (chat-starter style for first-time users) or a populated dashboard with KPI cards, filters, and thread cards. This is the hub for creating, resuming, and managing hiring threads.

## User Flows
- First-time user sees empty state, types a role name, clicks "Get Started" to create their first thread
- Returning user sees populated dashboard with all their threads, KPIs, filters, and status pills
- Click "+ New Hiring Thread" to create another thread via the same role-input flow
- Click any thread card to resume where they left off (session resumption)
- Filter threads by status, search by role or business name, sort by last updated/role/applicant count
- Thread cards with "Needs update" tag open on the first phase with a pending regeneration banner

## UI Requirements
- Empty state: centred headline "Start a new hiring thread", sub-instruction, role input, Get Started button — chat-starter feel, not HR dashboard
- Populated state: page title + subtitle, "+ New Hiring Thread" button, 3 KPI cards (Active Threads, Total Applicants, Shortlisted), filter bar (status dropdown, search, sort), thread card list
- Thread cards: role title, business + location, phase badge, applicant/shortlisted/reviewed counts in JetBrains Mono, progress bar, last updated, status pill with colour coding, clickable entire card
- Status pill colours: Setup in progress (amber #ff8907), Waiting for applicants (muted #a3a3a3), Ranking in progress (blue #1a6ef4), Shortlist ready (green #16a249), Hire closed (muted + subdued)
- KPI numbers in JetBrains Mono weight 600
- Hover on thread card: subtle surface lift, cursor pointer

## Configuration
- shell: true
