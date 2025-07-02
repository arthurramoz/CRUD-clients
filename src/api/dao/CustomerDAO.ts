import { pool } from '../config/db';
import { Customer } from '../models/Customer';

export class CustomerDAO {
  async findAll(): Promise<Customer[]> {
    const res = await pool.query('SELECT * FROM customers');
    return res.rows.map(
      row =>
        new Customer(
          row.id,
          row.codigo,
          row.name,
          row.birth_date,
          row.cpf,
          row.gender,
          row.email,
          row.password,
          row.status,
          row.ranking,
          row.created_at,
        ),
    );
  }

  async findById(id: number): Promise<Customer | null> {
    const res = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return new Customer(
      row.id,
      row.codigo,
      row.name,
      row.birth_date,
      row.cpf,
      row.gender,
      row.email,
      row.password,
      row.status,
      row.ranking,
      row.created_at,
    );
  }

  async create(customer: Customer): Promise<number> {
    const res = await pool.query(
      `INSERT INTO customers (codigo, name, birth_date, cpf, gender, email, password, status, ranking)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [
        customer.codigo,
        customer.name,
        customer.birth_date,
        customer.cpf,
        customer.gender,
        customer.email,
        customer.password,
        customer.status,
        customer.ranking,
      ],
    );
    return res.rows[0].id;
  }

  async update(id: number, customer: Customer): Promise<void> {
    await pool.query(
      `UPDATE customers SET name=$1, birth_date=$2, cpf=$3, gender=$4, email=$5, password=$6, status=$7, ranking=$8 WHERE id=$9`,
      [
        customer.name,
        customer.birth_date,
        customer.cpf,
        customer.gender,
        customer.email,
        customer.password,
        customer.status,
        customer.ranking,
        id,
      ],
    );
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
  }
}
