import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@ad-tickets/commonlib';

import { createTicketRouter } from '@/routes/tickets.route';

const app = express();

app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.Node_ENV !== 'test',
  })
);
app.use(json());

app.use(createTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
