# Lab 2: API Rate Limiting - The Sliding Window

### Context
Your public API is being "scraped" by a competitor. They are making 10,000 requests per minute, which is degrading performance for your paying customers. You need to implement a mechanism to limit users to 100 requests per minute.

### The Issue
Implementing rate limiting inside the application code (e.g., using a local variable) is useless because you have 5 instances of the API. Each instance would have its own counter, allowing the scraper to make 500 requests instead of 100.

### Goal
Implement a centralized **Sliding Window Rate Limiter** using Redis to:
1.  Track requests based on IP address or API Key.
2.  Reject requests with a `429 Too Many Requests` status if the limit is exceeded.
