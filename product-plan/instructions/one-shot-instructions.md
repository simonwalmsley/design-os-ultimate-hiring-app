# Ultimate Hiring Process - Complete Implementation Instructions

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

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are framework-agnostic - adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include specific UI elements and labels to verify, success and failure behaviours, empty state handling, and data assertions.

---

## Product Overview

An AI-assisted web application that replaces manual hiring templates with a guided, conversational experience. It walks non-technical business owners through defining the role, writing a psychology-driven job ad, setting scoring criteria, and ranking applicants from uploaded CVs - with the human making all final hiring decisions.

**Sections, in build order:**
1. Authentication & Onboarding - the front door and first-sign-in onboarding
2. Hiring Threads - the authenticated client home
3. Conversational Phases - the chat-then-review content for Phases 1-3 inside a thread
4. Rankings Dashboard - Phase 4: CV upload, AI scoring, leaderboard, applicant detail
5. Admin - dashboard, client management, AI configuration

**Design system:** dark mode first, yellow `#ffcd05` accent, zinc/neutral surfaces, Inter + JetBrains Mono. See `design-system/`.

**Data model:** see `data-model/README.md` and `data-model/types.ts` for the canonical entities (Account, Profile, Hiring Thread, Company Profile, Intent Document, Person Profile, Job Ad, Scoring Category, Applicant, Applicant Score, Conversation Message, AI Provider Config).

---

# Milestone 1: Foundation

## Goal

Set up design tokens, data model types, routing structure, and the application shell.

## What to Implement

**Design tokens** - configure Tailwind CSS v4 (no `tailwind.config.js`), dark-first against `#0a0a0a`. See `design-system/tokens.css`, `design-system/tailwind-colors.md`, `design-system/fonts.md`. Load Inter and JetBrains Mono - JetBrains Mono is applied inline wherever numerics appear.

**Data model types** - create interfaces from `data-model/types.ts`. Each section ships its own `types.ts` shaped for its UI; treat `data-model/types.ts` as canonical and reconcile.

**Routing** - create routes:
- Pre-auth (no shell): `/sign-in`, `/sign-up`, `/verify-email`, `/pending-approval`, `/forgot-password`, `/reset-password`
- `/onboarding` - first sign-in onboarding (shell visible but dimmed)
- `/threads` - Hiring Threads (default client landing)
- `/threads/:threadId` - hosts Conversational Phases (1-3) and Rankings Dashboard (4)
- `/profile` - Profile
- `/admin`, `/admin/ai` - admin only

**Application shell** - copy `shell/components/AppShell.tsx` and `index.ts`. It is self-contained (`@headlessui/react` + `@heroicons/react`). Wire `onNavigate` to your router, `onLogout` to sign-out, and pass `activeNav`, `activeThread`, `phases`, `isAdmin`, and `user`. See `shell/README.md`.

## Done When

- [ ] Design tokens configured; fonts loaded
- [ ] Data model types defined
- [ ] Routes exist for all areas (placeholders fine)
- [ ] `AppShell` renders with working navigation, user menu, and the secondary phase sidebar inside a thread
- [ ] Responsive on mobile

---

# Milestone 2: Authentication & Onboarding

## Goal

Implement the pre-auth screens and first-sign-in onboarding.

## Overview

New users sign up, verify their email, and wait for admin approval. Returning users sign in and route by role. The forgot-password flow handles resets and expired links. First-time approved users complete onboarding: business details, then a four-tile how-it-works overview. Auth state machine: Unverified -> Pending -> Active / Inactive.

## What to Implement

**Components** (`sections/authentication-and-onboarding/components/`): `SignIn`, `SignUp`, `CheckYourEmail`, `PendingApproval`, `ForgotPasswordRequest`, `ForgotPasswordCheckEmail`, `ResetPassword`, `ExpiredLink`, `OnboardingBusinessDetails`, `OnboardingHowItWorks`. Pre-auth screens render as standalone centred cards (no shell); onboarding screens overlay a dimmed shell.

**Data layer** - profiles (role + status), accounts, email sending, token generation/expiry for verification and reset.

**Callbacks** - `onSignIn`, `onSignUp`, `onForgotPassword`, `onResetPassword`, `onResendEmail`, `onSignOut`, `onSubmitBusinessDetails`, `onCompleteOnboarding`.

**Empty states** - empty/partial form submissions show inline validation in `#dc2828`, do not submit, and focus the first invalid field.

## Done When

- [ ] Tests written and passing for sign in, sign up, forgot password, onboarding (success + failure)
- [ ] Auth state machine enforced; role-based routing works
- [ ] Validation errors display inline
- [ ] All callbacks wired; matches visual design; responsive

---

# Milestone 3: Hiring Threads

## Goal

Implement the authenticated client home for creating, resuming, and managing hiring threads.

## Overview

First-time users see a chat-starter empty state and create a thread by typing a role name. Returning users see a dashboard of KPI cards, a filter bar, and thread cards they click to resume.

## What to Implement

**Components** (`sections/hiring-threads/components/`): `HiringThreadsEmpty` (zero threads) and `HiringThreadsPopulated` (the dashboard).

**Data layer** - a hiring_threads table scoped to the account; a query returning the account's threads plus computed KPIs (active threads, total applicants, shortlisted); create-thread logic.

**Callbacks** - `onCreateThread`, `onOpenThread`, `onFilterStatus`, `onSearch`, `onSort`.

**Empty states** - render `HiringThreadsEmpty` when there are zero threads; show a "no results" state when a filter/search matches nothing.

## Done When

- [ ] Tests written and passing
- [ ] Empty state shows at zero threads; populated dashboard shows with real data
- [ ] Thread creation works from both entry points; clicking a card resumes the thread
- [ ] Filter/search/sort work; empty-to-populated transition works
- [ ] Matches visual design; responsive

