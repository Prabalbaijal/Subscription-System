CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  duration_days INT NOT NULL,
  total_capacity INT NOT NULL,
  subscriptions_left INT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  plan_id UUID REFERENCES plans(id),
  status TEXT NOT NULL,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

--  Prevent duplicate active subscriptions
CREATE UNIQUE INDEX unique_active_subscription
ON subscriptions(customer_id, plan_id)
WHERE status = 'active';

CREATE TABLE idempotency_keys (
  key TEXT PRIMARY KEY,
  response JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT,
  entity_id UUID,
  action TEXT,
  old_value JSONB,
  new_value JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
