# Vulnerability Audit & Dependency Update Report

**Branch:** chore/17052026-vulnerability-audit
**Date:** 2026-05-17
**Base:** main @ 743a8a5
**Scope:** patch + minor updates only (no major version bumps)

## Summary

| Surface  | Vulns (initial)         | Outdated (initial) |
|----------|-------------------------|--------------------|
| Frontend | 1 high (0/0/0/1/0)      | 17                 |
| Backend  | 3 CVEs in 1 package     | 6                  |

Post-update: **0 vulns** on both surfaces.

---

## Frontend — `npm audit` (initial)
Source: `/tmp/xpandia_project_staging-npm-audit.json`

| Package | Severity | Notes |
|---------|----------|-------|
| next    | high     | 7 advisories (DoS, SSRF, middleware/proxy bypass × 4, cache-poisoning) — all fixed at `next@16.2.6` (non-breaking) |

**Totals:** critical=0, high=1, moderate=0, low=0.

## Frontend — `npm outdated` (initial)
Source: `/tmp/xpandia_project_staging-npm-outdated.json`

- @playwright/test: 1.59.1 → wanted 1.60.0 → latest 1.60.0
- @tailwindcss/postcss: 4.2.4 → wanted 4.3.0 → latest 4.3.0
- @types/node: 25.6.0 → wanted 25.8.0 → latest 25.8.0
- axios: 1.15.2 → wanted 1.16.1 → latest 1.16.1
- eslint: 9.39.4 → wanted 9.39.4 → latest 10.4.0  *(skip — major)*
- eslint-config-next: 16.2.4 → wanted 16.2.4 → latest 16.2.6
- jest: 30.3.0 → wanted 30.4.2 → latest 30.4.2
- jest-environment-jsdom: 30.3.0 → wanted 30.4.1 → latest 30.4.1
- js-cookie: 3.0.5 → wanted 3.0.7 → latest 3.0.7
- lucide-react: 1.14.0 → wanted 1.16.0 → latest 1.16.0
- next: 16.2.4 → wanted 16.2.4 → latest 16.2.6
- next-intl: 4.11.0 → wanted 4.12.0 → latest 4.12.0
- react: 19.2.5 → wanted 19.2.5 → latest 19.2.6
- react-dom: 19.2.5 → wanted 19.2.5 → latest 19.2.6
- tailwindcss: 4.2.4 → wanted 4.3.0 → latest 4.3.0
- typescript: 5.9.3 → wanted 5.9.3 → latest 6.0.3  *(skip — major)*
- zustand: 5.0.12 → wanted 5.0.13 → latest 5.0.13

---

## Backend — `pip-audit` (initial)
Source: `/tmp/xpandia_project_staging-pip-audit.json`

| Package | Current | Vulns                                        | Min in-major fix |
|---------|---------|----------------------------------------------|------------------|
| Django  | 6.0.4   | CVE-2026-35192, CVE-2026-6907, CVE-2026-5766 | 6.0.5            |

## Backend — `pip list --outdated` (initial)
Source: `/tmp/xpandia_project_staging-pip-outdated.json`

- coverage: 7.13.5 → 7.14.0
- Django: 6.0.4 → 6.0.5  *(also fixes the 3 CVEs above)*
- Faker: 40.15.0 → 40.18.0
- gunicorn: 23.0.0 → 26.0.0  *(skip — major bump; pin already forces `>=23.0,<24.0`)*
- requests: 2.33.1 → 2.34.2
- ruff: 0.15.12 → 0.15.13

---

## Plan

### Frontend
- Run `npm audit fix` (no `--force`) → refused next@16.2.6 ("outside the stated dependency range").
- Run `npx --yes npm-check-updates -u --target minor` → 15 packages bumped (2 skipped: `eslint`, `typescript`, both major).
- `npm install` → fresh install after wiping `node_modules/` due to a residual `ENOTEMPTY` rename error on `@next/swc-linux-x64-musl`.

