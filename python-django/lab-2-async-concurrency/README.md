# Lab 2: Mastering Asyncio for Concurrent I/O

### Context
You are building a web scraper that needs to fetch data from 1,000 different URLs. You also need to save the results to a database.

### The Issue
Using a standard `for` loop with `requests.get()` is extremely slow because the program waits for each request to finish before starting the next one. This is "Blocking I/O".
If each request takes 1 second, it will take 16 minutes to finish.

### Goal
Implement an asynchronous solution using `asyncio` and `aiohttp` to perform all 1,000 requests concurrently.
1.  Use `async/await` syntax.
2.  Use `asyncio.gather()` to run tasks in parallel.
3.  Implement "Semaphore" to limit the number of simultaneous connections (to avoid being banned by the server).
