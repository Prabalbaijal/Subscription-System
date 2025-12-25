import { useEffect, useState } from "react";
import { api } from "../api";
import Card from "../components/Card";
import Table from "../components/Table";
import toast from "react-hot-toast";

export default function Plans({ refreshKey }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const t = toast.loading("Loading plans...");
    api.get("/plans")
      .then(res => setPlans(res.data))
      .finally(() => toast.dismiss(t));
  }, [refreshKey]); 

  return (
    <Card title="Plans">
      <Table
        headers={["Name", "Price", "Duration", "Remaining"]}
        rows={plans.map(p => [
          p.name,
          `₹${p.price}`,
          `${p.duration_days} days`,
          p.subscriptions_left
        ])}
      />
    </Card>
  );
}
