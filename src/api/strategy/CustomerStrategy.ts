import { Customer } from '../models/Customer';

export interface CustomerStrategy {
  execute(customer: Customer): Promise<void>;
}

export class SaveCustomerStrategy implements CustomerStrategy {
  async execute(customer: Customer): Promise<void> {
    console.log('Strategy: saving customer', customer);
  }
}
