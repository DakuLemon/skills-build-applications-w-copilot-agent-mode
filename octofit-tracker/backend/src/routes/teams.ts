import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/teams/ - Get all teams
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all teams',
    data: [],
    status: 'ok'
  });
});

// GET /api/teams/:id - Get team by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get team ${id}`,
    data: { id },
    status: 'ok'
  });
});

// POST /api/teams/ - Create new team
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Team created',
    data: req.body,
    status: 'created'
  });
});

// PUT /api/teams/:id - Update team
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Team ${id} updated`,
    data: { id, ...req.body },
    status: 'ok'
  });
});

// DELETE /api/teams/:id - Delete team
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({
    message: `Team ${id} deleted`,
    status: 'deleted'
  });
});

export default router;
