// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./tests/testcontainers-setup.js'],
  testEnvironment: 'node',
  testTimeout: 8000,
};
