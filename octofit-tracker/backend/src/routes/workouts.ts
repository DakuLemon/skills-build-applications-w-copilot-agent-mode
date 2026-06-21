import { Router, Request, Response } from 'express';
import Workout from '../models/Workout';

const router = Router();

// GET /api/workouts/ - Get suggested workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      message: 'Get suggested workouts',
      data: workouts,
      status: 'ok',
      count: workouts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workouts',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id).populate('createdBy', 'name email');
    if (!workout) {
      return res.status(404).json({
        message: `Workout ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get workout ${id}`,
      data: workout,
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching workout',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/workouts/user/:userId - Get user's personalized workouts
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ createdBy: userId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({
      message: `Get personalized workouts for user ${userId}`,
      data: workouts,
      status: 'ok',
      count: workouts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user workouts',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// POST /api/workouts/ - Create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    await workout.populate('createdBy', 'name email');
    res.status(201).json({
      message: 'Workout created',
      data: workout,
      status: 'created',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating workout',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'name email');
    if (!workout) {
      return res.status(404).json({
        message: `Workout ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Workout ${id} updated`,
      data: workout,
      status: 'ok',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating workout',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({
        message: `Workout ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Workout ${id} deleted`,
      status: 'deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting workout',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

export default router;
