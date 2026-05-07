---
trigger: manual
description: Project intelligence and lessons learned. Reference for project-specific patterns, preferences, and key insights discovered during development.
---

# Lessons Learned — Xpandia

This file captures important patterns, preferences, and project intelligence that help work more effectively with this codebase. Updated as new insights are discovered.

---

## 1. Architecture Patterns

### Public Scope (as of 2026-05-07)
- Marketing site: `/`, `/about`, `/contact`, `/services` (+ `/services/qa`, `/services/audit`, `/services/fractional`).
- **Bilingual blog**: `/blog`, `/blog/[slug]` — content-managed via Django admin, consumed bilingually via `?lang=es|en`.
- Backend exposes auth + user management infrastructure (`User`, `PasswordCode`, JWT, Google OAuth, password reset) preserved for future authenticated features — **not yet consumed by the frontend**.

### Multiple Django Apps
- `base_feature_app` — auth, users, contact, captcha (all the original infrastructure).
- `blog` — added 2026-05-07. Decoupled deliberately so it can be extracted later. Mirrors the modular convention (`models.py`, `views.py`, `serializers.py`, `urls.py`, `admin.py` registers into the shared `BaseFeatureAdminSite`).
- `django_attachments` — installed but not consumed yet.

### Service Layer Pattern
- Business logic lives in views (thin FBVs with `@api_view`) and in `base_feature_app/services/` (currently `email_service`).
- Utility helpers live in `base_feature_app/utils/` (auth utilities, token generation).

---

## 2. Code Style & Conventions

### Backend: Function-Based Views (FBV)
- All DRF views use `@api_view` decorators, not class-based views.
- Never convert to CBV unless explicitly requested.

### Frontend: Zustand Stores (not Pinia)
- Only `localeStore` is currently active (persisted `en`/`es` preference to localStorage as `'locale'`).
- HTTP requests go through `lib/services/http.ts` (Axios with JWT refresh interceptors).
- **Important**: This is a React/Next.js project. It uses Zustand, not Pinia. Pinia is a Vue concept.

### Naming Conventions
- Backend: snake_case for everything (Python standard).
- Frontend components: PascalCase (`XpandiaHeader.tsx`, `SiteAnimations.tsx`).
- Frontend stores: camelCase (`localeStore.ts`).

### Styling
- Tailwind CSS 4 utility classes, mobile-first responsive.
- Custom design tokens and component CSS live in `app/globals.css`.
- GSAP + ScrollTrigger animations in `components/animations/SiteAnimations.tsx`.
- `cn()` utility in `lib/utils.ts` handles all conditional class merging.

---

## 3. Development Workflow

### Backend Commands Always Need venv
```bash
source venv/bin/activate && <command>
```

### Test Execution Rules
- Never run the full test suite — always specify files.
- Backend: `source venv/bin/activate && pytest backend/base_feature_app/tests/<file> -v`
- Frontend unit: `npm test -- <specific_file>` (from `frontend/` dir, uses local `node_modules/.bin/jest`)
- E2E: max 2 files per `npx playwright test` invocation.
- Use `E2E_REUSE_SERVER=1` when dev server is already running.
- **Never use `npx jest` globally** — it won't find `next/jest`. Always run `npm test` from the `frontend/` directory.

### npm Install Required
- `frontend/node_modules/` is not committed. Run `npm install` from `frontend/` before running any tests or dev server.

---

## 4. Staging Deployment

The Xpandia staging environment is **not provisioned yet**. The `deploy-staging` skill in `.claude/skills/deploy-staging/SKILL.md` contains placeholders (`<XPANDIA_STAGING_PATH>`, `<XPANDIA_STAGING_DOMAIN>`, `<XPANDIA_STAGING_SERVICE>`, `<XPANDIA_STAGING_HUEY_SERVICE>`) that must be replaced before the skill is run.

