# Rankings Dashboard

## Overview

Phase 4 of a hiring thread - the one phase that breaks the chat-then-review pattern. The client uploads applicant CVs, the AI scores each one against the five Scoring Categories from Phase 3, and applicants are ranked into a leaderboard. The client drills into individual applicant detail to review the scored evidence, then shortlists the candidates worth interviewing.

## User Flows

- First time (no applicants): the client sees an empty state with a prominent CV upload drop zone and drags in or selects multiple CV files
- After upload, a scoring-in-progress state shows progress ("Scoring X of Y") with rows resolving as each applicant is scored
- Once scored, the leaderboard shows applicants ranked by overall AI score, highest first
- Client clicks an applicant to open the detail view
- In detail, the client reviews each of the five category scores - score out of 10, the AI's written explanation, and the quoted CV snippet as evidence - alongside the CV itself
- Client shortlists or rejects an applicant from the row toggle or the detail view
- Client filters the leaderboard to Shortlisted to review the final cut
- Client uploads more CVs at any time; new applicants get scored and slotted into the ranking
- Client sorts the leaderboard by overall score or by a specific category

## Design Decisions

- The leaderboard is the main view and handles three states: empty (CV upload drop zone), scoring-in-progress (progress banner + skeleton rows), and the ranked list.
- Shortlist is a filter tab on the leaderboard rather than a separate screen.
- Overall score (0-100) is colour-graded: 80+ green, 60-79 amber, below 60 muted. Category scores (1-10) use the same grading. Helpers live in `scoreUtils.ts`.
- Each leaderboard row shows a rank, name, overall score badge, a compact five-category score strip, status pill, and a shortlist toggle. A reject button is revealed on row hover.
- The applicant detail view pairs the five-category score breakdown (score bar, explanation, evidence quote) with a sticky CV panel.

## Data Used

**Entities:** `Applicant`, `ApplicantScore`, `ScoringCategory`, `RankingPhase`, `RankingSummary`, `ThreadContext`

**From global model:** `Applicant`, `Applicant Score`, `Scoring Category`. `RankingPhase` (status + scoring progress) and `RankingSummary` (leaderboard counts) are section-specific.

## Visual Reference

Screenshots: `RankingsLeaderboard.png`, `RankingsApplicantDetail.png`.

## Components Provided

- `RankingsLeaderboard` - the main view: header, summary stats, scoring-progress banner, filter tabs, sort, ranked rows and skeleton rows; handles the empty state
- `RankingsApplicantDetail` - back/prev/next nav, header card with score and actions, five-block score breakdown, sticky CV panel
- `ApplicantRow`, `CategoryScoreBlock`, `OverallScoreBadge`, `CategoryScoreStrip`, `ScoreBar`, `ApplicantStatusPill`, `CvUploadZone`, `ScoringProgressBanner`, `SkeletonRow` - building blocks
- `scoreUtils.ts` - colour-grading helpers (`gradeOverall`, `gradeCategory`)

## Callback Props

**Leaderboard (`RankingsLeaderboardProps`):**

| Callback | Description |
|----------|-------------|
| `onUploadCVs` | Called when the user uploads more CV files |
| `onOpenApplicant` | Called with an id when the user opens the detail view |
| `onShortlist` | Called when the user shortlists an applicant |
| `onReject` | Called when the user rejects an applicant |
| `onResetStatus` | Called when the user resets an applicant back to scored |
| `onFilter` | Called when the user changes the filter tab |
| `onSort` | Called when the user changes sort order |

**Applicant Detail (`RankingsApplicantDetailProps`):** `onBack`, `onShortlist`, `onReject`, `onResetStatus`, `onPrevApplicant`, `onNextApplicant`.
