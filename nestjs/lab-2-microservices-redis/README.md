# Lab 2: Event-Driven Microservices with Redis Transport

### Context
Your monolith is becoming too large. You decide to move the "PDF Generation Service" to a separate microservice because it's CPU-intensive and you want to scale it independently.

### The Issue
You need a way for your "Main API" to tell the "PDF Service" to start a job and get a result back. You want something faster than HTTP but easier to manage than RabbitMQ for internal communication.

### Goal
Implement a NestJS microservice design using **Redis** as the transport layer.
1.  Main API acts as the `Client`.
2.  PDF Service acts as the `Server`.
3.  Use `@MessagePattern` to handle requests.
