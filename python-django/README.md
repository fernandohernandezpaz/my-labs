# Python & Django: The "Batteries Included" Framework

Python is the king of readability and Data Science, while Django is one of the most robust web frameworks for rapid development without sacrificing security or scalability.

## Important Interview Questions & Answers

### 1. What is the Global Interpreter Lock (GIL) in Python?
**Answer:** The GIL is a mechanism in CPython (the standard implementation) that ensures only one thread executes Python bytecode at a time. This makes Python's memory management simpler but limits true multi-core parallelism for CPU-bound tasks. (Note: This is changing with "Free-threading" in Python 3.13+).

### 2. How do you handle concurrency in Python?
**Answer:**
- **Threading**: Good for I/O-bound tasks (network/disk).
- **Multiprocessing**: Good for CPU-bound tasks (calculations) as it bypasses the GIL by creating separate processes.
- **Asyncio**: Single-threaded, event-loop based concurrency. Excellent for handling thousands of simultaneous connections.

### 3. What is the Django Request/Response Cycle?
**Answer:** Middleware (request) -> URL Resolver -> View -> Template/JSON Rendering -> Middleware (response).

### 4. What is the difference between `select_related` and `prefetch_related`?
**Answer:**
- `select_related`: Used for "one-to-one" or "many-to-one" relationships. It performs a SQL **JOIN** in a single query.
- `prefetch_related`: Used for "many-to-many" or "one-to-many" relationships. It performs a separate query for the related objects and does the "joining" in Python (efficiently).

### 5. What are Django Signals?
**Answer:** A way for certain "senders" to notify a set of "receivers" when actions occur (e.g., `post_save`, `pre_delete`). Useful for decoupling code, but should be used sparingly as they can make the control flow hard to follow.
