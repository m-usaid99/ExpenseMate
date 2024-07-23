const request = require('supertest');
const app = require('../app');
const Income = require('../models/Income');
const User = require('../models/User');

describe('Income API', () => {
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
  });

  // Basic test to verify user token retrieval
  it('should retrieve a user token', async () => {
    expect(userToken).toBeDefined();
  });

  it('should add a new income', async () => {
    const response = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'Test income',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should not add an income with missing fields', async () => {
    const response = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        category: 'Salary',
        amount: 5000,
      });


    expect(response.status).toBe(400);
    expect(response.body.message).toBe("\"date\" is required");
  });

  it('should get all incomes', async () => {
    const addResponse = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'Test income',
      });

    const response = await request(app)
      .get('/api/income')
      .set('Authorization', `Bearer ${userToken}`);


    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should update an income', async () => {
    const addResponse = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'Test income',
      });


    const incomeId = addResponse.body._id;

    const response = await request(app)
      .put(`/api/income/${incomeId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Freelance',
        amount: 6000,
        tag: 'Monthly',
        notes: 'Updated income',
      });


    expect(response.status).toBe(200);
    expect(response.body.category).toBe('Freelance');
  });

  it('should not update an income with invalid data', async () => {
    const addResponse = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'Test income',
      });


    const incomeId = addResponse.body._id;

    const response = await request(app)
      .put(`/api/income/${incomeId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: 'invalid date',
        category: '',
        amount: -5000,
        tag: '',
        notes: 'Updated income',
      });


    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid data');
  });

  it('should delete an income', async () => {
    const addResponse = await request(app)
      .post('/api/income')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Salary',
        amount: 5000,
        tag: 'Monthly',
        notes: 'Test income',
      });


    const incomeId = addResponse.body._id;

    const response = await request(app)
      .delete(`/api/income/${incomeId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Income removed');
  });
});

