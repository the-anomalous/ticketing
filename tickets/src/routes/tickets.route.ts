import { Tickets } from '@/models/tickets.model';
import { requireAuth, validateRequest } from '@ad-tickets/commonlib';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/api/tickets/',
  requireAuth,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    console.log(req.currentUser);

    try {
      const newTicket = Tickets.build({
        title,
        price,
        userId: 'asdf',
      });
      await newTicket.save();
      return res.status(201).send(newTicket);
    } catch (err) {
      console.log(err);
    }
    return res.status(201).send({});
  }
);

export { router as createTicketRouter };
