import { Tickets } from '@/models/tickets.model';
import { Router } from 'express';

const router = Router();

router.get('/api/tickets/', async (req, res) => {
  const tickets = await Tickets.find({});
  console.log(tickets);

  return res.send(tickets);
});

export { router as indexTicketsRouter };
