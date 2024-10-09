import request from 'supertest';

import app from '@/app';

it('checks route handler visiting api/tickets for post req', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is logged in', () => {});

it('returns error ig title is invalid', () => {});

it('returns error ig price is invalid', () => {});

it('creates ticket with valid inputs', () => {});
