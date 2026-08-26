---
trigger: manual
description: Tech stack, dev setup, environment configuration, design patterns, and technical constraints for Xpandia.
---

# Technical — Xpandia

_Last verified: 2026-08-26_

## 1. Tech Stack

### Backend
| Package | Version |
|---------|---------|
| Python | 3.12 |
| Django | 6.0.8 |
| Django REST Framework | 3.18.0 |
| djangorestframework-simplejwt | 5.5.1 |
| django-cors-headers | 4.9.0 |
| Huey (Redis task queue) | ≥2.5.0 |
| redis | ≥4.0.0 |
| Pillow | 12.2.0 |
| easy-thumbnails | 2.10.1 |
| django-cleanup | 9.0.0 |
| django-silk | ≥5.0.0 (profiling, opt-in via `ENABLE_SILK`) |
| django-dbbackup | ≥4.0.0 |
| python-decouple | (env reader) |
| Faker | 40.5.1 |
| Factory Boy | 3.3.3 (installed but unused — project uses `.objects.create()` directly) |
| pytest + pytest-django + pytest-cov | 9.0.3 / 4.12.0 / 7.1.0 |
| gunicorn | ≥23.0,<24.0 (prod) |
| mysqlclient | ≥2.2,<3.0 (prod) |
| Database | MySQL 8 (prod) / SQLite (dev via `settings_dev`) |

### Frontend
| Package | Version |
|---------|---------|
| Node.js | 20+ |
| Next.js | 16.2.4 |
| React | 19.2.5 |
| TypeScript | ≥5 |
| Tailwind CSS | 4.2.4 |
| GSAP + @gsap/react | 3.x |
| Zustand | 5.0.12 |
| Axios | 1.x |
| next-intl | installed, **not yet wired** |
| lucide-react | latest |
| js-cookie | 3.0.5 |
| jwt-decode | 4.0.0 |
| react-google-recaptcha | 3.1.0 |
| @react-oauth/google | 0.13.4 |
| Jest | 30.3.0 |
| @testing-library/react | 16.3.2 |
| @testing-library/user-event | 14.6.1 |
| @playwright/test | 1.59.1 |

---

## 2. Project Structure

