# Milestone 4: Conversational Phases

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) and Milestone 3 (Hiring Threads) complete

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

Implement Conversational Phases - the chat-then-review content for Phases 1-3 inside a hiring thread.

## Overview

These are the first three phases of a hiring thread, and they share one interaction pattern: the client converses with the AI in a chat panel, the AI drafts a structured artifact, and the client reviews and refines it in a review panel before approving the phase to unlock the next. Phase 1 (Clarity of Role) produces the Company Profile, Intent Document, and Person Profile. Phase 2 (Advertise for Role) produces the 7-section job ad plus its logistics. Phase 3 (Role Outcomes) produces five priority-ranked scoring categories.

**Key Functionality:**
- A two-pane chat + review layout per phase, with phase status driving the UI
- Send chat messages; messages autosave on send
- Generate, review, and inline-edit the phase artifact
- Regenerate parts of an artifact
- Approve a phase to unlock the next; reopen a completed phase
- Handle the "needs update" state with a regeneration banner

## Recommended Approach: Test-Driven Development

Write tests first based on `product-plan/sections/conversational-phases/tests.md` - it covers sending messages, every phase status state, inline editing, regeneration, approval, and the needs-update flow.

## What to Implement

### Components

Copy from `product-plan/sections/conversational-phases/components/`:
- `PhaseOneClarityOfRole`, `PhaseTwoAdvertiseForRole`, `PhaseThreeRoleOutcomes` - the three phase views
- `PhaseShell`, `ChatPanel`, `ChatMessage`, `EditableField`, `ArtifactCard`, `ReviewPlaceholder`, `RegenerationBanner`, `StatusPill` - shared building blocks

Each phase route renders its phase component. The shell's secondary sidebar (from Milestone 1) provides phase navigation.

### Data Layer

The components use `ConversationMessage`, `CompanyProfile`, `IntentDocument`, `PersonProfile`, `JobAd`, `ScoringCategory`, and a `ThreadContext` slice (see `types.ts`). You will need:
- A conversation_messages table scoped to thread + phase
- Tables (or documents) for each artifact type
- An AI integration that consumes the conversation and produces/updates the artifact (the model per phase comes from the Admin AI Configuration)
- Phase status tracking on the thread

### Callbacks

Common to all three phases: `onSendMessage`, `onApprove`, `onReopen`, plus artifact edit and regenerate callbacks. Phase-specific:
- Phase 1: `onEditField`, `onRegenerateArtifact`
- Phase 2: `onEditSection`, `onUpdateLogistics`, `onRegenerateSection`, `onRegenerateAll`
- Phase 3: `onEditCategory`, `onRegenerateCategory`, `onReorderCategory`

See `types.ts` for exact signatures.

### Empty States

- **Before generation** (status `not-started` or `in-progress`): the review panel shows `ReviewPlaceholder` - the chat panel is fully usable
- **Completed** (status `completed`): the artifact is read-only and the composer is disabled, with a "Reopen to edit" affordance
- **Needs update**: `RegenerationBanner` appears above the artifact

## Files to Reference

- `product-plan/sections/conversational-phases/README.md`
- `product-plan/sections/conversational-phases/tests.md`
- `product-plan/sections/conversational-phases/components/`
- `product-plan/sections/conversational-phases/types.ts`
- `product-plan/sections/conversational-phases/sample-data.json`
- The three phase screenshots in `product-plan/sections/conversational-phases/`

## Expected User Flows

### Flow 1: Work Through a Phase
1. User opens a phase; the chat shows the AI's intro question, the review panel shows the placeholder
2. User answers questions in the chat (`onSendMessage` fires per message)
3. The AI generates the artifact; it appears in the review panel
4. **Outcome:** The phase moves to `generated` and the artifact is reviewable

### Flow 2: Refine and Approve
1. User edits artifact fields inline (`onEditField` / `onEditSection` / `onEditCategory`) or regenerates parts
2. User clicks "Approve & Continue" (`onApprove`)
3. **Outcome:** The phase is marked Completed and the next phase unlocks as Current

### Flow 3: Reopen a Completed Phase
1. User opens a completed phase; the artifact is read-only, the composer disabled
2. User clicks "Reopen to edit" (`onReopen`)
3. **Outcome:** Chat and review become editable again

### Flow 4: Regenerate After an Upstream Change
1. A phase is flagged `needs-update`; the regeneration banner shows with a reason
2. User clicks Regenerate (`onRegenerateAll` for Phase 2, or the per-part regenerate callbacks)
3. **Outcome:** The artifact is redrafted from the updated inputs

## Done When

- [ ] Tests written for key flows across all phase status states (success and failure paths)
- [ ] All tests pass
- [ ] All three phase components render with real conversation and artifact data
- [ ] Sending a message persists it and autosaves
- [ ] Inline editing and regeneration callbacks are wired to the backend
- [ ] Approving a phase updates thread phase status and unlocks the next
- [ ] The placeholder, read-only/completed, and needs-update states all render correctly
- [ ] Matches the visual design
- [ ] Responsive on mobile (Chat/Review toggle)
