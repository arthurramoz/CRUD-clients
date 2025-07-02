import { pool } from '../config/db';
import { CreditCard } from '../models/CreditCard';

export class CreditCardDAO {
  async findByCustomerId(customerId: number): Promise<CreditCard[]> {
    const res = await pool.query(
      'SELECT * FROM credit_cards WHERE customer_id = $1',
      [customerId],
    );
    return res.rows.map(
      row =>
        new CreditCard(
          row.id,
          row.number,
          row.cardholder,
          row.cvv,
          row.expiration_date,
          row.card_brand,
          row.preferential,
          row.customer_id,
        ),
    );
  }

  async create(card: CreditCard): Promise<void> {
    await pool.query(
      `INSERT INTO credit_cards (number, cardholder, cvv, expiration_date, card_brand, preferential, customer_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        card.number,
        card.cardholder,
        card.cvv,
        card.expirationDate,
        card.cardBrand,
        card.preferential,
        card.customerId,
      ],
    );
  }

  async deleteByCustomerId(customerId: number): Promise<void> {
    await pool.query('DELETE FROM credit_cards WHERE customer_id = $1', [
      customerId,
    ]);
  }

  async deleteById(id: number): Promise<void> {
    await pool.query(`DELETE FROM credit_cards WHERE id = $1`, [id]);
  }
}