### Backend (respecting pins)
- Edit `requirements.txt`:
  - `Django==6.0.4 → 6.0.5` (patch; clears all 3 CVEs)
  - `Faker==40.15.0 → 40.18.0` (minor)
  - `coverage==7.13.5 → 7.14.0` (minor)
  - `ruff==0.15.12 → 0.15.13` (patch)
  - `requests==2.33.1 → 2.34.2` (minor)
- `gunicorn`: pin `>=23.0,<24.0` rejects 26.0.0; left at 23.0.0.

## Updates Applied

### Frontend (commit `7dbcb64` — `deps(frontend): apply patch+minor updates`)
- @playwright/test ^1.59.1 → ^1.60.0
- @tailwindcss/postcss ^4.2.4 → ^4.3.0
- @types/node ^25.6.0 → ^25.8.0
- axios ^1.15.2 → ^1.16.1
- eslint-config-next 16.2.4 → 16.2.6
- jest ^30.3.0 → ^30.4.2
- jest-environment-jsdom ^30.3.0 → ^30.4.1
- js-cookie ^3.0.5 → ^3.0.7
- lucide-react ^1.14.0 → ^1.16.0
- next 16.2.4 → 16.2.6
- next-intl ^4.11.0 → ^4.12.0
- react 19.2.5 → 19.2.6
- react-dom 19.2.5 → 19.2.6
- tailwindcss ^4.2.4 → ^4.3.0
- zustand ^5.0.12 → ^5.0.13
- Final `npm audit`: 0 / 0 / 0 / 0 / 0 (info / low / moderate / high / critical).
- `overrides` block (`minimatch`, `flatted`, `postcss`) preserved untouched.
- Remaining outdated (majors skipped intentionally): `eslint` (9.39.4 → 10.4.0), `typescript` (5.9.3 → 6.0.3).

### Backend (commit `2ade9c0` — `deps(backend): apply patch+minor updates`)
- Django 6.0.4 → 6.0.5
- Faker 40.15.0 → 40.18.0
- coverage 7.13.5 → 7.14.0
- ruff 0.15.12 → 0.15.13
- requests 2.33.1 → 2.34.2
- `pip-audit` final: **0 vulns** across 59 dependencies.
- Remaining outdated: `gunicorn` 23.0.0 → 26.0.0 (skipped — major + pin `<24.0`).

## Rollbacks
Ninguno. `npm install` falló una vez con `ENOTEMPTY` al renombrar `@next/swc-linux-x64-musl` (estado residual de un install previo parcial); se resolvió borrando `node_modules/` y reinstalando. No se revirtió ninguna versión.

## Verification Results

### Frontend
- `npm audit`: critical=0, high=0, moderate=0, low=0, info=0.
- `npm run build`: success. 20 páginas estáticas generadas para `en` + `es`, incluyendo `/services/*` (language-assurance, localization-adaptation, applied-cultural-intelligence).

### Backend
- `python manage.py check`: `System check identified no issues (0 silenced).`
- `pytest --collect-only -q`: **177 tests collected** en 2.47s, sin errores de colección.
- Slice: `pytest blog/tests/test_models.py -v --no-cov` → **6 passed in 0.92s**.

### Pre-flight notes
- `backend/venv` se recreó desde cero — el venv previo estaba roto (shebangs apuntaban a `/home/dev-env/webapps/xpandia_project/backend/venv/bin/python3`, es decir, otro checkout sin `_staging`).
- Durante la ejecución aparecieron como modificados sin staging tres archivos de skill (`.claude/skills/vuln-audit/SKILL.md`, `.agents/skills/vuln-audit/SKILL.md`, `.windsurf/workflows/vuln-audit.md`) — no relacionados con dependencias, presumiblemente de un fleet-sync en paralelo. **No** se incluyeron en ningún commit de esta rama.
