import { pool } from "../config/db.js";

export const idempotency = async (req, res, next) => {
  const key = req.headers["idempotency-key"];
  if (!key) return next();

  const { rows } = await pool.query(
    "SELECT response FROM idempotency_keys WHERE key=$1",
    [key]
  );

  if (rows.length) {
    return res.json(rows[0].response);
  }

  res.locals.idempotencyKey = key;
  next();
};
