---
trigger: manual
description: Known errors, their context, and resolutions. Reference when debugging or encountering recurring issues in Xpandia.
---

# Error Documentation — Xpandia

This file tracks known errors, their context, and resolutions. When a reusable fix or correction is found, document it here to avoid repeating the same mistake.

---

## Format

```
### [ERROR-NNN] Short description
- **Date**: YYYY-MM-DD
- **Context**: Where/when this error occurs
- **Root Cause**: Why it happens
- **Resolution**: How to fix it
- **Files Affected**: List of files
```

---

## Known Issues

### [ERROR-006] Contact form returns 503 when SMTP is not configured
- **Date**: 2026-06-28
- **Context**: `POST /api/contact/` returns `503 Service Unavailable` for otherwise-valid submissions. The frontend then shows the red error banner (`contact.form.error`). In a webview/in-app browser a downstream crash can surface as the generic "No se puede cargar esta página" message instead.
- **Root Cause**: `contact_form` (`backend/base_feature_app/views/contact.py`) returns 503 when `EmailService.send_contact_notification` returns `False`. That happens when the environment has no SMTP credentials (`DJANGO_EMAIL_HOST_USER` / `DJANGO_EMAIL_HOST_PASSWORD` empty → Django falls back to the console backend) or `DJANGO_DEFAULT_FROM_EMAIL` is empty / SMTP is unreachable. The failure is logged via `logger.error('contact_form notification email failed for %s', ...)`.
- **Resolution**: Configure the email env vars **on each deployed environment** (see `backend/.env.example` "Email SMTP" block — use a Gmail App Password or corporate SMTP). Verify with a test submission returning 201 and the notification arriving at `CONTACT_EMAIL` (`nestor@xpandia.global`). Operationally, watch for the `contact_form notification email failed` log to catch SMTP outages before a client reports them. Frontend resilience (localized error boundary so a render crash never shows the raw browser error) was added in `frontend/app/[locale]/error.tsx` and `frontend/app/global-error.tsx`.
- **Files Affected**: `backend/base_feature_app/views/contact.py`, `backend/base_feature_app/services/email_service.py`, `backend/.env` (per environment), `frontend/app/[locale]/error.tsx`, `frontend/app/global-error.tsx`

---

## Resolved Issues

### [ERROR-001] Multiple elements found for `getByRole` in page tests
- **Date**: 2026-04-24
- **Context**: Frontend unit tests for service pages — `getByRole('link', { name: /book a diagnostic call/i })` threw "Found multiple elements"
- **Root Cause**: CTAs like "Book a diagnostic call" and "Request a Launch Readiness Audit" appear twice per page (hero section + bottom CTA section)
- **Resolution**: Use `getAllByRole(...)[0]` when a page intentionally repeats a link
- **Files Affected**: `app/services/__tests__/page.test.tsx`, `app/services/qa/__tests__/page.test.tsx`, `app/services/audit/__tests__/page.test.tsx`, `app/services/fractional/__tests__/page.test.tsx`

### [ERROR-002] Stale element reference after RadioTile re-render
- **Date**: 2026-04-24
- **Context**: `app/contact/__tests__/page.test.tsx` — asserting `.toHaveClass('on')` on a stored tile reference after a click failed
- **Root Cause**: `RadioTile` is defined as a nested function inside `ContactPage`. React treats it as a different component type on each render, causing full unmount → remount. The stored DOM node becomes stale after state update.
- **Resolution**: Re-query the element after the click: `screen.getByText('...').closest('[role="button"]')` instead of storing the reference before the click
- **Files Affected**: `app/contact/__tests__/page.test.tsx`

### [ERROR-003] `priority` prop warning from Next.js Image mock
- **Date**: 2026-04-24
- **Context**: `XpandiaHeader.test.tsx` — `console.error: Received 'true' for a non-boolean attribute 'priority'`
- **Root Cause**: The `jest.setup.ts` mock for `next/image` renders as a plain `<img>` and passes all props including `priority={true}`, which is not a valid HTML attribute
- **Resolution**: This is a non-fatal warning, not a test failure. Suppress by updating the Image mock to omit `priority`, or accept it as a known mock limitation
- **Files Affected**: `frontend/jest.setup.ts`, any test that renders a component using `<Image priority />`

### [ERROR-004] `'WSGIRequest' object has no attribute 'query_params'` in serializer tests
- **Date**: 2026-05-07
- **Context**: `backend/blog/tests/test_serializers.py` — calling `BlogPostListSerializer(post, context={'request': RequestFactory().get(...)}).data` raised `AttributeError`
- **Root Cause**: Django's `RequestFactory` and DRF's `APIRequestFactory` both produce a plain `WSGIRequest`. DRF's `.query_params` attribute is added only when the request is wrapped by `rest_framework.request.Request` (which DRF does inside `APIView.dispatch`). Calling a serializer directly outside a view skips that wrapping.
- **Resolution**: Wrap the factory request with `rest_framework.request.Request` in the test context: `context={'request': Request(rf.get(url))}`
- **Files Affected**: `backend/blog/tests/test_serializers.py`

### [ERROR-005] pytest fails with `Identifier name '...db.sqlite3' is too long` (MySQL test DB)
- **Date**: 2026-05-07
- **Context**: Running `pytest blog/tests/` with no env override raised `MySQLdb.OperationalError (1059)` while attempting `CREATE DATABASE 'test_/home/.../db.sqlite3'`
- **Root Cause**: `pytest.ini` sets `DJANGO_SETTINGS_MODULE = base_feature_project.settings` (production-like, defaults to `DJANGO_DB_ENGINE=django.db.backends.mysql` from `.env`). However `.env` only sets `DB_NAME`, not `DJANGO_DB_NAME`, so `settings.py` falls back to the sqlite path string while the engine is mysql — incompatible. (`manage.py` itself defaults to `settings_dev.py` which uses sqlite, so the dev server is fine; only pytest hits this.)
- **Resolution**: Either fix the `.env`/`settings.py` mismatch (rename `DB_NAME` → `DJANGO_DB_NAME` or add a fallback), or run pytest with sqlite memory override: `DJANGO_DB_ENGINE=django.db.backends.sqlite3 DJANGO_DB_NAME=':memory:' pytest ...`
- **Files Affected**: `backend/.env`, `backend/base_feature_project/settings.py`, `backend/pytest.ini`
