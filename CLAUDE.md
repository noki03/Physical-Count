# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branching Strategy

```
main          ← tagged releases only (v1.0, v1.1.0, …)
  └── dev-stable  ← integration/staging; merges from dev via PR (approval required)
       └── dev    ← active development; merges from feat/* via PR
            └── feat/<name>   ← one branch per feature/fix
                 └── feat/<name>/<sub>  ← sub-branches only when needed
```

**Flow:** `feat/*` → `dev` → `dev-stable` → `main`

- All merges happen via **Pull Requests** — never use `git merge` locally to land branches into `dev`, `dev-stable`, or `main`
- Tag a new version on `main` after each `dev-stable → main` merge
- Branch naming: `feat/short-description`, sub-branches: `feat/short-description/sub-task`

## GitHub PR Workflow

**Repo:** `noki03/Physical-Count`  
**Auth:** Requires `GITHUB_PAT` environment variable (fine-grained PAT, `Contents` + `Pull requests` read/write, scoped to this repo only).

### Standard flow — one feature branch

```bash
# 1. Push branch to origin
git push origin <branch-name>

# 2. Create PR via GitHub API
curl -s --request POST \
  --header "Authorization: Bearer $GITHUB_PAT" \
  --header "Content-Type: application/json" \
  --data "{\"title\":\"<title>\",\"body\":\"<body>\",\"head\":\"<branch>\",\"base\":\"dev\"}" \
  "https://api.github.com/repos/noki03/Physical-Count/pulls"
# → returns JSON with "number" (the PR number, e.g. 28)

# 3. Present PR URL to user and wait for "approve"
# https://github.com/noki03/Physical-Count/pull/<number>

# 4. User approves and merges on GitHub UI — Claude never merges

# 5. After user confirms merge — sync local target branch and delete local feature branch
git checkout dev && git pull origin dev && git branch -d <branch-name>
```

### Never merge locally

Do NOT use `git merge` to land branches into `dev`, `dev-stable`, or `main`. Always push and create a PR so there is a proper audit trail. The only exception is fast-forward syncs explicitly requested by the user.

## Commands

```bash
npm run dev          # Start dev server on localhost:5174
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint

# Unit tests (Vitest)
npm run test                              # Run all unit tests
npm run test -- tests/unit/foo.test.tsx  # Run a single unit test file
npm run test:ui                           # Vitest UI dashboard

# E2E tests (Playwright — auto-starts dev server)
npm run test:e2e                                        # Run all E2E tests
npx playwright test tests/e2e/core-journey.spec.ts     # Run single E2E spec
npm run test:e2e:ui                                     # Playwright UI mode
```

Path alias: `@/*` resolves to `src/*`.

## Architecture

**Physical-Count** is a mobile-first PWA for inventory scanning. Workers scan a bay code, scan items into that bay, review the list, then upload.

### App flow

```
BayScreen (scanBay) → ItemScreen (addItems) → BayItemListScreen (viewList) → UploadScreen (upload)
```

Step transitions are driven by a single Zustand store (`src/store/useAppStore.ts`) that holds `currentStep` and `currentBay`. `src/app/App.tsx` renders the active screen based on `currentStep`.

### Data layer

Persistence is **IndexedDB via Dexie** (`src/lib/db/`):
- `PCountDB` with two tables: `bays` and `items`
- Three repositories (`BayRepository`, `ItemRepository`, `CommonRepository`) wrap all Dexie calls

**React Query** sits above the repositories. Feature hooks call repositories inside `useQuery`/`useMutation`. Mutations call `queryClient.invalidateQueries` on success. Toast notifications (Sonner) fire in mutation `onSuccess`/`onError` callbacks — not in UI components.

### Feature structure

Each screen lives in `src/features/<feature>/` and contains:
- `components/` — screen-specific React components
- `hooks/` — data hooks (React Query + repositories)
- `types.ts` — TypeScript types for that domain

Shared UI lives in `src/components/`:
- `ui/` — shadcn/ui primitives (New York style, TailwindCSS v4)
- `layout/` — Header, BottomNav, BottomActionBar
- `common/` — ConfirmationDialog, SpeedDial

---

## Feature List

### BayScreen (`src/features/bay/BayScreen.tsx`) — step: `scanBay`
Entry point. Worker identifies the physical bay they are about to count.
- Enter or scan a bay code into a text input (Enter key or "Collect Bay" button submits)
- Validates: code must be non-empty
- Creates a Bay record (`finalized: false`) via `useBayData.addBay()`
- On success → transitions to `addItems` with the new bay passed through Zustand

