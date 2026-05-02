# Chatbox — Agent Instructions

React + TypeScript SPA for a real-time chat application backed by a Spring Boot REST API.

## Commands

```bash
pnpm dev                  # Start Vite dev server (port 5173)
pnpm build                # tsc -b && vite build
pnpm lint                 # ESLint
pnpm openapi:generate     # Regenerate src/api/ from http://localhost:8080/v3/api-docs
```

## Stack

| Layer | Library |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 8 + `@vitejs/plugin-react` |
| Styling | Tailwind CSS 4 (via Vite plugin) + DaisyUI 5 |
| Server state | TanStack Query v5 |
| Forms | React Hook Form v7 |
| API client | Auto-generated TypeScript Fetch (`src/api/`) |

## Architecture

```
App.tsx
├── QueryClientProvider          ← single QueryClient at app root
├── Menu                         ← always visible; handles auth (login/signup)
└── Chatbox (user prop)          ← rendered only when authenticated
    ├── ConversationList
    ├── ConversationItem
    └── Message
```

- **No router.** Navigation is pure conditional rendering based on the `user` state in `App.tsx`.
- Auth state is managed by `App.tsx` via `useState<UserResponse>`. After login, `queryClient.invalidateQueries({ queryKey: ["me"] })` triggers a refetch of `/me` which lifts the user up.
- Real-time messages use **Server-Sent Events** (`EventSource`) against `http://localhost:8080/conversations/:id/open`.

## API Layer (`src/api/`)

> ⚠️ **Do not edit `src/api/` manually.** It is fully auto-generated. Run `pnpm openapi:generate` after backend changes.

Every component creates its own API instance:

```typescript
const api = new SomeControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include", // required for cookie-based auth
  }),
);
```

Available APIs: `AuthControllerApi`, `ConversationControllerApi`.  
Available models: `UserResponse`, `ConversationResponse`, `MessageResponse`, `MessageRequest`, `LoginRequest`, `RegisterUserRequest`, `ConversationRequest`.

## Styling Conventions

- Tailwind CSS 4 is configured **in CSS only** (`src/index.css`), not via `tailwind.config.js` (deprecated in v4).
- DaisyUI 5 classes (`btn`, `input`, `chat`, `chat-bubble`, etc.) are preferred over raw Tailwind utilities.
- Use DaisyUI semantic color names (`bg-primary`, `text-base-content`) so colors adapt to theme.

## Key Patterns

- **React Query keys:** `["me"]`, `["conversations"]`, `["conversation", conversationId]`
- **SSE duplicate guard:** always check `oldData.some(m => m.id === newMsg.id)` before appending to query cache.
- `QueryClient` must be accessed via `useQueryClient()` inside the `QueryClientProvider` tree — do not instantiate a new one inside a component for cache operations.
