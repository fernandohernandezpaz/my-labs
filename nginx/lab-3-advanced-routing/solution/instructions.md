# Lab 3: Advanced Nginx Routing & Django Deployment

This solution includes 4 different "flavors" of Nginx and Docker orchestration. Follow the instructions below to test each one individually.

---

## 🛠 Prerequisites

### 1. Hosts File
Before testing any flavor, ensure your local `/etc/hosts` file includes these domains:
```bash
echo "127.0.0.1 blog.domain.local shop.domain.local blog.example.local" | sudo tee -a /etc/hosts
```

### 2. Environment Variables (`.env`)
The Django application relies on the `.env` file for secrets and security settings.
*   **Production vs Dev:** Ensure `DEBUG=False` for production-like testing.
*   **HTTPS Support:** If using a **Secure Flavor (3 or 4)**, the `.env` should ideally have `HTTP_X_FORWARDED_PROTO=https`.
*   **Security:** `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` must match the domains you are testing.

---

## 📂 Testing Flavors

### 🟢 Flavor 1: Single Nginx File (Standard HTTP)
*Best for: Simple projects and learning.*
*   **Run:** `docker compose -f docker-compose.onefile.yaml up --build`
*   **Test URL:** [http://blog.example.local/](http://blog.example.local/)
*   **What it does:** Uses one `nginx.conf` file to handle multiple server blocks on port 80.

### 🟡 Flavor 2: Multiple Nginx Files (Standard HTTP)
*Best for: Managing many sites independently.*
*   **Run:** `docker compose -f docker-compose.multifiles.yaml up --build`
*   **Test URL:** [http://blog.example.local/](http://blog.example.local/)
*   **What it does:** Uses a main `nginx.conf` that "includes" separate `.conf` files from a `sites-enabled/` directory.

### 🔒 Flavor 3: Single Nginx File (Secure HTTPS)
*Best for: Local development of secure features (sessions, CSRF).*
*   **Run:** `docker compose -f docker-compose.onefilesecure.yaml up --build`
*   **Manual Step:** You MUST generate self-signed SSL certs first (see `infra/nginx/ssl/create-ssl.txt`).
*   **Test URL:** [https://blog.domain.local/](https://blog.domain.local/)
*   **Pro Tip:** Your browser will show a warning. Click **Advanced** -> **Proceed** (or type `thisisunsafe`).

### 🟠 Flavor 4: Multiple Nginx Files (Secure HTTPS)
*Best for: Realistic production-like setups with multiple sites.*
*   **Run:** `docker compose -f docker-compose.multifilessecure.yaml up --build`
*   **Test URL:** [https://blog.example.local/](https://blog.example.local/)
*   **Note:** Similar to Flavor 3, but uses the split-file architecture.

---

## 🧹 Housekeeping

Between switching flavors, it is highly recommended to "clean" your environment to avoid port or volume conflicts:

```bash
# Stop all running containers and remove networks
docker compose -f [FLAVOR_FILE] down
```

---

## 🔗 Key Endpoints
Once a flavor is running, you can access these common paths:
- **Root Redirect:** `/` (Redirects to Login if configured)
- **Admin Login:** `/admin/login/`
- **Static Files:** `/static/admin/css/base.css`
- **Media Files:** `/media/`
