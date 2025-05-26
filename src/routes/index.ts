import { Router, type Request, type Response } from 'express';
import { validateProductPurchase } from '../controller';

const routes: Router = Router();

routes.post('/iap/validate-purchase', (req: Request, res: Response) => {
  validateProductPurchase(req, res);
});

export default routes;
