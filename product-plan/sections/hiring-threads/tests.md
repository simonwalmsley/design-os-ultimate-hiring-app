# Test Instructions: Hiring Threads

These test-writing instructions are framework-agnostic. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

This section is the authenticated client home: an empty state for first-time users and a populated dashboard with KPIs, filters, and thread cards. Key things to test: thread creation from both states, resuming a thread, filtering/searching/sorting, and the empty-to-populated transition.

---

## User Flow Tests

### Flow 1: Create the First Thread (Empty State)

#### Success Path

**Setup:** The user has no threads (`threads` is `[]`).

**Steps:**
1. User navigates to Hiring Threads
2. User sees the empty state: a centred headline and a role input
3. User types a role name (for example "Senior Plumber")
4. User clicks "Get Started"

**Expected Results:**
- [ ] `onCreateThread` is called with the trimmed role title
- [ ] The empty state is shown only when there are zero threads

#### Failure Path: Empty Role Name

**Steps:** User clicks "Get Started" with a blank or whitespace-only input.

**Expected Results:**
- [ ] `onCreateThread` is not called
- [ ] The input stays focused for correction

### Flow 2: Create Another Thread (Populated State)

**Steps:**
1. User clicks "+ New Hiring Thread"
2. User enters a role title and submits

**Expected Results:**
- [ ] `onCreateThread` is called with the role title
- [ ] The new thread input flow matches the empty-state behaviour

### Flow 3: Resume a Thread

**Steps:**
1. User sees the populated dashboard with thread cards
2. User clicks anywhere on a thread card

**Expected Results:**
- [ ] `onOpenThread` is called with that thread's id
- [ ] A card tagged "Needs update" still opens via `onOpenThread` (the routing target handles the regeneration banner)

### Flow 4: Filter, Search, Sort

**Steps:**
1. User changes the status filter dropdown
2. User types into the search field
3. User changes the sort dropdown

**Expected Results:**
- [ ] `onFilterStatus` is called with the selected status (or `'all'`)
- [ ] `onSearch` is called with the query string
- [ ] `onSort` is called with the selected sort key

---

## Empty State Tests

### Primary Empty State

**Setup:** `threads` is `[]`.

**Expected Results:**
- [ ] The chat-starter empty state renders (headline, role input, Get Started button) - not a blank screen and not the populated dashboard
- [ ] The role input is the primary call to action

### Filtered Empty State

**Setup:** Threads exist but the active status filter or search query matches none.

**Expected Results:**
- [ ] A clear "no results" message is shown
- [ ] The user can clear the filter or search to see threads again

---

## Component Interaction Tests

### HiringThreadsPopulated

- [ ] Renders three KPI cards: Active Threads, Total Applicants, Shortlisted - values in JetBrains Mono
- [ ] Each thread card shows role title, business and location, phase badge, applicant/shortlisted/reviewed counts, a progress bar, last updated, and a status pill
- [ ] Status pill colour matches the status (Setup amber, Waiting muted, Ranking blue, Shortlist ready green, Hire closed muted)
- [ ] A "Needs update" tag is shown on cards where `needsUpdate` is true
- [ ] Hovering a thread card gives a subtle surface lift and pointer cursor

### HiringThreadsEmpty

- [ ] Renders the centred headline and role textarea
- [ ] Submits on Enter (without Shift) as well as the Get Started button

---

## Edge Cases

- [ ] Transition: after creating the first thread, the view switches from empty state to populated dashboard
- [ ] Works with 1 thread and with 20+ threads
- [ ] Very long role or business names truncate rather than break the card layout
- [ ] KPI values render correctly at 0

---

## Accessibility Checks

- [ ] Thread cards are keyboard focusable and activatable
- [ ] Filter, search, and sort controls have labels
- [ ] Status is conveyed by text, not colour alone

---

## Sample Test Data

```typescript
const mockThread = {
  id: 'thread-001',
  roleTitle: 'Senior Plumber',
  businessName: 'Patterson Plumbing',
  location: 'Brisbane',
  currentPhase: 4,
  totalPhases: 9,
  applicants: 47,
  shortlisted: 3,
  reviewed: 12,
  status: 'ranking-in-progress',
  lastUpdated: 'Updated 2 hours ago',
  needsUpdate: false,
}

const mockKpis = { activeThreads: 4, totalApplicants: 127, shortlisted: 9 }
const mockEmptyThreads = []
```

---

## Notes for Test Implementation

- Test both the empty and populated components - they are separate components selected by thread count
- Verify `onCreateThread` trims whitespace from the role title
- Test that filter/search/sort fire their callbacks; the actual filtering may be client-side, server-side, or both depending on your implementation
