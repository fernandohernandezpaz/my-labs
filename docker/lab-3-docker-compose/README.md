# Lab 3: The Multi-Container Challenge (Docker Compose)

## 🚨 The Situation
You have a high-traffic Node.js API that needs to use **Redis** to store a hit counter. Currently, you are running both locally, but you want to move them into Docker. 

If you run them as two separate containers using `docker run`, they won't be able to talk to each other easily, and if the Redis container stops, you lose all your data!

## 🎯 The Challenge
You need to create a **Docker Compose** environment that orchestrates both services perfectly.

**Requirements:**
1. A service named `web` built from the local `app` directory.
2. A service named `redis` using the official `redis:alpine` image.
3. The `web` service must be able to reach the `redis` service using the hostname `redis`.
4. Your visit count data must be **persistent** (survive a container restart).

## ❓ The Problem to Solve
How do you structure the `docker-compose.yml` file to ensure the application connects to the database correctly without using hardcoded IP addresses, and which Docker feature do you use to prevent data loss?

---
*Check `guide_to_solution.md` when you are ready to see the solution.*
