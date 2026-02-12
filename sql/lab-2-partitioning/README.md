# 🪓 PostgreSQL Partitioning: Scaling to Billions of Rows

As a Database Architect, you will eventually hit a wall: **The B-Tree depth limit**. When a table grows to hundreds of millions or billions of rows, even the best indexes start to fail. Maintenance becomes impossible, and autovacuum cannot keep up.

This lab explores **Declarative Table Partitioning**, the standard solution for "Big Data" in relational databases.

---

## 1. The Problem: Vertical Index Fatigue
When a table is "monolithic" (one single physical file), every index on that table is also monolithic.

### Why large tables slow down:
1.  **Deep B-Trees**: Searching a 500M row index requires many more disk I/O jumps than a 1M row index.
2.  **Memory Pressure**: The "Working Set" (the frequently accessed parts of the index) becomes larger than the RAM (Buffer Cache), forcing the DB to read from disk constantly.
3.  **Vacuum Bloat**: PostgreSQL's `VACUUM` process must scan the entire table to clean up dead rows. On a 1TB table, this can take days.
4.  **Index Fragmentation**: Frequent updates on a massive table lead to "holey" indexes that waste space and slow down scans.

---

## 2. Theoretical Solution: "Divide and Conquer"
Partitioning is the process of splitting one logical table into multiple smaller **physical tables** (partitions), while keeping the same interface for the application.

### The Benefits:
-   **Partition Pruning**: The query optimizer ignores partitions that don't match the `WHERE` clause.
-   **Bulk Deletion**: Deleting old data (e.g., logs older than 1 year) becomes an instant `DROP TABLE` instead of a slow, heavy `DELETE`.
-   **Localized Maintenance**: You can rebuild an index on "This Month's" partition without touching the rest of the historical data.

---

## 3. Types of Partitioning in PostgreSQL

| Type | How it Works | Best Use Case |
| :--- | :--- | :--- |
| **Range** | Split by a range of values (e.g., Dates). | **Logs, Transactions, Events.** |
| **List** | Split by specific values (e.g., Region ID). | **Multi-tenant apps (By Country, By Client).** |
| **Hash** | Uses a hash function to spread data evenly. | **Scaling writes when there is no natural time/list key.** |

---

## 4. Case Study: The "Infinite Log" Table

### The Scenario:
A high-traffic API generates **10 million logs per day**.
Queries like `SELECT * FROM logs WHERE created_at > '2024-01-01'` are becoming unusable.

### The "Naïve" Design (Monolithic):
```sql
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    data JSONB,
    created_at TIMESTAMP
); -- ❌ Becomes a massive bottleneck after 6 months.
```

### The "Architect" Design (Partitioned):
```sql
CREATE TABLE logs (
    id BIGINT,
    data JSONB,
    created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at); -- ✅ Physically split by time.
```

---

## 5. What is "Partition Pruning"?
This is the "Magic" of partitioning. If you have a query:
```sql
SELECT count(*) FROM logs WHERE created_at BETWEEN '2024-02-01' AND '2024-02-28';
```
The PostgreSQL planner checks the metadata. If it sees that `logs_2023` only contains data for 2023, it **completely skips** that file. It only opens the files related to Feb 2024.

---

## 6. Senior Engineering "Rules of Thumb"

1.  **When to Partition?**: A general rule is when the table size exceeds the available RAM, or when it reaches **~50GB to 100GB**.
2.  **The Partition Key is Permanent**: You cannot easily change the column you partitioned by. Choose wisely (usually `created_at` or a `tenant_id`).
3.  **Unique Constraints**: In PostgreSQL, a `UNIQUE` index or `PRIMARY KEY` must include the partition key. This is a common "gotcha" for beginners.
4.  **Avoid Too Many Partitions**: Having 10,000 partitions will actually slow down the planner because it has to check metadata for all of them. Aim for **tens or hundreds**, not thousands.
5.  **PG_PARTMAN**: In production, never manage partitions manually. Use a tool like `pg_partman` to automate the creation of future partitions and the detachment of old ones.

---

### Challenge for the Lab
Navigate to the `lab-2-partitioning/exercise` folder. You will implement a time-based partitioning strategy and verify that **Partition Pruning** is working using `EXPLAIN`.

**Can you make a query ignore 90% of your data files?** 🚀🪓
