---
trigger: manual
description: Current work focus, recent changes, active decisions, and next steps for Xpandia.
---

# Active Context — Xpandia

_Last updated: 2026-04-24_

---

## Current State

The Xpandia project is a **marketing site + backend infrastructure**. The public site is live at 7 routes (`/`, `/about`, `/contact`, `/services`, `/services/qa`, `/services/audit`, `/services/fractional`). The backend has auth infrastructure ready but no authenticated frontend features yet.

---

## Recent Work (2026-04-24)

### Frontend Unit Test Coverage
Completed a full coverage sweep. Added 9 new test files covering every previously untested file:

| Test File | Source | Coverage After |
|-----------|--------|----------------|
| `lib/__tests__/utils.test.ts` | `lib/utils.ts` | 100% |
| `components/layout/__tests__/FABContact.test.tsx` | `FABContact.tsx` | 100% |
| `components/layout/__tests__/XpandiaFooter.test.tsx` | `XpandiaFooter.tsx` | 100% |
| `components/layout/__tests__/XpandiaHeader.test.tsx` | `XpandiaHeader.tsx` | 100% stmts |
| `components/animations/__tests__/SiteAnimations.test.tsx` | `SiteAnimations.tsx` | 47.78% (GSAP limit) |
| `app/__tests__/home.test.tsx` | `app/page.tsx` | 100% |
| `app/contact/__tests__/page.test.tsx` | `app/contact/page.tsx` | 100% stmts |
| `app/about/__tests__/page.test.tsx` | `app/about/page.tsx` | 100% |
| `app/services/__tests__/page.test.tsx` + 3 sub-page tests | service pages | 100% |

**Final result:** 134 tests / 19 suites — **96.81% statements, 98.59% branches**

### Memory Bank Setup
Created the 7 core methodology files for the first time (product_requirement_docs.md, technical.md, architecture.md, tasks_plan.md, active_context.md, error-documentation.md, lessons-learned.md).

---

## Active Decisions

### SiteAnimations coverage ceiling
`SiteAnimations.tsx` sits at 47.78% statement coverage in Jest. The remaining uncovered lines (22–107) are GSAP animation callbacks — code that only runs when real DOM elements with `.hero`, `.section-head`, `.service-card`, `.scorecard`, `.num-list`, `[data-stagger]`, `[data-reveal]` selectors exist. This is expected and acceptable: animation render fidelity belongs in E2E/visual tests, not Jest unit tests.

### Contact form wiring
The `/contact` page form currently only sets `submitted = true` on submit — it does not send data to the backend. This is a known gap to address before launch.

### Backend test coverage baseline
Backend coverage has not been measured yet. The 20 test files exist but no coverage report has been run. Establish this baseline next.

---

## Next Steps

1. **Wire contact form to backend** — create an endpoint (or use email service) to receive the qualifier form submissions from `/contact`.
2. **Provision staging** — fill in deploy-staging placeholders and deploy the first staging build.
3. **Measure backend coverage** — `source venv/bin/activate && pytest backend/ --cov=backend/base_feature_app --cov-report=term`.
4. **Raise Jest threshold** — update `jest.config.cjs` global thresholds from 50% to 80%.
5. **Implement i18n** — create `messages/en.json` + `messages/es.json`, wrap layout with `NextIntlClientProvider`, connect `localeStore` to `next-intl`.

---

## Key File Locations

| Purpose | Path |
|---------|------|
| Root layout | `frontend/app/layout.tsx` |
| Contact form | `frontend/app/contact/page.tsx` |
| Axios instance | `frontend/lib/services/http.ts` |
| Email service | `backend/base_feature_app/services/email_service.py` |
| Backend views | `backend/base_feature_app/views/` |
| Jest config | `frontend/jest.config.cjs` |
| Jest setup | `frontend/jest.setup.ts` |
| Testing standards | `docs/TESTING_QUALITY_STANDARDS.md` |
| Deploy skill | `.claude/skills/deploy-staging/SKILL.md` |
