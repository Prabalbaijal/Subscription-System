import express from "express";
import {
  listCustomers,
  customerDetails
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", listCustomers);
router.get("/:id", customerDetails);

export default router;
