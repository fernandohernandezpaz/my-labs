# 🐘 SQL & Relational Databases: The Architect's View

As a Senior Backend Engineer, "knowing SQL" isn't just about writing `SELECT` statements. It's about designing systems that remain performant and consistent when handling millions of transactions per second. This module transforms you from a "Query Writer" into a **Database Architect**, focusing on internals, data integrity, and high-level optimization strategies.

## Important Interview Questions & Answers

### 1. What are the ACID properties?
**Answer:**
- **Atomicity**: All or nothing. If one part of the transaction fails, the whole thing is rolled back.
- **Consistency**: Database transitions from one valid state to another.
- **Isolation**: Concurrent transactions don't interfere with each other.
- **Durability**: Once a transaction is committed, it stays committed (persisted).

### 2. What is the difference between a Clustered and Non-Clustered index?
**Answer:**
- **Clustered Index**: Determines the physical order of data in the table. Usually the Primary Key. Only one per table.
- **Non-Clustered Index**: A separate structure that points to the actual data rows. Multiple per table.

### 3. What is Database Normalization?
**Answer:** The process of organizing data to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships (1NF, 2NF, 3NF).

### 4. How do you find slow queries?
**Answer:** Use the `EXPLAIN` or `EXPLAIN ANALYZE` command to see the execution plan. Look for "Sequential Scans" (Full Table Scans) on large tables and replace them with "Index Scans".

### 5. What are Window Functions?
**Answer:** Functions that perform calculations across a set of rows related to the current row (e.g., `RANK()`, `ROW_NUMBER()`, `SUM() OVER()`). They don't collapse rows like `GROUP BY` does.

---

## SQL Labs Overview

| Lab | Topic | Concept |
| :--- | :--- | :--- |
| **[Lab 1: Query Optimization](./lab-1-query-optimization/README.md)** | B-Tree & Composite Indexes | Fixing slow queries on large datasets using `EXPLAIN ANALYZE`. |
| **[Lab 2: Partitioning](./lab-2-partitioning/README.md)** | Huge Table Management | Scaling to hundreds of millions of rows using Table Partitioning. |
| **[Lab 3: Transactions & Concurrency](./lab-3-transactions-concurrency/README.md)** | ACID & Isolation Levels | Solving the "Double Spend" problem using Locking and Isolation. |
