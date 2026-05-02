# Project Overview: chatbox-fullstack

A full-stack chat application built with modern web technologies, featuring real-time messaging and secure authentication.

---

## Executive Summary

This project is a real-time chat platform consisting of a React frontend and a Spring Boot backend. It leverages Server-Sent Events (SSE) for instant message delivery and Spring Security with JWT (stored in HTTP-only cookies) for secure user sessions.

## Technology Stack

### Frontend (web)
- **Framework**: React 19.2.4 (Vite 8.0.4)
- **Language**: TypeScript 6.0.2
- **State Management**: TanStack React Query 5.99.0
- **UI/Styling**: TailwindCSS 4.2.2 + DaisyUI 5.5.19
- **API Client**: OpenAPI Generated (typescript-fetch)
- **Real-time**: EventSource (SSE)

### Backend (backend)
- **Framework**: Spring Boot 4.0.5
- **Language**: Java 25
- **Database**: PostgreSQL 42.7.10
- **Security**: Spring Security + JJWT 0.13.0
- **Mapping**: MapStruct 1.6.3 + Lombok
- **API Documentation**: SpringDoc OpenAPI 2.8.5

## Repository Structure

The project uses a **multi-part** architecture:

- `frontend/`: React application.
- `backend/`: Spring Boot REST API.

---

## Documentation Index

- [Architecture - Frontend](./architecture-frontend.md)
- [Architecture - Backend](./architecture-backend.md)
- [Integration Architecture](./integration-architecture.md)
- [API Contracts - Backend](./api-contracts-backend.md)
- [Data Models - Backend](./data-models-backend.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Development Guide](./development-guide.md)
