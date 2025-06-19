import 'dotenv/config';
import { env, setupSwagger } from './services';
import express from 'express';
import routes from './routes';

const app = express();
const port = env.PORT || 3000;

app.use(express.json());
app.use(routes);

setupSwagger(app);

app.listen(port, () => {
  console.log('Server is running');
});

export default app;
