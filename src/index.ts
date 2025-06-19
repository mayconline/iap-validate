import 'dotenv/config';
import { env } from './services';
import express from 'express';
import routes from './routes';

import swaggerDocument from '../doc/openapi.json';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = env.PORT || 3000;

// Setup Swagger UI with CDN
const swaggerOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.19.1/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.19.1/swagger-ui-bundle.min.js',
  ],
  customfavIcon: 'https://swagger.io/favicon.ico',
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
