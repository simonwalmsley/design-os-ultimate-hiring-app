# Ultimate Hiring Process - Product Overview

## Summary

An AI-assisted web application that replaces manual hiring templates with a guided, conversational experience. It walks business owners through defining the role, writing a psychology-driven job ad, setting scoring criteria, and ranking applicants from uploaded CVs - with the human making all final hiring decisions. Built for UPA Coaching clients who are established but non-technical business owners in trades, construction, hospitality, and service industries.

**Problems it solves:**
- Generic, undifferentiated job ads - AI generates a structured 7-section ad using green brain/red brain psychology, built from the owner's own company profile and role requirements.
- Gut-feel applicant screening - AI scores every CV against weighted, role-specific criteria with written explanations.
- Inability to execute the hiring process - the app teaches UPA's methodology inline as the AI guides users step-by-step.
- Time wasted on wrong hires - a structured process from role clarity through ranked shortlist surfaces the right candidates.

## Planned Sections

1. **Authentication & Onboarding** - Sign in, sign up, approval gate, business details, and how-it-works introduction.
2. **Hiring Threads** - Thread list, create and resume threads, and the phase navigation shell that holds everything.
3. **Conversational Phases** - Phases 1-3 sharing the same chat-then-review pattern: Company Profile, Intent Document, Person Profile, Job Ad, and Role Outcomes.
4. **Rankings Dashboard** - Phase 4's distinct interaction pattern: CV upload, AI scoring, leaderboard, applicant detail, and shortlist.
5. **Admin** - Admin dashboard, client management, and AI configuration.

## Data Model

Core entities:

- **Account** - A client business. All data belongs to the Account.
- **Profile** - A user linked to an Account, with a role (super admin, coach, client) and an approval status.
- **Hiring Thread** - One hiring process for one role. Tracks the current phase and overall status.
- **Company Profile** - Business identity from Phase 1. One per Account, reused across hires.
- **Intent Document** - Role definition from Phase 1. One per Thread.
- **Person Profile** - Ideal candidate profile from Phase 1. One per Thread.
- **Job Ad** - The 7-section ad from Phase 2. One per Thread.
- **Scoring Category** - One of 5 priority-ordered assessment criteria from Phase 3.
- **Applicant** - A candidate in Phase 4, with a CV, an overall score, and a status.
- **Applicant Score** - One score per Applicant per Scoring Category, with explanation and CV evidence.
- **Conversation Message** - Chat history across phases, scoped to a Thread and a phase.
- **AI Provider Config** - Which AI model to use per phase. Admin-managed.

See `data-model/README.md` and `data-model/types.ts` for full definitions and relationships.

## Design System

**Colours:**
- Primary: yellow (`#ffcd05` accent)
- Secondary: zinc
- Neutral: neutral

**Typography:**
- Heading: Inter
- Body: Inter
- Mono: JetBrains Mono

The application is dark mode first. See `design-system/` for tokens, Tailwind colour usage, and font setup.

## Implementation Sequence

Build this product in milestones:

1. **Foundation** - Set up design tokens, data model types, routing, and the application shell.
2. **Authentication & Onboarding** - Pre-auth screens and first-sign-in onboarding.
3. **Hiring Threads** - The authenticated home: thread list, empty state, create and resume.
4. **Conversational Phases** - The chat-then-review content for Phases 1-3 inside a thread.
5. **Rankings Dashboard** - Phase 4: CV upload, AI scoring, leaderboard, and applicant detail.
6. **Admin** - Admin dashboard, client management, and AI configuration.

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
