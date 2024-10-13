import request from 'supertest';

import app from '@/app';

it('checks if api/tickets exists for post req', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('returns 401, user not signed in', () => {});

it('returns error ig title is invalid', () => {});

it('returns error ig price is invalid', () => {});

it('creates ticket with valid inputs', () => {});
