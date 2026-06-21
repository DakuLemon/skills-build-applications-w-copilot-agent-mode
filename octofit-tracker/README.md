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

## Next Steps

1. Create API models and routes
2. Implement authentication
3. Build frontend components
4. Add database schemas
5. Deploy to production

