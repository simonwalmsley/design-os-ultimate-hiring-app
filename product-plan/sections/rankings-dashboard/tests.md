# Test Instructions: Rankings Dashboard

These test-writing instructions are framework-agnostic. Adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, React Testing Library, RSpec, Minitest, PHPUnit, etc.).

## Overview

This section is Phase 4: CV upload, AI scoring, a ranked leaderboard, and a per-applicant detail view. Key things to test: the three leaderboard states (empty, scoring-in-progress, ranked), opening an applicant, the scored evidence breakdown, shortlist/reject/reset actions, filtering, and sorting.

---

## User Flow Tests

### Flow 1: Upload CVs from the Empty State

**Setup:** `applicants` is `[]`.

**Steps:**
1. User navigates to Rankings Dashboard
2. User sees the empty state with a prominent CV upload drop zone
3. User clicks the drop zone or "Upload CVs"

**Expected Results:**
- [ ] `onUploadCVs` is called
- [ ] The empty state shows only when there are zero applicants

### Flow 2: Scoring In Progress

**Setup:** `applicants` has fewer entries than `phase.scoringProgress.total` (for example 10 scored, total 12).

**Expected Results:**
- [ ] A `ScoringProgressBanner` shows "Scoring X of Y applicants" with a progress bar and percentage
- [ ] Skeleton rows render for the applicants still being scored (count = total minus scored)
- [ ] Already-scored applicant rows render normally above the skeletons

### Flow 3: Review the Leaderboard

**Setup:** A populated `applicants` list.

**Expected Results:**
- [ ] Applicants are ranked by overall score, highest first
- [ ] Each row shows rank, name, overall score badge (colour-graded), the five-category score strip, status pill, and a shortlist toggle
- [ ] Overall score colour grading: 80+ green, 60-79 amber, below 60 muted

### Flow 4: Open Applicant Detail

**Steps:** User clicks an applicant row.

**Expected Results:**
- [ ] `onOpenApplicant` is called with the applicant id
- [ ] The detail view shows the overall score, status, five-category breakdown (score bar, explanation, evidence quote), and the CV text panel
- [ ] Back, previous, and next navigation call `onBack`, `onPrevApplicant`, `onNextApplicant`

### Flow 5: Shortlist and Reject

**Steps:** User clicks the shortlist toggle on a row, then the reject action (revealed on hover), from both the leaderboard and the detail view.

**Expected Results:**
- [ ] Shortlisting calls `onShortlist` with the applicant id
- [ ] Rejecting calls `onReject` with the applicant id
- [ ] Resetting a shortlisted or rejected applicant calls `onResetStatus`
- [ ] Clicking the shortlist toggle does not also trigger `onOpenApplicant` (event propagation is stopped)

### Flow 6: Filter and Sort

**Steps:** User switches the filter tab (All / Shortlisted / Rejected) and changes the sort control.

**Expected Results:**
- [ ] `onFilter` is called with the selected filter
- [ ] `onSort` is called with `'overall'` or `'category'` plus a category priority
- [ ] The Shortlisted tab shows only shortlisted applicants, preserving their rank numbers

---

## Empty State Tests

### Primary Empty State

**Setup:** `applicants` is `[]`.

**Expected Results:**
- [ ] The CV upload drop zone is the centred primary call to action - not a blank screen and not an empty table
- [ ] Summary stats and filter tabs are not shown when there are no applicants

### Filtered Empty State

**Setup:** Applicants exist but the active filter tab matches none (for example Rejected with no rejected applicants).

**Expected Results:**
- [ ] A clear "No [filter] applicants yet" message is shown

---

## Component Interaction Tests

### RankingsLeaderboard

- [ ] Renders four summary stats: Total Applicants, Scored, Shortlisted, Average Score
- [ ] Filter tabs show counts; the active tab uses the yellow style
- [ ] The sort dropdown lists "Overall score" plus each scoring category

### ApplicantRow

- [ ] The whole row is clickable to open detail
- [ ] The shortlist star is filled yellow when shortlisted, outline otherwise
- [ ] The reject button is revealed on hover and is hidden for already-rejected applicants

### RankingsApplicantDetail

- [ ] The header card shows the large colour-graded score badge and status pill
- [ ] Shortlist/Reject buttons swap to a "Shortlisted"/"Restore" state based on current status
- [ ] Each category block shows the priority badge, score bar, explanation, and a distinct evidence quote
- [ ] The CV panel shows the file name and extracted CV text

---

## Edge Cases

- [ ] Works with 1 applicant and with 50+ applicants
- [ ] An applicant with a very long CV text scrolls within the CV panel
- [ ] Transition: scoring completes (scored equals total) and the progress banner disappears
- [ ] Transition: after rejecting the last shortlisted applicant, the Shortlisted tab shows its empty state
- [ ] Score badges render correctly at boundary values (59, 60, 79, 80)

---

## Accessibility Checks

- [ ] Applicant rows are keyboard focusable and activatable
- [ ] The shortlist toggle and reject button have accessible labels
- [ ] Score is conveyed numerically, not by colour alone
- [ ] The CV upload drop zone is keyboard operable

---

## Sample Test Data

```typescript
const mockApplicant = {
  id: 'applicant-001',
  name: 'Darren Mitchell',
  cvFileName: 'darren-mitchell-cv.pdf',
  submittedDate: 'Applied 2 days ago',
  status: 'shortlisted',
  overallScore: 91,
  cvText: 'Licensed plumber and gasfitter with 14 years experience...',
  scores: [
    { categoryPriority: 1, categoryLabel: 'Independent Job Ownership', score: 9, explanation: '...', evidence: '"..."' },
    // ... five total
  ],
}

const mockEmptyApplicants = []
const mockScoringProgress = { scored: 10, total: 12 }
const mockSummary = { totalApplicants: 12, scored: 10, shortlisted: 3, rejected: 2, averageScore: 71 }
```

---

## Notes for Test Implementation

- Test the three leaderboard states explicitly: empty (`applicants: []`), scoring (`scored < total`), and ranked
- Verify each status action callback fires with the correct id, including from both the leaderboard row and the detail view
- Test that the row's shortlist toggle stops propagation so it does not also open the detail view
- Sorting and filtering are handled in-component in the provided design; verify the callbacks fire and adapt if you move that logic server-side
