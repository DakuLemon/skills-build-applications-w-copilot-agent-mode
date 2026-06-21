import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/activities/ - Get all activities
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all activities',
    data: [],
    status: 'ok'
  });
});

// GET /api/activities/:id - Get activity by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get activity ${id}`,
    data: { id },
    status: 'ok'
  });
});

// POST /api/activities/ - Log new activity
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'Activity logged',
    data: req.body,
    status: 'created'
  });
});

// PUT /api/activities/:id - Update activity
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Activity ${id} updated`,
    data: { id, ...req.body },
    status: 'ok'
  });
});

// DELETE /api/activities/:id - Delete activity
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({
    message: `Activity ${id} deleted`,
    status: 'deleted'
  });
});

export default router;
