import request from 'supertest';
import app from '@/app';
import { signin } from '@/test/authHelper';

it('returns 404, if ticket not found', async () => {
  await request(app).get('/api/tickets/asdaaasd').expect(404);
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
    .expect(201);

  expect(showTicketResponse.body.title).toEqual(title);
  expect(showTicketResponse.body.price).toEqual(price);
});
