import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { NotFoundError, errorHandler } from '@ad-tickets/commonlib';

import { createTicketRouter } from '@/routes/new.route';

const app = express();

app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.Node_ENV !== 'test',
  })
);
app.use(express.json());

app.use(createTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
