const request = require('./setup');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User API', () => {
  let userToken;

  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    // No need to close connection here as it's handled in setup.js
  });

  test('should register a new user', async () => {
    const response = await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('token');
  });

  test('should not register a user with existing email', async () => {
    await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const response = await request.post('/api/users/register').send({
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  test('should login a registered user', async () => {
    await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const response = await request.post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    userToken = response.body.token;
  });

  test('should get the user profile', async () => {
    await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request.get('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('john@example.com');
  });

  test('should update the user profile', async () => {
    await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request.put('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'John Smith',
        email: 'johnsmith@example.com',
        password: 'newpassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('John Smith');
    expect(response.body.email).toBe('johnsmith@example.com');
  });

  test('should update the user settings', async () => {
    await request.post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request.post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request.put('/api/users/settings')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        theme: 'dark',
        currency: 'EUR',
        notifications: true,
      });

    expect(response.status).toBe(200);
    expect(response.body.settings.theme).toBe('dark');
    expect(response.body.settings.currency).toBe('EUR');
    expect(response.body.settings.notifications).toBe(true);
  });
});

