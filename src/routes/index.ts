import {
  type NextFunction,
  Router,
  type Request,
  type Response,
} from 'express';
import { validateProductPurchase } from '../controller';
import { validateToken } from '../middleware';

import swaggerDocument from '../../doc/openapi.json';
import swaggerUi from 'swagger-ui-express';

const routes: Router = Router();
routes.post(
  '/api/validate-purchase',
  (req: Request, res: Response, next: NextFunction) => {
    validateToken(req, res, next);
  },
  (req: Request, res: Response) => {
    validateProductPurchase(req, res);
  }
);

routes.get('/api/health', (_, res: Response) => {
  res.status(200).json({
    message: 'API is running',
    documentation: 'https://github.com/mayconline/iap-validate',
  });
});

routes.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default routes;
