import { pool } from "../config/db.js";

export const getActivePlans = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM plans WHERE status='active'"
  );
  return rows;
};
