# Architecture: Frontend

## Overview
The frontend is a modern React 19 application built with Vite. It follows a component-based architecture with a strong focus on hooks-driven state management and real-time updates.

## Key Technologies
- **React 19**: Leveraging the latest concurrent features and hooks.
- **TanStack React Query**: Primary tool for server state management, caching, and synchronization.
- **TailwindCSS 4 + DaisyUI 5**: Utility-first CSS and component library for rapid UI development.
- **OpenAPI Generator**: Automatic generation of the API client from the backend schema.

## Component Architecture
- **App.tsx**: Root component, initializes `QueryClientProvider` and manages high-level user state.
- **Chatbox.tsx**: Main orchestration component for the chat interface. Handles SSE connections and message state updates via React Query.
- **ConversationList.tsx**: Displays available conversations.
- **Message.tsx**: Presentational component for individual chat bubbles.
- **MessageForm.tsx**: Handles sending new messages.

## Data Flow & State
- **Server State**: Managed by TanStack Query. Queries are used for fetching messages and user info.
- **Real-time Updates**: `EventSource` (SSE) listens for new messages. When a message is received, it is manually injected into the React Query cache using `setQueryData`.
- **API Interactions**: Performed via a generated client in `src/api/`.

## Critical Patterns
- **Custom Hooks**: Encapsulate logic (e.g., `useUser` for fetching current user profile).
- **CSS-in-JS/Utility**: Exclusively use TailwindCSS classes. Avoid custom CSS files where possible.
