# Test Instructions: Conversational Phases

These test-writing instructions are framework-agnostic. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

This section is the chat-then-review content for Phases 1-3 inside a hiring thread. Each phase pairs a chat panel with a review panel showing an AI-drafted artifact. Key things to test: sending chat messages, the phase status states (not-started, in-progress, generated, completed, needs-update), inline editing, regeneration, and approving a phase.

---

## User Flow Tests

### Flow 1: Answer the AI and Generate an Artifact

**Setup:** A phase with status `in-progress` and some existing chat messages.

**Steps:**
1. User opens the phase; the chat panel shows the message thread, the review panel shows `ReviewPlaceholder`
2. User types an answer in the composer and sends it (`onSendMessage` is called with the content)
3. The composer clears; an "Autosaved" indicator is shown

**Expected Results:**
- [ ] `onSendMessage` is called with the trimmed message content
- [ ] Enter sends the message; Shift+Enter inserts a newline
- [ ] When the phase has no artifact yet, the review panel shows the placeholder, not a blank pane

### Flow 2: Review and Edit a Generated Artifact

**Setup:** A phase with status `generated` and a populated artifact.

**Steps:**
1. User sees the artifact in the review panel (Phase 1: three cards; Phase 2: logistics + 7 sections; Phase 3: five ranked categories)
2. User clicks an editable field, changes the text, and blurs

**Expected Results:**
- [ ] `onEditField` / `onEditSection` / `onEditCategory` is called with the field identifier and new value
- [ ] The displayed text reflects the edit
- [ ] Phase 2 section headings are locked (not editable); only section content is editable
- [ ] Phase 2 logistics fields call `onUpdateLogistics`

### Flow 3: Regenerate

**Steps:** User clicks a per-section "Regenerate" action.

**Expected Results:**
- [ ] The matching `onRegenerate*` callback is called with the correct target
- [ ] Phase 3 reorder controls call `onReorderCategory` with the priority and direction

### Flow 4: Approve and Continue

**Setup:** A phase with status `generated`.

**Steps:** User clicks "Approve & Continue".

**Expected Results:**
- [ ] `onApprove` is called
- [ ] The routing target marks the phase Completed and unlocks the next phase

### Flow 5: Reopen a Completed Phase

**Setup:** A phase with status `completed`.

**Expected Results:**
- [ ] The artifact renders read-only; the chat composer is disabled
- [ ] A "Reopen to edit" affordance is shown and calls `onReopen`

### Flow 6: Needs Update

**Setup:** Phase 2 with status `needs-update` and a `regenerationNote`.

**Expected Results:**
- [ ] `RegenerationBanner` is shown above the artifact with the note text
- [ ] The banner's regenerate action calls `onRegenerateAll`

---

## Empty State Tests

### Before Generation

**Setup:** Phase status `not-started` or `in-progress`; no artifact.

**Expected Results:**
- [ ] `ReviewPlaceholder` is shown in the review panel with a helpful message
- [ ] The chat panel is fully usable

### Completed (Read-Only) State

**Setup:** Phase status `completed`.

**Expected Results:**
- [ ] Editable fields render as read-only text (no edit affordance)
- [ ] The composer shows a disabled state with an explanatory placeholder

---

## Component Interaction Tests

### ChatPanel / ChatMessage

- [ ] User messages render right-aligned; assistant messages left-aligned; system messages centred and muted
- [ ] The message thread scrolls to the latest message on mount
- [ ] Sending a message shows a brief "thinking" indicator

### PhaseShell

- [ ] Renders the phase number badge, status pill, title, and description
- [ ] Shows "Approve & Continue" for non-completed phases and "Reopen to edit" for completed phases
- [ ] On narrow viewports, a Chat/Review toggle switches the visible pane

### EditableField

- [ ] Click enters edit mode; blur (or Enter for single-line) commits and calls `onChange`
- [ ] `readOnly` fields are not clickable into edit mode

---

## Edge Cases

- [ ] A phase with a long chat history scrolls within the chat pane, not the page
- [ ] Editing a field to the same value does not fire `onChange`
- [ ] Phase 1 renders all three artifact cards even if one artifact's arrays are empty
- [ ] Switching between phases preserves each phase's own message thread

---

## Accessibility Checks

- [ ] The composer textarea has a label; the send button is reachable by keyboard
- [ ] Editable fields are reachable and operable by keyboard
- [ ] Status pills convey state by text, not colour alone
- [ ] The Chat/Review toggle is a labelled, keyboard-operable control

---

## Sample Test Data

```typescript
const mockThread = {
  id: 'thread-001',
  roleTitle: 'Senior Plumber',
  businessName: 'Patterson Plumbing',
}

const mockMessages = [
  { id: 'm1', role: 'system', content: 'Phase 1 started', timestamp: 'Mon 9:01 am' },
  { id: 'm2', role: 'assistant', content: 'What does the business do?', timestamp: 'Mon 9:01 am' },
  { id: 'm3', role: 'user', content: 'Residential plumbing in Brisbane.', timestamp: 'Mon 9:03 am' },
]

// Phase 1 - completed, with all three artifacts populated
// Phase 2 - needs-update, with regenerationNote set
// Phase 3 - generated, with five scoringCategories
// See sample-data.json for full phaseOne / phaseTwo / phaseThree objects
```

---

## Notes for Test Implementation

- Test each phase component (`PhaseOneClarityOfRole`, `PhaseTwoAdvertiseForRole`, `PhaseThreeRoleOutcomes`) against each relevant status value
- Verify the `disabled` chat state and read-only artifact state both trigger on `status === 'completed'`
- The "thinking" indicator is local component state triggered on send - test that it appears and clears
- Mock the AI generation flow at the routing/API layer; the components only emit `onSendMessage` and `onRegenerate*` intents
