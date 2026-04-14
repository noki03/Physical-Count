# Physical Count - Development Roadmap

## Phase 1: UI/UX & Shell Foundation

- [x] Audit codebase structure
- [x] Establish .windsurfrules
- [x] Setup global Zustand store & centralized types
- [x] Reorganize documentation into docs/ folder
- [x] Integrate next-themes ThemeProvider
- [x] Refactor App.tsx layout wrapper

### Phase 2: Core Data Entry UX

- [x] Implement animated theme toggle
- [x] Add mobile-specific HTML attributes (inputMode, enterKeyHint) to forms
- [x] Reverse Item List sorting (newest first) and add internal scroll
- [x] Implement item deletion with custom confirmation dialog

### Phase 3: Review & Upload Scaffolding

- [x] Add aggregate totals (Bays & Items) to Review Screen
- [x] Redesign Review Screen UI with 3-metric dashboard and scroll constraints
- [x] Implement local sync state (isUploaded) and session reset routing
- [x] Add tap-to-toggle exact metrics for mobile and visual 'Synced' badges

# Phase 4 Roadmap & TODOs

- [x] Mobile-first edge-to-edge layouts with soft dividers
- [x] BottomActionBar implementation for consistent mobile UX
- [x] Dialog modernizations with full-screen mobile design
- [x] Premium zero-states with icons and descriptive text
- [x] Safe delete dialogs with proper confirmation flows
- [x] Enhanced delete toasts with specific identifiers

## 🔄 Data Layer Refactoring Tasks

- [ ] Move `ItemScreen` add/delete toasts from UI to `useItemData.ts` mutation `onSuccess/onError`
- [ ] Move `BayItemDialog` delete toasts from UI to `useItemData.ts` mutation `onSuccess/onError`
- [ ] Move `BayItemListScreen` delete toast from UI to `useBayItemList.ts` mutation `onSuccess`
- [ ] Change delete success toasts to Neutral default style (e.g., `toast("Item removed")`) instead of Green `toast.success`
- [ ] Clean up UI components to only handle state and user interactions
- [ ] Ensure all business logic and user feedback lives in data layer

## 🎯 Final Phase 4 Milestone

- [ ] Modernize Upload Screen with mobile-first design
- [ ] Implement upload progress indicators and sync status
- [ ] Add bulk operations for better mobile workflow
- [ ] Complete data layer separation for all toast notifications

## Future Phases

- [ ] Theme toggle UI implementation
- [ ] Responsive design improvements
- [ ] Real API integration (replace mocks)
- [ ] Testing framework implementation
