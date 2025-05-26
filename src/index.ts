import 'dotenv/config';
import { env } from './services';
import express from 'express';
import routes from './routes';

const app = express();
const port = env.PORT;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('Server is running');
});

module.exports = app;
