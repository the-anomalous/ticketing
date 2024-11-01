import request from 'supertest';
import app from '@/app';
import { signin } from '@/test/authHelper';

const createTicket = () => {
  const title = 'ticket';
  const price = 40;

  return request(app)
    .post('/api/tickets')
    .set('Cookie', signin())
    .send({ title, price });
};

it('returns 200, if all tickets return', async () => {
  const n = 3;
  for (let i = 0; i < n; i++) {
    await createTicket();
  }

  const response = await request(app).get(`/api/tickets/`).send().expect(200);

  expect(response.body.length).toEqual(n);
});
