import { Tickets } from '@/models/tickets.model';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@ad-tickets/commonlib';
import { Router } from 'express';

const router = Router();

router.put('/api/tickets/:id', requireAuth, async (req, res) => {
  const ticket = await Tickets.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }
  console.log(ticket.userId === req.params.id);
  if (ticket.userId !== req.params.id) {
    throw new NotAuthorizedError();
  }

  res.send('OK');
});

export { router as updateTicketsRouter };
