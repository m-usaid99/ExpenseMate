const request = require('supertest');
const app = require('../app'); // assuming your Express app is exported from app.js
const User = require('../models/User');

describe('User API', () => {
  let userToken;
  let resetToken;

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('token');
  });

  it('should not register a user with existing email', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/users/register').send({
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should login a registered user', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    userToken = response.body.token;
  });

  it('should get the user profile', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request(app).get('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should update the user profile', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request(app).put('/api/users/profile')
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

  it('should update the user settings', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request(app).put('/api/users/settings')
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

  it('should delete the user profile', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/users/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    userToken = loginResponse.body.token;

    const response = await request(app).delete('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User removed');
  });

  it('should request password reset', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    const response = await request(app).post('/api/users/request-reset').send({
      email: 'john@example.com',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('resetToken');
    resetToken = response.body.resetToken;
  });

  it('should reset password', async () => {
    await request(app).post('/api/users/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const requestResetResponse = await request(app).post('/api/users/request-reset').send({
      email: 'john@example.com',
    });

    resetToken = requestResetResponse.body.resetToken;
    const response = await request(app).put(`/api/users/reset-password/${resetToken}`).send({
      password: 'newpassword123',
    })
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Password has been reset');
  });

  it('should not reset password with invalid or expired token', async () => {
    const response = await request(app).put('/api/users/reset-password/invalidtoken').send({
      password: 'newpassword123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid or expired token');
  });

  it('should not request password reset for non-existent user', async () => {
    const response = await request(app).post('/api/users/request-reset').send({
      email: 'nonexistent@example.com',
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});

