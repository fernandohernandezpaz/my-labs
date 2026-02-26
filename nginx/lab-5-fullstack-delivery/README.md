# Lab 5: Single Domain Fullstack Delivery (Reverse Proxy)

### Context
You have a professional microservices architecture:
1.  **Backend**: A high-quality Flask API (SOLID, Repository Pattern, DTOs).
2.  **Frontend**: A Vue 3 SPA (Clean Architecture, Use Cases, SOLID).

The client wants the entire application to be accessible via a single domain (`http://localhost`). Browsers enforce **CORS** restrictions if the frontend is on one port (3000) and the backend is on another (5000). By using Nginx as a gateway, we can eliminate CORS issues and provide a unified entry point.

### The Issue
You have three separate containers running. 
- The **Frontend** doesn't know how to reach the backend properly.
- The **User** only wants to visit `http://localhost`, not browse between ports.
- Navigating to `http://localhost/api/tasks` should return JSON, while `http://localhost/` should return the Vue app.

### Goal
Implement **Nginx as a Unified Reverse Proxy** to:
- Route all traffic starting with `/api` to the Flask backend.
- Route everything else (`/`) to the Vue frontend.
- strip the `/api` prefix if needed (though our Flask app is already configured for `/api`).
- Fix the common "SPA Refresh" bug where refreshing `/about` returns a 404 from Nginx instead of the Vue app (Catch-all routing).

---

### Challenge Tasks
1.  **Launch the Environment**: Run `docker compose up --build`.
2.  **Fix the Proxy**: Modify `nginx.conf` so that the Vue app is visible on Port 80.
3.  **Connect the API**: Ensure that the "Nginx Deployment Lab" dashboard correctly displays tasks from the backend.
4.  **Security Hardening**: Ensure internal headers (`Host`, `X-Real-IP`) are passed to the Flask backend so the API knows who is calling.
