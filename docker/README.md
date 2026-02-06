# Docker & Containerization

Containerization is a fundamental skill for modern software design. It ensures consistency across environments, simplifies deployment, and enables microservices designs.

## Important Interview Questions & Answers

### 1. What is the difference between an Image and a Container?
**Answer:** An **Image** is a read-only template with instructions for creating a Docker container. It's like a class in OOP. A **Container** is a runnable instance of an image. It's like an object in OOP.

### 2. How does Docker differ from a Virtual Machine?
**Answer:** VMs include a full guest OS, which makes them heavy and slow to start. Docker containers share the host's OS kernel, making them lightweight, fast, and efficient in resource usage.

### 3. What is a multi-stage build and why should you use it?
**Answer:** A multi-stage build uses multiple `FROM` statements in a single Dockerfile. It allows you to use a heavy image for building/compiling code and a lightweight image (like Alpine) for the final runtime, significantly reducing the image size and attack surface.

### 4. What is the purpose of `docker-compose.yml`?
**Answer:** It's a YAML file used to define and run multi-container Docker applications. It allows you to configure your application's services, networks, and volumes in a single file and start everything with `docker-compose up`.

### 5. How do you handle persistent data in Docker?
**Answer:** Using **Volumes** or **Bind Mounts**. Volumes are managed by Docker and are the preferred way, while bind mounts depend on the directory structure of the host machine.

### 6. Is there a difference between deploying containers one by one vs `docker-compose up`?
**Answer:** Yes. `docker run` (one-by-one) is imperative and requires you to manually manage networking, volumes, and links for every container. `docker-compose` is **declarative**; it creates a dedicated network automatically, allows for service discovery by DNS name (e.g., `web` can talk to `db`), and manages the lifecycle of the entire application stack as a single unit.

### 7. When is it better to use one approach over the other?
**Answer:** 
- **Use `docker run`** for quick testing, one-off tasks (like running a migration), or simple automation in CI/CD scripts where only one container is needed.
- **Use `docker-compose`** for local development, multi-service applications (app + db + cache), and small-scale production environments. It ensures everyone on the team runs the exact same stack.

### 8. Given that both are valid, are `docker run` and `docker-compose` the only ways to deploy in production?
**Answer:** No. While Docker Compose is valid for small, single-server setups, professional production environments prioritize **High Availability (HA)** and **Scalability**. Large-scale systems require **Orchestrators** (like Kubernetes, AWS ECS, or HashiCorp Nomad) because they provide:

- **Self-Healing:** If a container crashes or the underlying hardware fails, the orchestrator automatically restarts the container on a healthy server.
- **Horizontal Auto-Scaling:** It can dynamically increase or decrease the number of running containers based on CPU/RAM usage or traffic volume.
- **Zero-Downtime Deployments:** It performs "Rolling Updates," replacing old versions with new ones one at a time so the application is always available.
- **Service Discovery & Internal Load Balancing:** It manages how containers talk to each other and distributes external traffic across all available replicas.
- **Managed Services:** Many companies prefer "Serverless Containers" (AWS Fargate, Google Cloud Run) to get these benefits without the operational burden of managing the servers themselves.
