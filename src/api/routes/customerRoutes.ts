import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();
const controller = new CustomerController();

router.get('/customers', async (req, res) => {
  const q = String(req.query.q ?? '').trim();

  if (q.length > 0) {
    return await controller.search(req, res);
  }

  return await controller.getAll(req, res);
});

router.get('/customers/:id', (req, res) => {
  controller.getById(req, res);
});
router.post('/customers', (req, res) => controller.create(req, res));
router.put('/customers/:id', controller.update.bind(controller));
router.delete('/customers/:id', controller.delete.bind(controller));
router.patch('/customers/:id/status', (req, res) =>
  controller.toggleStatus(req, res),
);
router.put('/customers/:id/password', (req, res, next) => {
  controller
    .updatePassword(req, res)
    .then(() => {})
    .catch(next);
});

export default router;
