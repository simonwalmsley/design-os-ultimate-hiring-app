# One-Shot Implementation Prompt

I need you to implement a complete web application based on detailed design specifications and UI components I'm providing.

## Instructions

Please carefully read and analyze the following files:

1. **@product-plan/product-overview.md** - Product summary with sections and data model overview
2. **@product-plan/instructions/one-shot-instructions.md** - Complete implementation instructions for all milestones

After reading these, also review:
- **@product-plan/design-system/** - Colour and typography tokens
- **@product-plan/data-model/** - Entity types and relationships
- **@product-plan/shell/** - Application shell component
- **@product-plan/sections/** - All section components, types, sample data, and test instructions

## Before You Begin

Please ask me clarifying questions about:

1. **Authentication & Authorization**
   - How should users sign up and log in? (email/password is shown in the designs - any OAuth providers, magic links?)
   - The product has three roles (super admin, coach, client) with an admin approval gate - confirm how you should model permissions
   - How should the admin-only area be protected?

2. **User & Account Modelling**
   - The design assumes all data belongs to an Account (a client business) with multiple Profiles - confirm this is right
   - Should coaches be able to act across multiple client accounts?

3. **Tech Stack Preferences**
   - What backend framework/language should I use?
   - What database do you prefer?
   - Any specific hosting/deployment requirements?

4. **AI Integration**
   - The app calls an AI per phase (model is admin-configurable across Anthropic, OpenAI, Google) - which provider(s) do you have access to, and any constraints?
   - How should CV text extraction and AI scoring jobs run (synchronous, background queue)?

5. **Backend Business Logic**
   - Any server-side logic, validations, or processes needed beyond what's shown in the UI?
   - Email sending, notifications, or background processes to trigger?

6. **Any Other Clarifications**
   - Questions about specific features or user flows
   - Edge cases that need clarification
   - Integration requirements

Lastly, be sure to ask me if I have any other notes to add for this implementation.

Once I answer your questions, create a comprehensive implementation plan before coding.
