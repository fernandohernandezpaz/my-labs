# Instructions: Running the Load Balancing Lab

This lab is split into two stages: **Standard Round-Robin** (default) and **Sticky Sessions (IP Hash)**. 

### Prerequisites
- Ensure you are in the solution directory: `cd nginx/lab-1-load-balancing/solution`
- Docker and Docker Compose must be installed and running.

---

### Stage 1: Standard Round-Robin
In this mode, Nginx distributes requests equally across all healthy workers.

1. **Launch the environment**:
   ```bash
   docker compose up --build
   ```
2. **Verification (Terminal - Recommended)**:
   Open a new terminal and run this command 5-10 times:
   ```bash
   curl http://localhost/
   ```
   **Expected Result**: You should see the `app_title` alternate between "Flask App 1" and "Flask App 2".

3. **Verification (Browser)**:
   Visit `http://localhost/` in your browser. 
   *Note: Due to browser "Keep-Alive", you might see the same app for a few seconds until the connection resets.*

---

### Stage 2: Sticky Sessions (IP Hash)
In this mode, Nginx uses the client's IP to ensure they always land on the same server.

1. **Stop previous containers**:
   ```bash
   docker compose down -v
   ```
2. **Launch the IP Hash environment**:
   ```bash
   docker compose -f docker-compose.iphash.yaml up --build
   ```
3. **Verification**:
   Visit `http://localhost/` in your browser and refresh many times.
   **Expected Result**: You should **consistently** see only one app (e.g., "Flask App 1"). Your session is "stuck" to that worker.

4. **Testing "Stickiness" with another tool**:
   Try running the `curl` command from Step 1. Since `curl` and your Browser are the same IP (from Nginx's perspective inside Docker Desktop), they will likely both see the same app.

---

### Clean Up
When you are finished with the lab, always clean up the network and volumes:
```bash
docker compose down -v
# OR for the IP Hash version:
docker compose -f docker-compose.iphash.yaml down -v
```

### 💡 Pro Tip: Real-time Logs
To see the traffic hitting the servers in real-time while you browse, watch the terminal where you ran `docker compose up`. You will see the container names (`flask_app_1` or `flask_app_2`) preceding each log line.
