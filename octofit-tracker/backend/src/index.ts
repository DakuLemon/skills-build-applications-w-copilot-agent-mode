import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';

// Import routes
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Build API base URL — Codespaces-aware
const codespaceName = process.env.CODESPACE_NAME;
const BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// CORS — allow both localhost and Codespaces origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  ...(codespaceName
    ? [`https://${codespaceName}-5173.app.github.dev`]
    : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectDatabase();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl: BASE_URL,
    codespaces: !!codespaceName,
  });
});

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.path} not found`,
  });
});

// Server startup
app.listen(PORT, () => {
  console.log(`✓ Server running at ${BASE_URL}`);
  console.log(`✓ Codespaces: ${codespaceName ? `yes (${codespaceName})` : 'no (localhost)'}`);
  console.log(`✓ MongoDB: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'}`);
  console.log(`✓ Routes: /api/health | /api/users | /api/teams | /api/activities | /api/leaderboard | /api/workouts`);
});
