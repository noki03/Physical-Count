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

## Phase 4: UI Polish & Architecture

- [x] Mobile-first edge-to-edge layouts with soft dividers
- [x] BottomActionBar implementation for consistent mobile UX
- [x] Dialog modernizations with full-screen mobile design
- [x] Premium zero-states with icons and descriptive text
- [x] Safe delete dialogs with proper confirmation flows
- [x] Enhanced delete toasts with specific identifiers
- [x] Modernize Upload Screen with progress indicators and sync status
- [x] Add bulk operations summary for better mobile workflow
- [x] Fix Upload Screen edge cases (Empty Data State, Hydration Flicker)
- [x] Move toasts to data layer (useItemData, useBayItemList mutations)

## Phase 5: Tablet & Desktop Responsiveness

- [x] Standardize responsive screen wrappers (max-w-md md:max-w-2xl lg:max-w-4xl)
- [x] Fix BayItemListScreen width constraints
- [x] Align BottomActionBar and BottomNav on wide screens

## Phase 6: Automated Testing Foundation

- [x] Setup Playwright for E2E testing (Pixel 7 viewport)
- [x] Setup Vitest & React Testing Library for unit tests
- [x] Write core user journey E2E test
- [x] Write delete journey E2E tests
- [x] Write advanced delete journey E2E tests
- [x] Unit tests for useItemData (load, add, delete, loading state, deleteAll, bay isolation)
- [x] Unit tests for useBayData (load, add, loading state, empty state)

## Phase 6.5: Bug Fixes & Production Hardening

- [x] Fix orphaned items on bay delete
- [x] Fix upload payload join (bayId instead of bayCode)
- [x] Wire EditBayModal into BayCard (bay rename flow)
- [x] Add post-upload success dialog (synced bay/item counts)
- [x] Replace hardcoded DEVICE-001 with persistent localStorage UUID
- [x] Replace simulated upload with conditional real fetch (VITE_UPLOAD_URL)
- [x] Remove debug console.logs and window.__TANSTACK_QUERY_CLIENT__
- [x] Delete unused SpeedDial and BayItemAccordion dead code
- [x] Add .env.example and CLAUDE.md project documentation

## Phase 7: Enterprise Post-Upload Resilience

- [ ] Network interruption handling — retry queue or save-state on failed sync
- [ ] Partial failure states — detailed error log of which items failed
- [ ] Advanced error recovery and retry UI

## Future Phases

- [ ] Theme toggle UI implementation
- [ ] Real API integration (replace mocks)
