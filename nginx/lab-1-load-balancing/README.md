# Lab 1: Zero-Downtime Load Balancing

### Context
Your application is growing, and a single instance is no longer enough to handle the traffic. You decide to run multiple instances behind Nginx. However, you notice that when one instance is being updated or crashes, users experience 502/504 errors.

### The Issue
Your current Nginx configuration is a simple `proxy_pass`:
```nginx
server {
    listen 80;
    location / {
        proxy_pass http://localhost:3000;
    }
}
```
This configuration doesn't allow for redundancy or graceful failure.

### Goal
Configure Nginx to:
1.  Distribute traffic between two backend instances (`app_v1` and `app_v2`).
2.  Implement a basic "Passive Health Check" to stop sending traffic to a server if it fails.
3.  Ensure that if one server is down, the other takes 100% of the load automatically.
