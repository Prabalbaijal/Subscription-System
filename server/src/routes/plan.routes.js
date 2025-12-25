import express from "express";
import { listPlans } from "../controllers/plan.controller.js";

const router = express.Router();

router.get("/", listPlans);

export default router;
