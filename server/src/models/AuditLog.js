import { pool } from "../config/db.js";

export const logAudit = async ({
  entity_type,
  entity_id,
  action,
  old_value,
  new_value
}) => {
  await pool.query(
    `INSERT INTO audit_logs
     (entity_type, entity_id, action, old_value, new_value)
     VALUES ($1,$2,$3,$4,$5)`,
    [entity_type, entity_id, action, old_value, new_value]
  );
};
    