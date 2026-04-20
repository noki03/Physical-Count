# Physical Count - Architecture Overview

## Tech Stack

### Core Framework
- **React 19** - Modern React with latest features
- **Vite 7.1.7** - Fast build tool and development server
- **TypeScript** - Type-safe development

### Styling & UI
- **TailwindCSS v4** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible UI components
- **motion (framer-motion)** - Animation library for enhanced UX
- **Lucide React** - Icon library

### State Management
- **Zustand** - Lightweight global state management
- **TanStack React Query** - Server state management and data fetching

### Data Persistence
- **Dexie** - IndexedDB wrapper for client-side storage
- **Feature-based repository pattern** - Clean data access layer

### Theming
- **next-themes** - Theme management (light/dark mode support)

## Architecture Patterns

### Feature-Based Architecture
- Collocated components, hooks, and types per domain
- Clear separation between UI, business logic, and data layers
- Scalable and maintainable code organization

### Clean Architecture
- Repository pattern for data access
- Service layer for business logic
- Component layer for UI concerns

### State Management Strategy
- Local component state for UI-specific concerns
- Global Zustand store for application-wide state
- React Query for server state and caching
