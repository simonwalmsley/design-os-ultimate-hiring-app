# Data Model

## Entities

### Account
A client business. All data belongs to the Account, not individual users. One per business. Stores business name, industry, location, and phone number.

### Profile
A user linked to an Account. Has a role: super admin, coach, or client. Requires admin approval before access. Status progresses through unverified, pending, active, or inactive.

### Hiring Thread
One hiring process for one role. Belongs to an Account. Tracks which phase the client is up to and the thread's overall status. Multiple threads per account.

### Company Profile
The business identity output from Phase 1. One per Account, reused across all hires. Contains the company story, culture, and value proposition drafted by the AI from the client's answers.

### Intent Document
The role definition output from Phase 1. One per Thread. Describes what the role is, why it exists, and what success looks like.

### Person Profile
The ideal candidate profile from Phase 1. One per Thread. Describes the traits, experience, and qualities the right person would have.

### Job Ad
The 7-section ad from Phase 2. One per Thread. Contains logistics data (location, hours, salary, how to apply, response timeframe) and the locked green-brain-to-red-brain section structure.

### Scoring Category
One of 5 assessment criteria from Phase 3. Five per Thread, priority-ordered (1-5). Each has a label, description, and AI-generated priority reason.

### Applicant
A candidate in Phase 4. Has a CV file, extracted text, overall AI score, and a status (scored, shortlisted, or rejected). Belongs to a Thread.

### Applicant Score
One score per Applicant per Scoring Category. Rated 1-10 with a written explanation and a quoted CV snippet as evidence.

### Conversation Message
Chat history across all phases. Tracks which phase and role (user, assistant, or system). Belongs to a Thread. Autosaved on send.

### AI Provider Config
Which AI model to use per phase. Admin-managed. Supports multiple providers (Anthropic, OpenAI, Google) with cost indicators.

## Relationships

- Account has many Profiles, many Hiring Threads, and one Company Profile
- Profile belongs to one Account
- Hiring Thread belongs to one Account
- Hiring Thread has one Intent Document, one Person Profile, one Job Ad, five Scoring Categories, and many Applicants
- Applicant has five Applicant Scores (one per Scoring Category)
- Conversation Messages belong to a Hiring Thread and a Phase
- AI Provider Config has one entry per phase (four in MVP)
