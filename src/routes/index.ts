import { Router } from 'express';
import { validateProductPurchase } from '../controller';

const routes: Router = Router();

routes.post('/iap/validate-purchase', (req, res) => {
  validateProductPurchase(req, res);
});

export default routes;
