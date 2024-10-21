import { Tickets } from '@/models/tickets.model';
import { NotFoundError, requireAuth } from '@ad-tickets/commonlib';
import { Router } from 'express';

const router = Router();

router.put('/api/tickets/:id', requireAuth, async (req, res) => {
  console.log(req.params.id);

  const ticket = await Tickets.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.send('OK');
});

export { router as updateTicketsRouter };
