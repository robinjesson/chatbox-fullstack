# Development Guide

## Prerequisites
- **Java**: 25
- **Node.js**: Latest LTS
- **Docker**: For running PostgreSQL
- **Maven**: For backend builds

---

## Getting Started

### 1. Database
Start the PostgreSQL instance using Docker:
```bash
cd backend
docker-compose up -d
```

### 2. Backend
Run the Spring Boot application:
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Frontend
Install dependencies and start the dev server:
```bash
cd frontend
pnpm install
pnpm dev
```

---

## Common Tasks

### API Client Generation
If the backend API changes, regenerate the frontend client:
1. Ensure the backend is running and `http://localhost:8080/v3/api-docs` is accessible.
2. Run the generation script:
```bash
cd frontend
npm run openapi:generate
```

### Testing
- **Backend**: `./mvnw test`
- **Frontend**: `npm run lint`

---

## Contribution Guidelines
- **Commits**: Use conventional commits (e.g., `feat:`, `fix:`, `chore:`).
- **Code Style**: 
    - Frontend follows ESLint configuration.
    - Backend uses Lombok and standard Java naming conventions.
- **DTOs**: Never return JPA Entities directly in Controllers. Use MapStruct to map them to Response DTOs.
