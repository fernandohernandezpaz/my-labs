# Lab 1: Optimizing Node.js Image Size with Multi-Stage Builds

### Context
Your team is deploying a React application. The current Docker image is over 1GB because it contains all the development dependencies (`node_modules`), build tools, and source code. This is causing slow deployments and consuming excessive storage in the container registry.

### The Issue
The current `Dockerfile` looks like this:
```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```
This image is suboptimal for production. You need to reduce the image size significantly by only including the production-ready assets and an efficient web server.

### Goal
Implement a multi-stage Dockerfile that builds the application and serves the static files using Nginx, resulting in an image smaller than 50MB.
