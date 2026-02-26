# Lab 4: SSL Termination Instructions

This lab demonstrates how to set up SSL termination using Nginx as a reverse proxy for a NestJS application.

## 1. Prerequisites (Setup)

### Environment Variables
You must create a `.env` file for the application to run correctly.
- Copy `solution/app/.env.example` to `solution/app/.env`.
- Adjust values if necessary (defaults are usually fine for local testing).

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

### Development Environment (No Nginx)
Uses the development Dockerfile with hot-reloading.
```bash
docker compose -f solution/docker-compose.yml up --build
```
- **Access**: `http://localhost:3000`

### Production Environment (App Only)
Uses the production Dockerfile optimized for performance.
```bash
docker compose -f solution/docker-compose.prod.yml up --build
```
- **Access**: `http://localhost:3000`

### Production Environment with SSL Termination (Unified Gateway)
Uses Nginx as a reverse proxy to handle SSL.
```bash
docker compose -f solution/docker-compose.prod2.yml up --build
```
- **Access (HTTP)**: `http://localhost` (Redirects to HTTPS)
- **Access (HTTPS)**: `https://safe.example.local` (Map `127.0.0.1 safe.example.local` in your hosts file)

---

## 3. Key Technical Notes
- **SSL Termination**: Nginx handles the decription/encription of traffic, so the Node.js app doesn't need to manage certificates.
- **Port Isolation**: In the `prod2` version, the Node.js container is internal to the network and only accessible via Nginx.
