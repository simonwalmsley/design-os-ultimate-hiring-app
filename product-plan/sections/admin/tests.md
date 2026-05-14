# Test Instructions: Admin

These test-writing instructions are framework-agnostic. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

This section is the staff-only admin area: an Admin Dashboard (KPIs + activity feed + pending-approvals callout), Client Management (approvals panel + expandable account list), and AI Configuration (per-phase model selection). Key things to test: approving/rejecting users, expanding accounts, activate/deactivate actions, search/filter, and the AI config save state.

---

## User Flow Tests

### Flow 1: Approve a Pending User

**Setup:** `pendingApprovals` has at least one entry.

**Steps:**
1. Admin views the Dashboard "Needs Attention" callout or the Client Management pending-approvals panel
2. Admin clicks "Approve" on an approval card

**Expected Results:**
- [ ] `onApprove` is called with the approval id
- [ ] Clicking "Reject" instead calls `onReject` with the approval id

### Flow 2: Browse and Expand Accounts

**Steps:**
1. Admin opens Client Management
2. Admin clicks an account row to expand it

**Expected Results:**
- [ ] The row expands to show the account's users (name, email, role, status) and hiring threads
- [ ] Each thread row calls `onOpenThread` with the thread id when clicked
- [ ] An account with no threads shows a "No threads yet" message in the expanded panel

### Flow 3: Activate / Deactivate

**Steps:** In an expanded account, admin clicks the account-level deactivate/reactivate button, and a per-user deactivate/reactivate action.

**Expected Results:**
- [ ] `onToggleAccountStatus` is called with the account id
- [ ] `onToggleUserStatus` is called with the account id and user id
- [ ] The button label reflects the current status (Deactivate vs Reactivate)

### Flow 4: Search and Filter Accounts

**Steps:** Admin types into the search field and changes the status filter.

**Expected Results:**
- [ ] `onSearch` is called with the query
- [ ] `onFilterStatus` is called with the selected status (or `'all'`)
- [ ] The list narrows to matching accounts

### Flow 5: Change and Save AI Configuration

**Setup:** AI Configuration with the four phases each assigned a model.

**Steps:**
1. Admin changes the model for a phase via its selector
2. Admin clicks "Save changes"

**Expected Results:**
- [ ] `onChangeModel` is called with the phase number, provider id, and model id
- [ ] The Save button moves from disabled ("Saved") to enabled ("Save changes") when there is an unsaved edit
- [ ] `onSave` is called when Save is clicked, and the button returns to the "Saved" disabled state
- [ ] The cost badge updates to reflect the newly selected model's cost

---

## Empty State Tests

### No Pending Approvals

**Setup:** `pendingApprovals` is `[]`.

**Expected Results:**
- [ ] The Dashboard "Needs Attention" callout shows an "all caught up" message, not a blank panel
- [ ] The Client Management pending-approvals panel is hidden entirely when there are none

### Account With No Threads

**Setup:** An account with an empty `threads` array.

**Expected Results:**
- [ ] The expanded account shows the users list normally
- [ ] The threads column shows a "No threads yet" message

### Filtered Empty State

**Setup:** Accounts exist but the search or status filter matches none.

**Expected Results:**
- [ ] A "No accounts match" message is shown

---

## Component Interaction Tests

### AdminDashboard

- [ ] Renders four KPI cards: Total Clients, Active Threads, Applicants Processed, Pending Approvals
- [ ] The Pending Approvals KPI is highlighted yellow when greater than zero
- [ ] The activity feed renders each event with a type-specific icon and timestamp
- [ ] "View all clients" calls `onViewAllClients`

### AccountRow

- [ ] Collapsed: shows business name, industry and location, user count and thread count (JetBrains Mono), status pill, joined date
- [ ] The chevron rotates when expanded

### PhaseModelRow

- [ ] The model selector groups options by provider (Anthropic, OpenAI, Google)
- [ ] The cost badge matches the selected model

---

## Edge Cases

- [ ] Works with 1 account and with 50+ accounts
- [ ] An account with multiple users and multiple threads expands without layout breaks
- [ ] Changing an AI model and then changing it back to the original still leaves the Save button enabled (the design tracks any change as dirty)
- [ ] Long business names truncate in the collapsed row

---

## Accessibility Checks

- [ ] Account rows are keyboard expandable
- [ ] Approve/Reject buttons have clear accessible labels
- [ ] The AI model selectors have associated labels
- [ ] Status is conveyed by text, not colour alone

---

## Sample Test Data

```typescript
const mockSummary = {
  totalClients: 38, activeThreads: 52, applicantsProcessed: 1284, pendingApprovals: 3,
}

const mockPendingApproval = {
  id: 'approval-001', name: 'Connor Walsh', email: 'connor@walshcarpentry.com.au',
  businessName: 'Walsh Carpentry', requestedRole: 'client', appliedDate: 'Applied 2 hours ago',
}

const mockAccount = {
  id: 'account-001', businessName: 'Patterson Plumbing', industry: 'Plumbing',
  location: 'Brisbane, QLD', phone: '07 3216 4480', status: 'active', joinedDate: 'Joined Jan 2026',
  users: [{ id: 'user-001', name: 'James Ryan', email: '...', role: 'client', status: 'active' }],
  threads: [{ id: 'thread-001', roleTitle: 'Senior Plumber', currentPhase: 4, status: 'ranking-in-progress' }],
}

const mockAccountNoThreads = { ...mockAccount, id: 'account-005', threads: [] }
const mockEmptyApprovals = []
```

---

## Notes for Test Implementation

- Test the three views independently - they are separate components
- Verify the AI Configuration dirty/saved state: it starts "Saved", goes "Save changes" on any edit, and returns to "Saved" after `onSave`
- Test that the pending-approvals panel is conditionally rendered (hidden when empty in Client Management, "all caught up" message on the Dashboard)
- Verify `onToggleUserStatus` passes both the account id and the user id
