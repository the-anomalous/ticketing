import { Router } from 'express';

const router = Router();

router.get('/api/tickets/', (req, res) => {
  res.status(201).send('tickets');
});

router.post('/api/tickets/', (req, res) => {
  res.status(201).send({});
});

export { router as createTicketRouter };
