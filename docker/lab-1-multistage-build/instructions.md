# Instructions: Building and Running Docker Images

In this lab, we compare two ways of containerizing a React application. You can build and run both to see the difference in image size and efficiency.

---

## 1. The Optimized Image (Multi-Stage)
This is the recommended way. It uses two stages: one to build the app and another to serve it using Nginx.

### Build the Image
Navigate to the `react-example` directory and run:
```bash
docker build -t react-app:optimized -f Dockerfile .
```

### Run the Container
```bash
docker run -p 90:90 react-app:optimized
```
*You can then access the app at `http://localhost:90`.*

---

## 2. The Bloated Image (Single-Stage)
This image contains the entire source code and build tools, making it much larger and less secure.

### Build the Image
Navigate to the `react-example` directory and run:
```bash
docker build -t react-app:bloated -f Dockerfile.bloated .
```

### Run the Container
```bash
docker run -p 4173:4173 react-app:bloated
```
*You can then access the app at `http://localhost:4173`.*

---

## How to Compare the Images
After building both, compare their sizes using this command:

```bash
docker images | grep react-app
```

You will notice that the `bloated` version is several hundred megabytes, while the `optimized` version is likely less than 30MB.