### ItemScreen (`src/features/item/ItemScreen.tsx`) — step: `addItems`
Active scanning. Worker scans items one by one into the current bay.
- Displays current bay code in header for context
- Enter or scan an item code + quantity (defaults to 1); validates code non-empty and quantity ≥ 1
- Scanned items appear immediately in a live list below the form
- Delete individual item (tap trash icon → confirmation dialog)
- "Finish and Scan Another Bay" → finalizes the bay then resets to `scanBay`

### BayItemListScreen (`src/features/common/bay-item-list/BayItemListScreen.tsx`) — step: `viewList`
Review dashboard. Shows all **finalized** bays with aggregate metrics.
- 3-metric animated dashboard: total bays / total item records / total units (tap to expand for exact numbers)
- Each bay row shows code, item count, and "Synced" badge if `isUploaded: true`
- Open bay detail: full-screen slide-up dialog with scrollable item list
  - Delete individual item (tap trash icon — no secondary confirmation from this path)
  - "Delete All Items" button → confirmation dialog → removes all items for that bay
- Delete entire bay: trash icon on row → confirmation dialog
- "Reset All Data" (bottom bar) → confirmation dialog → clears entire database

### UploadScreen (`src/features/common/upload/UploadScreen.tsx`) — step: `upload`
Sync screen. Uploads locally collected data to the cloud.
- Three display states: empty (no bays), all-synced, pending upload
- Pending state shows counts of unsynced bays and items
- Enter uploader name (required) and optionally check "Reset local data after upload"
- "Upload to Cloud" → confirmation dialog showing exact counts → executes upload
- Upload is currently **simulated** (1.5 s delay, no real HTTP call)
- After upload: if reset is checked, database is cleared; otherwise records are marked `isUploaded: true`

---

## Component Inventory

### `src/components/layout/`
| Component | Responsibility |
|---|---|
| `Header.tsx` | Sticky top bar with app title and dark/light theme toggle (next-themes + @theme-toggles/react) |
| `BottomNav.tsx` | Fixed bottom tab bar with Scan, Bays, Upload tabs; wired directly to Zustand `setStep` |
| `BottomActionBar.tsx` | Fixed bar sitting just above BottomNav; wraps each screen's primary CTA button |

### `src/components/common/`
| Component | Responsibility |
|---|---|
| `ConfirmationDialog.tsx` | Reusable AlertDialog wrapper; accepts trigger node, title, description, confirm/cancel text, and variant |
| `SpeedDial.tsx` | Floating Action Button with animated expandable action list; **built but not used in any screen** |

### `src/components/ui/`
All are standard shadcn/ui primitives: `accordion`, `alert`, `alert-dialog`, `badge`, `button`, `card`, `dialog`, `input`, `label`, `skeleton`, `sonner`, `table`.

### `src/features/bay/components/`
| Component | Responsibility |
|---|---|
| `BayForm.tsx` | Labeled text input for bay code entry used in BayScreen |

### `src/features/item/components/`
| Component | Responsibility |
|---|---|
| `ItemHeader.tsx` | Displays the current bay code as a context heading above the item form |
| `ItemForm.tsx` | Two-field form: item code input and quantity input |
| `ItemList.tsx` | Live list of items scanned into the current bay; each row has a delete button |

### `src/features/common/bay-item-list/components/`
| Component | Responsibility |
|---|---|
| `BayListContainer.tsx` | Wraps the bay list; renders the animated 3-metric dashboard (Bays/Items/Units) above it |
| `BayCard.tsx` | Single row in the dashboard list: shows code, item count, Synced badge, and view/delete actions |
| `BayItemDialog.tsx` | Full-screen slide-up modal showing items for a bay; hosts single-item and bulk-delete actions |
| `BayItemList.tsx` | Scrollable item rows used inside `BayItemDialog` and `BayItemAccordion`; shows item code, timestamp, quantity, delete button |
| `BayItemAccordion.tsx` | Accordion layout rendering bays and their items; **built but not used in any current screen** |
| `EditBayModal.tsx` | Dialog to rename a bay code; **built but not rendered anywhere in the current UI** |
| `DeleteBayButton.tsx` | Trash icon that wraps `ConfirmationDialog` for bay deletion; used inside `BayCard` |
| `ResetDatabaseDialog.tsx` | AlertDialog for the global "Reset All Data" destructive action; used in `BayItemListScreen` bottom bar |

### `src/features/common/upload/components/`
| Component | Responsibility |
|---|---|
| `UploadEmptyState.tsx` | Shown when no bays exist in the database |
| `UploadSuccessState.tsx` | Shown when all bays and items are marked `isUploaded: true` |
| `UploadSummary.tsx` | Two metric cards showing pending bay count and pending item count |

---

## State Management

