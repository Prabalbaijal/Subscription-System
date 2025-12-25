import { pool } from "../config/db.js";

export const createCustomer = async ({ name, email }) => {
  const { rows } = await pool.query(
    `INSERT INTO customers (name, email)
     VALUES ($1, $2)
     RETURNING *`,
    [name, email]
  );
  return rows[0];
};

export const getAllCustomers = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM customers ORDER BY created_at DESC"
  );
  return rows;
};

export const getCustomerById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM customers WHERE id=$1",
    [id]
  );
  return rows[0];
};
