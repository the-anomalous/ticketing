import request from 'supertest';
import app from '@/app';
import { signin } from '@/test/authHelper';
import mongoose, { Types } from 'mongoose';

it('returns 404, if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).expect(404);
});

it('returns 201, if ticket found', async () => {
  const title = 'ticket';
  const price = 40;

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price });

  const showTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .expect(200);

  expect(showTicketResponse.body.title).toEqual(title);
  expect(showTicketResponse.body.price).toEqual(price);
});
