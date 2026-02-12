# Instructions: Master Table Partitioning

This lab teaches you how to handle "Big Data" by splitting tables into physical shards called partitions.

---

### Step 1: Start the Database
From inside the `exercise/` folder:

```bash
docker compose up -d
```

### Step 2: The Challenge
Connect to your database:
```bash
docker exec -it exercise-db-1 psql -U user -d partitioning_lab
```

Your task is to:
1.  Define a **Parent Table** using `PARTITION BY RANGE`.
2.  Manually create at least 3 **Child Partitions** (e.g., for different years or months).
3.  Insert data and observe how Postgres automatically routes it to the correct child table.

### Step 3: Verify Partition Pruning
Run a query with `EXPLAIN` on a specific date:
```sql
EXPLAIN SELECT * FROM logs WHERE created_at = '2024-05-15';
```
In the output, look at the **"Filter"** or **"Scan"** section. If the output only mentions `logs_2024` and completely ignores `logs_2023`, you have successfully implemented **Partition Pruning**!

---

### Step 4: Maintenance Test
Try to delete an entire year of data instantly.
```sql
DROP TABLE logs_2023;
```
Observe how the space is recovered immediately compared to a traditional `DELETE` statement.