### Zustand — `src/store/useAppStore.ts`
Holds only navigation state that must survive re-renders and be readable outside the React tree (e.g., by `BottomNav` and `App.tsx` simultaneously without prop drilling):
- `currentStep: "scanBay" | "addItems" | "viewList" | "upload"` — which screen to render
- `currentBay: Bay | null` — the bay currently being scanned into

Actions: `setStep`, `setCurrentBay`, `resetSession` (resets both to initial values).

### React Query — three query keys
| Query key | Data | Used by |
|---|---|---|
| `["bays"]` | All bay records | `useBayData` (BayScreen) |
| `["items", bayId]` | Items for one bay | `useItemData` (ItemScreen, BayItemDialog) |
| `["bays-with-items"]` | Finalized bays joined with their items | `useBayItemList`, `useUploadData`, `useUploader` |

`["bays-with-items"]` is a shared cache key — mutations in `useItemData` and `useBayItemList` both invalidate it, ensuring the review and upload screens stay in sync automatically.

### Local state (useState in components/hooks)
- Form inputs: `bayCode`, `itemCode`, `quantity` — transient, no need for global visibility
- Dialog control: `itemToDelete`, `showConfirm`, `open` — scoped to the component that owns the dialog
- `uploaderName`, `shouldReset`, `isUploading` in `useUploader` — owned by the hook because they are local to the upload flow and don't outlive the screen

---

## Business Rules

**Bay finalization gate**: Only bays with `finalized: true` appear in the review list (`BayItemListScreen`) and the upload payload. A bay is finalized when the user taps "Finish and Scan Another Bay" — `App.tsx` calls `BayRepository.finalizeBay(currentBay.id)` before resetting state. A bay in progress (`finalized: false`) is invisible to the rest of the app.

**Bay codes are not unique**: The Dexie schema indexes `code` but does not enforce uniqueness. Scanning the same code twice creates two separate bay records.

**Items are linked by both `bayId` and `bayCode`**: Items store both fields. `ItemRepository.getItemsByBayId` and `CommonRepository.getBaysWithItems` join on `bayId`. The upload payload joins by `bayCode` — an inconsistency to be aware of if bay codes can change.

**Deleting a bay does not delete its items**: `BayRepository.deleteBay()` only removes the bay row. The associated item rows remain in IndexedDB as orphans.

**Upload requires an uploader name**: `useUploader.uploadAll()` returns early with a toast error if `uploaderName.trim()` is empty. No other field-level validation exists on the upload form.

**"Reset after upload" is opt-in and defaults to false**: When false, records are marked `isUploaded: true` and stay in the database; the "Synced" badge appears on bay/item rows. When true, `CommonRepository.resetDatabase()` clears both tables.

**Upload is a simulation**: `src/lib/db/services/uploadService.ts` logs the payload to the console and waits 1.5 s — there is no real HTTP endpoint wired up.

**`addItems` step keeps the Scan tab active in BottomNav**: `BottomNav` treats `currentStep === "addItems"` as active on the Scan tab, so the user can navigate away mid-scan and return without losing context.

---

## Test Coverage

### What is tested

**Unit tests** (`tests/unit/useItemData.test.tsx`) — tests the `useItemData` hook against a real `fake-indexeddb` instance (no mocking):
- Loads items for a specific bay
- Adds a new item and verifies it appears in the query result
- Deletes an item and verifies it is removed
- Loading state transitions (`isLoading` true → false)

**Vitest sanity check** (`src/utils/math.test.ts`) — 5 basic arithmetic assertions to verify the test runner works.

**E2E tests** (`tests/e2e/`) — Playwright, Pixel 7 viewport:
- `core-journey.spec.ts`: create bay → add item → finish → navigate to review → navigate to upload → fill uploader name → upload → verify success state
- `delete-journey.spec.ts`: open bay dialog → delete individual items
- `advanced-delete-journey.spec.ts`: delete all items in a bay + delete the bay + global reset

### What is not tested
- `useBayData`, `useBayItemList`, `useUploader`, `useUploadData` hooks
- `BayRepository`, `ItemRepository`, `CommonRepository` directly
- `uploadService` (simulated upload logic)
- All UI components (no component render tests)
- Validation paths: empty bay code, empty item code, quantity ≤ 0
- The `deleteAllItems` mutation
- `EditBayModal` and `BayItemAccordion` (dead code — not rendered anywhere)
- Upload with `shouldReset: true` vs `false` behaviour difference

---

### Key tech

React 19, Vite 7, TypeScript (strict, ES2022), TailwindCSS v4, shadcn/ui, Zustand 5, TanStack Query 5, Dexie 4, next-themes, Motion, Lucide React, Sonner.
