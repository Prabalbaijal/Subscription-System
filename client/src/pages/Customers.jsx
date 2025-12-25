import { useEffect, useState } from "react";
import { api } from "../api";
import Card from "../components/Card";
import SubscriptionTable from "../components/SubscriptionTable";
import toast from "react-hot-toast";

export default function Customers({ onDataChange }) {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  // Load customers list ONCE
  useEffect(() => {
    const t = toast.loading("Loading customers...");
    api.get("/customers")
      .then(res => setCustomers(res.data))
      .finally(() => toast.dismiss(t));
  }, []);

  const loadDetails = (id) => {
    const t = toast.loading("Loading subscriptions...");
    api.get(`/customers/${id}`)
      .then(res => setSelected(res.data))
      .finally(() => toast.dismiss(t));
  };

  const refreshSelectedCustomer = () => {
    if (!selected) return;

    api.get(`/customers/${selected.customer.id}`)
      .then(res => setSelected(res.data));
  };

  return (
    <Card title="Customers">
      <ul className="space-y-2">
        {customers.map(c => (
          <li
            key={c.id}
            className="cursor-pointer hover:text-[var(--accent)]"
            onClick={() => loadDetails(c.id)}
          >
            {c.name} ({c.email})
          </li>
        ))}
      </ul>

      {selected && (
        <>
          <h4 className="text-lg font-semibold mt-6">
            Subscriptions
          </h4>

          <SubscriptionTable
            subs={selected.subscriptions}
            onCancelSuccess={() => {
              refreshSelectedCustomer();
              onDataChange();           
            }}
          />
        </>
      )}
    </Card>
  );
}
