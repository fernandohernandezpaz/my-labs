# Lab 1: Building a Resilient Retry Mechanism

### Context
You are building an email notification service. Occasionally, the third-party email API (like SendGrid) is down or returns a 500 error.

### The Issue
Currently, if the API call fails, the consumer catches the exception and does nothing, or it `nacks` the message causing it to be re-queued immediately, which leads to a "death loop" where the same failing message is processed 100 times per second, crashing the worker and the logs.

### Goal
Implement a Dead Letter Exchange (DLX) strategy to:
1.  Move failing messages to a separate "Dead Letter Queue" (DLQ) after they fail.
2.  Optionally: Implement a delayed retry (using TTL on the DLQ) before sending the message back to the main queue.
