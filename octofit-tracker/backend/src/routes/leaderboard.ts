import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

// GET /api/leaderboard/user/:userId - Get user ranking (must be before /:timeframe)
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const ranking = await Leaderboard.findOne({
      userId: userId as string,
      timeframe: 'all-time',
    }).populate('userId', 'name email avatar');
    if (!ranking) {
      return res.status(404).json({
        message: `User ${userId} not found in leaderboard`,
        status: 'error',
      });
    }
    res.json({
      message: `Get ranking for user ${userId}`,
      data: ranking,
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user ranking',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/leaderboard/ - Get global leaderboard (all-time by default)
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find({ timeframe: 'all-time' })
      .populate('userId', 'name email avatar')
      .sort({ points: -1 });
    res.json({
      message: 'Get global leaderboard',
      data: leaderboard,
      status: 'ok',
      count: leaderboard.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/leaderboard/:timeframe - Get leaderboard by timeframe (week, month, all-time)
router.get('/:timeframe', async (req: Request, res: Response) => {
  try {
    const timeframe = req.params.timeframe as string;
    if (!['week', 'month', 'all-time'].includes(timeframe)) {
      return res.status(400).json({
        message: 'Invalid timeframe. Use: week, month, or all-time',
        status: 'error',
      });
    }
    const leaderboard = await Leaderboard.find({ timeframe: timeframe })
      .populate('userId', 'name email avatar')
      .sort({ points: -1 });
    res.json({
      message: `Get leaderboard for ${timeframe}`,
      data: leaderboard,
      status: 'ok',
      count: leaderboard.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

export default router;
