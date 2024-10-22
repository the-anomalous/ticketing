import { Tickets } from '@/models/tickets.model';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@ad-tickets/commonlib';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('price is invalid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Tickets.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.params.id) {
      throw new NotAuthorizedError();
    }

    res.send('OK');
  }
);

export { router as updateTicketsRouter };
