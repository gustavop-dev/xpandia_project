# Xpandia

> Boutique language assurance for AI, SaaS and EdTech — structured Spanish/LatAm quality review, measurable scoring, and senior oversight.

Xpandia helps product, AI and localization teams validate and improve Spanish/LatAm quality across AI outputs, digital experiences and localization operations. The deliverable is always evidence, not opinions.

- Public site: marketing + service pages (`/`, `/about`, `/services`, `/contact`).
- Backend: Django + DRF providing auth, user management and captcha verification.
- Frontend: Next.js 16 + React 19 + TypeScript + Tailwind + GSAP animations.
- Contact: `hello@xpandia.co`

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Backend Details](#backend-details)
- [Frontend Details](#frontend-details)
- [Testing](#testing)
- [Quality & Tooling](#quality--tooling)

---

## Tech Stack

### Backend

| Layer | Tech |
|-------|------|
| Framework | Django 6.0 + Django REST Framework 3.16 |
| Auth | `djangorestframework-simplejwt` (JWT access + refresh) |
| DB | MySQL 8 |
| Queue | Huey + Redis (scheduled backups, silk garbage collection, slow-query reports) |
| Profiling | django-silk (opt-in via `ENABLE_SILK`) |
| Backup | django-dbbackup (scheduled) |
| Files | django-attachments + easy-thumbnails + django-cleanup |
| Testing | pytest, pytest-django, pytest-cov, factory-boy, Faker |
| Lint | Ruff |

### Frontend

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animations | GSAP + ScrollTrigger |
| State | Zustand (persisted where needed) |
| HTTP | Axios with JWT refresh interceptors |
| i18n | next-intl (`en` / `es`) |
| Unit tests | Jest 30 + React Testing Library |
| E2E | Playwright 1.58 (flow-tagged) |
| Lint | ESLint 9 |

---

## Project Structure

```
xpandia_project/
├── backend/
│   ├── base_feature_project/    # Django project root (settings, URLs, WSGI/ASGI, scheduled tasks)
│   ├── base_feature_app/        # Main app (User, PasswordCode, auth, captcha, admin)
│   ├── requirements.txt
│   └── manage.py
├── frontend/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx             # Home
│   │   ├── about/               # About page
│   │   ├── contact/             # Contact page
│   │   └── services/            # Services overview + QA / Audit / Fractional
│   ├── components/
│   │   ├── layout/              # XpandiaHeader, XpandiaFooter, FABContact
│   │   └── animations/          # SiteAnimations (GSAP)
│   ├── lib/                     # services, stores, hooks, constants, i18n config
│   ├── e2e/                     # Playwright flows (public/, helpers/, reporters/)
│   └── package.json
├── docs/                        # Architecture, testing, quality standards, Memory Bank
├── scripts/                     # Global test runner, quality gate, CI helpers
├── .github/workflows/           # CI pipelines
├── CLAUDE.md                    # Project identity + rules for Claude Code
└── README.md
```

> The Django project and app folders keep the scaffold names `base_feature_project` / `base_feature_app` on purpose — they are treated as neutral infrastructure containers rather than domain labels.

---

## Quick Start

### Prerequisites

- Python 3.11+, Node.js 20+, MySQL 8, Redis 7
- A MySQL database created for the project
- Copies of `.env.example` filled in as `backend/.env` and `frontend/.env.local`

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# DB bootstrap
python manage.py migrate
python manage.py createsuperuser

# Run
python manage.py runserver 127.0.0.1:8000
```

Default dev settings module: `base_feature_project.settings_dev`.
Production: `DJANGO_SETTINGS_MODULE=base_feature_project.settings_prod`.

### Frontend

```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

### Health checks

- Backend: `GET http://127.0.0.1:8000/api/health/` → `{"status": "ok"}`
- Frontend: `http://localhost:3000/`

---

## Backend Details

### Apps

- `base_feature_app` — houses the custom `User` model (email-based, CUSTOMER/ADMIN roles), `PasswordCode` (6-digit reset codes with 15-min TTL), auth flows, user CRUD, reCAPTCHA verification and admin customizations (including "login as" for superusers).
- `django_attachments` — file/image management (kept available for future media use).
- `huey.contrib.djhuey`, `silk`, `dbbackup`, `django_cleanup` — operational infrastructure.

### API Surface

| Method | Path | Purpose |
|--------|------|---------|
| `GET`  | `/api/health/` | Liveness check |
| `POST` | `/api/token/` | Obtain JWT pair |
| `POST` | `/api/token/refresh/` | Refresh JWT access token |
| `POST` | `/api/sign_up/` | User registration (reCAPTCHA) |
| `POST` | `/api/sign_in/` | Email + password login |
| `POST` | `/api/google_login/` | Google OAuth login |
| `POST` | `/api/send_passcode/` | Send password reset code via email |
| `POST` | `/api/verify_passcode_and_reset_password/` | Reset password using code |
| `POST` | `/api/update_password/` | Update password (authenticated) |
| `POST` | `/api/validate_token/` | Validate JWT |
| `POST` | `/api/google-captcha/verify/` | Verify reCAPTCHA token |
| `GET/POST/PUT/DELETE` | `/api/users/` + `/api/users/<id>/` | User management (staff) |

### Scheduled tasks (Huey)

- `scheduled_backup` — day 1 and day 21, 03:00 (DB + media backup, 90-day retention).
- `silk_garbage_collection` — daily 04:00 (prune silk profiling data older than 7 days).
- `weekly_slow_queries_report` — Mondays 08:00 (aggregated slow-query + N+1 log report).

### Management commands

Located in `base_feature_app/management/commands/`:

```bash
python manage.py create_users 15             # Generate fake users (password123)
python manage.py create_fake_data 20         # Wrapper — creates users
python manage.py delete_fake_data --confirm  # Removes non-staff users safely
```

---

## Frontend Details

### Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, methodology, services grid, scorecard preview, audience fit, CTA |
| `/about` | Founder story + company values |
| `/contact` | Booking + contact form |
| `/services` | Services overview |
| `/services/qa` | AI Spanish QA Sprint (10 business days) |
| `/services/audit` | Spanish Launch Readiness Audit (10–12 business days) |
| `/services/fractional` | Fractional Language Quality Lead (monthly retainer) |

### State management

- `localeStore` — persisted `en`/`es` preference.

### Styling

- Tailwind CSS 4 utility classes, mobile-first responsive design.
- Custom CSS tokens in `app/globals.css` (fonts, scorecard widget, num-list, form fields, etc.).
- GSAP-driven entrance animations in `components/animations/SiteAnimations.tsx`.

---

## Testing

### Backend

```bash
cd backend
source venv/bin/activate
pytest                                         # all suites
pytest base_feature_app/tests/views -v         # views only
pytest --cov=base_feature_app                  # coverage report
```

Quality constraints:
- One behavior per test, AAA pattern, no conjunctions in test names.
- Mock only at system boundaries (external APIs, clock, email).

### Frontend — unit

```bash
cd frontend
npm test                               # Jest + RTL
npm run test:coverage                  # coverage + summary
```

Thresholds (from `docs/TESTING_QUALITY_STANDARDS.md`): stores 75%, components 60%, utils 90%.

### Frontend — E2E

```bash
cd frontend
npx playwright test                    # all flows
npx playwright test e2e/public/smoke.spec.ts
```

Every spec must carry `@flow:<flow-id>` tags. Flow registry: `e2e/flow-definitions.json`.

### Global

```bash
python scripts/run-tests-all-suites.py            # sequential
python scripts/run-tests-all-suites.py --parallel # parallel backend + unit + e2e
python scripts/run-tests-all-suites.py --resume   # only re-run failed suites
```

---

## Quality & Tooling

- `scripts/test_quality_gate.py` — semantic test quality gate (naming, assertions, structure).
- `.pre-commit-config.yaml` — runs the quality gate on staged test files.
- `.github/workflows/ci.yml` — lint + backend tests + frontend unit + E2E + coverage.
- `.github/workflows/test-quality-gate.yml` — standalone quality gate check.

Reference docs (see `docs/`):

- `DJANGO_REACT_ARCHITECTURE_STANDARD.md`
- `TESTING_QUALITY_STANDARDS.md`
- `BACKEND_AND_FRONTEND_COVERAGE_REPORT_STANDARD.md`
- `E2E_FLOW_COVERAGE_REPORT_STANDARD.md`
- `TEST_QUALITY_GATE_REFERENCE.md`
- `GLOBAL_RULES_GUIDELINES.md`
- `USER_FLOW_MAP.md`
- `methodology/` (Memory Bank files)
