---
trigger: manual
description: Tech stack, dev setup, environment configuration, design patterns, and technical constraints for Xpandia.
---

# Technical — Xpandia

## 1. Tech Stack

### Backend
| Package | Version |
|---------|---------|
| Python | 3.x |
| Django | 6.0.2 |
| Django REST Framework | 3.16.1 |
| djangorestframework-simplejwt | 5.5.1 |
| django-cors-headers | 4.9.0 |
| Huey (Redis task queue) | ≥2.5.0 |
| redis | ≥4.0.0 |
| Pillow | 12.1.1 |
| easy-thumbnails | 2.10.1 |
| django-cleanup | 9.0.0 |
| django-silk | ≥5.0.0 (profiling) |
| django-dbbackup | ≥4.0.0 |
| python-dotenv | 1.2.1 |
| Faker | 40.5.1 |
| Factory Boy | 3.3.3 |
| pytest + pytest-django + pytest-cov | 9.0.2 / 4.12 / 7.0 |
| gunicorn | ≥23.0,<24.0 (prod) |
| mysqlclient | ≥2.2,<3.0 (prod) |
| Database | MySQL 8 (prod) / SQLite (dev) |

### Frontend
| Package | Version |
|---------|---------|
| Node.js | LTS |
| Next.js | 16.1.6 |
| React | 19.2.4 |
| TypeScript | ≥5 |
| Tailwind CSS | 4.2.1 |
| GSAP + @gsap/react | 3.15.0 / 2.1.2 |
| Zustand | 5.0.11 |
| Axios | 1.13.5 |
| next-intl | 4.8.3 |
| lucide-react | 1.8.0 |
| js-cookie | 3.0.5 |
| jwt-decode | 4.0.0 |
| react-google-recaptcha | 3.1.0 |
| @react-oauth/google | 0.13.4 |
| Jest | 30.2.0 |
| @testing-library/react | 16.3.2 |
| @playwright/test | 1.58.2 |

---

## 2. Project Structure

```
xpandia_project/
├── backend/
│   ├── base_feature_project/      # Django project root (settings, urls, wsgi)
│   │   ├── settings.py            # Base settings (env-driven)
│   │   ├── settings_dev.py        # Dev overrides
│   │   ├── settings_prod.py       # Prod overrides
│   │   ├── tasks.py               # Huey task definitions
│   │   └── urls.py                # Root URL conf
│   ├── base_feature_app/          # Main Django app
│   │   ├── models/                # user.py, password_code.py
│   │   ├── views/                 # auth.py, user_crud.py, captcha_views.py
│   │   ├── serializers/           # user_create_update.py, user_detail.py, user_list.py
│   │   ├── services/              # email_service.py
│   │   ├── urls/                  # auth.py, user.py, captcha.py, __init__.py
│   │   ├── forms/                 # Django admin forms
│   │   ├── management/commands/   # create_fake_data.py, delete_fake_data.py
│   │   ├── migrations/            # 2 migration files
│   │   └── tests/                 # 20 test files
│   ├── django_attachments/        # File attachment model
│   └── venv/                      # Python virtualenv
├── frontend/
│   ├── app/                       # Next.js App Router
│   │   ├── page.tsx               # Home
│   │   ├── layout.tsx             # Root layout (Header, Footer, FAB, Animations)
│   │   ├── providers.tsx          # Client providers wrapper
│   │   ├── globals.css            # Global styles + Tailwind + design tokens
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx       # Client — contact form
│   │   └── services/              # page.tsx, qa/, audit/, fractional/
│   ├── components/
│   │   ├── layout/                # XpandiaHeader.tsx, XpandiaFooter.tsx, FABContact.tsx
│   │   └── animations/            # SiteAnimations.tsx (GSAP)
│   ├── lib/
│   │   ├── constants.ts           # ROUTES, PAGINATION
│   │   ├── utils.ts               # cn() class merger
│   │   ├── types.ts               # UserListItem type
│   │   ├── i18n/config.ts         # Locale config (en, es)
│   │   ├── stores/localeStore.ts  # Zustand locale store
│   │   └── services/              # http.ts (Axios), tokens.ts (cookies)
│   ├── e2e/                       # Playwright E2E tests
│   ├── scripts/                   # Coverage utils, E2E module helpers
│   ├── jest.config.cjs
│   ├── jest.setup.ts
│   └── playwright.config.ts
├── docs/
│   ├── methodology/               # Memory Bank files (7 core files)
│   └── TESTING_QUALITY_STANDARDS.md
└── tasks/                         # tasks_plan.md, active_context.md, rfc/
```

