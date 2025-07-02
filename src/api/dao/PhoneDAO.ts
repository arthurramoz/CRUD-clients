import { pool } from '../config/db';
import { Phone } from '../models/Phone';

export class PhoneDAO {
  async create(phone: Phone): Promise<void> {
    await pool.query(
      `INSERT INTO phones (ddd, number, phone_type, customer_id) VALUES ($1, $2, $3, $4)`,
      [phone.ddd, phone.number, phone.phoneType, phone.customerId],
    );
  }

  async findByCustomerId(customerId: number): Promise<Phone | null> {
    const res = await pool.query(
      'SELECT * FROM phones WHERE customer_id = $1',
      [customerId],
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Phone(
      row.id,
      row.ddd,
      row.number,
      row.phone_type,
      row.customer_id,
    );
  }

  async deleteByCustomerId(customerId: number): Promise<void> {
    await pool.query('DELETE FROM phones WHERE customer_id = $1', [customerId]);
  }
}
