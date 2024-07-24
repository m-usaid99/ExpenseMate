const request = require('supertest');
const app = require('../app');
const Expense = require('../models/Expense');
const User = require('../models/User');

describe('Expense API - Filtering', () => {
  let userToken;

  beforeEach(async () => {
    await Expense.deleteMany({});
    await User.deleteMany({});

    const userResponse = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date('2023-01-01'),
        category: 'Food',
        amount: 100,
        tag: 'One-time',
        notes: 'January expense',
      });

    await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date('2023-02-01'),
        category: 'Utilities',
        amount: 200,
        tag: 'Recurring',
        notes: 'February expense',
      });
  });

  it('should filter expenses by category', async () => {
    const response = await request(app)
      .get('/api/expense?category=Food')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].category).toBe('Food');
  });

  it('should filter expenses by date range', async () => {
    const response = await request(app)
      .get('/api/expense?startDate=2023-01-01&endDate=2023-01-31')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].notes).toBe('January expense');
  });

  it('should filter expenses by amount range', async () => {
    const response = await request(app)
      .get('/api/expense?minAmount=150')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].amount).toBe(200);
  });

  it('should filter expenses by tag', async () => {
    const response = await request(app)
      .get('/api/expense?tag=Recurring')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].tag).toBe('Recurring');
  });
});

