import { useEffect, useState } from "react";
import { api } from "../api";
import Card from "../components/Card";
import Button from "../components/Button";
import toast from "react-hot-toast";

export default function Purchase({onSuccess}) {
  const [customers, setCustomers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [customer, setCustomer] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
  const t = toast.loading("Preparing purchase form...");
  Promise.all([
    api.get("/customers"),
    api.get("/plans")
  ])
    .then(([c, p]) => {
      setCustomers(c.data);
      setPlans(p.data);
    })
    .finally(() => toast.dismiss(t));
}, []);


  const submit = async () => {
    if (!customer || !plan) {
      toast.error("Select customer and plan");
      return;
    }

    const toastId = toast.loading("Processing subscription...");

    try {
      const res=await api.post(
        "/subscriptions/purchase",
        { customer_id: customer, plan_id: plan },
        { headers: { "Idempotency-Key": Date.now().toString() } }
      );  
      console.log(res)
      toast.success("Subscription purchased", { id: toastId });
      onSuccess(); //  REFETCH PLANS

    } catch (err) {
      toast.error(err.response?.data?.error || "Purchase failed", {
        id: toastId
      });
    }
  };

  return (
    <Card title="Purchase Subscription">
      <div className="flex gap-4 items-center">
        <select
          className="bg-[var(--bg)] border border-[var(--border)] rounded px-3 py-2"
          onChange={e => setCustomer(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className="bg-[var(--bg)] border border-[var(--border)] rounded px-3 py-2"
          onChange={e => setPlan(e.target.value)}
        >
          <option value="">Select Plan</option>
          {plans.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <Button onClick={submit}>Purchase</Button>
      </div>
    </Card>
  );
}