---

# Milestone 4: Conversational Phases

## Goal

Implement the chat-then-review content for Phases 1-3 inside a hiring thread.

## Overview

Phases 1-3 share one pattern: the client chats with the AI, the AI drafts a structured artifact, the client reviews and refines it, then approves to unlock the next phase. Phase 1 produces the Company Profile, Intent Document, and Person Profile; Phase 2 the 7-section job ad plus logistics; Phase 3 five priority-ranked scoring categories.

## What to Implement

**Components** (`sections/conversational-phases/components/`): `PhaseOneClarityOfRole`, `PhaseTwoAdvertiseForRole`, `PhaseThreeRoleOutcomes`, plus shared building blocks (`PhaseShell`, `ChatPanel`, `ChatMessage`, `EditableField`, `ArtifactCard`, `ReviewPlaceholder`, `RegenerationBanner`, `StatusPill`).

**Data layer** - conversation_messages scoped to thread + phase; artifact tables; an AI integration that consumes the conversation and produces/updates the artifact (model per phase comes from Admin AI Configuration); phase status on the thread.

**Callbacks** - common: `onSendMessage`, `onApprove`, `onReopen`. Phase 1: `onEditField`, `onRegenerateArtifact`. Phase 2: `onEditSection`, `onUpdateLogistics`, `onRegenerateSection`, `onRegenerateAll`. Phase 3: `onEditCategory`, `onRegenerateCategory`, `onReorderCategory`.

**Empty states** - `ReviewPlaceholder` before generation; read-only artifact + disabled composer when completed; `RegenerationBanner` when needs-update.

## Done When

- [ ] Tests written and passing across all phase status states
- [ ] All three phase components render with real conversation and artifact data
- [ ] Messages persist and autosave; editing and regeneration wired to the backend
- [ ] Approving updates phase status and unlocks the next
- [ ] Placeholder, completed, and needs-update states render correctly
- [ ] Matches visual design; responsive (Chat/Review toggle)

---

# Milestone 5: Rankings Dashboard

## Goal

Implement Phase 4: CV upload, AI scoring, a ranked leaderboard, and an applicant detail view.

## Overview

The client uploads CVs; the AI scores each 1-10 against the five Scoring Categories from Phase 3, with an explanation and a quoted CV snippet per score. Applicants are ranked by overall score. The client reviews evidence in the detail view, then shortlists or rejects.

## What to Implement

**Components** (`sections/rankings-dashboard/components/`): `RankingsLeaderboard`, `RankingsApplicantDetail`, plus building blocks (`ApplicantRow`, `CategoryScoreBlock`, `OverallScoreBadge`, `CategoryScoreStrip`, `ScoreBar`, `ApplicantStatusPill`, `CvUploadZone`, `ScoringProgressBanner`, `SkeletonRow`) and `scoreUtils.ts`.

**Data layer** - CV upload, storage, and text extraction; an applicants table scoped to the thread; an applicant_scores table (one row per applicant per scoring category, with explanation and evidence); an AI scoring job per CV; leaderboard summary and scoring-progress queries.

**Callbacks** - leaderboard: `onUploadCVs`, `onOpenApplicant`, `onShortlist`, `onReject`, `onResetStatus`, `onFilter`, `onSort`. Detail: `onBack`, `onShortlist`, `onReject`, `onResetStatus`, `onPrevApplicant`, `onNextApplicant`.

**Empty states** - `CvUploadZone` as the centred CTA when there are no applicants; progress banner + skeleton rows while scoring; "No [filter] applicants yet" when filtered to nothing.

## Done When

- [ ] Tests written and passing
- [ ] CV upload triggers AI scoring; the three leaderboard states render correctly
- [ ] The applicant detail view shows the full evidence breakdown and CV text
- [ ] Shortlist/reject/reset work from both the leaderboard and detail view
- [ ] Filter and sort work; empty states render properly
- [ ] Matches visual design; responsive

---

# Milestone 6: Admin

## Goal

Implement the staff-only admin area: dashboard, client management, and AI configuration.

## Overview

The Admin Dashboard surfaces platform KPIs and a recent activity feed. Client Management is the account list with a pending-approvals panel (the gate from Pending to Active) and expandable rows showing each account's users and threads. AI Configuration assigns a provider/model per phase with cost indicators.

## What to Implement

**Components** (`sections/admin/components/`): `AdminDashboard`, `ClientManagement`, `AiConfiguration`, plus building blocks (`AccountRow`, `ApprovalCard`, `ActivityItem`, `PhaseModelRow`, `KpiCard`, `StatusPill`, `ThreadStatusPill`, `CostBadge`). Gate these routes to admin/coach roles.

**Data layer** - dashboard KPI and activity-feed aggregates; a pending-profiles query; an accounts-with-users-and-threads query; account/profile status mutations; an AI provider/model catalogue and per-phase config storage (this drives the model used in Conversational Phases and Rankings).

**Callbacks** - Dashboard: `onApprove`, `onReject`, `onViewAllClients`. Client Management: `onApprove`, `onReject`, `onSearch`, `onFilterStatus`, `onToggleAccountStatus`, `onToggleUserStatus`, `onOpenThread`. AI Configuration: `onChangeModel`, `onSave`.

**Empty states** - "all caught up" when no pending approvals (panel hidden in Client Management); "No threads yet" in an expanded account with no threads; "No accounts match" when filtered to nothing.

## Done When

- [ ] Tests written and passing
- [ ] All three views render with real data
- [ ] Approve/reject moves users through the approval gate
- [ ] Account search/filter/expand and activate/deactivate work
- [ ] AI Configuration changes persist with a correct save state
- [ ] Empty states render properly; admin routes are role-gated
- [ ] Matches visual design; responsive
