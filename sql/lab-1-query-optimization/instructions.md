# Instructions: Fixing the "Slow Dashboard"

This lab teaches you how to identify and fix bottlenecks in SQL queries using **Composite Indexes**.

---

### Step 1: Start the Database
From inside the `exercise/` folder, start the PostgreSQL container:

```bash
docker compose up -d
```

### Step 2: Populate with Data
To observe slowness, we need volume. Run the population script:

```bash
pip install -r requirements.txt
python populate_data.py
```

### Step 3: Identify the Bottleneck
Connect to your database:
```bash
docker exec -it exercise-db-1 psql -U user -d optimization_lab
```

Run the "Challenge Query" with `EXPLAIN ANALYZE`:
```sql
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE user_id = 123 
AND status = 'completed' 
ORDER BY created_at DESC 
LIMIT 10;
```

### Step 4: The Optimization Challenge
Your goal is to create a single **Composite Index** that makes this query run in less than **1ms**. 

**Hints:** 
- Look for `Seq Scan` vs `Index Scan` in the output.
- Remember the rule for composite indexes: **Equality columns first, then sorting columns.**

### Step 5: Verification
Run the `EXPLAIN ANALYZE` one last time. If you see `Index Scan` and a time near `0.05ms`, you've mastered the lab!
