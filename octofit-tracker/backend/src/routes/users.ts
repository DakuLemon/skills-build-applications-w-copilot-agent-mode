import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

// GET /api/users/ - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      data: users,
      status: 'ok',
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({
        message: `User ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get user ${id}`,
      data: user,
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching user',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// POST /api/users/ - Create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: 'User created',
      data: user,
      status: 'created',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password');
    if (!user) {
      return res.status(404).json({
        message: `User ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `User ${id} updated`,
      data: user,
      status: 'ok',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating user',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        message: `User ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `User ${id} deleted`,
      status: 'deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

export default router;
