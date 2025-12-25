import { pool } from "../config/db.js";

export const getSubscriptionsByCustomer = async (customerId) => {
  const { rows } = await pool.query(
    `SELECT s.*, p.name AS plan_name
     FROM subscriptions s
     JOIN plans p ON s.plan_id = p.id
     WHERE s.customer_id=$1
     ORDER BY s.created_at DESC`,
    [customerId]
  );
  return rows;
};

export const cancelSubscription = async (subscriptionId) => {
  const { rows } = await pool.query(
    `UPDATE subscriptions
     SET status='cancelled', updated_at=NOW()
     WHERE id=$1
     RETURNING *`,
    [subscriptionId]
  );
  return rows[0];
};