```
xpandia_project_staging/
├── backend/
│   ├── base_feature_project/          # Django project root
│   │   ├── settings.py                # Base — env-driven, MySQL by default
│   │   ├── settings_dev.py            # SQLite override; manage.py points here by default
│   │   ├── settings_prod.py           # Prod overrides
│   │   └── urls.py                    # Root URL conf (8 path entries)
│   ├── base_feature_app/              # Auth & user-management app
│   │   ├── models/                    # user.py, password_code.py
│   │   ├── views/                     # auth.py, user_crud.py, captcha_views.py, contact.py
│   │   ├── serializers/               # user_*.py, contact.py
│   │   ├── services/                  # email_service.py
│   │   ├── urls/                      # auth.py, user.py, captcha.py, contact.py, __init__.py
│   │   ├── forms/                     # Admin forms
│   │   ├── management/commands/       # create_fake_data.py, create_users.py, delete_fake_data.py
│   │   ├── migrations/                # 2 files
│   │   └── tests/                     # 20 test files
│   ├── blog/                          # Bilingual blog app (added 2026-05-07)
│   │   ├── models.py                  # BlogPost (es/en title/excerpt/content_json, cover, category, author, is_published, published_at, auto-slug)
│   │   ├── admin.py                   # BlogPostAdmin (registered under "📝 Content" section)
│   │   ├── serializers.py             # ListSerializer, DetailSerializer, _get_lang() helper
│   │   ├── views.py                   # FBV: list_blog_posts, retrieve_blog_post (AllowAny)
│   │   ├── urls.py                    # 2 paths
│   │   ├── apps.py
│   │   ├── management/commands/       # seed_blog_e2e.py (idempotent, 12 published + 1 draft)
│   │   ├── migrations/                # 0001_initial.py
│   │   └── tests/                     # 5 test files, 25 tests
│   ├── django_attachments/            # Generic file attachment model
│   ├── pytest.ini                     # testpaths includes blog/tests; --cov=base_feature_app --cov=blog
│   ├── conftest.py                    # Custom Unicode coverage reporter
│   └── venv/
├── frontend/
│   ├── app/                           # Next.js App Router (9 routes)
│   │   ├── page.tsx                   # Home
│   │   ├── layout.tsx                 # Root layout
│   │   ├── providers.tsx              # Client providers wrapper (passthrough)
│   │   ├── globals.css                # Design tokens (--color-accent #2B8CC4, --color-ink-*, --color-paper)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx           # Client — contact form
│   │   ├── services/                  # page.tsx + qa/, audit/, fractional/
│   │   └── blog/                      # page.tsx (list, RSC) + [slug]/page.tsx (detail, RSC)
│   ├── components/
│   │   ├── layout/                    # XpandiaHeader, XpandiaFooter, FABContact
│   │   ├── animations/                # SiteAnimations (GSAP)
│   │   └── blog/                      # BlogCard, BlogPagination, BlogLanguageToggle, BlogContentRenderer
│   ├── lib/
│   │   ├── constants.ts               # ROUTES, PAGINATION { DEFAULT_PAGE_SIZE: 20, BLOG_PAGE_SIZE: 9 }
│   │   ├── utils.ts                   # cn() class merger
│   │   ├── types.ts                   # UserListItem
│   │   ├── i18n/config.ts             # SUPPORTED_LOCALES, DEFAULT_LOCALE, isValidLocale, formatLocaleDate
│   │   ├── stores/localeStore.ts      # Zustand locale store
│   │   └── services/                  # http.ts, tokens.ts, contact.ts, blog.ts (server-side, React.cache wrapped)
│   ├── e2e/                           # 6 spec files + global-setup + flow-definitions + helpers + reporters
│   ├── jest.config.cjs
│   ├── jest.setup.ts
│   ├── playwright.config.ts           # baseURL :3004, globalSetup runs seed_blog_e2e
│   └── next.config.ts                 # Rewrites /api/* → backend
├── docs/
│   ├── methodology/                   # Memory Bank (this folder)
│   └── *.md                           # Standards documents
└── tasks/                             # tasks_plan.md, active_context.md, rfc/
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
python manage.py migrate      # uses settings_dev → SQLite by default
python manage.py runserver
```

`manage.py` defaults `DJANGO_SETTINGS_MODULE` to `base_feature_project.settings_dev` (SQLite). Use `DJANGO_SETTINGS_MODULE=base_feature_project.settings` only for production-like behavior.

### Frontend
```bash
cd frontend
npm install
npm run dev                   # starts on :3000 (Playwright config uses :3004)
```

### Environment Variables (Backend)
- `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `DJANGO_ALLOWED_HOSTS`
- `DJANGO_DB_ENGINE` (default sqlite3 — overridden by `settings_dev` to sqlite, by prod env to mysql)
- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` (only when engine ≠ sqlite)
- `REDIS_URL`
- `EMAIL_*` (SMTP)
- `DJANGO_GOOGLE_CLIENT_ID`, `RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`
- `ENABLE_SILK` (profiling toggle)
- `FRONTEND_URL`

### Environment Variables (Frontend)
- `NEXT_PUBLIC_BACKEND_ORIGIN` — server-side absolute URL (e.g. `http://localhost:8000`); used by `lib/services/blog.ts` from Server Components
- `NEXT_PUBLIC_API_BASE_URL` / `NEXT_PUBLIC_API_URL` — client-side base for Axios in `lib/services/http.ts` (defaults to `/api` via Next rewrite)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

---

## 4. Design Patterns

### Backend
- **Function-Based Views** with `@api_view` — no CBVs unless explicitly requested
- **Service layer** for business logic (`services/email_service.py`)
- **Auth**: JWT via SimpleJWT + Google OAuth + email passcode reset
- **Task queue**: Huey + Redis (immediate=True in dev)
- **Custom admin**: `BaseFeatureAdminSite` with grouped sections (👥 User Management, 📝 Content)
- **Bilingual content**: paired fields `*_es` / `*_en`; serializer's `_get_lang()` helper resolves from `request.query_params.get('lang')` (default `'en'` for Xpandia)
- **Auto-slug** on save (`BlogPost.save()` derives from `title_en` with collision counter)

