# OctoFit Tracker - Multi-Tier Application

A modern fitness tracking application built with React 19, Express.js, TypeScript, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
│   └── src/
├── backend/           # Node.js + Express + TypeScript API
│   └── src/
└── README.md
```

## Technology Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Port**: 5173

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Mongoose
- **Port**: 8000

### Database
- **MongoDB**: Running on port 27017 (local default)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm
- MongoDB (running locally or via Docker)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:5173

### Backend Setup

```bash
cd backend
npm install
npm run build
npm run dev
```

Backend API will be available at: http://localhost:8000

### MongoDB Setup

If you don't have MongoDB running, you can start it with Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Or configure the `MONGODB_URI` in `backend/.env` to point to your MongoDB instance.

## Configuration

### Backend Environment Variables

Create `backend/.env` file (or copy from `.env.example`):

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables

Create `frontend/.env` file (or copy from `.env.example`):

```
VITE_API_URL=http://localhost:8000/api
```

## API Documentation

### Health Check

```
GET /api/health
```

Returns: `{ status: 'ok', message: 'OctoFit Tracker API is running' }`

## Development Commands

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend

```bash
npm run dev      # Start development server with ts-node
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

## Port Configuration

- **Frontend**: 5173
- **Backend API**: 8000
- **MongoDB**: 27017

## API Documentation

Comprehensive API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) with:

- All endpoint references
- Request/response examples
- Error handling
- Frontend integration examples
- Codespaces support details

### Available Endpoints

- **Users**: `/api/users` - User management
- **Teams**: `/api/teams` - Team creation and management
- **Activities**: `/api/activities` - Activity logging and tracking
- **Leaderboard**: `/api/leaderboard` - Competitive leaderboard with timeframes
- **Workouts**: `/api/workouts` - Personalized workout suggestions

### Frontend Integration

Use the API configuration utility in your React components:

```javascript
import { api } from './api/config';

// Get all users
const url = api.users.list();

// Get user leaderboard rank
const rankUrl = api.leaderboard.userRank('user-id');

// Get personalized workouts
const workoutsUrl = api.workouts.personalized('user-id');
```

See [frontend/src/api/examples.js](./frontend/src/api/examples.js) for detailed usage examples.

## Codespaces Support

The API automatically detects and supports GitHub Codespaces environments:

- **Local**: `http://localhost:8000/api`
- **Codespaces**: `https://{CODESPACE_NAME}-8000.app.github.dev/api`

The frontend API configuration automatically handles URL routing based on environment.

## Next Steps

1. Create API models and database schemas
2. Implement authentication and authorization
3. Build React components for each feature
4. Add comprehensive error handling
5. Implement data validation
6. Add unit and integration tests
7. Deploy to production

