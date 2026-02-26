# Lab 2: Nginx Micro-Caching - Protecting the Backend

### Context
You are monitoring a high-traffic "Crypto Ticker" service. The backend performs heavy calculations to provide real-time prices. During market volatility, thousands of users hit the `/ticker` endpoint simultaneously.

### The Issue
Currently, every single request forces the **FastAPI** backend to recalculate. 
- Even with `async` code, the backend takes ~2 seconds to process each request (`time.sleep` simulation).
- Without caching, if 100 people refresh at the same time, the backend becomes a bottleneck, and latency skyrockets.

### Goal
Implement **Micro-Caching** in Nginx.
- Configure Nginx to cache the `/ticker` response for just **1 to 5 seconds**.
- **Challenge**: Ensure that the `X-Cache-Status` header is visible in the response so you can distinguish between a `HIT` (from Nginx) and a `MISS` (from FastAPI).
- **Result**: Even if the backend is slow, the users should get an instant response because Nginx serves the same data to everyone for that 1-second window.

---

### Challenge Tasks
1.  **Start the Lab**: Run `docker compose up --build` in the `exercise/` folder.
2.  **Benchmark**: Visit `http://localhost:8080/ticker`. It will take 2 seconds. Refresh it. It will take 2 seconds again.
3.  **Implement Cache**: Update `nginx.conf` to enable proxy caching.
4.  **Verify**: Refresh the page rapidly. After the first 2-second wait, subsequent responses should be **instant** and show `X-Cache-Status: HIT`.
