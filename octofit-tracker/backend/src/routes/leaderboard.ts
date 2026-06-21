import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/leaderboard/ - Get global leaderboard
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get global leaderboard',
    data: [],
    status: 'ok'
  });
});

// GET /api/leaderboard/teams - Get team leaderboard
router.get('/teams', (req: Request, res: Response) => {
  res.json({
    message: 'Get team leaderboard',
    data: [],
    status: 'ok'
  });
});

// GET /api/leaderboard/:timeframe - Get leaderboard by timeframe (week, month, all-time)
router.get('/:timeframe', (req: Request, res: Response) => {
  const { timeframe } = req.params;
  res.json({
    message: `Get leaderboard for ${timeframe}`,
    data: [],
    status: 'ok'
  });
});

// GET /api/leaderboard/user/:userId - Get user ranking
router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  res.json({
    message: `Get ranking for user ${userId}`,
    data: { userId, rank: 0 },
    status: 'ok'
  });
});

export default router;
