import { useState } from "react";
import Container from "./layout/Container";
import Plans from "./pages/Plans";
import Customers from "./pages/Customers";
import Purchase from "./pages/Purchase";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <Container>
      <h1 className="text-3xl font-bold mb-6">
        Subscription Dashboard
      </h1>

      <Plans refreshKey={refreshKey} />

      <Customers
        onDataChange={() => setRefreshKey(k => k + 1)}
      />

      <Purchase
        onSuccess={() => setRefreshKey(k => k + 1)}
      />
    </Container>
  );
}
