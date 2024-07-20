const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should get user profile', async () => {
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'john@example.com');
  });

  it('should update user settings', async () => {
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    const token = loginRes.body.token;

    const res = await request(app)
      .put('/api/users/settings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        theme: 'dark',
        currency: 'EUR',
        notifications: true,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.settings).toMatchObject({
      theme: 'dark',
      currency: 'EUR',
      notifications: true,
    });
  });
});

