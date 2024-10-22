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
