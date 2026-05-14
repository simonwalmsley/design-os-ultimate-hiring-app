# Milestone 3: Hiring Threads

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 2 (Authentication & Onboarding) complete

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

Implement Hiring Threads - the authenticated client home where users create, resume, and manage their hiring threads.

## Overview

After signing in, a client lands here. First-time users see a chat-starter empty state and create their first thread by typing a role name. Returning users see a dashboard of KPI cards, a filter bar, and thread cards - one per hiring process - that they click to resume where they left off.

**Key Functionality:**
- Show a chat-starter empty state when the client has no threads
- Create a thread from a role name (from the empty state or the "+ New Hiring Thread" button)
- Show a populated dashboard: KPI cards, filter bar, thread cards
- Resume a thread by clicking its card
- Filter by status, search by role or business, sort the list

## Recommended Approach: Test-Driven Development

Write tests first based on `product-plan/sections/hiring-threads/tests.md` - it covers thread creation from both states, resuming, filtering/searching/sorting, and the empty-to-populated transition.

## What to Implement

### Components

Copy from `product-plan/sections/hiring-threads/components/`:
- `HiringThreadsEmpty` - the first-time empty state
- `HiringThreadsPopulated` - the full dashboard

Render `HiringThreadsEmpty` when the client has zero threads, otherwise `HiringThreadsPopulated`.

### Data Layer

The components use `HiringThread` and `ThreadKPIs` (see `types.ts`). You will need:
- A hiring_threads table scoped to the account
- A query that returns the account's threads plus the computed KPIs (active threads, total applicants, shortlisted)
- Create-thread logic that spins up a new thread in the first phase

### Callbacks

- `onCreateThread(roleTitle)` - create a thread and route to it
- `onOpenThread(id)` - route to `/threads/:id`
- `onFilterStatus(status)` - filter the thread list
- `onSearch(query)` - search by role or business name
- `onSort(sortBy)` - sort the thread list

### Empty States

- **No threads:** render `HiringThreadsEmpty` - the chat-starter, not a blank screen
- **Filtered to nothing:** show the "no results" state and let the user clear the filter/search

## Files to Reference

- `product-plan/sections/hiring-threads/README.md`
- `product-plan/sections/hiring-threads/tests.md`
- `product-plan/sections/hiring-threads/components/`
- `product-plan/sections/hiring-threads/types.ts`
- `product-plan/sections/hiring-threads/sample-data.json`
- `product-plan/sections/hiring-threads/hiring-threads-empty.png`, `hiring-threads-populated.png`

## Expected User Flows

### Flow 1: Create the First Thread
1. A new client sees `HiringThreadsEmpty`
2. User types a role name and clicks "Get Started"
3. `onCreateThread` fires with the role title
4. **Outcome:** A new thread is created and the user is routed into it; the home now shows the populated dashboard

### Flow 2: Resume a Thread
1. A returning client sees `HiringThreadsPopulated` with thread cards
2. User clicks a thread card
3. `onOpenThread` fires with the thread id
4. **Outcome:** The user is routed to that thread, resuming at its current phase

### Flow 3: Find a Thread
1. User changes the status filter, searches by role/business, or changes sort
2. The respective callback fires
3. **Outcome:** The thread list narrows or reorders; an empty filter result shows the "no results" state

## Done When

- [ ] Tests written for key flows (success and failure paths)
- [ ] All tests pass
- [ ] `HiringThreadsEmpty` shows when there are zero threads
- [ ] `HiringThreadsPopulated` shows KPIs, filters, and thread cards with real data
- [ ] Thread creation works from both the empty state and the "+ New Hiring Thread" button
- [ ] Clicking a thread card resumes it
- [ ] Filter, search, and sort work
- [ ] The empty-to-populated transition works after the first thread is created
- [ ] Matches the visual design
- [ ] Responsive on mobile
