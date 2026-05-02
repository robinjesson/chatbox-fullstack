# Data Models: Backend

## Schema Overview
The database is PostgreSQL, managed via Spring Data JPA.

---

## User (`users` table)
Represents a user in the system.

| Field | Type | Description |
| :--- | :--- | :--- |
| `uid` | `VARCHAR(20)` | **Primary Key**. Unique identifier (username). |
| `password` | `VARCHAR(100)` | Bcrypt hashed password. |
| `lastConnection` | `TIMESTAMP` | Last login time. |
| `lastPasswordModification` | `TIMESTAMP` | Last time password was changed. |

## Conversation (`conversation` table)
Represents a chat room or DM.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `BIGINT` | **Primary Key**. Generated Identity. |

### Participants (`conversations_participants` join table)
Manages the many-to-many relationship between users and conversations.

- `fk_conversation_id`: Reference to `conversation.id`
- `fk_participant_id`: Reference to `users.uid`

## Message (`message` table)
Represents an individual message.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `BIGINT` | **Primary Key**. Generated Identity. |
| `text` | `VARCHAR` | The content of the message. |
| `fk_conversation_id` | `BIGINT` | Foreign key to `conversation.id`. |
| `fk_user_id` | `VARCHAR(20)` | Foreign key to `users.uid` (Sender). |
