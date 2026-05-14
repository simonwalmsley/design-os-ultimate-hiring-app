# Tailwind Colour Configuration

The components are built with Tailwind CSS v4 (no `tailwind.config.js`) and are dark mode first.

## Colour Choices

- **Primary:** `yellow` - used for primary buttons, active nav items, focus rings, and key accents. The components use the literal hex `#ffcd05` (hover `#e6b800`, foreground text `#0a0a0a`).
- **Secondary:** `zinc` - reserved for secondary surfaces and highlights.
- **Neutral:** `neutral` - backgrounds, text, and borders. The components lean on `white/N` opacity utilities over a near-black base.

## Surface System

The components do not use `dark:` variants - they are built dark-first against a `#0a0a0a` base:

- Base background: `bg-[#0a0a0a]`
- Raised surface: `bg-white/5`
- Borders: `outline -outline-offset-1 outline-white/10` (or `border-white/10`)
- Body text: `text-white`, `text-gray-400`, `text-gray-500`, `text-gray-600`

If you need a light mode, you will be adding it - the provided components target dark only.

## Status Colours

- Amber `#ff8907` - setup in progress, needs update, pending, medium cost
- Blue `#1a6ef4` - ranking in progress, scoring in progress
- Green `#16a249` - shortlist ready, active, shortlisted, approve actions
- Error red `#dc2828` - inline validation errors

## Usage Examples

- Primary button: `bg-[#ffcd05] text-[#0a0a0a] hover:bg-[#e6b800]`
- Raised card: `rounded-xl bg-white/5 outline -outline-offset-1 outline-white/10`
- Muted text: `text-gray-400`
- Focus ring: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffcd05]`
