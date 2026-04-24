---
trigger: manual
description: Project intelligence and lessons learned. Reference for project-specific patterns, preferences, and key insights discovered during development.
---

# Lessons Learned — Base Django React Next Feature

This file captures important patterns, preferences, and project intelligence that help work more effectively with this codebase. Updated as new insights are discovered.

---

## 1. Architecture Patterns

### Blog-Only Scope (as of 2026-04-23)
- Project has been cleaned to use only the Blog entity
- Backend auth (User, PasswordCode, JWT) is preserved for future use
- Frontend has NO auth pages or auth stores — backend auth is backend-only for now

### Single Django App: `base_feature_app`
- All models, views, serializers live in `base_feature_app`
- Models split into individual files under `base_feature_app/models/`

### Service Layer Pattern
- Business logic lives in views (thin FBVs with `@api_view`)
- No separate services layer currently

---

## 2. Code Style & Conventions

### Backend: Function-Based Views (FBV)
- All DRF views use `@api_view` decorators, not class-based views
- Never convert to CBV unless explicitly requested

### Frontend: Zustand Stores
- State management uses Zustand with TypeScript
- Only `useBlogStore` and `useLocaleStore` are active
- HTTP requests go through centralized API client in `lib/services/http.ts`

### Naming Conventions
- Backend: snake_case for everything (Python standard)
- Frontend components: PascalCase
- Frontend stores: camelCase (`useBlogStore.ts`)

---

## 3. Development Workflow

### Backend Commands Always Need venv
```bash
source venv/bin/activate && <command>
```

### Frontend Dev Proxy
- Next.js proxies `/api`, `/admin`, `/static`, `/media` to Django at `127.0.0.1:8000`
- Both servers must be running simultaneously for full functionality

### Test Execution Rules
- Never run the full test suite — always specify files
- Backend: `source venv/bin/activate && pytest backend/base_feature_app/tests/<file> -v`
- Frontend: `npm test -- <specific_file>`
- E2E: max 2 files per `npx playwright test` invocation
- Use `E2E_REUSE_SERVER=1` when dev server is already running

---

## 4. Staging Deployment

### Build Flow
1. Frontend: `npm run build` → generates static output
2. Backend: `python manage.py collectstatic`
3. Restart Gunicorn service

### Django Serves Next.js Pages
- The catch-all view serves pre-rendered Next.js pages
- LAST URL pattern — all other routes take priority

---

## 5. Testing Insights

### Backend conftest.py
- Custom coverage report with Unicode progress bars
- `api_client` fixture provides unauthenticated DRF APIClient

### E2E Flow Definitions
- Every navigation flow must be registered in `frontend/e2e/flow-definitions.json`
- E2E tests must have `@flow:<flow-id>` tags
- Follow quality standards from `docs/TESTING_QUALITY_STANDARDS.md`
