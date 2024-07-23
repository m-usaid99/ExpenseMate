const request = require('supertest');
const app = require('../app');
const Budget = require('../models/Budget');
const User = require('../models/User');

describe('Budget API', () => {
  let userToken;
  let budgetId;

  beforeEach(async () => {
    await Budget.deleteMany({});
    await User.deleteMany({});

    const userResponse = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    userToken = loginResponse.body.token;
  });

  it('should retrieve a user token', async () => {
    expect(userToken).toBeDefined();
  });

  it('should add a new budget', async () => {
    const response = await request(app)
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Monthly Budget',
        totalAmount: 2000,
        categories: [{ category: 'Groceries', amount: 500 }],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

    budgetId = response.body._id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get all budgets', async () => {
    await request(app)
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Monthly Budget',
        totalAmount: 2000,
        categories: [{ category: 'Groceries', amount: 500 }],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    const response = await request(app).get('/api/budget').set('Authorization', `Bearer ${userToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should update a budget', async () => {
    const addResponse = await request(app)
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Monthly Budget',
        totalAmount: 2000,
        categories: [{ category: 'Groceries', amount: 500 }],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

    budgetId = addResponse.body._id;

    const response = await request(app)
      .put(`/api/budget/${budgetId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Updated Budget',
        totalAmount: 2500,
        categories: [{ category: 'Groceries', amount: 700 }],
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Budget');
  });

  it('should delete a budget', async () => {
    const addResponse = await request(app)
      .post('/api/budget')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Monthly Budget',
        totalAmount: 2000,
        categories: [{ category: 'Groceries', amount: 500 }],
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

    budgetId = addResponse.body._id;

    const response = await request(app)
      .delete(`/api/budget/${budgetId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Budget removed');

  });
}); 
