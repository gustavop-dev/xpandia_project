---
trigger: manual
description: Current work focus, recent changes, active decisions, and next steps for Xpandia.
---

# Active Context — Xpandia

_Last updated: 2026-05-07_

---

## Current State

The Xpandia project is a **marketing site + bilingual blog + backend infrastructure**. The public site exposes 9 routes (7 marketing + `/blog` + `/blog/[slug]`). The blog is fully content-managed via Django admin; readers consume it bilingually via `?lang=es|en`. Backend has auth infrastructure ready but no authenticated frontend features yet.

---

## Recent Work (2026-05-07)

### Bilingual blog feature
End-to-end implementation, tested across all three layers, with code review and simplification pass:

**Backend** (`backend/blog/`)
- New Django app, decoupled from `base_feature_app`
- `BlogPost` model: bilingual title/excerpt/content_json (es/en), cover ImageField, 5-category enum, `xpandia-team` author, `is_published` boolean, auto-slug from `title_en` with collision counter, auto `published_at` on first publish
- 6 supported JSON section types in content: paragraph, heading, list, image, quote, callout
- DRF endpoints: `GET /api/blog/?lang=&page=&page_size=` and `GET /api/blog/<slug>/?lang=` — both `AllowAny`, FBV
- Admin: `BlogPostAdmin` registered under "📝 Content" section in `BaseFeatureAdminSite`
- Pagination: default 9/page, max 50
- Initial migration: `blog/migrations/0001_initial.py`

**Frontend** (`frontend/`)
- Server Component pages: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- 4 new components in `components/blog/`: `BlogCard`, `BlogPagination`, `BlogLanguageToggle`, `BlogContentRenderer`
- Server-side fetcher `lib/services/blog.ts` using native `fetch` + `next: { revalidate: 60 }` (ISR), wrapped in `React.cache()` to dedupe `generateMetadata` and the page component (eliminates duplicate backend hits)
- i18n helper additions to `lib/i18n/config.ts`: `formatLocaleDate(iso, lang, opts)`
- Constants: added `PAGINATION.BLOG_PAGE_SIZE = 9`
- Header: "Blog" link added to desktop nav and mobile drawer; `activePage` logic extended

**Tests**
- Backend: 5 new test files (`test_models`, `test_serializers`, `test_views_list`, `test_views_detail`, `test_admin`) → 25 tests, all passing. Coverage: 100% on models/admin/views/urls, ~89% on serializers.
- Frontend unit: 5 new test files (1 in `lib/services/__tests__/`, 4 in `components/blog/__tests__/`) + extended `lib/i18n/__tests__/config.test.ts` for `formatLocaleDate` → 23 new tests, 134+ total passing.
- E2E: new `e2e/public/blog.spec.ts` (5 tests), 5 new flows in `flow-definitions.json` (`blog-list`, `blog-detail`, `blog-pagination`, `blog-language-switch`, `blog-not-found`), corresponding constants in `flow-tags.ts`, plus `globalSetup` (`e2e/global-setup.ts`) that runs `python manage.py seed_blog_e2e` via `execFileSync` to seed 12 published + 1 draft posts before tests.

**Code review pass (`/simplify`)**
- Removed redundant `BlogLang` type → reuse `SupportedLocale` from `lib/i18n/config.ts`
- Inline date formatting → extracted to `formatLocaleDate` (used by `BlogCard` and detail page)
- Inline `lang === 'es' ? 'es' : 'en'` ternary → replaced with `isValidLocale()`
- `BlogPagination` Prev/Next link/span pairs → unified via local `<PaginationArrow>`
- `BlogLanguageToggle` two near-identical `<Link>` blocks → mapped over `SUPPORTED_LOCALES`
- `BlogContentRenderer.heading` → dynamic `Tag = h${level}` (single return)
- `views.py` page/page_size try/except clamping → `_int_param` helper
- Removed unnecessary class docstring from `BlogPost`
- `admin.py`: `if model['object_name'] == 'BlogPost'` (was `in ['BlogPost']`)
- Hoisted bilingual `HERO_COPY` literal to module scope in `app/blog/page.tsx`

