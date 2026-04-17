# Design System & UI/UX Guidelines

## Core Philosophy
- **Mobile-First & Minimalist:** Prioritize thumb-reachability, edge-to-edge content, and removal of unnecessary borders or heavy container cards.
- **Component-Driven:** UI updates should be made at the base component level (e.g., `shadcn/ui` components) rather than hardcoded on individual screens.

## Component Specifications
### 1. Inputs & Forms
- **Touch Targets:** Minimum height of `h-14` (56px) for native app feel.
- **Styling:** Soft muted backgrounds (`bg-muted/50`), minimal to no borders, and rounded corners (`rounded-xl` or `rounded-2xl`).

### 2. Actions & Buttons
- **Thumb-Zone Placement:** Primary screen actions (e.g., "Collect Bay", "Upload") must be placed inside a sticky bottom container (`BottomActionBar`) above the safe area.
- **Styling:** Large, highly visible primary buttons that span the width of the container.

### 3. Lists & Data
- **Edge-to-Edge:** Remove heavy `<Card>` wrappers around list items.
- **Separators:** Use clean, edge-to-edge layouts with subtle `divide-y divide-border` for separating list items.

## Global Theming
- Rely on contrast between the main app background (slightly off-white/black) and surface elements (pure white/dark grey) rather than heavy drop shadows.

## Future UX Considerations (Pending Discussion)
- **App Navigation:** The current "Speed Dial" approach for primary routing needs to be re-evaluated. Future iterations should explore creative, modern alternatives (e.g., floating bottom pill-nav, contextual action bars) that offer better usability than a FAB menu.
