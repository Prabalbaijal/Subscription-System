import express from "express";
import planRoutes from "./routes/plan.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import customerRoutes from "./routes/customer.routes.js"
import cors from "cors"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/customers", customerRoutes);


app.use(errorHandler);

export default app;
