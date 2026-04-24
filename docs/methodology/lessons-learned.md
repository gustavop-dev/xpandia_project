---
trigger: manual
description: Project intelligence and lessons learned. Reference for project-specific patterns, preferences, and key insights discovered during development.
---

# Lessons Learned — Xpandia

This file captures important patterns, preferences, and project intelligence that help work more effectively with this codebase. Updated as new insights are discovered.

---

## 1. Architecture Patterns

### Static-Public-Only Scope (as of 2026-04-24)
- Current Xpandia surface is a marketing site: `/`, `/about`, `/contact`, `/services` (+ `/services/qa`, `/services/audit`, `/services/fractional`).
- Backend exposes auth + user management infrastructure (`User`, `PasswordCode`, JWT, Google OAuth, password reset by code) preserved for future authenticated features — **not yet consumed by the frontend**.
- Template e-commerce residue (Product, Sale, Blog, cart, checkout, catalog) has been fully removed.

### Single Django App: `base_feature_app`
- All models, views, serializers live in `base_feature_app`.
- Models split into individual files under `base_feature_app/models/` (`user.py`, `password_code.py`).
- Project and app keep the scaffold names `base_feature_project` / `base_feature_app` on purpose.

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

---

## 6. Key Files Quick Reference

| Purpose | Path |
|---------|------|
| Root layout | `frontend/app/layout.tsx` |
| Global styles + tokens | `frontend/app/globals.css` |
| Class merger utility | `frontend/lib/utils.ts` |
| Axios + JWT interceptor | `frontend/lib/services/http.ts` |
| Cookie token management | `frontend/lib/services/tokens.ts` |
| Locale store | `frontend/lib/stores/localeStore.ts` |
| Jest config | `frontend/jest.config.cjs` |
| Jest setup | `frontend/jest.setup.ts` |
| Testing quality standards | `docs/TESTING_QUALITY_STANDARDS.md` |
| Backend email service | `backend/base_feature_app/services/email_service.py` |
| Fake data command | `backend/base_feature_app/management/commands/create_fake_data.py` |
