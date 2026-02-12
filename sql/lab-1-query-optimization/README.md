# 🚀 PostgreSQL Query Optimization: The Art of Indexing

As a Senior Backend Engineer or Database Architect, your goal isn't just to "make it work"; it's to make it scale. In production systems, a single poorly designed query can be the difference between a 50ms response and a site-wide outage.

This lab focuses on **PostgreSQL Query Optimization**, specifically how the engine retrieves data and how we can guide it using professional indexing strategies.

---

## 1. What is a Database Index?
A database index is a **supplementary data structure** (typically a B-Tree) that stores a subset of your table's columns in a sorted manner.

**Physical Mental Model:**
Think of a table as a 1,000-page book. 
- **Without an index:** If I ask you to find every mention of the word "PostgreSQL", you have to read the book page-by-page from start to finish.
- **With an index:** You look at the "Index" section at the back of the book. It tells you exactly which page numbers to flip to. You jump directly to the data.

An index trades **Write Speed** and **Disk Space** for **Read Speed**.

---

## 2. The Cost of Being Blind: Full Table Scans
When a query runs without an index, PostgreSQL has no choice but to perform a **Sequential Scan (Seq Scan)**.

### Why Seq Scans happen:
1. **Missing Index**: The column in the `WHERE` clause is not indexed.
2. **Low Cardinality**: The database decides that reading the whole table is faster than jumping around the index (e.g., a table with only 10 rows).
3. **Functions on Columns**: Using `WHERE UPPER(email) = 'FOO'` kills the index on `email`.

In a `Seq Scan`, the database reads every single physical block of the table from the disk into the memory (Buffer Cache). For 500k rows, this is expensive; for 50M rows, it is a system killer.

---

## 3. Case Study: The "Slow Dashboard"
We have an `orders` table with **~500,000 records**.

### The Schema
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    status VARCHAR(20), -- 'completed', 'pending', 'cancelled'
    content TEXT,
    created_at TIMESTAMP
);
```

### The Heavy Query
Small-scale queries seem fast, but as the data grows, this dashboard query becomes a bottleneck:
```sql
SELECT * FROM orders 
WHERE user_id = 123 
AND status = 'completed' 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 4. BEFORE vs AFTER: Execution Plans

### BEFORE (No Indexes)
**Plan Output:**
```text
Limit  (cost=12544.00..12544.03 rows=10 width=56) (actual time=85.420..85.424 rows=10 loops=1)
  ->  Sort  (cost=12544.00..12547.12 rows=1250 width=56) (actual time=85.419..85.421 rows=10 loops=1)
        Sort Key: created_at DESC
        Sort Method: top-N heapsort  Memory: 26kB
        ->  Seq Scan on orders  (cost=0.00..12503.00 rows=1250 width=56) (actual time=0.045..82.103 rows=124 loops=1)
              Filter: ((user_id = 123) AND ((status)::text = 'completed'::text))
              Rows Removed by Filter: 499876
Execution Time: 85.512 ms
```
- **The Problem**: `Seq Scan on orders`. It read **500,000 rows** just to find 124 matches, then sorted them in memory.

### AFTER (With Composite Index)
```sql
CREATE INDEX idx_orders_user_status_created ON orders (user_id, status, created_at DESC);
```
**Plan Output:**
```text
Limit  (cost=0.42..38.56 rows=10 width=56) (actual time=0.035..0.048 rows=10 loops=1)
  ->  Index Scan using idx_orders_user_status_created on orders  (cost=0.42..4771.67 rows=1250 width=56) (actual time=0.033..0.045 rows=10 loops=1)
        Index Cond: ((user_id = 123) AND ((status)::text = 'completed'::text))
Execution Time: 0.072 ms
```
- **The Result**: Total time dropped from **85.5ms** to **0.07ms**. That is a **1,100x speedup**.

---

## 5. Understanding Execution Plan Nodes

