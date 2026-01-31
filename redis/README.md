# Redis: Beyond Simple Caching

Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. For a professional developer, understanding how to use Redis for concurrency control and performance is vital.

## Important Interview Questions & Answers

### 1. What are the main data types in Redis?
**Answer:** Strings, Lists, Sets, Sorted Sets, Hashes, Bitmaps, HyperLogLogs, and Streams.

### 2. What is the difference between RDB and AOF persistence?
**Answer:** 
- **RDB (Redis Database)**: Creates point-in-time snapshots of the dataset at specified intervals. Good for backups and disasters.
- **AOF (Append Only File)**: Logs every write operation received by the server. Provides better data durability but files are larger.

### 3. How does Redis handle concurrency since it is single-threaded?
**Answer:** Redis is single-threaded for core logic (parsing commands and executing them), which avoids context switching and locking overhead. Since most commands are O(1) or O(N), it can handle over 100k requests per second. For heavy operations, it uses background threads (e.g., IO, AOF flushing).

### 4. What is a "Cache Avalanche" and how to prevent it?
**Answer:** It happens when a large number of cached items expire at the same time, causing a surge of requests to the backend database. Prevention: Adding a random "jitter" to the TTL (expiration time) of cached items.

### 5. What is the "Redlock" algorithm?
**Answer:** It is an algorithm designed by the Redis author to implement a distributed lock manager that is more reliable than a single-instance lock, especially in distributed environments.
