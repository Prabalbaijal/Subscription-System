import {
  getAllCustomers,
  getCustomerById
} from "../models/Customer.js";
import {
  getSubscriptionsByCustomer
} from "../models/Subscription.js";

export const listCustomers = async (req, res, next) => {
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

export const customerDetails = async (req, res, next) => {
  try {
    const customer = await getCustomerById(req.params.id);
    const subs = await getSubscriptionsByCustomer(req.params.id);

    res.json({
      customer,
      subscriptions: subs
    });
  } catch (err) {
    next(err);
  }
};
