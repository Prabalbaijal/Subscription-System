import { getActivePlans } from "../models/Plan.js";

export const listPlans = async (req, res, next) => {
  try {
    const plans = await getActivePlans();
    res.json(plans);
  } catch (err) {
    next(err);
  }
};
