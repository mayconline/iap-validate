import 'dotenv/config';
import { env } from './services';
import express from 'express';
import routes from './routes';
import path from 'node:path';

import swaggerDocument from '../doc/openapi.json';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = env.PORT || 3000;

// Serve swagger-ui static assets
app.use(
  '/api/docs/swagger-ui',
  express.static(path.join(__dirname, '../node_modules/swagger-ui-dist'), {
    index: false,
  })
);

// Setup Swagger UI
const swaggerOptions = {
  customCssUrl: '/api/docs/swagger-ui/swagger-ui.css',
  customJs: '/api/docs/swagger-ui/swagger-ui-bundle.js',
  customfavIcon: '/api/docs/swagger-ui/favicon-32x32.png',
};

app.use(express.json());
app.use(routes);
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

app.listen(port, () => {
  console.log('Server is running');
});

export default app;
