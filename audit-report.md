# Vulnerability Audit & Dependency Update Report

**Branch:** `chore/26082026-vuln-audit`  
**Date:** 2026-08-26  
**Base:** `main` @ `a737969`  
**Scope:** patch + minor updates only (no major version bumps)

## Summary

| Surface | Vulns (initial) | Outdated (initial) |
|---|---|---|
| Frontend | 10 total: 0 critical / 9 high / 0 moderate / 1 low | 20 |
| Backend | 33 advisories across 3 project packages | 13 |

The deployed Python toolchain also had one advisory in `pip 26.1.2`. The isolated
worktree uses `pip 26.2.1`; updating the production venv remains a post-merge
operational action.

---

## Frontend — `npm audit` (initial)

Source: `/tmp/xpandia_project-npm-audit.json`

| Package | Severity | Notes |
|---|---|---|
| `@babel/core` | low | Transitive; fixed through the lockfile refresh. |
| `axios` | high | Direct dependency; fixed by `1.20.0`. |
| `brace-expansion` | high | Transitive; fixed through `npm audit fix`. |
| `form-data` | high | Transitive through Axios; fixed through the lockfile. |
| `js-yaml` | high | Transitive; both 3.x and 4.x vulnerable copies updated. |
| `nanoid` | high | Transitive; fixed through `npm audit fix`. |
| `next` | high | Direct dependency; fixed by `16.3.3`. |
| `postcss` | high | Transitive through Next; fixed with the Next update. |
| `sharp` | high | Transitive through Next; fixed with the Next update. |
| `ws` | high | Transitive; fixed through `npm audit fix`. |

**Totals:** 0 critical / 9 high / 0 moderate / 1 low.

## Frontend — `npm outdated` (initial)

Source: `/tmp/xpandia_project-npm-outdated.json`

- `@playwright/test`: 1.60.0 → 1.62.1 → 1.62.1
- `@tailwindcss/postcss`: 4.3.0 → 4.3.3 → 4.3.3
- `@testing-library/user-event`: 14.6.1 → 14.6.6 → 14.6.6
- `@types/node`: 25.8.0 → 25.9.5 → 26.3.0 *(major skipped)*
- `@types/react`: 19.2.14 → 19.2.18 → 19.2.18
- `@types/react-dom`: 19.2.3 → 19.2.5 → 19.2.5
- `axios`: 1.16.1 → 1.20.0 → 1.20.0
- `eslint`: 9.39.4 → 9.39.5 → 10.9.1 *(major skipped)*
- `eslint-config-next`: 16.2.6 → 16.2.6 → 16.3.3
- `eslint-plugin-playwright`: 2.10.2 → 2.11.0 → 2.11.0
- `fuse.js`: 7.3.0 → 7.5.0 → 7.5.0
- `js-cookie`: 3.0.7 → 3.0.8 → 3.0.8
- `lucide-react`: 1.16.0 → 1.34.0 → 1.34.0
- `next`: 16.2.6 → 16.2.6 → 16.3.3
- `next-intl`: 4.12.0 → 4.13.7 → 4.13.7
- `react`: 19.2.6 → 19.2.6 → 19.2.8
- `react-dom`: 19.2.6 → 19.2.6 → 19.2.8
- `tailwindcss`: 4.3.0 → 4.3.3 → 4.3.3
- `typescript`: 5.9.3 → 5.9.3 → 7.0.2 *(major skipped)*
- `zustand`: 5.0.13 → 5.0.15 → 5.0.15

---

## Backend — `pip-audit` (initial)

Source: `/tmp/xpandia_project-pip-audit.json`

| Package | Current | Vulns | Min in-major fix |
|---|---:|---:|---:|
| `Django` | 6.0.5 | 9 | 6.0.8 |
| `Pillow` | 12.2.0 | 20 | 12.3.0 |
| `sqlparse` | 0.5.5 | 4 | 0.6.0 *(major skipped by 0.x policy)* |

## Backend — `pip list --outdated` (initial)

Source: `/tmp/xpandia_project-pip-outdated.json`

- `asgiref` 3.11.1 → 3.12.1
- `coverage` 7.14.0 → 7.15.4
- `Django` 6.0.5 → 6.1
- `djangorestframework` 3.17.1 → 3.18.0
- `Faker` 40.18.0 → 40.37.0
- `gunicorn` 23.0.0 → 26.2.0 *(major and `<24` constraint: skipped)*
- `Pillow` 12.2.0 → 12.3.0
- `pip` 26.2 → 26.2.1 *(worktree tooling only)*
- `pytest` 9.0.3 → 9.1.1
- `pytest-django` 4.12.0 → 4.14.0
- `ruff` 0.15.13 → 0.16.4 *(major by 0.x policy: skipped)*
- `sqlparse` 0.5.5 → 0.6.0 *(major by 0.x policy: skipped)*
- `typing_extensions` 4.15.0 → 4.16.0

---

## Plan

### Frontend

- Apply `npm audit fix` without `--force` to refresh vulnerable transitive packages.
- Apply 19 compatible direct patch/minor updates with `npm-check-updates --target minor`.
- Hold `@testing-library/jest-dom` at 6.9.1 for Node 20 compatibility.
- Skip the available majors for Node types, ESLint and TypeScript.

### Backend

- Update 12 direct requirements while preserving exact/range operators.
- Keep `gunicorn>=23.0,<24.0`, `ruff==0.15.13` and `sqlparse==0.5.5`.
- Record the four SQLParse advisories as intentional remaining findings.

## Updates Applied

### Frontend (commit `deps(frontend): apply patch+minor updates`)

- Updated Axios, Fuse.js, js-cookie, Lucide, Next, next-intl, React, React DOM and Zustand.
- Updated Playwright, Tailwind, Testing Library user-event, React/Node types and ESLint tooling.
- Refreshed 31 transitive packages through `npm audit fix` without `--force`.
- Adjusted the Axios mock type to satisfy the updated callable instance contract.
- Final `npm audit`: 0 critical / 0 high / 0 moderate / 0 low.
- Remaining outdated: `@types/node` 26, ESLint 10 and TypeScript 7 (majors skipped).

### Backend (commit `deps(backend): apply patch+minor updates`)

- Updated `asgiref`, Django, django-silk, DRF, Faker, Huey, Pillow, pytest,
  pytest-django, coverage, Redis and typing-extensions.
- Final `pip-audit`: 4 advisories in `sqlparse 0.5.5` only.
- Remaining outdated: Gunicorn 26, Ruff 0.16 and SQLParse 0.6 (majors skipped).

## Rollbacks

- Reverted `@testing-library/jest-dom 6.10.0` to exact `6.9.1`: the 6.10.0
  release requires Node 22, is marked as an incorrect minor release, and the
  project runtime is Node 20.

## Verification Results

### Frontend

- `npm audit`: 0 vulnerabilities.
- `npm run build`: success with Next.js 16.3.3.
- `npm test -- lib/services/__tests__/http.test.ts --runInBand`: 11 passed.
- `npm test -- --runTestsByPath 'app/[locale]/__tests__/home.test.tsx' --runInBand`: 15 passed.

### Backend

- `python manage.py check`: no issues.
- `pytest --collect-only -q`: 234 tests collected, no errors.
- `pytest blog/tests/test_admin.py -v`: 18 passed.
- Django 6.1 emits six `RemovedInDjango70Warning` notices for legacy email
  settings; these are non-blocking and should be migrated before Django 7.

