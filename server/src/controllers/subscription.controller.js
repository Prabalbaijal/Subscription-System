import { purchaseSubscription } from "../services/subscription.service.js";

import { pool } from "../config/db.js";

export const purchase = async (req, res, next) => {
  try {
    const result = await purchaseSubscription(req.body);

    if (res.locals.idempotencyKey) {
      await pool.query(
        "INSERT INTO idempotency_keys(key, response) VALUES($1,$2)",
        [res.locals.idempotencyKey, result]
      );
    }

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

import { cancelSubscription } from "../services/subscription.service.js";

export const cancel = async (req, res, next) => {
  try {
    const result = await cancelSubscription(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

