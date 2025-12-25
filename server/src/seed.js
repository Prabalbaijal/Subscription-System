import { pool } from "./config/db.js";

const seed = async () => {
  await pool.query(`
    INSERT INTO customers (name,email)
    VALUES
    ('Rahul Sharma','rahul@test.com'),
    ('Ankit Verma','ankit@test.com')
  `);

  await pool.query(`
    INSERT INTO plans
    (name,description,price,duration_days,total_capacity,subscriptions_left)
    VALUES
    ('Basic','Basic monthly plan',99,30,5,5),
    ('Pro','Pro monthly plan',199,30,2,2)
  `);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
