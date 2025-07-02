import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();
const controller = new CustomerController();

router.get('/customers', (req, res) => controller.getAll(req, res));
router.get('/customers/:id', (req, res) => {
  controller.getById(req, res);
});
router.post('/customers', (req, res) => controller.create(req, res));
router.put('/customers/:id', controller.update.bind(controller));
router.delete('/customers/:id', controller.delete.bind(controller));

export default router;
