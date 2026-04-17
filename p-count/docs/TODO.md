[ACTION: CLEAN UP AND REORGANIZE TODO.MD]

Architect Instructions:
The `docs/TODO.md` file has messy heading hierarchies and misplaced sections. We need to completely rewrite it into a clean, logical structure.

1. Open `docs/TODO.md`.
2. Replace the entire content with this strictly formatted version:

```markdown
# Physical Count - Development Roadmap

## Phase 1: UI/UX & Shell Foundation

- [x] Audit codebase structure
- [x] Establish .windsurfrules
- [x] Setup global Zustand store & centralized types
- [x] Reorganize documentation into docs/ folder
- [x] Integrate next-themes ThemeProvider
- [x] Refactor App.tsx layout wrapper

## Phase 2: Core Data Entry UX

- [x] Implement animated theme toggle
- [x] Add mobile-specific HTML attributes (inputMode, enterKeyHint) to forms
- [x] Reverse Item List sorting (newest first) and add internal scroll
- [x] Implement item deletion with custom confirmation dialog

## Phase 3: Review & Upload Scaffolding

- [x] Add aggregate totals (Bays & Items) to Review Screen
- [x] Redesign Review Screen UI with 3-metric dashboard and scroll constraints
- [x] Implement local sync state (isUploaded) and session reset routing
- [x] Add tap-to-toggle exact metrics for mobile and visual 'Synced' badges

## Phase 4: UI Polish & Architecture (✅ COMPLETE)

### Completed

- [x] Mobile-first edge-to-edge layouts with soft dividers
- [x] BottomActionBar implementation for consistent mobile UX
- [x] Dialog modernizations with full-screen mobile design
- [x] Premium zero-states with icons and descriptive text
- [x] Safe delete dialogs with proper confirmation flows
- [x] Enhanced delete toasts with specific identifiers
- [x] Modernize Upload Screen with progress indicators and sync status
- [x] Add bulk operations summary for better mobile workflow
- [x] Fix Upload Screen edge cases (Empty Data State, Hydration Flicker)

### Data Layer Toast Refactoring

- [x] Move `ItemScreen` add/delete toasts from UI to `useItemData.ts` mutation `onSuccess/onError`
- [x] Move `BayItemDialog` delete toasts from UI to `useItemData.ts` mutation `onSuccess/onError`
- [x] Move `BayItemListScreen` delete toast from UI to `useBayItemList.ts` mutation `onSuccess`
- [x] Change delete success toasts to Neutral default style (e.g., `toast("Item removed")`) instead of Green `toast.success`
- [x] Clean up UI components to only handle state and user interactions

## Phase 5: Tablet & Desktop Responsiveness (COMPLETED)

- [x] **Standardize Responsive Screen Wrappers:** Update all main screens (`ItemScreen`, `BayScreen`, `UploadScreen`) to use responsive width prefixes (e.g., `max-w-md md:max-w-2xl lg:max-w-4xl`) instead of being locked to mobile width.
- [x] **Fix BayItemListScreen Constraints:** Add width constraints to `BayItemListScreen` so it no longer stretches full width, bringing it in line with other screens.
- [x] **Align Navigation Bars on Wide Screens:** Update `BottomActionBar` and `BottomNav` so their internal content wrappers match the responsive max-width of the screens, preventing them from stretching awkwardly on desktop monitors.

## Phase 6: Automated Testing Foundation

- [ ] **Setup Playwright for E2E Testing:** Install and configure Playwright to simulate mobile viewports and test core user flows (Scanning, Reviewing, Uploading).
- [ ] **Setup Vitest & React Testing Library:** Install testing tools for unit testing complex data layer hooks (Zustand stores, Dexie DB interactions).
- [ ] **Write Core User Journey Test:** Create an automated Playwright test that simulates adding a Bay, adding Items, and completing an upload to replace manual regression testing.

## Phase 7: Enterprise Post-Upload Resilience

- [ ] **Post-Upload Summary Modal:** Instead of just a generic "Synced" state, show users exactly what succeeded (e.g., "Successfully synced 5 Bays and 142 Items").
- [ ] **Network Interruption Handling:** Implement a retry queue or save-state if internet drops midway through a large sync payload.
- [ ] **Partial Failure States:** If some items upload but others fail, show a detailed error log of exactly which items failed so the user can retry them.

## Future Phases

- [ ] Theme toggle UI implementation
- [ ] Real API integration (replace mocks)
```
