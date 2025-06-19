import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../doc/openapi.json';
import type { Express } from 'express';

const swaggerOptions = {
  customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; } .swagger-ui.topbar { display: none; } .swagger-ui .topbar { display: none; }',
};

export const setupSwagger = (app: Express) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOptions)
  );
};
