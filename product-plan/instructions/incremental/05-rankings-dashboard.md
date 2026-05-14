# Milestone 5: Rankings Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation), Milestone 3 (Hiring Threads), and Milestone 4 (Conversational Phases) complete

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

Implement Rankings Dashboard - Phase 4 of a hiring thread, where CVs are uploaded, scored, ranked, and shortlisted.

## Overview

Phase 4 breaks the chat-then-review pattern. The client uploads applicant CVs; the AI scores each one 1-10 against the five Scoring Categories from Phase 3, with a written explanation and a quoted CV snippet as evidence per score. Applicants are ranked into a leaderboard by overall score. The client drills into an applicant's detail to review the evidence, then shortlists or rejects candidates.

**Key Functionality:**
- Upload multiple CV files (front and centre when there are no applicants yet)
- Show scoring progress while the AI works through uploaded CVs
- A ranked leaderboard with overall scores, a compact category score strip, and status
- An applicant detail view with the five-category evidence breakdown and the CV text
- Shortlist, reject, and reset applicant status from the leaderboard or detail view
- Filter (All / Shortlisted / Rejected) and sort (overall or by category)

## Recommended Approach: Test-Driven Development

Write tests first based on `product-plan/sections/rankings-dashboard/tests.md` - it covers the three leaderboard states, opening an applicant, the evidence breakdown, status actions, filtering, and sorting.

## What to Implement

### Components

Copy from `product-plan/sections/rankings-dashboard/components/`:
- `RankingsLeaderboard` - the main view (empty, scoring-in-progress, and ranked states)
- `RankingsApplicantDetail` - the per-applicant evidence view
- `ApplicantRow`, `CategoryScoreBlock`, `OverallScoreBadge`, `CategoryScoreStrip`, `ScoreBar`, `ApplicantStatusPill`, `CvUploadZone`, `ScoringProgressBanner`, `SkeletonRow` - building blocks
- `scoreUtils.ts` - colour-grading helpers (keep this file alongside the components)

### Data Layer

The components use `Applicant`, `ApplicantScore`, `ScoringCategory`, `RankingPhase`, `RankingSummary`, and `ThreadContext` (see `types.ts`). You will need:
- CV file upload and storage, plus text extraction
- An applicants table scoped to the thread, with overall score and status
- An applicant_scores table: one row per applicant per scoring category, with explanation and evidence
- An AI scoring job that runs per uploaded CV against the thread's five scoring categories
- A query for the leaderboard summary counts and scoring progress

### Callbacks

Leaderboard: `onUploadCVs`, `onOpenApplicant`, `onShortlist`, `onReject`, `onResetStatus`, `onFilter`, `onSort`.
Applicant detail: `onBack`, `onShortlist`, `onReject`, `onResetStatus`, `onPrevApplicant`, `onNextApplicant`.

### Empty States

- **No applicants:** `RankingsLeaderboard` shows the `CvUploadZone` as the centred primary call to action - summary stats and filter tabs are hidden
- **Scoring in progress:** the progress banner plus skeleton rows for applicants still being scored
- **Filtered to nothing:** a "No [filter] applicants yet" message

## Files to Reference

- `product-plan/sections/rankings-dashboard/README.md`
- `product-plan/sections/rankings-dashboard/tests.md`
- `product-plan/sections/rankings-dashboard/components/`
- `product-plan/sections/rankings-dashboard/types.ts`
- `product-plan/sections/rankings-dashboard/sample-data.json`
- `product-plan/sections/rankings-dashboard/RankingsLeaderboard.png`, `RankingsApplicantDetail.png`

## Expected User Flows

### Flow 1: Upload and Score CVs
1. The client opens Phase 4 with no applicants and sees the CV upload drop zone
2. User uploads multiple CV files (`onUploadCVs`)
3. The leaderboard shows the scoring progress banner and skeleton rows
4. **Outcome:** As scoring completes, rows resolve into a ranked leaderboard

### Flow 2: Review an Applicant
1. User clicks an applicant row (`onOpenApplicant`)
2. User reviews the five-category breakdown - score, explanation, evidence quote - alongside the CV text
3. User navigates between applicants with prev/next
4. **Outcome:** The user understands why each applicant scored as they did

### Flow 3: Shortlist and Reject
1. From a leaderboard row or the detail view, user shortlists (`onShortlist`) or rejects (`onReject`) an applicant
2. User filters to the Shortlisted tab to see the final cut
3. **Outcome:** Applicant statuses update; the shortlist is the actionable result of the phase

## Done When

- [ ] Tests written for key flows (success and failure paths)
- [ ] All tests pass
- [ ] CV upload works and triggers AI scoring
- [ ] The three leaderboard states render correctly (empty, scoring, ranked)
- [ ] The applicant detail view shows the full evidence breakdown and CV text
- [ ] Shortlist, reject, and reset work from both the leaderboard and the detail view
- [ ] Filter tabs and sort work
- [ ] Empty states render properly (no applicants, filtered to nothing)
- [ ] Matches the visual design
- [ ] Responsive on mobile
