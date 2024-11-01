import { Tickets } from '@/models/tickets.model';
import {
  currentUser,
  requireAuth,
  validateRequest,
} from '@ad-tickets/commonlib';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/api/tickets/',
  requireAuth,
  currentUser,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Invalid price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    try {
      const newTicket = Tickets.build({
        title,
        price,
        userId: req.currentUser!.id,
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
