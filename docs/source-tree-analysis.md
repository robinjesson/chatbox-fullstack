# Source Tree Analysis

## Overall Structure
```
chatbox-fullstack/
├── frontend/        # React 19 / TypeScript 6 / Vite 8
└── backend/         # Spring Boot 4 / Java 25 / Maven
```

---

## Frontend Details (`frontend/`)
```
frontend/
├── src/
│   ├── api/         # Generated API client (via openapi-generator)
│   ├── components/  # React components organized by feature
│   │   ├── chatbox/
│   │   ├── ConversationList/
│   │   ├── login/
│   │   └── menu/
│   ├── hooks/       # Custom React hooks (e.g., useUser)
│   ├── App.tsx      # Application root and state provider
│   └── main.tsx     # Entry point
├── package.json     # Node dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

## Backend Details (`backend/`)
```
backend/
├── src/main/java/fr/robinjesson/chatbox/
│   ├── adapter/     # Adapters for DTO/Entity conversion and logic orchestration
│   ├── api/         # REST Controllers and Request/Response DTOs
│   ├── business/    # Core business services
│   ├── entities/    # JPA Entity models (PostgreSQL)
│   ├── mappers/     # MapStruct mapper interfaces
│   ├── repository/  # Spring Data JPA repositories
│   ├── security/    # Security config and JWT logic
│   └── ChatboxBackendApplication.java # Entry point
├── pom.xml          # Maven configuration and dependencies
└── docker-compose.yml # Infrastructure (PostgreSQL)
```