| Node Name | Meaning | Engineer's View |
| :--- | :--- | :--- |
| **Seq Scan** | Reads the whole table linearly. | 🚩 Red Flag for large tables. $O(N)$. |
| **Parallel Seq Scan** | Table scan split across multiple CPU cores. | ⚠️ Still $O(N)$, just multi-threaded. High I/O. |
| **Index Scan** | Navigates the B-Tree and fetches the row pointer. | ✅ Very fast for fetching small subsets. |
| **Index Only Scan** | The index contains all the data requested (Covering Index). | 🏆 The Gold Standard. Zero heap (table) access. |
| **Bitmap Index Scan** | Finds matching rows in index, builds a "map" of pages. | 🧱 Good when retrieving many rows. |
| **Bitmap Heap Scan** | Uses the bitmap above to fetch pages from the table. | 🚜 Used for AND/OR logic across multiple indexes. |
| **Sort** | The database is ordering data in memory (WorkMem). | 🧠 "Can an index pre-sort this for me?" |
| **Gather** | The parent process collecting results from parallel workers. | 📣 Communication overhead between CPUs. |

---

## 6. The Composite Index & The "Left-Most Prefix" Rule
A composite index `(col_a, col_b, col_c)` is like a phone book sorted by `Lastname`, then `Firstname`.

### The Rule:
- You **can** search for `(col_a)` alone.
- You **can** search for `(col_a, col_b)`.
- You **CANNOT** (efficiently) search for `(col_b)` or `(col_c)` alone. The index is useless because the primary sorting is on `col_a`.

**Engineering Mental Model**: Always put the column with the highest **Cardinality** (most unique values) or the most common filter first.

---

## 7. Why Composite Indexes aren't Unique by default
Unless you explicitly write `CREATE UNIQUE INDEX`, a composite index allows duplicate combinations.
- `(user_id, status)` can have multiple records with `(1, 'pending')`.
- Declaring it `UNIQUE` turns the index into a **Constraint**, ensuring the combination is one-of-a-kind.

---

## 8. PostgreSQL Index Types

| Type | Best For... | Use Case |
| :--- | :--- | :--- |
| **B-Tree** | Equality (`=`) and Ranges (`<`, `>`, `BETWEEN`). | **99% of your indexes.** |
| **Hash** | Exact equality ONLY. | Rarely used; B-Tree is usually better. |
| **GIN** | Arrays, JSONB, Full-Text Search. | Finding a key inside a JSON document. |
| **GiST** | Geometry, Geolocation, Ranges. | "Find all points within 5km of my location." |
| **BRIN** | Massive tables sorted by time (e.g. Logs). | 100M+ rows where data is naturally ordered. Very small footprint. |
| **Partial** | Filtering a subset of data. | `CREATE INDEX ... WHERE status = 'active'`. (Saves space). |
| **Covering** | Including extra columns for "Index Only Scans". | `CREATE INDEX ... INCLUDE (email)`. |

---

## 9. Engineering "Rules of Thumb"

1. **Cardinality is King**: Don't index a `boolean` (True/False) column alone. The database will likely ignore the index because 50% of the table matches. Index high-cardinality columns like `user_id` or `email`.
2. **Index for Sorting**: If your dashboard has `ORDER BY created_at DESC`, include `created_at` in your composite index. It eliminates the expensive `Sort` node.
3. **The Write Tax**: Every index makes `INSERT`, `UPDATE`, and `DELETE` slower. If you have 20 indexes on a table, every write must update 20 trees.
4. **Index Bloat**: Over time, indexes grow and become fragmented. Monitor your index size!
5. **Standard Strategy**: 
    - **Equality Columns** first.
    - **Inequality/Range** columns second.
    - **Sorting Columns** last.

---

## 🏁 Summary Comparison

| Metric | Before Indexing | After Indexing |
| :--- | :--- | :--- |
| **Execution Time** | ~85.00 ms | **~0.07 ms** |
| **Rows Sampled** | 500,000 | **10 (via Index)** |
| **CPU Usage** | High (Scan + Sort) | **Negligible** |
| **Disk I/O** | High (Full Read) | **Ultra Low (Random Access)** |

---

### Challenge for the Lab
Go to your `exercise` folder, run the `populate_data.py` script, and prove these execution plans yourself!