### Frontend
- **Server Components first**: `'use client'` only when needed (header drawer, contact form, animations)
- **Server-side fetchers**: `lib/services/blog.ts` uses native `fetch` + `next: { revalidate: 60 }` (ISR), wrapped in `React.cache()` to deduplicate `generateMetadata` + page-component pair
- **Client-side fetchers**: `lib/services/http.ts` uses Axios with JWT refresh interceptor; only for client components
- **Two distinct base URLs**: server-side reads `NEXT_PUBLIC_BACKEND_ORIGIN` (absolute); client-side reads `NEXT_PUBLIC_API_BASE_URL` (relative `/api`, proxied via Next rewrites)
- **i18n helpers**: `isValidLocale(str)` type-guard, `formatLocaleDate(iso, lang, opts)` — currently used by blog only; full next-intl wiring is a backlog item
- **`cn()` utility** for all conditional Tailwind class merging
- **GSAP animations**: `SiteAnimations.tsx` runs scroll-triggered reveals; respects `prefers-reduced-motion`
- **State**: Zustand only (no Pinia — that's a Vue concept)

---

## 5. Test Strategy

### Backend (pytest)
- Framework: pytest + pytest-django + pytest-cov + custom Unicode reporter
- pytest.ini: `DJANGO_SETTINGS_MODULE = base_feature_project.settings` (MySQL by default — override for tests)
- testpaths: `base_feature_app/tests`, `blog/tests`, `django_attachments`
- Run: `cd backend && source venv/bin/activate && DJANGO_DB_ENGINE=django.db.backends.sqlite3 DJANGO_DB_NAME=':memory:' pytest blog/tests/ -v`
- **Max 20 tests/batch, 3 commands/cycle**, never the full suite
- Conftest fixtures: `api_client`, `existing_user`, `admin_user`, `authenticated_client`, `admin_client`
- Blog test suite: 25 tests (5 files: models, serializers, views_list, views_detail, admin) — coverage 100% models/admin/views/urls, ~89% serializers
- Total backend test files: 25 (20 base_feature_app + 5 blog)

### Frontend Unit (Jest)
- Framework: Jest 30 + RTL 16 + jsdom
- Run: `npm test -- <file>` from `frontend/`
- 24 test files, 134+ tests passing
- jest.setup.ts mocks: `next/image`, `next/link` (global). `next/navigation` mocked per-test.
- For `React.cache()`: `jest.mock('react', () => ({ ...jest.requireActual('react'), cache: (fn) => fn }))`
- For raw `fetch`: `global.fetch = jest.fn()` + `mockResolvedValueOnce`
- For env vars in modules: `jest.isolateModules()` + reset env in `beforeEach`/`afterEach`

### Frontend E2E (Playwright)
- Framework: Playwright 1.59 + custom flow-coverage reporter (`e2e/reporters/flow-coverage-reporter.mjs`)
- 6 spec files: `smoke`, `navigation`, `services`, `interactions`, `static-pages`, `blog`
- Tags required: `[...FLOW_CONST]` per test — sourced from `e2e/helpers/flow-tags.ts`, defined in `e2e/flow-definitions.json`
- Config: `baseURL: http://localhost:3004`, `workers: 1`, two webServers (Django :8000, Next :3004)
- `globalSetup: e2e/global-setup.ts` runs `python manage.py seed_blog_e2e` via `execFileSync` (not `exec`/`execSync` — safer)
- `E2E_REUSE_SERVER=1` reuses existing dev servers; max 2 spec files per `playwright test` invocation; never `waitForTimeout`

---

## 6. Staging & Deployment

### Production database compatibility

- Production currently runs MySQL 8.0.x.
- Django must remain on the latest 6.0.x patch while that database version is in use.
- Django 6.1 requires MySQL 8.4 or later and must not be selected by dependency
  refreshes until the production database has been upgraded and verified.

**Not provisioned yet.** The `deploy-staging` skill has placeholder variables that must be filled before use:
- `<XPANDIA_STAGING_PATH>`
- `<XPANDIA_STAGING_DOMAIN>`
- `<XPANDIA_STAGING_SERVICE>`
- `<XPANDIA_STAGING_HUEY_SERVICE>`
