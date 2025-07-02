import { Router } from 'express';
import { AddressDAO } from '../dao/AddressDAO';
import { CreditCardDAO } from '../dao/CreditCardDAO';

const router = Router();
const addressDAO = new AddressDAO();
const cardDAO = new CreditCardDAO();

router.delete('/addresses/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await addressDAO.deleteById(id);
  res.json({ message: 'Endereço deletado com sucesso' });
});

router.delete('/cards/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await cardDAO.deleteById(id);
  res.json({ message: 'Cartão deletado com sucesso' });
});

export default router;
