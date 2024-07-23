const request = require('supertest');
const app = require('../app'); // Import your app
const Expense = require('../models/Expense');
const User = require('../models/User');

describe('Expense API', () => {
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
  });

  it('should add a new expense', async () => {
    const response = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Food',
        amount: 100,
        tag: 'Groceries',
        notes: 'Test expense',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should not add an expense with missing fields ', async () => {
    const response = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        category: 'Food',
        amount: 100,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("\"date\" is required")
  });

  it('should get all expenses', async () => {
    await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Food',
        amount: 100,
        tag: 'Groceries',
        notes: 'Test expense',
      });

    const response = await request(app)
      .get('/api/expense')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('should update an expense', async () => {
    const addResponse = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Food',
        amount: 100,
        tag: 'Groceries',
        notes: 'Test expense',
      });

    const expenseId = addResponse.body._id;

    const response = await request(app)
      .put(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Utilities',
        amount: 200,
        tag: 'Electricity',
        notes: 'Updated expense',
      });

    expect(response.status).toBe(200);
    expect(response.body.category).toBe('Utilities');
  });


  it('should not update an expense with invalid data', async () => {
    const addResponse = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Food',
        amount: 100,
        tag: 'Groceries',
        notes: 'Test expense',
      });

    const expenseId = addResponse.body._id;

    const response = await request(app)
      .put(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: 'invalid date',
        category: '',
        amount: -100,
        tag: '',
        notes: 'Updated expense',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid data');
  });


  it('should delete an expense', async () => {
    const addResponse = await request(app)
      .post('/api/expense')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        date: new Date(),
        category: 'Food',
        amount: 100,
        tag: 'Groceries',
        notes: 'Test expense',
      });

    const expenseId = addResponse.body._id;

    const response = await request(app)
      .delete(`/api/expense/${expenseId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Expense removed');
  });
});

