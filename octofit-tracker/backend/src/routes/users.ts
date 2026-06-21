import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/users/ - Get all users
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Get all users',
    data: [],
    status: 'ok'
  });
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `Get user ${id}`,
    data: { id },
    status: 'ok'
  });
});

// POST /api/users/ - Create new user
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({
    message: 'User created',
    data: req.body,
    status: 'created'
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User ${id} updated`,
    data: { id, ...req.body },
    status: 'ok'
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(204).json({
    message: `User ${id} deleted`,
    status: 'deleted'
  });
});

export default router;
