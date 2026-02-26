# Nginx: The Powerhouse Web Server

Nginx is more than just a web server; it's a high-performance reverse proxy, load balancer, and HTTP cache. Understanding Nginx is critical for managing traffic and ensuring high availability.

## Important Interview Questions & Answers

### 1. What is the difference between Nginx and Apache?
**Answer:** Nginx uses an asynchronous, event-driven design, which allows it to handle thousands of concurrent connections with low memory usage. Apache uses a process-driven approach (one thread/process per connection), which can consume more resources under high load.

### 2. What is a Reverse Proxy?
**Answer:** A reverse proxy is a server that sits in front of backend servers and forwards client requests to them. It provides benefits like security, load balancing, SSL termination, and caching.

### 3. How do you implement Load Balancing in Nginx?
**Answer:** Using the `upstream` directive. You define a group of servers and then use `proxy_pass` to forward requests to that group.
```nginx
upstream backend_servers {
    server server1.example.com;
    server server2.example.com;
}
server {
    location / {
        proxy_pass http://backend_servers;
    }
}
```

### 4. What is SSL Termination?
**Answer:** It's the process of decrypting SSL-encrypted traffic at the proxy server (Nginx) before passing it to the backend servers in plain HTTP. This reduces the CPU load on the backend servers.

### 5. What are Worker Processes and Worker Connections?
**Answer:** `worker_processes` defines how many worker processes Nginx should start (usually set to the number of CPU cores). `worker_connections` defines how many simultaneous connections each worker process can handle. Total capacity = `worker_processes * worker_connections`.

---

## Nginx Labs Overview

| Lab | Topic | Concept |
| :--- | :--- | :--- |
| **[Lab 1: Load Balancing](./lab-1-load-balancing/README.md)** | Scalability | Distributing traffic across multiple backend instances. |
| **[Lab 2: Micro-Caching](./lab-2-micro-caching/README.md)** | Optimization | Reducing backend load by caching dynamic responses for short durations. |
| **[Lab 3: Advanced Routing](./lab-3-advanced-routing/README.md)** | Flexibility | Path-based vs Domain-based routing and matching priorities. |
| **[Lab 4: SSL Termination](./lab-4-ssl-termination/README.md)** | Security | Implementing HTTPS, Hardening, and HTTP/2 for performance. |
| **[Lab 5: Fullstack Delivery](./lab-5-fullstack-delivery/README.md)** | Architecture | Reverse Proxying and Unified Domain access for Backend + Frontend. |
