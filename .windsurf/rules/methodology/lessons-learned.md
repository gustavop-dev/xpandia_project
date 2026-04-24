---
trigger: manual
description: Project intelligence and lessons learned. Reference for project-specific patterns, preferences, and key insights discovered during development.
---

# Lessons Learned — Xpandia

This file captures important patterns, preferences, and project intelligence that help work more effectively with this codebase. Updated as new insights are discovered.

> This is the Windsurf-consumed copy. The canonical Memory Bank file lives at `docs/methodology/lessons-learned.md` — keep both in sync when updating.

---

## 1. Architecture Patterns

### Static-Public-Only Scope (as of 2026-04-24)
- Xpandia surface is a marketing site: `/`, `/about`, `/contact`, `/services` (+ `/services/qa`, `/services/audit`, `/services/fractional`).
- Backend ships auth + user infrastructure (`User`, `PasswordCode`, JWT, Google OAuth, password reset by code). **Not yet consumed by the frontend.**
- Template e-commerce residue (Product, Sale, Blog, cart, checkout, catalog) has been fully removed.

### Single Django App: `base_feature_app`
- All models, views, serializers live in `base_feature_app`.
- Models split into individual files under `base_feature_app/models/` (`user.py`, `password_code.py`).
- Project + app keep the scaffold names `base_feature_project` / `base_feature_app` on purpose.

### Service Layer Pattern
- Business logic lives in views (thin FBVs with `@api_view`) and in `base_feature_app/services/` (`email_service`).

---

## 2. Code Style & Conventions

### Backend: Function-Based Views (FBV)
- All DRF views use `@api_view` decorators, not CBVs. Do not convert unless explicitly requested.

### Frontend: Zustand Stores
- Only `localeStore` is currently active (persisted `en`/`es` preference).
- HTTP requests go through `lib/services/http.ts` (Axios with JWT refresh interceptors).

### Naming Conventions
- Backend: snake_case (Python standard).
- Frontend components: PascalCase (`XpandiaHeader.tsx`).
- Frontend stores: camelCase (`localeStore.ts`).

---

## 3. Development Workflow

### Backend Commands Always Need venv
```bash
source venv/bin/activate && <command>
```

### Frontend Dev Proxy
- Next.js proxies `/api`, `/admin`, `/static`, `/media` to Django at `127.0.0.1:8000`.
- Both servers must be running simultaneously for full functionality.

### Test Execution Rules
- Never run the full test suite — always specify files.
- Backend: `pytest backend/base_feature_app/tests/<file> -v`.
- Frontend: `npm test -- <specific_file>`.
- E2E: max 2 files per `npx playwright test` invocation.
- Use `E2E_REUSE_SERVER=1` when dev server is already running.

---

## 4. Staging Deployment

Staging is **not provisioned yet**. The `deploy-staging` skill (`.claude/skills/deploy-staging/SKILL.md`) and the Windsurf workflow (`.windsurf/workflows/deploy-staging.md`) contain placeholders (`<XPANDIA_STAGING_PATH>`, `<XPANDIA_STAGING_DOMAIN>`, `<XPANDIA_STAGING_SERVICE>`, `<XPANDIA_STAGING_HUEY_SERVICE>`) that must be replaced before either can be run.

### Expected Build Flow (once staging exists)
1. Frontend: `npm run build`.
2. Backend: `python manage.py collectstatic`.
3. Restart Gunicorn and Huey services.

---

## 5. Testing Insights

### Backend conftest.py
- Custom coverage report with Unicode progress bars replaces default pytest-cov output.
- `api_client` fixture provides unauthenticated DRF APIClient.

### E2E Flow Definitions
- Every navigation flow must be registered in `frontend/e2e/flow-definitions.json`.
- E2E tests must carry `@flow:<flow-id>` tags.
- Follow quality standards from `docs/TESTING_QUALITY_STANDARDS.md`.
