import { pool } from "../config/db.js";

export const purchaseSubscription = async ({ customer_id, plan_id }) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock plan row
    const planRes = await client.query(
      "SELECT * FROM plans WHERE id=$1 FOR UPDATE",
      [plan_id]
    );

    if (!planRes.rows.length)
      throw new Error("Plan not found");

    const plan = planRes.rows[0];

    if (plan.subscriptions_left <= 0)
      throw new Error("Plan capacity exhausted");

    // Check existing active subscription
    const subCheck = await client.query(
      `SELECT 1 FROM subscriptions
      WHERE customer_id=$1
     AND plan_id=$2
     AND status='active'`,
      [customer_id, plan_id]
    );


    if (subCheck.rows.length)
      throw new Error("Already subscribed");

    // Decrement capacity
    await client.query(
      `UPDATE plans
       SET subscriptions_left = subscriptions_left - 1
       WHERE id=$1`,
      [plan_id]
    );

    const start = new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + plan.duration_days);

    const subRes = await client.query(
      `INSERT INTO subscriptions
       (customer_id, plan_id, status, start_date, end_date)
       VALUES ($1,$2,'active',$3,$4)
       RETURNING *`,
      [customer_id, plan_id, start, end]
    );

    await client.query("COMMIT");

    return subRes.rows[0];

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const cancelSubscription = async (subscriptionId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock subscription
    const subRes = await client.query(
      `SELECT * FROM subscriptions
       WHERE id=$1 AND status='active'
       FOR UPDATE`,
      [subscriptionId]
    );

    if (!subRes.rows.length)
      throw new Error("Active subscription not found");

    const subscription = subRes.rows[0];

    // Cancel subscription
    await client.query(
      `UPDATE subscriptions
       SET status='cancelled', updated_at=NOW()
       WHERE id=$1`,
      [subscriptionId]
    );

    // Rollback plan capacity
    await client.query(
      `UPDATE plans
       SET subscriptions_left = subscriptions_left + 1
       WHERE id=$1`,
      [subscription.plan_id]
    );

    await client.query("COMMIT");

    return { message: "Subscription cancelled successfully" };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
