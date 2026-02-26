# Lab 5: Full-Stack Delivery Instructions

This lab demonstrates how to deliver a full-stack application (NestJS Backend + React/Vite Frontend) through a unified Nginx Gateway.

## 1. Prerequisites (Setup)

### Environment Variables
You must create `.env` files for both the backend and frontend.

- **Backend**: Copy `solution/backend/.env.example` to `solution/backend/.env`.
- **Frontend**: Copy `solution/frontend/.env.example` to `solution/frontend/.env`.

### SSL Certificate Generation (.crt, .key, .pem)
For the production configuration to work, Nginx requires specific SSL files in `solution/infra/nginx/ssl/`.

Run these commands from the **root of the lab folder**:

1. **Create the directory**:
   ```bash
   mkdir -p solution/infra/nginx/ssl
   ```

2. **Generate the Certificate (.crt) and Private Key (.key)**:
   This creates a 2048-bit RSA key and a self-signed certificate valid for 365 days.
   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout solution/infra/nginx/ssl/selfsigned.key \
     -out solution/infra/nginx/ssl/selfsigned.crt \
     -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=safe.example.local"
   ```

3. **Generate Diffie-Hellman Parameters (.pem)**:
   This is used for Perfect Forward Secrecy (might take a minute).
   ```bash
   openssl dhparam -out solution/infra/nginx/ssl/dhparam.pem 2048
   ```

---

## 2. Running the Application

### Development Environment
Runs both services with hot-reloading.
```bash
docker compose -f solution/docker-compose.yml up --build
```
- **Backend Access**: `http://localhost:3000`
- **Frontend Access**: `http://localhost:5371`

### Production Environment (Unified Gateway)
Uses a multi-stage build for the frontend and Nginx to route traffic to both services under a single domain.
```bash
docker compose -f solution/docker-compose.prod.yml up --build
```
- **Frontend Access**: `https://safe.example.local/` (Routed to the React app)
- **API Access**: `https://safe.example.local/api` (Routed to the NestJS app)

---

## 3. Key Technical Notes
- **Unified Domain**: Nginx bridges both services under the same port/domain, eliminating the need for CORS configuration in production.
- **Multi-Stage Build**: The frontend is built into static files and served by a dedicated Nginx container internally.
- **Gateway Routing**: The main Nginx Proxy (`proxy_prod`) splits traffic: `/api` for backend, everything else for the UI.
