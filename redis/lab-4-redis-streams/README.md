# Lab 4: Event Sourcing with Redis Streams

In a high-scale distributed system, simple message brokers or Pub/Sub often aren't enough. You need **persistence**, **history**, and **consumer groups**—features typically associated with Kafka, but much lighter and faster in Redis.

This lab explores **Redis Streams**, the most advanced data structure in Redis for building resilient event-driven architectures.

---

### 1. The Core Issue: The "Fire and Forget" Problem
In previous versions of Redis, developers used **Pub/Sub** for messaging. 
- **The Problem**: If a consumer is offline for 1 second, they miss every message sent during that "gap". There is no memory.
- **The Solution**: **Redis Streams** provide an append-only log that persists on disk. Consumers can "catch up" on missed messages or share the workload using **Consumer Groups**.

### 2. Case Study: The "Scalable Order Pipeline"
You are building an e-commerce backend. When a user buys a product, multiple things must happen:
1.  **Inventory** must be updated.
2.  **Email** must be sent.
3.  **Analytics** must be recorded.

If you do this synchronously in the API, the user waits 2 seconds. If you use simple Pub/Sub, you might lose an email notification.

### 3. Goal
Implement a **Redis Stream** to process orders asynchronously. 
- You will create a **Producer** that pushes "Order Created" events.
- You will implement **Consumer Groups** so that multiple workers can process orders in parallel without double-processing any single order.

---

### Challenge Tasks
1.  **Setup**: Launch a Redis instance.
2.  **Produce**: Write a script to send 100 orders to the `orders_stream`.
3.  **Consumer Groups**: 
    - Create a group called `order_processors`.
    - Spawn two instances of your consumer script.
    - Verify that each consumer only handles ~50 orders (Load Balancing).
4.  **Acknowledgment**: Ensure that messages are only removed from the "Pending Entries List" (PEL) after a successful `XACK`.
