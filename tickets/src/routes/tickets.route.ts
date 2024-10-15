import { requireAuth, validateRequest } from '@ad-tickets/commonlib';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.get('/api/tickets/', (req, res) => {
  res.status(201).send('tickets');
});

router.post(
  '/api/tickets/',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid price'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(201).send({});
  }
);

export { router as createTicketRouter };
