import request from 'supertest';

import app from '@/app';
import { signin } from '@/test/authHelper';
import { Tickets } from '@/models/tickets.model';

it('checks if api/tickets exists for post req', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('returns 401, user not signed in', async () => {
  const response = await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns 201, user signed in', async () => {
  const respnse = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({});

  expect(respnse.status).not.toEqual(401);
});

it('returns error if title is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: 10,
    })
    .expect(422);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      price: 10,
    })
    .expect(422);
});

it('returns error if price is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
      price: -10,
    })
    .expect(422);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({
      title: '',
    })
    .expect(422);
});

it('creates ticket with valid inputs', async () => {
  let tickets = await Tickets.find({});
  expect(tickets.length).toEqual(0);
  const title = 'ticket';
  const price = 32;

  await request(app)
    .post('/api/tickets/')
    .set('Cookie', signin())
    .send({ title, price })
    .expect(201);

  tickets = await Tickets.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});
