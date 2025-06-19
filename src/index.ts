import 'dotenv/config';
import { env } from './services';
import express from 'express';
import routes from './routes';

import swaggerDocument from '../doc/openapi.json';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(routes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log('Server is running');
});

export default app;
