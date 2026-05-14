# Rankings Dashboard Specification

## Overview
Phase 4 of a hiring thread — the one phase that breaks the chat-then-review pattern. The client uploads applicant CVs, the AI scores each one against the five Scoring Categories from Phase 3, and applicants are ranked into a leaderboard. The client drills into individual applicant detail to review the scored evidence, then shortlists the candidates worth interviewing.

## User Flows
- First time (no applicants): client sees an empty state with a prominent CV upload drop zone and drags in or selects multiple CV files
- After upload, a scoring-in-progress state shows progress ("Scoring X of Y") with rows resolving as each applicant is scored
- Once scored, the leaderboard shows applicants ranked by overall AI score, highest first
- Client scans each applicant's rank, name, overall score, and a compact breakdown of the five category scores
- Client clicks an applicant to open the detail view
- In detail, client reviews each of the five category scores — score out of 10, the AI's written explanation, and the quoted CV snippet as evidence — alongside the CV itself
- Client shortlists or rejects an applicant from the row toggle or the detail view
- Client filters the leaderboard to Shortlisted to review the final cut
- Client uploads more CVs at any time via a persistent "Upload CVs" action; new applicants get scored and slotted into the ranking
- Client sorts the leaderboard by overall score or by a specific category

## UI Requirements
- Empty state: centred CV upload drop zone, headline and sub-instruction, "Upload CVs" button, accepts multiple files via drag-and-drop
- Scoring-in-progress state: progress bar with "Scoring X of Y applicants", skeleton rows that resolve into scored rows
- Leaderboard: page header (Phase 4 badge, role context), summary stats (total applicants, scored, shortlisted, average score), persistent "Upload CVs" button, filter tabs (All / Shortlisted / Rejected), sort control
- Applicant row: rank number (JetBrains Mono), name, overall score badge (large, mono, colour-graded), compact five-category score strip, status pill, shortlist toggle, entire row clickable to detail
- Overall score colour grading: high green, mid amber, low muted — consistent thresholds
- Applicant detail: header with name, overall score, status pill, shortlist and reject actions, back link, prev/next applicant navigation
- Detail score breakdown: one block per Scoring Category showing label and priority, score out of 10 with a visual bar, the AI explanation, and the quoted CV snippet as a distinct evidence quote
- CV panel in detail: the applicant's CV text viewable alongside the score breakdown
- Status pills: Scored (neutral), Shortlisted (green), Rejected (muted)
- Shortlist tab shows only shortlisted applicants in rank order as the final cut

## Configuration
- shell: true
