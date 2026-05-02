# API Contracts: Backend

## Base URL
`http://localhost:8080`

## Authentication
Authentication is handled via JWT tokens stored in HTTP-only cookies.

---

## Auth Endpoints (`/auth`)

### Register User
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**: `LoginRequest` (uid, password)
- **Response**: `UserResponse` (uid, lastConnection)

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates user and sets JWT cookie.
- **Request Body**: `LoginRequest` (uid, password)
- **Response**: `204 No Content` (Sets `Set-Cookie` header)

### Get Current User
- **URL**: `/auth/me`
- **Method**: `POST`
- **Description**: Returns profile of currently authenticated user.
- **Response**: `UserResponse`

### Logout
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: Removes the JWT cookie.
- **Response**: `204 No Content`

---

## Conversation Endpoints (`/conversations`)

### Create Conversation
- **URL**: `/conversations`
- **Method**: `POST`
- **Request Body**: `ConversationRequest`
- **Response**: `ConversationResponse`

### List Conversations
- **URL**: `/conversations`
- **Method**: `GET`
- **Description**: Returns all conversations for the connected user.
- **Response**: `List<ConversationResponse>`

### List Messages
- **URL**: `/conversations/{conversationId}/messages`
- **Method**: `GET`
- **Response**: `List<MessageResponse>`

### Send Message
- **URL**: `/conversations/{conversationId}/messages`
- **Method**: `POST`
- **Request Body**: `MessageRequest` (text)
- **Response**: `MessageResponse`

### Real-time Message Stream (SSE)
- **URL**: `/conversations/{conversationId}/open`
- **Method**: `GET`
- **Description**: Opens a Server-Sent Events stream for real-time messages.
- **Header**: `Accept: text/event-stream`
- **Response**: `Flux<ServerSentEvent<MessageResponse>>`
