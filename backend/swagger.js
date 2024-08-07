const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpenseMate API',
      version: '1.0.0',
      description: 'API documentation for ExpenseMate',
    },
    servers: [
      {
        url: 'https://expensematebackend.onrender.com/api',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./swaggerDocs/*.yaml'], // Path to the API docs
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};

