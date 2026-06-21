import { Router, Request, Response } from 'express';
import Team from '../models/Team';

const router = Router();

// GET /api/teams/ - Get all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'name email')
      .populate('members', 'name email');
    res.json({
      message: 'Get all teams',
      data: teams,
      status: 'ok',
      count: teams.length,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching teams',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id)
      .populate('leader', 'name email')
      .populate('members', 'name email');
    if (!team) {
      return res.status(404).json({
        message: `Team ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Get team ${id}`,
      data: team,
      status: 'ok',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching team',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// POST /api/teams/ - Create new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    await team.populate('leader', 'name email');
    await team.populate('members', 'name email');
    res.status(201).json({
      message: 'Team created',
      data: team,
      status: 'created',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating team',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// PUT /api/teams/:id - Update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('leader', 'name email')
      .populate('members', 'name email');
    if (!team) {
      return res.status(404).json({
        message: `Team ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Team ${id} updated`,
      data: team,
      status: 'ok',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating team',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({
        message: `Team ${id} not found`,
        status: 'error',
      });
    }
    res.json({
      message: `Team ${id} deleted`,
      status: 'deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting team',
      error: (error as Error).message,
      status: 'error',
    });
  }
});

export default router;
