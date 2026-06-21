import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './database';

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

// Codespaces support - build API URL with Codespace name if available
const getApiUrl = (): string => {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return `http://localhost:${PORT}`;
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectDatabase();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    apiUrl: getApiUrl()
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
    message: `Route ${req.path} not found`
  });
});

// Server startup
app.listen(PORT, () => {
  const apiUrl = getApiUrl();
  console.log(`✓ Server running at ${apiUrl}`);
  console.log(`✓ MongoDB connection: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'}`);
  console.log(`✓ Available routes:`);
  console.log(`  - GET /api/health`);
  console.log(`  - GET/POST /api/users`);
  console.log(`  - GET/POST /api/teams`);
  console.log(`  - GET/POST /api/activities`);
  console.log(`  - GET /api/leaderboard`);
  console.log(`  - GET/POST /api/workouts`);
});
