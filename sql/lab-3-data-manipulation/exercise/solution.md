# Solutions: Lab 3 Data Manipulation

### A. The Safe Migration
```sql
INSERT INTO archived_orders (id, user_id, total_amount)
SELECT o.id, o.user_id, o.amount
FROM orders AS o
INNER JOIN users AS u ON u.id = o.user_id
WHERE o.status = 'completed' AND o.order_date < '2024-01-01';
```

### B. The Conditional Bulk Update
```sql
UPDATE orders
SET status = CASE
    WHEN amount > 1000 AND status = 'pending' THEN 'review'
    ELSE status
END,
notes = CASE
    WHEN amount < 50 AND status = 'failed' THEN 'Auto-Retry logic applied'
    ELSE notes
END;
```

### C. The UPSERT
```sql
INSERT INTO user_stats (user_id, total_spent, last_order_date)
SELECT id, 500.00, NOW()
FROM users
WHERE id = 3
ON CONFLICT (user_id)
DO UPDATE SET total_spent = user_stats.total_spent + 500;
```

### D. The Cleanup (Orphan Deletion)
```sql
DELETE FROM orders
WHERE user_id NOT IN (
    SELECT id FROM users
);
```
