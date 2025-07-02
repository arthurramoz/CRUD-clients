import { pool } from '../config/db';
import { Address } from '../models/Addresses';

export class AddressDAO {
  async create(address: Address): Promise<void> {
    await pool.query(
      `INSERT INTO addresses (nickname, street, number, neighborhood, cep, complement, address_type, street_type, residence_type, city, state, country, customer_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
      [
        address.nickname,
        address.street,
        address.number,
        address.neighborhood,
        address.cep,
        address.complement,
        address.addressType,
        address.streetType,
        address.residenceType,
        address.city,
        address.state,
        address.country,
        address.customerId,
      ],
    );
  }

  async findByCustomerId(customerId: number): Promise<Address[]> {
    const res = await pool.query(
      'SELECT * FROM addresses WHERE customer_id = $1',
      [customerId],
    );
    return res.rows.map(
      row =>
        new Address(
          row.id,
          row.nickname,
          row.street,
          row.number,
          row.neighborhood,
          row.cep,
          row.complement,
          row.address_type,
          row.street_type,
          row.residence_type,
          row.city,
          row.state,
          row.country,
          row.customer_id,
        ),
    );
  }

  async deleteByCustomerId(customerId: number): Promise<void> {
    await pool.query('DELETE FROM addresses WHERE customer_id = $1', [
      customerId,
    ]);
  }
}