---

## Active Decisions

### Two distinct API base URLs (intentional)
- **Server-side** (Server Components, `lib/services/blog.ts`): reads `NEXT_PUBLIC_BACKEND_ORIGIN` for absolute URL to Django.
- **Client-side** (`lib/services/http.ts`, Axios): uses relative `/api/*` proxied via Next rewrites, `NEXT_PUBLIC_API_BASE_URL`.
- These are not duplicate env vars; they serve different contexts.

### Blog seeding strategy for E2E
Blog data is created via the **Django management command `seed_blog_e2e`** (idempotent, uses `slug__startswith='e2e-'` for cleanup). Playwright's `globalSetup` runs it via `execFileSync` (NOT `exec`/`execSync`, which would be shell-injectable). This keeps E2E tests deterministic without exposing public POST endpoints.

### React.cache deduplication
`fetchBlogPosts` and `fetchBlogPost` are wrapped with `React.cache()`. Without it, `generateMetadata` and the page component would each issue a separate `fetch` for the same slug per request, doubling backend traffic on cache miss.

### Bilingual approach (current)
The blog uses a **simple `?lang=es|en` query param** approach (mirroring projectapp). Full `next-intl` setup with locale-prefixed routes (`/en/blog`, `/es/blog`) is deferred to a backlog item. The header's localStorage-based lang toggle and the blog's query-param toggle are independent for now.

### pytest DB engine override for tests
`pytest.ini` points at `base_feature_project.settings` (production-like, MySQL by default). To run tests without a MySQL instance, override with sqlite memory:
```
DJANGO_DB_ENGINE=django.db.backends.sqlite3 DJANGO_DB_NAME=':memory:' pytest blog/tests/ -v
```
This is documented in `technical.md` §5.

---

## Next Steps

1. **Run Playwright E2E for blog** — user is restarting the existing dev server (PID 540786) so it picks up the new `blog` app. Then: `E2E_REUSE_SERVER=1 npx playwright test e2e/public/blog.spec.ts`.
2. **Decide on i18n unification** — current setup mixes `?lang=` (blog) and `localStorage` (header toggle). Pick one, then either implement `next-intl` fully or remove the header toggle.
3. **Wire contact form to backend** — `/contact` already POSTs to `/api/contact/` (this works); confirm end-to-end after staging is up.
4. **Provision staging** — fill in `deploy-staging` placeholders.
5. **Raise Jest coverage threshold** — from 50% global to 80%.

---

## Key File Locations

| Purpose | Path |
|---------|------|
| Root layout | `frontend/app/layout.tsx` |
| Blog list page | `frontend/app/blog/page.tsx` |
| Blog detail page | `frontend/app/blog/[slug]/page.tsx` |
| Blog server fetcher | `frontend/lib/services/blog.ts` |
| Blog components | `frontend/components/blog/{BlogCard,BlogPagination,BlogLanguageToggle,BlogContentRenderer}.tsx` |
| i18n helpers | `frontend/lib/i18n/config.ts` |
| Backend blog model | `backend/blog/models.py` |
| Backend blog views | `backend/blog/views.py` |
| Backend blog serializers | `backend/blog/serializers.py` |
| Backend blog admin | `backend/blog/admin.py` |
| Blog seed command | `backend/blog/management/commands/seed_blog_e2e.py` |
| Blog tests | `backend/blog/tests/` |
| E2E blog spec | `frontend/e2e/public/blog.spec.ts` |
| Playwright globalSetup | `frontend/e2e/global-setup.ts` |
| Flow definitions | `frontend/e2e/flow-definitions.json` |
| Flow tag constants | `frontend/e2e/helpers/flow-tags.ts` |
| Axios instance | `frontend/lib/services/http.ts` |
| Email service | `backend/base_feature_app/services/email_service.py` |
| Jest config | `frontend/jest.config.cjs` |
| Jest setup | `frontend/jest.setup.ts` |
| pytest.ini | `backend/pytest.ini` |
| Custom coverage reporter | `backend/conftest.py` |
| Testing standards | `docs/TESTING_QUALITY_STANDARDS.md` |
