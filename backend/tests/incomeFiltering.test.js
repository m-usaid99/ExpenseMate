const request = require('supertest');
const app = require('../app');
const Income = require('../models/Income');
const User = require('../models/User');

describe('Income API - Filtering', () => {
  let userToken;

  beforeEach(async () => {
    await Income.deleteMany({});
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
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date('2023-01-01'),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'January salary',
      });

    await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date('2023-02-01'),
        category: 'Bonus',
        amount: 2000,
        tag: 'One-time',
        notes: 'February bonus',
      });
  });

  it('should filter incomes by category', async () => {
    const response = await request(app)
      .get('/api/income?category=Salary')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].category).toBe('Salary');
  });

  it('should filter incomes by date range', async () => {
    const response = await request(app)
      .get('/api/income?startDate=2023-01-01&endDate=2023-01-31')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].notes).toBe('January salary');
  });

  it('should filter incomes by amount range', async () => {
    const response = await request(app)
      .get('/api/income?minAmount=3000')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].amount).toBe(5000);
  });
});

