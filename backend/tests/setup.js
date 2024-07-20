const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

dotenv.config({ path: './.env.test' });

jest.setTimeout(30000);

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
});

module.exports = request;


