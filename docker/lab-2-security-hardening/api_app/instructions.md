# Lab 2: Security Hardening Instructions

This lab demonstrates the importance of **Least Privilege** and **Immutability** in Docker. We compare a standard "vulnerable" setup with a "hardened" setup.

---

## 1. The Vulnerable Image (Before)
This image runs as **root** (default) and grants full ownership of the application folder to the process.

### Build and Run
```bash
docker build -f Dockerfile.vulnerability -t app:vulnerable .
docker run --rm --name app_vulnerable -p 3000:3000 app:vulnerable
```

---

## 2. The Hardened Image (After)
This image implements:
- **Multi-stage build**: Minimal final image.
- **Non-root user**: The process runs as `appuser`.
- **Immutability**: Source code is owned by `root`, preventing the application from deleting its own files.

### Build and Run
```bash
docker build -f Dockerfile.protected -t app:protected .
docker run --rm --name app_protected -p 3000:3000 app:protected
```

---

## 3. Exploit Comparison (The "Cheat Sheet")

Use these `curl` requests to see how the security hardening protects your system.

### Test A: Who am I?
Check the identity of the user running the process.
```bash
curl "http://localhost:3000/api/exec-vulnerability?cmd=whoami"
```
- **Vulnerable**: Returns `root`.
- **Protected**: Returns `appuser`.

### Test B: The System Attack
Try to create a file in the system root directory (`/`).
```bash
curl "http://localhost:3000/api/exec-vulnerability?cmd=touch%20/HACKED.txt"
```
- **Vulnerable**: Returns success (empty error). You can verify with `ls /`.
- **Protected**: Returns `error: "permission denied"`.

### Test C: The Denial of Service (DoS) Attack
Try to delete the application's own source code.
```bash
curl "http://localhost:3000/api/exec-vulnerability?cmd=rm%20src/app.js"
```
- **Vulnerable**: Returns success. The app will likely crash or stop working immediately.
- **Protected**: Returns `error: "permission denied"`. Even though the app has a bug, it cannot destroy itself because it doesn't own the files.

---

## Summary of Hardening Techniques
1. **Never run as root**: Limits the "blast radius" of an exploit.
2. **Use Multi-stage builds**: Reduces the tools (like `pnpm`, `gcc`, `git`) available to an attacker.
3. **Don't chown everything**: If the app user doesn't own the source code, they can't delete it or modify it (Immutability).
