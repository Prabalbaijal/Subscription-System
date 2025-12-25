import express from "express";
import { purchase,cancel } from "../controllers/subscription.controller.js";
import { idempotency } from "../middlewares/idempotency.middleware.js";

const router = express.Router();

router.post("/purchase", idempotency, purchase);
router.post("/:id/cancel", cancel);

export default router;
