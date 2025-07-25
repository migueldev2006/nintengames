// src/swagger/swaggerSpec.js

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Mi API NINTENGAMES',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/swagger/docs/**/*.js'], // Tus archivos de documentación
};

export const swaggerSpec = swaggerJSDoc(options);
