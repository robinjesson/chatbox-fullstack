---
project_name: 'chatbox-fullstack'
user_name: 'Robin'
date: '2026-05-02'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'quality_rules', 'workflow_rules', 'anti_patterns']
status: 'complete'
rule_count: 22
optimized_for_llm: true
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Frontend
- **React**: 19.2.4
- **TypeScript**: 6.0.2 (Strict mode)
- **Vite**: 8.0.4
- **TailwindCSS**: 4.2.2 (Vite plugin)
- **TanStack React Query**: 5.99.0
- **DaisyUI**: 5.5.19
- **React Hook Form**: 7.72.1
- **API Client**: Generated via @openapitools/openapi-generator-cli (typescript-fetch)

### Backend
- **Spring Boot**: 4.0.5
- **Java**: 25
- **Database**: PostgreSQL 42.7.10
- **Security**: Spring Security + JJWT 0.13.0
- **Mapping**: MapStruct 1.6.3 + Lombok
- **API Documentation**: SpringDoc OpenAPI 2.8.5
- **Build**: Maven

## Critical Implementation Rules

### Language-Specific Rules

- **TypeScript (Frontend):**
    - Always use `import type` when only importing types to minimize bundle size.
    - Follow strict TypeScript configuration (strict mode is enabled).
    - Maintain custom hooks in `src/hooks/` and use them for data fetching logic.
- **Java (Backend):**
    - Leverage Java 25 features (Records, Pattern Matching).
    - Use Lombok for boilerplate reduction (@Getter, @Setter, @RequiredArgsConstructor).
    - Use MapStruct for Entity-DTO mappings; define mappers as interfaces with `@Mapper(componentModel = "spring")`.

### Framework-Specific Rules

- **React & Frontend:**
    - Use TanStack Query for all server state management.
    - Prefer `react-hook-form` for form management and validation.
    - Use TailwindCSS utility classes and DaisyUI components for UI; avoid custom CSS in `App.css`.
    - Access backend APIs exclusively through the generated client in `src/api`.
- **Spring Boot & Backend:**
    - Follow the Controller-Service-Repository pattern strictly.
    - Secure endpoints using Spring Security and JWT.
    - Ensure all new API endpoints are documented with OpenAPI annotations.

### Testing Rules

- **Backend:**
    - Use JUnit 5 and Mockito for unit tests.
    - Aim for integration tests using `@SpringBootTest` for critical flows.

### Code Quality & Style Rules

- **Naming Conventions:**
    - React Components: PascalCase (e.g., `Chatbox.tsx`).
    - Java Classes: PascalCase (e.g., `MessageService.java`).
    - Functions/Variables: camelCase.
- **Structure:** 
    - Frontend components should live in their own subdirectory under `src/components/`.
    - Custom React hooks must be placed in `src/hooks/`.

### Development Workflow Rules

- **Commit Messages:** Follow conventional commits (e.g., `feat:`, `fix:`, `chore:`, `docs:`).
- **API Updates:** Do not manually edit files in `frontend/src/api/`. Use `npm run openapi:generate` to sync with the backend.

### Critical Don't-Miss Rules

- **DTO Usage:** Never return JPA Entities directly from Spring Controllers; always map to DTOs using MapStruct.
- **Client Sync:** Ensure the backend is running before generating the frontend API client.

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code.
- Follow ALL rules exactly as documented.
- When in doubt, prefer the more restrictive option.
- Update this file if new patterns emerge.

**For Humans:**
- Keep this file lean and focused on agent needs.
- Update when technology stack changes.
- Review quarterly for outdated rules.
- Remove rules that become obvious over time.

Last Updated: 2026-05-02
