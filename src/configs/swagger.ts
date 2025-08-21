import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Personas',
      version: '1.0.0',
      description: 'Documentación de la API de Personas usando Swagger',
    },
  },
  apis: ['./src/routers/docs/*.ts'], // ajusta la ruta según donde estén tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
