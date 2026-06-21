import { Router, Request, Response } from 'express';
import Activity from '../models/Activity';

const router = Router();

// GET /api/activities/ - Get all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'name email')
      .sort({ timestamp: -1 });
    res.json({
      message: 'Get all activities',
      data: activities,
      status: 'ok',
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activities',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({
        message: `Activity ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get activity ${id}`,
      data: activity,
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching activity',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// POST /api/activities/ - Log new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    await activity.populate('userId', 'name email');
    res.status(201).json({
      message: 'Activity logged',
      data: activity,
      status: 'created',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating activity',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// PUT /api/activities/:id - Update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({
        message: `Activity ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Activity ${id} updated`,
      data: activity,
      status: 'ok',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating activity',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({
        message: `Activity ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Activity ${id} deleted`,
      status: 'deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting activity',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

export default router;
