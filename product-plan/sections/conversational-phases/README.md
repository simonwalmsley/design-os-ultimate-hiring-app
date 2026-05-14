# Conversational Phases

## Overview

The content area for the three chat-then-review phases inside a hiring thread - Clarity of Role (Phase 1), Advertise for Role (Phase 2), and Role Outcomes (Phase 3). Each phase pairs a conversational chat panel with a live review panel showing the AI-drafted artifact. The client answers the AI's questions, reviews the generated output, refines it, and approves the phase to unlock the next.

## User Flows

- Client opens a phase from the shell's secondary sidebar; if not started, the chat panel opens with the AI's intro message and first question
- Client answers questions in the chat; messages autosave on send; the AI works through the phase's question set
- When the AI has enough, it generates the phase artifact, which appears in the review panel beside the chat
- Client reviews the artifact, edits fields inline, or asks the AI in chat to revise a section
- Client clicks "Approve & Continue"; the sidebar marks the phase Completed and unlocks the next as Current
- Client revisits a completed phase: artifact shows read-only with an "Edit" affordance that reopens chat and review
- A phase flagged "Needs update" opens with a regeneration banner prompting the client to regenerate the stale artifact

**Phase specifics:**
- Phase 1 review holds three artifacts: Company Profile, Intent Document, Person Profile
- Phase 2 has a logistics form plus the 7-section job ad (locked headings, editable content)
- Phase 3 review is five priority-ranked scoring categories with reorder controls

## Design Decisions

- Two-pane layout on desktop: chat panel left (~40%), review panel right (~60%); stacks on tablet/mobile with a Chat/Review toggle.
- Inline editing is the primary review mechanism (`EditableField` - click to edit). Per-section "Regenerate" actions and a single "Approve & Continue" gate per phase.
- The three phases share `PhaseShell`, `ChatPanel`, and the smaller building blocks; only the review-panel content differs.
- The "before generation" state shows `ReviewPlaceholder`; a "Needs update" phase shows `RegenerationBanner`.
- `PhaseShell` uses a fixed-height layout (`lg:h-[calc(100vh-7rem)]`) so the chat and review panes scroll internally - these are app screens, not scrolling documents.

## Data Used

**Entities:** `ConversationMessage`, `CompanyProfile`, `IntentDocument`, `PersonProfile`, `JobAd`, `ScoringCategory`, `ThreadContext`

**From global model:** all of the above. `ThreadContext` is a lightweight slice of `Hiring Thread` (id, role title, business name) for header context.

## Visual Reference

Screenshots: `PhaseOneClarityOfRole.png`, `PhaseTwoAdvertiseForRole.png`, `PhaseThreeRoleOutcomes.png`.

## Components Provided

- `PhaseOneClarityOfRole` - chat + three-artifact review (Company Profile, Intent Document, Person Profile)
- `PhaseTwoAdvertiseForRole` - chat + logistics form + 7-section job ad + regeneration banner
- `PhaseThreeRoleOutcomes` - chat + five ranked scoring categories with reorder controls
- `PhaseShell` - the shared two-pane layout, header, and mobile Chat/Review toggle
- `ChatPanel`, `ChatMessage` - the message thread and composer
- `EditableField` - inline click-to-edit text field
- `ArtifactCard`, `ReviewPlaceholder`, `RegenerationBanner`, `StatusPill` - review-panel building blocks

## Callback Props

Each phase component shares a common set plus phase-specific callbacks:

| Callback | Description |
|----------|-------------|
| `onSendMessage` | Called when the user sends a chat message |
| `onApprove` | Called when the user approves the phase to unlock the next |
| `onReopen` | Called when the user reopens a completed phase for editing |
| `onEditField` / `onEditSection` / `onEditCategory` | Called when the user edits an artifact field inline |
| `onRegenerateArtifact` / `onRegenerateSection` / `onRegenerateCategory` | Called when the user regenerates part of the artifact |
| `onRegenerateAll` (Phase 2) | Called when the user regenerates the whole job ad after a "Needs update" flag |
| `onUpdateLogistics` (Phase 2) | Called when the user edits a job ad logistics field |
| `onReorderCategory` (Phase 3) | Called when the user reorders a scoring category up or down |

See `types.ts` for the exact signatures of `PhaseOneProps`, `PhaseTwoProps`, and `PhaseThreeProps`.
