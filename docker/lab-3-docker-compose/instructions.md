# Lab 3: Docker Compose Setup (Multi-Stage Environments)

This lab demonstrates how to manage different environments (Development and Production) using Docker Compose and specific Dockerfiles.

---

## 🛠️ Project Structure

The project is organized to separate infrastructure configuration from application code:
- `/app`: The Node.js application source code.
- `/infra/node`: Environment-specific Dockerfiles (`Dockerfile.dev`, `Dockerfile.prod`).
- `docker-compose.dev.yaml`: Optimized for developers (hot-reload, volumes).
- `docker-compose.prod.yaml`: Optimized for stability and performance.

---

## 🏗️ Stage 1: Development Environment

The goal of this stage is to allow developers to see changes in real-time without rebuilding the image.

### 1. Key Features:
- **Hot Reload**: Uses `nodemon` to watch for file changes inside the container.
- **Bind Mounts**: Maps the host `./app` folder to the container `/app` folder.
- **Dev Dependencies**: Installs all dependencies (including `devDependencies`).

### 2. How to Run:
From the `solution/` directory, run:
```bash
docker compose -f docker-compose.dev.yaml up --build
```

### 3. Verification:
- Open `http://localhost:3000`.
- Change a line in `app/src/app.js` (e.g., Change the `<h1>` color or text).
- Observe that the container automatically restarts and reflects the change.

---

## 🚀 Stage 2: Production Environment

The goal of this stage is to create a secure, immutable, and optimized image.

### 1. Key Features:
- **Clean Image**: Uses `Dockerfile.prod`.
- **Production Install**: Runs `pnpm install --production` to keep the image small.
- **Immutable**: No bind mounts. The code is copied INTO the image at build time.
- **Node Environment**: Runs with `node` directly (not nodemon).

### 2. How to Run:
From the `solution/` directory, run:
```bash
docker compose -f docker-compose.prod.yaml up --build -d
```
*(The `-d` flag runs it in the background/detached mode).*

### 3. Verification:
- Check that the application is running at `http://localhost:3000`.
- Notice that changes made to the local files will **NOT** be reflected in the container because the code is "frozen" inside the image.

---

## 🔐 Environment Variables

The application expects an `.env` file in the `app/` directory with the following variables:
```env
APP_PORT=3000
REDIS_HOST=redis_dev (or redis for prod)
REDIS_PORT=6379
```

Docker Compose maps these variables to the container automatically via the `env_file` directive in the YAML files.

---

## 🧹 Cleanup

To stop and remove everything created by this lab:
```bash
# For Dev
docker compose -f docker-compose.dev.yaml down -v

# For Prod
docker compose -f docker-compose.prod.yaml down -v
```
*(The `-v` flag removes the named volumes, clearing the Redis data).*
