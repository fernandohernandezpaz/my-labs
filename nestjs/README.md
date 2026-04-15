# NestJS: Scalable Node.js System Design

NestJS is a framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript and is heavily inspired by Angular, bringing modularity and dependency injection to the Node.js ecosystem.

## Important Interview Questions & Answers

### 1. What are Providers in NestJS?
**Answer:** Providers are the heart of NestJS. They can be services, repositories, factories, or helpers. Their main idea is to be "injected" as a dependency.

### 2. How does Dependency Injection (DI) work in NestJS?
**Answer:** NestJS has a built-in IoC (Inversion of Control) container. When a class is annotated with `@Injectable()`, Nest manages its lifecycle and provides the necessary instances to other classes via the constructor.

### 3. What is the difference between a Guard, an Interceptor, and a Middleware?
**Answer:**
- **Middleware**: Executes before the route handler, has access to `req` and `res`.
- **Guard**: Executes after middleware but before interceptors. Determines if the request should be allowed (Authorization).
- **Interceptor**: Can bind extra logic before/after the method execution (e.g., logging, transforming output).
- **Pipe**: Used for validation and transformation of input data.

### 4. What are Microservices in NestJS?
**Answer:** NestJS provides a transport-agnostic abstraction for microservices. It supports multiple patterns like TCP, Redis, RabbitMQ, and gRPC. You use `@MessagePattern()` and `ClientProxy` to communicate.

### 5. What are Modules?
**Answer:** Modules are used to organize the application structure. Each application has at least one root module. Modules encapsulate providers, controllers, and other modules.
