# Xpandia

Xpandia is a bilingual marketing website and content-managed blog for a
language-assurance firm serving AI, SaaS, EdTech, and digital product teams.

## Technology

- Backend: Python 3.12, Django 6, Django REST Framework, MySQL, Redis, and Huey
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, and next-intl
- Tests: pytest, Jest, React Testing Library, and Playwright

## Project structure

```text
backend/                 Django API, admin, blog, migrations, and tests
frontend/                Next.js application, translations, assets, and tests
scripts/systemd/         Optional Huey service template
```

## Requirements

- Python 3.12
- Node.js 22 and npm
- MySQL 8 for production; local development can use SQLite
- Redis when running the Huey worker

## Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 127.0.0.1:8000
```

`manage.py` uses `base_feature_project.settings_dev` by default. Configure
production with environment variables from `backend/.env.example` and set
`DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod`.

## Frontend setup

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

The frontend starts at `http://localhost:3000` and proxies API requests to the
backend origin configured in `.env.local`.

## Verification

Backend:

```bash
cd backend
source venv/bin/activate
python manage.py check
pytest
```

Frontend:

```bash
cd frontend
npm run lint
npm test
npm run build
npx playwright test
```

Playwright starts the backend and frontend automatically. It expects the
backend virtual environment at `backend/venv`.

## Production services

- Run Django with `base_feature_project.settings_prod` behind a production
  WSGI server such as Gunicorn.
- Run the compiled Next.js application with `npm run build` and `npm start`.
- If background jobs are enabled, adapt `scripts/systemd/huey.service` to the
  production user and installation paths.
- Never commit `.env` files, credentials, database exports, or generated media.
