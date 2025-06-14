import {
  type NextFunction,
  Router,
  type Request,
  type Response,
} from 'express';
import { validateProductPurchase } from '../controller';
import { validateToken } from '../middleware';

const routes: Router = Router();

routes.post(
  '/iap/validate-purchase',
  (req: Request, res: Response, next: NextFunction) => {
    validateToken(req, res, next);
  },
  (req: Request, res: Response) => {
    validateProductPurchase(req, res);
  }
);

routes.get('/api', (_, res: Response) => {
  res
    .status(200)
    .json({
      message: 'API is running',
      documentation: 'https://github.com/mayconline/iap-validate',
    });
});

export default routes;
