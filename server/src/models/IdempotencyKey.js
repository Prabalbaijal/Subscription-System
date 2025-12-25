import { pool } from "../config/db.js";

export const saveIdempotencyResponse = async (key, response) => {
  await pool.query(
    `INSERT INTO idempotency_keys (key, response)
     VALUES ($1,$2)
     ON CONFLICT (key) DO NOTHING`,
    [key, response]
  );
};
