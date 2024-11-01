import request from 'supertest';
import app from '@/app';
import { signin } from '@/test/authHelper';
import mongoose from 'mongoose';

it('returns 404; ticket does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', signin())
    .send({
      title: 'ticket',
      price: 20,
    })
    .expect(404);
});

it('returns 401; not logged in', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'ticket',
      price: 20,
    })
    .expect(401);
});

it('returns 401; if user does not own the ticket', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post('/api/tickets/')
    .set('Cookie', signin())
    .send({
      title: 'ticket',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin())
    .send({
      title: 'ticket',
      price: 20,
    })
    .expect(401);
});

it('returns 422; price and title is invalid', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const cookie = signin();

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(422);

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: 'ticket',
      price: -10,
    })
    .expect(422);
});

it('returns 200, updated ticket', async () => {
  const cookie = signin();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'ticket',
      price: 10,
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'ticket100',
      price: 100,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(ticketResponse.body.title).toEqual('ticket100');
  expect(ticketResponse.body.price).toEqual(100);
});
