# Architecture: Backend

## Overview
The backend is a Spring Boot 4 application providing a RESTful API and real-time SSE streams. It is built with Java 25 and follows a clean layered architecture.

## Key Technologies
- **Spring Boot 4.0.5**: Core framework.
- **Java 25**: Using modern language features like Records and Pattern Matching.
- **Spring Security**: Configured for JWT-based authentication using HTTP-only cookies.
- **Spring Data JPA**: Persistence layer with PostgreSQL.
- **MapStruct**: Type-safe mapping between Entities and DTOs.
- **SpringDoc OpenAPI**: Automatic Swagger/OpenAPI documentation generation.

## Layered Architecture
- **API (Controllers)**: Entry points for REST requests. Define endpoints and use Adapters/Services.
- **Adapters**: Bridge between the API layer and Business logic, often handling DTO conversions.
- **Business (Services)**: Core business logic and orchestration.
- **Entities**: JPA models representing the database schema.
- **Repositories**: Interface-based persistence access.
- **Security**: Custom filters and configuration for JWT and cookie management.

## Real-time Messaging
- **SSE (Server-Sent Events)**: Implemented using `Flux<ServerSentEvent<MessageResponse>>` in `ConversationController`. Allows the server to push messages to connected clients instantly.

## Security Model
- **Authentication**: `AuthController` handles signup/login. Login issues a JWT stored in an HTTP-only `SET_COOKIE`.
- **Authorization**: Protected endpoints require a valid JWT cookie.
