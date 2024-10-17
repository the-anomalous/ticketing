import { Tickets } from '@/models/tickets.model';
import { NotFoundError } from '@ad-tickets/commonlib';
import { Router } from 'express';

const router = Router();

router.get('/api/tickets/:id', async (req, res) => {
  const ticket = await Tickets.findById(req.params.id);

  if (!ticket) throw new NotFoundError();

  res.send(ticket);
});

export { router as showTicketRouter };
