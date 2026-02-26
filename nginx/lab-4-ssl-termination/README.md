# Lab 4: Nginx SSL Termination & HTTPS Hardening

### Context
Your application handles sensitive user data. You need to move from insecure HTTP to encrypted HTTPS. Additionally, you want to improve page load speed by enabling the **HTTP/2** protocol.

### The Issue
Browsers now flag HTTP sites as "Not Secure". Managing SSL certificates on every backend microservice is a nightmare. It is better to "Terminate" the SSL at the Nginx gateway: Nginx handles the complex decryption, and then passes the traffic over a secure internal network to the backends.

### Goal
Implement a secure SSL/TLS configuration in Nginx.
- Configure Nginx to listen on Port 443 with an SSL certificate.
- Implement **Global HTTP to HTTPS redirection** (Force HTTPS).
- Enable **HTTP/2** for multiplexing performance.
- Hardening: Set up modern Cipher Suites (avoiding weak ones) and enable **HSTS** (HTTP Strict Transport Security) to prevent "Man-in-the-Middle" downgrade attacks.
