---
description: Deploy latest main to production server for xpandia_project
---

> Execute these steps connected to the production server via SSH.
> Base path: `/home/ryzepeck/webapps/xpandia_project`
> Do NOT run locally.

# Deploy xpandia_project to Production

Run these steps on the production server at `/home/ryzepeck/webapps/xpandia_project` to deploy the latest `main` branch.

## Pre-Deploy

1. Quick status snapshot before deploy:
```bash
bash /home/ryzepeck/webapps/ops/vps/scripts/diagnostics/quick-status.sh
```

## Deploy Steps

2. Pull the latest code from main:
```bash
cd /home/ryzepeck/webapps/xpandia_project && git pull origin main
```

3. Install backend dependencies and run migrations:
```bash
cd /home/ryzepeck/webapps/xpandia_project/backend && source venv/bin/activate && pip install -r requirements.txt && DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod python manage.py migrate --noinput
```

4. Build the Next.js frontend (runs on its own service at port 3003):
```bash
source /home/ryzepeck/.nvm/nvm.sh && nvm use 20.19.4 && cd /home/ryzepeck/webapps/xpandia_project/frontend && npm ci && NEXT_PUBLIC_BACKEND_ORIGIN=https://xpandia.projectapp.co npm run build
```

5. Collect Django static files:
```bash
cd /home/ryzepeck/webapps/xpandia_project/backend && source venv/bin/activate && DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod python manage.py collectstatic --noinput
```

6. Restart services:
```bash
sudo systemctl restart xpandia_project xpandia-huey xpandia-frontend
```

## Post-Deploy Verification

7. Run post-deploy check for xpandia_project:
```bash
bash /home/ryzepeck/webapps/ops/vps/scripts/deployment/post-deploy-check.sh xpandia_project
```
Expected: PASS on all checks, FAIL=0.

8. HTTPS smoke test:
```bash
curl -sI https://xpandia.projectapp.co/
curl -s https://xpandia.projectapp.co/api/health/
```

9. If something fails, check the logs:
```bash
sudo journalctl -u xpandia_project.service --no-pager -n 30
sudo journalctl -u xpandia-huey.service --no-pager -n 30
sudo journalctl -u xpandia-frontend.service --no-pager -n 30
sudo tail -20 /var/log/nginx/error.log
```

## Architecture Reference

- **Domain**: `xpandia.projectapp.co`
- **Backend**: Django 6 (`base_feature_project` module, heredado del template). Settings: `DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod`
- **Frontend**: Next.js 16 en puerto 3003 como servicio independiente (`xpandia-frontend.service`)
- **Services**: `xpandia_project.service` (Gunicorn, socket `/run/xpandia_project.sock`), `xpandia-huey.service` (Huey, Redis DB 11), `xpandia-frontend.service` (Next.js)
- **Nginx**: `/etc/nginx/sites-available/xpandia_project` — `/api/`, `/admin/`, `/admin-gallery/` → gunicorn socket; resto → `127.0.0.1:3003`
- **Static**: `/home/ryzepeck/webapps/xpandia_project/backend/staticfiles/`
- **Media**: `/home/ryzepeck/webapps/xpandia_project/backend/media/`
- **Backups**: `/var/backups/xpandia_project/` (Huey runs dbbackup los domingos 04:30 UTC; retención 4 semanas)
- **Integraciones externas**: SMTP, Google OAuth, reCAPTCHA, PAYMENT_GATEWAY_KEY — actualmente SANDBOX/vacías. Migrar a prod cuando el cliente entregue claves.

## Notes

- VPS operations scripts viven en `/home/ryzepeck/webapps/ops/vps/scripts/`.
- `DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod` debe estar seteado para migrate y collectstatic (manage.py por defecto usa `settings_dev`).
- Git branch es `main`.
- Node v20.19.4 vía nvm para el frontend build.
- HUEY name es `xpandia_project` (Redis DB 11). Crontabs shifted para evitar colisiones con mimittos/tuhuella.
