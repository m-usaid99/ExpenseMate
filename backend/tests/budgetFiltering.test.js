const request = require('supertest');
const app = require('../app');
const Budget = require('../models/Budget');
const User = require('../models/User');

describe('Budget API - Filtering', () => {
  let userToken;

  beforeEach(async () => {
    await Budget.deleteMany({});
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
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Monthly Budget',
        totalAmount: 1000,
        categories: [{ category: 'Food', amount: 300 }],
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-31'),
      });

    await request(app)
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Yearly Budget',
        totalAmount: 12000,
        categories: [{ category: 'Rent', amount: 6000 }],
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
      });
  });

  it('should filter budgets by name', async () => {
    const response = await request(app)
      .get('/api/budget?name=Monthly Budget')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Monthly Budget');
  });

  it('should filter budgets by date range', async () => {
    const response = await request(app)
      .get('/api/budget?startDate=2023-01-01&endDate=2023-01-31')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe('Monthly Budget');
  });

  it('should filter budgets by category', async () => {
    const response = await request(app)
      .get('/api/budget?category=Rent')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].categories[0].category).toBe('Rent');
  });
});

