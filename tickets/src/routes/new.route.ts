import app from 'express';

const router = app.Router();

router.get('/api/tickets/', (req, res) => {
  res.status(201).send({});
});

export { router as createTicketRouter };
