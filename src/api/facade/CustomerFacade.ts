import { Customer } from '../models/Customer';
import { CustomerDAO } from '../dao/CustomerDAO';
import { SaveCustomerStrategy } from '../strategy/CustomerStrategy';
import { Phone } from '../models/Phone';
import { Address } from '../models/Addresses';
import { CreditCard } from '../models/CreditCard';
import { PhoneDAO } from '../dao/PhoneDAO';
import { AddressDAO } from '../dao/AddressDAO';
import { CreditCardDAO } from '../dao/CreditCardDAO';

export class CustomerFacade {
  private customerDAO = new CustomerDAO();
  private phoneDAO = new PhoneDAO();
  private addressDAO = new AddressDAO();
  private creditCardDAO = new CreditCardDAO();
  private strategy = new SaveCustomerStrategy();

  async getAll(): Promise<Customer[]> {
    return this.customerDAO.findAll();
  }

  async getById(id: number): Promise<any> {
    const customer = await this.customerDAO.findById(id);
    if (!customer) return null;
    const phone = await this.phoneDAO.findByCustomerId(id);
    const addresses = await this.addressDAO.findByCustomerId(id);
    const cards = await this.creditCardDAO.findByCustomerId(id);
    return {
      ...customer,
      phone,
      addresses,
      cards,
    };
  }

  async delete(id: number): Promise<void> {
    await this.phoneDAO.deleteByCustomerId(id);
    await this.addressDAO.deleteByCustomerId(id);
    await this.creditCardDAO.deleteByCustomerId(id);
    await this.customerDAO.delete(id);
  }

  async update(
    id: number,
    customer: Customer,
    phone: Phone,
    addresses: Address[],
    cards: CreditCard[],
  ): Promise<void> {
    await this.customerDAO.update(id, customer);
    await this.phoneDAO.deleteByCustomerId(id);
    await this.phoneDAO.create(phone);
    await this.addressDAO.deleteByCustomerId(id);
    for (const addr of addresses) {
      await this.addressDAO.create(addr);
    }
    for (const cas of cards) {
      await this.creditCardDAO.create(cas);
    }
  }

  async saveFull(
    customer: Customer,
    phone: Phone,
    addresses: Address[],
    cards: CreditCard[],
  ): Promise<void> {
    await this.strategy.execute(customer);
    const customerId = await this.customerDAO.create(customer);

    phone.customerId = customerId;
    await this.phoneDAO.create(phone);

    for (const addr of addresses) {
      addr.customerId = customerId;
      await this.addressDAO.create(addr);
    }
    for (const cas of cards) {
      cas.customerId = customerId;
      await this.creditCardDAO.create(cas);
    }
  }
}