### Expected Build Flow (once staging exists)
1. Frontend: `npm run build` → generates static output.
2. Backend: `python manage.py collectstatic`.
3. Restart Gunicorn and Huey services.

---

## 5. Testing Insights

### Backend conftest.py
- Custom coverage report with Unicode progress bars.
- `api_client` fixture provides unauthenticated DRF APIClient.

### E2E Flow Definitions
- Every navigation flow must be registered in `frontend/e2e/flow-definitions.json`.
- E2E tests must have `@flow:<flow-id>` tags.
- Follow quality standards from `docs/TESTING_QUALITY_STANDARDS.md`.

### Jest Mocking Strategy
- `next/image` and `next/link` are mocked globally in `jest.setup.ts`.
- `next/navigation` (`usePathname`) must be mocked per-file: `jest.mock('next/navigation', () => ({ usePathname: jest.fn(() => '/') }))`.
- GSAP (`gsap`, `gsap/ScrollTrigger`, `@gsap/react`) must be fully mocked for `SiteAnimations` tests.
- When `mm.add` mock should exercise its callback, use: `add: jest.fn((_query, cb) => cb())`.

### SiteAnimations Coverage Ceiling
- `SiteAnimations.tsx` maxes out around 47-48% statement coverage in Jest.
- GSAP animation callbacks require real DOM elements with matching CSS selectors (`.hero`, `.section-head`, etc.) that jsdom doesn't have.
- Do not invest further in Jest for this file; animation behavior belongs in E2E/visual regression tests.

### Components Defined Inside Parent Components
- `RadioTile` is defined inside `ContactPage`. React treats it as a new type on each render → full unmount/remount on state change.
- Always re-query elements after a user interaction that triggers re-render: `screen.getByText('...').closest('[role="button"]')`.
- Storing element references before a click and asserting after will fail with stale elements.

### Multiple Matching Elements in Page Tests
- Marketing pages often repeat CTAs ("Book a diagnostic call") in both hero and footer CTA sections.
- Use `getAllByRole(...)[0]` instead of `getByRole(...)` for links that appear multiple times per page.

### Next.js Image `priority` Prop Warning
- The `jest.setup.ts` Image mock passes all props to `<img>`, causing `priority="true"` DOM warning.
- This is non-fatal. To fix: update the mock to destructure and omit `priority` from spread props.

### DRF Serializer Tests Need `Request` Wrapper
- `RequestFactory().get(...)` and `APIRequestFactory().get(...)` both return a bare `WSGIRequest` that lacks `.query_params` (DRF only adds it inside `APIView.dispatch`).
- When unit-testing a serializer that inspects `context['request'].query_params`, wrap the factory request: `from rest_framework.request import Request; context={'request': Request(rf.get(url))}`.
- See `backend/blog/tests/test_serializers.py` for the working pattern.

### pytest Needs Explicit DB Override
- `pytest.ini` points `DJANGO_SETTINGS_MODULE` at `base_feature_project.settings` (the prod-like one, MySQL by default).
- The `.env` defines `DB_NAME` but `settings.py` reads `DJANGO_DB_NAME` — they don't match, so pytest tries to create a MySQL test DB with the sqlite path as its name.
- Run with: `DJANGO_DB_ENGINE=django.db.backends.sqlite3 DJANGO_DB_NAME=':memory:' pytest ...`.
- This is unrelated to `manage.py runserver`, which uses `settings_dev` (sqlite) and works fine.

### Mocking `React.cache()` for Unit Tests
- `lib/services/blog.ts` wraps fetchers with `React.cache()` from React 19 to dedupe `generateMetadata` + page-component pairs.
- In Jest, the cache wrapper has no React render context. Unwrap it:
  ```ts
  jest.mock('react', () => ({ ...jest.requireActual('react'), cache: (fn) => fn }))
  ```
- Pair with `global.fetch = jest.fn()` and `mockResolvedValueOnce({ ok, status, json: async () => ... })` for fetch-based service tests.

