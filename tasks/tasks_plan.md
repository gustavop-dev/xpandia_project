---
trigger: manual
description: Task backlog, feature status, progress tracking, and known issues for Xpandia.
---

# Tasks Plan — Xpandia

_Last verified: 2026-04-24_

---

## Current Phase: Marketing Site + Infrastructure

The current focus is establishing the public marketing site and underlying backend infrastructure. No authenticated product features are live yet.

---

## Completed ✅

### Frontend Marketing Site
- [x] Home page (`/`) — hero, services, methodology, scorecard, audience fit, CTA
- [x] About page (`/about`) — founder bio, track record, principles, markets
- [x] Contact page (`/contact`) — qualifier form, process steps, direct contact
- [x] Services overview (`/services`) — service rows, comparison table
- [x] QA Sprint detail (`/services/qa`)
- [x] Launch Readiness Audit detail (`/services/audit`)
- [x] Fractional Lead detail (`/services/fractional`)
- [x] Layout: `XpandiaHeader` — sticky, scroll-aware, mobile drawer, lang toggle (EN/ES)
- [x] Layout: `XpandiaFooter` — service links, company links, email
- [x] Layout: `FABContact` — floating "Book a diagnostic call" button
- [x] Animations: `SiteAnimations` — GSAP scroll-triggered reveals (hero, sections, cards, scorecards, lists)
- [x] Tailwind CSS 4 migration + custom design tokens (ink, paper, accent palette)
- [x] Logo assets (light + dark variants)

### Backend Infrastructure
- [x] Custom `User` model (email-based auth, `customer`/`admin` roles)
- [x] `PasswordCode` model (6-digit, 15-minute TTL)
- [x] JWT authentication (SimpleJWT)
- [x] Google OAuth login
- [x] Email passcode password reset flow
- [x] User CRUD API (`/api/users/`, `/api/users/<id>/`)
- [x] Google reCAPTCHA integration (`/api/google-captcha/`)
- [x] Custom Django admin site
- [x] Huey + Redis async task queue
- [x] Fake data management commands (`create_fake_data`, `delete_fake_data`)

### Testing
- [x] Frontend unit tests: 19 test files, 134 tests, 96.81% statement coverage
- [x] Backend unit tests: 20 test files
- [x] E2E tests: 4 Playwright spec files (smoke, navigation, services, static-pages)
- [x] Frontend testing quality standards document (`docs/TESTING_QUALITY_STANDARDS.md`)
- [x] Memory Bank methodology setup (7 core files)

---

## In Progress 🔄

_Nothing in progress at this moment._

---

## Backlog 📋

### High Priority
- [ ] **Contact form backend integration** — wire the `/contact` form to send an email via `email_service` and/or store the inquiry. Currently the form only shows a success state locally.
- [ ] **Staging provisioning** — fill in the `deploy-staging` skill placeholders and set up the staging server.

### Medium Priority
- [ ] **i18n implementation** — `next-intl` is installed; locale routing and translation files (`messages/en.json`, `messages/es.json`) not yet created. The `localeStore` and `XpandiaHeader` lang toggle exist but don't yet switch displayed content.
- [ ] **Backend coverage report** — run `pytest --cov` to establish a baseline backend coverage percentage.
- [ ] **SEO refinement** — `metadata` exports exist on all pages; review title lengths, Open Graph images, sitemap.ts.
- [ ] **Increase Jest threshold** — current global threshold is 50%; raise to 80% now that coverage is 96%+.

### Low Priority
- [ ] **`SiteAnimations` coverage** — current statement coverage 47.78%; remaining lines are GSAP callbacks requiring browser rendering. Consider a lightweight Playwright visual smoke test instead of pushing further in Jest.
- [ ] **Terms and Privacy pages** — footer links point to `#`; pages not yet created.
- [ ] **`app/providers.tsx` expansion** — currently a passthrough; wire in actual providers (e.g., NextIntlClientProvider) when i18n is implemented.
- [ ] **`django_attachments` usage** — model is installed but not used in any view or serializer yet.

---

## Known Issues 🐛

_No open bugs at this time._

---

## Testing Status

| Layer | Files | Tests | Coverage |
|-------|-------|-------|----------|
| Frontend unit (Jest) | 19 | 134 | 96.81% stmts / 98.59% branches |
| Frontend E2E (Playwright) | 4 | ~12 scenarios | smoke + navigation + services + static |
| Backend (pytest) | 20 | TBD | Not yet measured |

---

## File Counts (verified 2026-04-24)

| Artifact | Count |
|----------|-------|
| Backend model files | 2 (`user.py`, `password_code.py`) |
| Backend view files | 3 |
| Backend serializer files | 3 |
| Backend test files | 20 |
| Backend migrations | 2 |
| Frontend page routes | 7 |
| Frontend UI component files | 4 |
| Frontend lib files | 5 (`constants.ts`, `utils.ts`, `types.ts`, `i18n/config.ts`, `stores/localeStore.ts`) |
| Frontend service files | 2 (`http.ts`, `tokens.ts`) |
| Frontend unit test files | 19 |
| E2E spec files | 4 |
