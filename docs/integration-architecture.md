# Integration Architecture

## Overview
This document describes how the `frontend` and `backend` parts of the project interact and integrate.

---

## Communication Protocols

### 1. REST API
The primary communication method is via RESTful HTTP calls.
- **Direction**: `frontend` → `backend`
- **Format**: JSON
- **Tooling**: `@tanstack/react-query` on the frontend calls a generated client based on the backend's OpenAPI schema.

### 2. Server-Sent Events (SSE)
Used for real-time message delivery without polling.
- **Direction**: `backend` → `frontend` (Push)
- **Endpoint**: `GET /conversations/{id}/open`
- **Client Implementation**: `EventSource` in `Chatbox.tsx`.

---

## Authentication & Security Flow

1. **Login**: Frontend sends credentials via `POST /auth/login`.
2. **Token Issuance**: Backend validates credentials and returns a JWT in an **HTTP-only cookie** (`SET_COOKIE`).
3. **Subsequent Requests**: The browser automatically attaches the cookie to all requests to the backend base URL.
4. **Validation**: Backend Spring Security filter extracts and validates the JWT from the cookie.
5. **Session Management**: Purely stateless on the server side (JWT).

---

## Cross-Part Sync (OpenAPI)
The frontend API layer is strictly coupled to the backend's OpenAPI definition.
- **Source of Truth**: Backend controllers and DTOs.
- **Sync Mechanism**: `frontend/src/api` is generated using `@openapitools/openapi-generator-cli`.
- **Constraint**: The backend must be running to regenerate the client.
