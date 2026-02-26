# Lab 3: Nginx Advanced Routing (Path-based vs Domain-based)

### Context
In a microservices world, you often have a "Monolith" frontend but many "Micro" backends. You might want `example.com` to serve the UI, but `example.com/api/v1` to go to the Orders service and `example.com/api/v2` to go to the Payments service.

### The Issue
Traditional single-site configuration doesn't scale for complex apps. You need to know how to use the "Location" block effectively to route traffic based on URI prefix, and how to use "Server" blocks to host multiple domains on the same IP.

### Goal
Implement advanced routing patterns in Nginx.
- **Domain Routing**: Use `server_name` to route `blog.example.local` and `shop.example.local` to different root folders.
- **Path Routing**: Use `location` blocks (prefix vs regex) to route traffic to different backend streams.
- **Rewrite Rules**: Implement URL rewrites (e.g., transforming `/user/123` internally to `/profile.php?id=123`).
- **Priority Logic**: Understand which `location` block Nginx chooses when multiple blocks match (The "Best Match" rule).