---

## 3. Dev Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # fill in vars
python manage.py migrate
python manage.py create_fake_data   # seed data
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev                   # starts on :3000
```

### Environment Variables (Backend)
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG` (default: true)
- `DJANGO_ALLOWED_HOSTS`
- `DATABASE_URL`
- `REDIS_URL`
- `EMAIL_*` (SMTP config)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `RECAPTCHA_SECRET_KEY`
- `ENABLE_SILK` (profiling toggle)

### Environment Variables (Frontend)
- `NEXT_PUBLIC_API_URL` — backend API base URL
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

---

## 4. Design Patterns

### Backend
- **Function-Based Views**: All DRF views use `@api_view` decorators — no CBVs
- **Service Layer**: Business logic in `services/` (e.g., `email_service.py`)
- **Auth**: JWT via SimpleJWT + Google OAuth + email/passcode password reset
- **Task Queue**: Huey + Redis for async tasks (email sending, etc.)
- **Custom Admin**: `admin_site` instance separate from default Django admin

### Frontend
- **Server Components first**: Pages default to RSC; `'use client'` only when needed
- **cn() utility**: All conditional Tailwind class merging via `lib/utils.ts`
- **GSAP animations**: `SiteAnimations.tsx` runs one-time scroll-triggered reveals; respects `prefers-reduced-motion`
- **Auth tokens**: Stored in cookies via `lib/services/tokens.ts`; Axios interceptor auto-refreshes on 401
- **i18n**: Zustand `localeStore` persists `en`/`es` preference in localStorage; `next-intl` integration ready
- **No Pinia**: State management is Zustand (not Pinia, which is a Vue concept)

---

## 5. Test Strategy

### Backend (pytest)
- **Framework**: pytest + pytest-django + pytest-cov + factory-boy
- **Run**: `source venv/bin/activate && pytest backend/base_feature_app/tests/<file> -v`
- **Never run the full suite** — always specify file(s)
- **Max 20 tests per batch, 3 commands per cycle**
- **conftest.py**: Custom Unicode progress-bar coverage reporter; `api_client` fixture

### Frontend Unit (Jest)
- **Framework**: Jest 30 + React Testing Library 16 + jest-environment-jsdom
- **Run**: `npm test -- <file>`
- **Coverage**: 96.81% stmts / 98.59% branches / 86.84% funcs (as of 2026-04-24)
- **19 test files, 134 tests** passing
- **Mocks in jest.setup.ts**: `next/image`, `next/link`

### Frontend E2E (Playwright)
- **Framework**: Playwright 1.58 + custom flow-coverage reporter
- **Run**: `npx playwright test e2e/public/<file>`
- **4 spec files**: smoke, navigation, services, static-pages
- **Tags required**: `@flow:<id>` per test
- **Config**: Single worker; Django :8000 + Next.js :3000

---

## 6. Staging & Deployment

**Not provisioned yet.** The `deploy-staging` skill has placeholder variables that must be filled before use:
- `<XPANDIA_STAGING_PATH>`
- `<XPANDIA_STAGING_DOMAIN>`
- `<XPANDIA_STAGING_SERVICE>`
- `<XPANDIA_STAGING_HUEY_SERVICE>`
