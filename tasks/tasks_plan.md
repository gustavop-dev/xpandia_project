---
trigger: manual
description: Task backlog, feature status, progress tracking, and known issues for Xpandia.
---

# Tasks Plan — Xpandia

_Last verified: 2026-05-07_

---

## Current Phase: Marketing Site + Bilingual Blog + Infrastructure

The current focus is establishing the public marketing site, the bilingual blog, and the underlying backend infrastructure. No authenticated product features are live yet.

---

## Completed ✅

### Frontend Marketing Site
- [x] Home page (`/`) — hero, services, methodology, scorecard, audience fit, CTA
- [x] About page (`/about`) — founder bio, track record, principles, markets
- [x] Contact page (`/contact`) — qualifier form, process steps
- [x] Services overview (`/services`) — service rows, comparison table
- [x] QA Sprint detail (`/services/qa`)
- [x] Launch Readiness Audit detail (`/services/audit`)
- [x] Fractional Lead detail (`/services/fractional`)
- [x] Layout: `XpandiaHeader` — sticky, scroll-aware, mobile drawer, lang toggle, **Blog nav link**
- [x] Layout: `XpandiaFooter`, `FABContact`
- [x] Animations: `SiteAnimations` (GSAP scroll-triggered reveals)
- [x] Tailwind CSS 4 design tokens
- [x] Logo assets (light + dark)

### Bilingual Blog (added 2026-05-07)
- [x] Django app `blog` — `BlogPost` model with bilingual fields, JSON sections, cover image, 5 categories
- [x] Auto-slug from `title_en` with collision counter; auto `published_at` on first publish
- [x] DRF endpoints: `GET /api/blog/`, `GET /api/blog/<slug>/` — both `AllowAny`
- [x] Pagination: default 9/page, max 50, with `count`/`page`/`total_pages` metadata
- [x] Bilingual via `?lang=es|en` query param (`_get_lang` serializer helper, default `en`)
- [x] Admin registered under "📝 Content" section in `BaseFeatureAdminSite`
- [x] Frontend pages: `/blog` (Server Component, ISR 60s) + `/blog/[slug]`
- [x] Components: `BlogCard`, `BlogPagination`, `BlogLanguageToggle`, `BlogContentRenderer`
- [x] Server-side fetcher `lib/services/blog.ts` with `React.cache()` deduplication for `generateMetadata` + page
- [x] i18n helpers: `formatLocaleDate`, `isValidLocale` (in `lib/i18n/config.ts`)
- [x] `PAGINATION.BLOG_PAGE_SIZE = 9` constant
- [x] Header nav: "Blog" link added to desktop + mobile drawer

### Backend Infrastructure
- [x] Custom `User` model (email-based, `customer`/`admin` roles)
- [x] `PasswordCode` model (6-digit, 15-minute TTL)
- [x] JWT (SimpleJWT) + Google OAuth + email passcode reset
- [x] User CRUD API (`/api/users/`, `/api/users/<id>/`)
- [x] Google reCAPTCHA (`/api/google-captcha/`)
- [x] Contact form endpoint `/api/contact/` (sends to `hello@xpandia.co`)
- [x] Custom `BaseFeatureAdminSite` with grouped sections (👥 Users, 📝 Content)
- [x] Huey + Redis async task queue
- [x] Fake-data management commands (`create_fake_data`, `create_users`, `delete_fake_data`)
- [x] Blog seed command (`seed_blog_e2e` — idempotent, 12 published + 1 draft)

### Testing
- [x] Frontend unit tests: 24 test files (134+ tests, including 23 new for blog + i18n)
- [x] Backend unit tests: 25 test files (5 new for blog: models, serializers, views_list, views_detail, admin = 25 tests)
- [x] E2E tests: 6 Playwright spec files (added `blog.spec.ts` with 5 tests covering 5 new flows)
- [x] Flow definitions: 25 flows in `e2e/flow-definitions.json` (5 new under `module: "blog"`)
- [x] Playwright `globalSetup` for blog seeding (`execFileSync` of management command)
- [x] Methodology Memory Bank refreshed (this update)

---

## In Progress 🔄

