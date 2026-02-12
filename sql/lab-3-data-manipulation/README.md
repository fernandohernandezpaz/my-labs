# 🗃️ Lab 3: Advanced Data Manipulation (DML)
As a Database Engineer, data is messy. Your job isn't just to query it; you must clean, migrate, and maintain it efficiently.

This lab tests your ability to perform complex data operations using raw SQL.

---

## 1. Environment Setup
You have a set of "Messy" tables:
-   `users`: The source of truth.
-   `orders`: Contains valid orders, but also "Orphan" orders (user_id=99 does not exist).
-   `archived_orders`: The destination for old data.
-   `user_stats`: A summary table that needs to be kept in sync.

### Start the Database
```bash
docker compose up -d
```

### Run the Setup Script
```bash
docker exec -i exercise-db-1 psql -U user -d manipulation_lab < setup.sql
```

---

## 2. Your Challenges

### Challenge A: The Safe Migration (`INSERT INTO ... SELECT`)
You need to move old data to the archive to keep the main table fast.
**Task**: Copy all `completed` orders from 2023 into the `archived_orders` table.
**Constraints**:
1.  Only include orders where the `user_id` actually exists in the `users` table (No orphans!).
2.  Use a single SQL statement.

### Challenge B: The Conditional Bulk Update (`UPDATE ... CASE`)
Management wants to flag high-value pending orders for manual review.
**Task**: Update the `orders` table.
-   If `amount > 1000` AND `status = 'pending'`, set `status` to `'review'`.
-   If `amount < 50` AND `status = 'failed'`, set `notes` to `'Auto-Retry logic applied'`.
**Constraint**: Do this in a single `UPDATE` statement using `CASE` logic (or standard WHERE clauses if you prefer, but `CASE` is more powerful).

### Challenge C: The UPSERT (`INSERT ... ON CONFLICT`)
You want to keep the `user_stats` table up to date without checking if a row exists first.
**Task**: Insert a new statistic for **User 3 (Charlie)**:
-   `total_spent` = 500.00
-   `last_order_date` = NOW()
**Logic**:
-   If User 3 **does not exist** in `user_stats`, insert the row.
-   If User 3 **already exists**, update his `total_spent` by ADDING the new 500.00 to the existing amount.

### Challenge D: The Cleanup (`DELETE ... USING`)
Orphan data is polluting the database.
**Task**: Delete all orders from the `orders` table where the `user_id` does not exist in the `users` table.
**Constraint**: Use a `DELETE` with a subquery or `USING`/`JOIN` clause.

---

## 3. Verify Your Results
After running your queries:
1.  `archived_orders` should have exactly **2 rows** (User 1 and User 3's old orders).
2.  `orders` should have **0 rows** for User 99.
3.  User 3's `status` for the $1200 and $2000 orders should be `'review'`.
4.  User 3 in `user_stats` should have the correct accumulated total.

Good luck! 🚀
