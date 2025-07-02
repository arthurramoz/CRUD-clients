import { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { Phone } from '../models/Phone';
import { Address } from '../models/Addresses';
import { CustomerFacade } from '../facade/CustomerFacade';
import { CreditCard } from '../models/CreditCard';
import bcrypt from 'bcryptjs';

const facade = new CustomerFacade();

export class CustomerController {
  async getAll(req: Request, res: Response) {
    const customers = await facade.getAll();
    const sanitized = customers.map(c => ({ ...c, password: undefined }));
    res.json(sanitized);
  }

  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = await facade.getById(id);
    if (!data) return res.status(404).json({ error: 'Cliente não encontrado' });

    const sanitized = { ...data, password: undefined };
    res.json(sanitized);
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await facade.delete(id);
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  }

  async toggleStatus(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    await facade.toggleStatus(id, status);
    res.status(200).json({ message: 'Status atualizado com sucesso' });
  }

  async search(req: Request, res: Response) {
    const q = String(req.query.q ?? '')
      .trim()
      .toLowerCase();

    console.log('SEARCH Q:', q);

    const all = await facade.getAll();

    const filtered = all.filter(c => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.cpf.includes(q) ||
        c.codigo?.toLowerCase().includes(q)
      );
    });

    res.json(filtered.map(c => ({ ...c, password: undefined })));
  }

  async updatePassword(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    const existing = await facade.getById(id);
    if (!existing)
      return res.status(404).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(currentPassword, existing.password);
    if (!match) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await facade.updatePassword(id, hashed);

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = new Customer(
      id,
      data.codigo,
      data.name,
      new Date(data.birth_date),
      data.cpf,
      data.gender,
      data.email,
      hashedPassword,
      data.status ?? true,
      data.ranking ?? 0,
      new Date(),
    );

    const cards = (data.cards || []).map(
      (card: any) =>
        new CreditCard(
          0,
          card.number,
          card.cardholder,
          card.cvv,
          card.expirationDate,
          card.cardBrand,
          card.preferential ?? false,
          id,
        ),
    );

    const phone = new Phone(
      0,
      data.phone.ddd,
      data.phone.number,
      data.phone.phoneType,
      id,
    );

    const addresses = (data.addresses || []).map(
      (addr: any) =>
        new Address(
          0,
          addr.nickname,
          addr.street,
          addr.number,
          addr.neighborhood,
          addr.cep,
          addr.complement || '',
          addr.addressType,
          addr.streetType,
          addr.residenceType,
          addr.city,
          addr.state,
          addr.country,
          id,
        ),
    );

    await facade.update(id, customer, phone, addresses, cards);
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const customer = new Customer(
      0,
      data.codigo,
      data.name,
      new Date(data.birth_date),
      data.cpf,
      data.gender,
      data.email,
      hashedPassword,
      data.status ?? true,
      data.ranking ?? 0,
      new Date(),
    );

    const cards = (data.cards || []).map(
      (card: any) =>
        new CreditCard(
          0,
          card.number,
          card.cardholder,
          card.cvv,
          card.expirationDate,
          card.cardBrand,
          card.preferential ?? false,
          0,
        ),
    );

    const phone = new Phone(
      0,
      data.phone.ddd,
      data.phone.number,
      data.phone.phoneType,
      0,
    );

    const addresses = (data.addresses || []).map(
      (addr: any) =>
        new Address(
          0,
          addr.nickname,
          addr.street,
          addr.number,
          addr.neighborhood,
          addr.cep,
          addr.complement || '',
          addr.addressType,
          addr.streetType,
          addr.residenceType,
          addr.city,
          addr.state,
          addr.country,
          0,
        ),
    );

    await facade.saveFull(customer, phone, addresses, cards);
    res.status(201).json({ message: 'Cliente criado com sucesso' });
  }
}