- [ ] **E2E validation of blog flows** — `blog.spec.ts` is written and the seed command + globalSetup are wired. Awaiting the user to restart their existing Django dev server on :8000 (it was started before the blog app existed). Then run: `E2E_REUSE_SERVER=1 npx playwright test e2e/public/blog.spec.ts`.

---

## Backlog 📋

### High Priority
- [ ] **Bilingual blog UI in non-blog routes** — header lang toggle currently writes to `localStorage` only. The blog uses `?lang=` query param. Decide whether to unify (1) all routes via `?lang=` or (2) wire `next-intl` and migrate.
- [ ] **Staging provisioning** — fill in the `deploy-staging` skill placeholders.

### Medium Priority
- [ ] **i18n implementation (full)** — `next-intl` is installed; translation files (`messages/en.json`, `messages/es.json`) not yet created. Wire `localeStore` to `next-intl` once decided.
- [ ] **Backend coverage report (full)** — current pytest invocation skips when `DJANGO_DB_NAME` env var is unset and `settings.py` (not `settings_dev`) is in effect. Document the right command in CI.
- [ ] **SEO refinement** — review title lengths, Open Graph images, sitemap.ts for blog detail routes.
- [ ] **Increase Jest coverage threshold** — currently 50% global; raise to 80% now that real coverage is much higher.
- [ ] **Verify `serializers.py` 11% gap** — remaining uncovered branches are the lang fallback path with no request context. Add 1–2 tests if it's worth ≥80% target.

### Low Priority
- [ ] **`SiteAnimations` coverage** — capped at 47.78% in Jest (GSAP callbacks need real DOM). Consider Playwright visual smoke instead.
- [ ] **Terms and Privacy pages** — footer links point to `#`.
- [ ] **`app/providers.tsx` expansion** — currently passthrough; wire `NextIntlClientProvider` when i18n lands.
- [ ] **`django_attachments` usage** — installed but no view consumes it.
- [ ] **Settings drift fix** — `.env` has `DB_NAME` but `settings.py` reads `DJANGO_DB_NAME`. Either rename in `.env` or update settings to fall back to `DB_NAME`.

---

## Known Issues 🐛

- **`pre-existing` Type error in `lib/services/__tests__/http.test.ts`** — `tsc --noEmit` reports `error TS2322` on the axios mock typing (line 45). Tests still pass at runtime; bug predates the blog work.

---

## Testing Status

| Layer | Files | Tests | Status |
|-------|-------|-------|--------|
| Frontend unit (Jest) | 24 | 134+ (23 new for blog) | All passing |
| Frontend E2E (Playwright) | 6 | 5 + existing flows | Blog flows written, awaiting run |
| Backend (pytest) | 25 | 25 in blog/ + ~? in base | Blog 25/25 passing; coverage blog/* ≥89% |

---

## File Counts (verified 2026-05-07)

| Artifact | Count |
|----------|-------|
| Backend Django apps | 3 (`base_feature_app`, `blog`, `django_attachments`) |
| Backend model classes | 3 (`User`, `PasswordCode`, `BlogPost`) |
| Backend test files | 25 (20 base + 5 blog) |
| Backend migrations (blog) | 1 |
| Backend management commands | 4 (`create_fake_data`, `create_users`, `delete_fake_data`, `seed_blog_e2e`) |
| Backend URL pattern entries | 8 root + 7 auth + 2 user + 2 captcha + 1 contact + 2 blog |
| Frontend page routes | 9 (`/`, `/about`, `/contact`, `/services`, `/services/qa`, `/services/audit`, `/services/fractional`, `/blog`, `/blog/[slug]`) |
| Frontend UI components | 8 (`SiteAnimations`, `XpandiaHeader/Footer`, `FABContact`, `BlogCard`, `BlogPagination`, `BlogLanguageToggle`, `BlogContentRenderer`) |
| Frontend lib root files | 3 (`constants.ts`, `utils.ts`, `types.ts`) |
| Frontend lib services | 4 (`http.ts`, `tokens.ts`, `contact.ts`, `blog.ts`) |
| Frontend lib i18n | 1 (`config.ts` — exports `formatLocaleDate`, `isValidLocale`, etc.) |
| Frontend lib stores | 1 (`localeStore.ts`) |
| Frontend unit test files | 24 |
| E2E spec files | 6 |
| Defined flows in `flow-definitions.json` | 25 |
