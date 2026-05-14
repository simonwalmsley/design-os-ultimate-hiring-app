# Conversational Phases Specification

## Overview
The content area for the three chat-then-review phases inside a hiring thread — Clarity of Role (Phase 1), Advertise for Role (Phase 2), and Role Outcomes (Phase 3). Each phase pairs a conversational chat panel with a live review panel showing the AI-drafted artifact. The client answers the AI's questions, reviews the generated output, refines it, and approves the phase to unlock the next.

## User Flows
- Client opens a phase from the shell's secondary sidebar; if not started, the chat panel opens with the AI's intro message and first question
- Client answers questions in the chat; messages autosave on send; the AI works through the phase's question set
- When the AI has enough, it generates the phase artifact, which appears in the review panel beside the chat
- Client reviews the artifact, edits fields inline, or asks the AI in chat to revise a section
- Client clicks "Approve & Continue"; the sidebar marks the phase Completed and unlocks the next as Current
- Client revisits a completed phase: artifact shows read-only with an "Edit" affordance that reopens chat and review
- A phase flagged "Needs update" opens with a regeneration banner prompting the client to regenerate the stale artifact
- Phase 1: review panel holds three artifacts — Company Profile, Intent Document, Person Profile
- Phase 2: client fills a logistics form (location, hours, salary, how to apply, response timeframe) alongside the 7-section job ad
- Phase 3: client reviews and reorders 5 priority-ranked scoring categories

## UI Requirements
- Two-pane layout on desktop: chat panel left (~40%), review panel right (~60%); stacks on tablet/mobile with a Chat/Review toggle
- Chat panel: message thread (user right-aligned, AI left-aligned), centred muted system messages, composer with textarea and send, autosave indicator, AI "thinking" state
- Review panel before generation: placeholder state explaining the artifact will appear here
- Review panel after generation: artifact card(s) with section headings, inline-editable fields, per-section "Regenerate" action, last-generated timestamp
- Phase 1 review: three stacked cards or tabs — Company Profile, Intent Document, Person Profile
- Phase 2 review: logistics form above the 7-section job ad; section structure locked, only content editable
- Phase 3 review: ranked list of 5 scoring categories — priority number (JetBrains Mono), label, description, AI priority reason; drag-to-reorder or up/down controls
- Phase header: title, short description, status pill, "Approve & Continue" primary button (yellow #FFCB05) once the artifact is ready
- "Needs update" regeneration banner: amber, pinned above the artifact, with a "Regenerate" action
- Completed phase: artifact read-only and muted, with an "Edit"/"Reopen" affordance

## Configuration
- shell: true
