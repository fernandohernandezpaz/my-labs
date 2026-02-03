# Lab 3: Redis as a Primary NoSQL Store

### Context
You are building a high-speed gaming leaderboard and user profile system. You need ultra-low latency (sub-millisecond) for both reading and writing profile data.

### The Issue
Using a traditional Relational DB (SQL) or even a disk-based NoSQL (MongoDB) introduces disk I/O latency that is too high for your real-time requirements. However, you don't just need a cache; you need to store complex objects (User Profiles) and be able to query them (e.g., "Find all users in Level 5").

### Goal
Implement a **Document-style storage** pattern using Redis to:
1.  Store complex user objects using **Redis Hashes**.
2.  Implement **Secondary Indexing** using **Redis Sets** to allow querying by attributes (like `level` or `team`).
3.  Ensure **Data Durability** so that your "database" isn't lost if the server restarts.
