# Vulnerability Audit & Dependency Update Report

**Branch:** `chore/26082026-vuln-audit`
**Date:** 2026-08-26
**Base:** `main` @ `34a39fe`
**Scope:** backend patch + minor updates only (no major version bumps)

## Summary

| Surface | Vulns (initial) | Outdated (initial) |
|---|---|---|
| Backend environment | 5 advisories across 2 packages | 11 |
| Backend requirements | 4 advisories in 1 runtime package | — |

The runtime findings are the four SQLParse advisories. The fifth advisory belongs
to the `pip` toolchain installed in the production virtual environment and is not
declared in `requirements.txt`.

---

## Backend — `pip-audit` (initial)

Source: `/tmp/xpandia_project-pip-audit.json`

| Package | Current | Vulns | Minimum fix | Decision |
|---|---:|---:|---:|---|
| `pip` | 26.1.2 | 1 | 26.2 | Operational toolchain update; not a project requirement. |
| `sqlparse` | 0.5.5 | 4 | 0.6.0 | Major by the 0.x policy; skipped by `$vuln-audit --apply`. |

The requirements-only snapshot found the same four SQLParse advisories and no
additional vulnerable project dependency.

## Backend — `pip list --outdated` (initial)

Source: `/tmp/xpandia_project-pip-outdated.json`

- `certifi` 2026.5.20 → 2026.7.22 *(transitive; not pinned directly)*
- `charset-normalizer` 3.4.7 → 3.5.1 *(transitive; not pinned directly)*
- `Django` 6.0.8 → 6.1 *(blocked until production MySQL is upgraded to 8.4)*
- `gunicorn` 23.0.0 → 26.2.0 *(major and `<24.0` constraint: skipped)*
- `idna` 3.17 → 3.19 *(transitive; not pinned directly)*
- `packaging` 26.2 → 26.3 *(transitive; not pinned directly)*
- `pip` 26.1.2 → 26.2.1 *(toolchain; not declared in requirements)*
- `Pygments` 2.20.0 → 2.21.0 *(transitive; not pinned directly)*
- `ruff` 0.15.13 → 0.16.4 *(0.15.22 is the latest allowed target)*
- `sqlparse` 0.5.5 → 0.6.0 *(major by the 0.x policy: skipped)*
- `wheel` 0.47.0 → 0.48.0 *(major by the 0.x policy: skipped)*

---

## Plan

### Backend

- Update the direct Ruff pin from `0.15.13` to `0.15.22`, preserving the current
  0.15 series.
- Keep `Django==6.0.8`; Django 6.1 remains blocked until MySQL 8.4 is deployed.
- Keep `gunicorn>=23.0,<24.0`, `sqlparse==0.5.5`, and Wheel 0.47 because their
  available updates cross the allowed major boundary.
- Do not add direct pins solely to force upgrades of transitive packages.
- Record the SQLParse runtime advisories and the `pip` toolchain advisory as
  remaining findings requiring separate actions.

## Updates Applied

### Backend (commit `deps(backend): apply patch updates`)

- Updated `ruff` 0.15.13 → 0.15.22.
- Preserved `Django==6.0.8` and its MySQL 8.4 compatibility guard.
- Final environment `pip-audit`: 5 advisories in 2 packages (`sqlparse` and `pip`).
- Final requirements `pip-audit`: 4 advisories in `sqlparse 0.5.5`.
- Remaining outdated: 11 entries when compared with absolute latest releases;
  no additional direct patch/minor pin is applicable under the current policy.

Final snapshots:

- `/tmp/xpandia_project-pip-audit-final.json`
- `/tmp/xpandia_project-pip-audit-requirements-final.json`
- `/tmp/xpandia_project-pip-outdated-final.json`

## Rollbacks

- None.

## Verification Results

### Backend

- `pip check`: no broken requirements.
- `python manage.py check`: no issues.
- `pytest --collect-only -q`: 234 tests collected, no errors.
- `pytest blog/tests/test_views_detail.py -v`: 6 passed.
- Verified runtime: Django 6.0.8 and Ruff 0.15.22.

## Remaining Security Work

- Evaluate `sqlparse 0.6.0` in a dedicated compatibility PR; it fixes all four
  runtime advisories but is intentionally outside this skill's automatic policy.
- Upgrade the operational `pip` toolchain to at least 26.2 after the dependency PR
  is integrated.
- Plan the MySQL 8.4 upgrade before any future move to Django 6.1.
