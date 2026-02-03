# Lab 1: Scaling Transactions - The Distributed Lock

### Context
You have a microservice that processes inventory for a high-traffic e-commerce site. Multiple instances of the service are running behind a load balancer. When a user buys an item, the service checks the stock in the database, and if available, decrements it.

### The Issue
A "Race Condition" is occurring. Two different service instances read the stock (e.g., 1 item left) at the same time. Both see there is stock, both decrement it, and you end up with "Overselling" (stock becomes -1). A simple local `mutex` lock won't work because there are multiple instances of the service.

### Goal
Implement a Distributed Lock using Redis to ensure that only one instance can process the stock update for a specific product ID at a time.
