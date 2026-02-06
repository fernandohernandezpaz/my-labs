# Lab 2: Security Hardening - Non-Root Users & Least Privilege

### Context
Your application is running in production. A security audit reveals that your Docker containers are running as the `root` user. If an attacker finds a vulnerability in your web application (like a Remote Code Execution), they would have full root access inside the container and potentially the ability to "break out" to the host machine.

### The Issue
By default, Docker containers run as root. This violates the "Principle of Least Privilege".
The current Dockerfile:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "app.js"]
```

### Goal
Modify the Dockerfile to:
1.  Create a dedicated non-root user.
2.  Ensure the application has only the permissions it needs to run.
3.  Implement a Read-Only root filesystem.