### Module-Level env Vars in Tests
- Constants computed at module load (e.g. `const API_BASE = ...process.env.NEXT_PUBLIC_BACKEND_ORIGIN`) are frozen at first import.
- Set `process.env.X = ...` in `beforeEach` and use `jest.isolateModules(() => { mod = require('../blog') })` to force re-evaluation per test. See `lib/services/__tests__/blog.test.ts`.

---

## 6. Bilingual / Blog-Specific Patterns

### Two API base URLs (server vs. client)
- **Server-side** (Server Components, `lib/services/blog.ts`): absolute URL via `NEXT_PUBLIC_BACKEND_ORIGIN`.
- **Client-side** (Axios in `lib/services/http.ts`): relative `/api/*` proxied via Next rewrites.
- These are intentionally distinct env vars — don't try to unify them.

### Blog seeding for E2E
- Blog data must be in the DB before `/blog` SSR responses are meaningful.
- The pattern: a Django management command (`seed_blog_e2e`) that's idempotent (filters `slug__startswith='e2e-'` then deletes + recreates), invoked from Playwright's `globalSetup` via `execFileSync` (NEVER `exec`/`execSync` — those are shell-injectable; the security hook will block them).

### Bilingual via `?lang=` (current; not next-intl yet)
- Backend `_get_lang(serializer)` reads `request.query_params.get('lang', 'en')`.
- Frontend uses `isValidLocale(raw) ? raw : 'en'` from `lib/i18n/config.ts` to resolve the param.
- Date formatting via `formatLocaleDate(iso, lang, opts)` (also in `lib/i18n/config.ts`) — keeps locale logic in one place.
- The header's localStorage-based lang toggle is independent of the blog's URL-based one. Unification is a backlog item.

---

## 7. Key Files Quick Reference

| Purpose | Path |
|---------|------|
| Root layout | `frontend/app/layout.tsx` |
| Global styles + tokens | `frontend/app/globals.css` |
| Class merger utility | `frontend/lib/utils.ts` |
| i18n helpers (`isValidLocale`, `formatLocaleDate`) | `frontend/lib/i18n/config.ts` |
| Pagination constants | `frontend/lib/constants.ts` |
| Axios + JWT interceptor (client) | `frontend/lib/services/http.ts` |
| Cookie token management | `frontend/lib/services/tokens.ts` |
| Contact form client | `frontend/lib/services/contact.ts` |
| Blog server fetcher (RSC + ISR + React.cache) | `frontend/lib/services/blog.ts` |
| Blog components | `frontend/components/blog/{BlogCard,BlogPagination,BlogLanguageToggle,BlogContentRenderer}.tsx` |
| Locale store | `frontend/lib/stores/localeStore.ts` |
| Jest config | `frontend/jest.config.cjs` |
| Jest setup | `frontend/jest.setup.ts` |
| Playwright config | `frontend/playwright.config.ts` |
| Playwright globalSetup | `frontend/e2e/global-setup.ts` |
| Flow definitions | `frontend/e2e/flow-definitions.json` |
| Flow tag constants | `frontend/e2e/helpers/flow-tags.ts` |
| Testing quality standards | `docs/TESTING_QUALITY_STANDARDS.md` |
| Backend email service | `backend/base_feature_app/services/email_service.py` |
| Backend blog model | `backend/blog/models.py` |
| Backend blog views | `backend/blog/views.py` |
| Backend blog serializers | `backend/blog/serializers.py` |
| Backend blog admin | `backend/blog/admin.py` |
| Fake data command | `backend/base_feature_app/management/commands/create_fake_data.py` |
| Blog seed command (E2E) | `backend/blog/management/commands/seed_blog_e2e.py` |
| pytest.ini (`--cov=base_feature_app --cov=blog`) | `backend/pytest.ini` |
| Custom coverage reporter | `backend/conftest.py` |
