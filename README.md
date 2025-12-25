# Subscription Management System (Stripe-like)

## Overview

This project implements a simplified **Subscription Management System**, inspired by Stripe, that allows customers to subscribe to **limited-capacity plans**.
The system focuses on **correctness, concurrency safety, and clean design**, rather than UI polish or premature optimization.

It supports:
- Customers
- Subscription plans with limited capacity
- Subscription lifecycle (purchase, cancellation)
- Admin and customer dashboards
- Transaction-safe APIs

---

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- Raw SQL with `pg` connection pooling

### Frontend
- React + Vite
- Tailwind CSS v4 (CSS-first)
- react-hot-toast for notifications

---

## Core Entities

### Customer
- id
- name
- email
- status
- created_at

### Plan
- id
- name
- description
- price
- duration_days
- total_capacity
- subscriptions_left
- status
- created_at
- updated_at

### Subscription
- id
- customer_id
- plan_id
- status (active, cancelled, expired)
- start_date
- end_date
- created_at
- updated_at

---

## Database Design & Constraints

### Preventing Duplicate Subscriptions

A customer can have only one active subscription per plan.

```sql
CREATE UNIQUE INDEX unique_active_subscription
ON subscriptions(customer_id, plan_id)
WHERE status = 'active';
```

Both database-level constraints and application-level checks are used to handle race conditions.

---

## Subscription Purchase Flow

1. Lock plan row using SELECT ... FOR UPDATE
2. Validate available capacity
3. Check existing active subscription
4. Decrement capacity
5. Create subscription
6. Commit transaction

This guarantees atomicity and prevents overbooking.

---

## Idempotency

The purchase API supports idempotency keys to safely handle retries and duplicate requests.
Idempotency logging is treated as a non-critical side effect and never blocks a successful purchase.

---

## Cancellation Flow

Cancellation is also transaction-safe:
1. Lock subscription row
2. Mark subscription as cancelled
3. Restore plan capacity
4. Commit transaction

Cancelled subscriptions are treated as historical records.

---

## API Endpoints

### Get Active Plans
GET /api/plans

### Purchase Subscription
POST /api/subscriptions/purchase

### Cancel Subscription
POST /api/subscriptions/:id/cancel

### Customers & Subscriptions
GET /api/customers  
GET /api/customers/:id

---

## Frontend Dashboard

### Admin Dashboard
- View plans
- Monitor remaining capacity

### Customer View
- View customers
- View active and past subscriptions
- Cancel subscriptions

The UI is intentionally minimal, dark-themed, and focused on data correctness.

---

## Concurrency Handling

- PostgreSQL row-level locking
- Atomic transactions
- Safe under concurrent purchase requests

---

## Failure Scenarios Considered

- Payment success but subscription failure
- Network retries
- Duplicate requests

Handled via idempotency and transactional guarantees.

---

## Authentication & Security (Conceptual)

Authentication is not implemented as per assignment scope.

In production:
- JWT-based authentication
- RBAC for admin APIs
- Rate limiting
- Secure secrets management

---

## Scalability & Future Improvements

- Redis caching for plans
- Background reconciliation jobs
- Event-driven architecture
- Horizontal API scaling
- Read replicas

---

## Setup Instructions

### Backend
npm install  
npm run dev

### Frontend
npm install  
npm run dev

---

## Assumptions & Limitations

- No real payment gateway
- Single-region deployment
- No authentication implemented

---

## What I Would Improve With More Time

- Upgrade/Downgrade flows
- Background workers
- Admin role management
- Automated testing

---

## Summary

This system prioritizes correctness, consistency, and clean architecture, closely mirroring real-world billing platforms while remaining focused and maintainable.
