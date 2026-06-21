# OctoFit Tracker - API Documentation

## Overview

The OctoFit Tracker backend provides a comprehensive REST API for managing users, teams, activities, leaderboards, and workouts. The API is built with Express.js and TypeScript, with full support for GitHub Codespaces environments.

## Base URL

- **Local Development**: `http://localhost:8000/api`
- **GitHub Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev/api`

## Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "OctoFit Tracker API is running",
  "apiUrl": "http://localhost:8000"
}
```

---

## Users Endpoints

### Get All Users
```
GET /api/users
```

### Get User by ID
```
GET /api/users/:id
```

### Create User
```
POST /api/users
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### Update User
```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "string",
  "email": "string"
}
```

### Delete User
```
DELETE /api/users/:id
```

---

## Teams Endpoints

### Get All Teams
```
GET /api/teams
```

### Get Team by ID
```
GET /api/teams/:id
```

### Create Team
```
POST /api/teams
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "members": ["user_id"]
}
```

### Update Team
```
PUT /api/teams/:id
Content-Type: application/json

{
  "name": "string",
  "description": "string"
}
```

### Delete Team
```
DELETE /api/teams/:id
```

---

## Activities Endpoints

### Get All Activities
```
GET /api/activities
```

### Get Activity by ID
```
GET /api/activities/:id
```

### Log Activity
```
POST /api/activities
Content-Type: application/json

{
  "userId": "string",
  "type": "string",
  "distance": "number",
  "duration": "number",
  "calories": "number",
  "timestamp": "ISO8601"
}
```

### Update Activity
```
PUT /api/activities/:id
Content-Type: application/json

{
  "distance": "number",
  "duration": "number"
}
```

### Delete Activity
```
DELETE /api/activities/:id
```

---

## Leaderboard Endpoints

### Get Global Leaderboard
```
GET /api/leaderboard
```

### Get Team Leaderboard
```
GET /api/leaderboard/teams
```

### Get Leaderboard by Timeframe
```
GET /api/leaderboard/:timeframe
```

**Timeframes:** `week`, `month`, `all-time`

### Get User Ranking
```
GET /api/leaderboard/user/:userId
```

**Response:**
```json
{
  "message": "Get ranking for user {userId}",
  "data": {
    "userId": "string",
    "rank": "number"
  },
  "status": "ok"
}
```

---

## Workouts Endpoints

### Get Suggested Workouts
```
GET /api/workouts
```

### Get Workout by ID
```
GET /api/workouts/:id
```

### Get Personalized Workouts
```
GET /api/workouts/user/:userId
```

### Create Workout
```
POST /api/workouts
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "exercises": [],
  "difficulty": "string"
}
```

### Update Workout
```
PUT /api/workouts/:id
Content-Type: application/json

{
  "title": "string",
  "description": "string"
}
```

### Delete Workout
```
DELETE /api/workouts/:id
```

---

## Frontend Integration

Use the provided API configuration utility in your React components:

```javascript
import { api, getApiUrl } from './api/config';

// Example: Get all users
const usersUrl = api.users.list();
const response = await fetch(usersUrl);
const data = await response.json();

// Example: Get user by ID
const userUrl = api.users.detail('user-123');

// Example: Get leaderboard
const leaderboardUrl = api.leaderboard.global();

// Example: Get personalized workouts
const workoutsUrl = api.workouts.personalized('user-123');
```

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200` - Success
- `201` - Created
- `204` - No Content (Delete)
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

Error response format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

---

## Codespaces Support

The API automatically detects when running in GitHub Codespaces and generates the appropriate URLs using the `CODESPACE_NAME` environment variable.

**Frontend setup for Codespaces:**
```javascript
// The config.js utility automatically handles this
const apiUrl = getApiUrl(); // Returns Codespaces URL when available
```

---

## Development

### Start Backend Server
```bash
cd backend
npm run dev
```

### Build TypeScript
```bash
cd backend
npm run build
```

### Run Production Build
```bash
cd backend
npm start
```

---

## Testing Endpoints

Use tools like:
- **cURL**: `curl http://localhost:8000/api/health`
- **Postman**: Import the endpoints above
- **VS Code REST Client**: Create `.http` files with requests

Example `.http` file:
```http
GET http://localhost:8000/api/health

###
GET http://localhost:8000/api/users

###
POST http://localhost:8000/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

