import express from "express";
import planRoutes from "./routes/plan.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import customerRoutes from "./routes/customer.routes.js"

const app = express();

app.use(express.json());

app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/customers", customerRoutes);


app.use(errorHandler);

export default app;
