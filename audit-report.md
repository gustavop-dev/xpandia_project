# Auditoría de vulnerabilidades y dependencias — modernización secuencial

**Fecha:** 2026-08-27
**Rama:** chore/27082026-deps-upgrade (PR #73)
**Base:** main @ aacff5c
**Alcance:** patch + minor + majors, un commit por unidad con CI verde por commit · superficies: ambas (frontend npm + backend pip) · modo `/vuln-audit --upgrade` (piloto conducido desde la sesión del toolkit)

## Resultado ejecutivo

| Métrica | Antes | Después |
|---|---|---|
| npm audit (C/H/M/L) | 0/0/0/0 | 0/0/0/0 |
| npm outdated (directas) | 4 (next-intl, typescript, eslint, @types/node) | 2 (eslint 10, typescript 7 — diferidas) |
| pip-audit (vulns / paquetes) | 4 / 1 (sqlparse 0.5.5: PYSEC-2026-3696/3697/3698/3699) | 0 / 0 |
| pip outdated (directas) | 4 (Django, gunicorn, ruff, sqlparse) | 1 diferida por constraint (Django 6.1) + ruff 0.16.5 publicado durante la corrida |
| Unidades aplicadas / vacías / diferidas | — | 6 / 4 / 3 |

## Actualizaciones aplicadas

### Frontend
| Paquete directo | Antes | Después | Unidad | Commit |
|---|---|---|---|---|
| next-intl | ^4.13.7 | ^4.14.0 | u3 minor batch (1 pkg) | ddd17d7 |
| typescript | ^5 (5.9.3) | ^6.0.3 | u4 major tooling (escalón: 7.0.2 bloqueado) | f2fbaa5 |
| @types/node | ^25.9.5 | ^26.4.0 | u6 major (devDependency) | c1549f6 |

### Backend
| Paquete directo | Antes | Después | Unidad | Commit |
|---|---|---|---|---|
| ruff | ==0.15.22 | ==0.16.4 | u10 major tooling (0.x → 0.y) | f270733 |
| gunicorn | >=23.0,<24.0 | >=26.2,<27.0 | u11 major runtime-only (`CI: no cubre`) | 01979b5 |
| sqlparse | ==0.5.5 | ==0.6.0 | u12 major (0.x → 0.y; cierra 4 PYSEC) | 1ad5a15 |

Unidades vacías (sin diff, sin commit ni run): u1 lockfile frontend (`npm audit fix`, 0 vulns), u2 patch frontend, u7 patch backend, u8 minor backend.

## Rollback y excepciones
- Ningún revert ni pin-back: los 6 runs de CI salieron verdes al primer intento salvo u10 (ver Verificaciones).
- u4 typescript: `npm install typescript@7.0.2 --dry-run` resolvió con 8 `ERESOLVE overriding peer dependency` (warnings) y el build pasó, pero `npm run lint` se cae al cargar `eslint-config-next` (`Error: typescript-eslint does not support TS 7.0.`). Iteración local: escalón intermedio 6.0.3 (0 warnings de peers, build ✅, lint sin regresión). Commit final: 5.9.3 → 6.0.3.
- `npm run lint` ya reportaba **33 problemas (26 errores, 7 warnings) en `main`** antes de esta corrida (`@typescript-eslint/no-require-imports` ×17, `no-explicit-any` ×9, `no-unused-vars` ×5, otros); el CI no lo gatea. Se usó como baseline: ninguna unidad lo hizo crecer.
- `ruff check` (informativo; el CI no lo corre): 89 hallazgos pre-existentes de estilo — fuera del alcance de un PR de dependencias.

## Actualizaciones mayores diferidas
| Paquete | Actual | Objetivo | Causa | Evidencia (run / log) | Commit de revert |
|---|---|---|---|---|---|
| Django | 6.0.8 | 6.1 | constraint documentado en `backend/requirements.txt:2`: producción usa MySQL 8.0.x y Django 6.1 exige MySQL 8.4+ (PR #70 verde en sqlite → hotfix #71) | no se intentó (regla de constraint) | — |
| eslint | 9.39.5 | 10.9.1 | smoke local rojo: `npm run lint` → `TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function` — `eslint-plugin-react` (vía `eslint-config-next 16.3.3`, ya en latest) no soporta ESLint 10; forzar el peer con un override está prohibido | descartada antes del commit (sin ciclo de CI) | — |
| typescript | 6.0.3 | 7.0.2 | `Error: typescript-eslint does not support TS 7.0.` al cargar `eslint-config-next`; el paquete 7.x es el compilador nativo | descartada en el smoke; se aplicó el escalón 6.0.3 | — |

Desbloqueo: Django 6.1 ⇒ upgrade de MySQL a 8.4 en vps-projectapp-prod (decisión de fleet; luego borrar el comentario y re-correr `/vuln-audit backend --upgrade`). eslint 10 / TS 7 ⇒ esperar un `eslint-config-next` (grupo `next`) cuyos plugins y `typescript-eslint` los soporten.

## Verificaciones ejecutadas
| Verificación | Resultado |
|---|---|
| Preflight: CI presente (T≈5 min), base `main` verde, sin PR de dependencias abierto, `nvm ls 20` (node de producción), `npm ci` con lockfile en sync | ✅ |
| Venv aislado `backend/.venv` (Python 3.12.3 = CI) recreado desde cero; `backend/venv` del clon principal intacto | ✅ |
| Por unidad frontend: `npm --prefix frontend install` + `npm ls --depth=0` + `next build` (`NEXT_PUBLIC_BACKEND_ORIGIN=https://xpandia.global`) + conteo de `npm run lint` vs baseline (33) | ✅ u3, u4, u6 |
| Por unidad backend: `pip install -r` + `pip check` + `manage.py check` (settings por defecto, sin DB) + `pytest --collect-only -q` (234) + slice sqlite `blog/tests/test_admin.py` (18 passed, `settings_test`) | ✅ u10, u11, u12 |
| u11 extra: `gunicorn --check-config` con los flags del `.service` (workers 2, max-requests 800/jitter 80, timeout 30, graceful 20) | ✅ |
| u12 extra: `pip-audit` final | ✅ 0 vulns |
| CI por commit (5 checks: backend-tests, frontend-unit-tests, frontend-e2e-tests, coverage-summary, test-quality-gate) | u3 run 33088651217 ✅ · u4 33089272567 ✅ · u6 33090209560 ✅ · u10 33091299307 ✅ (attempt 2: el job E2E pegó su `timeout-minutes: 18` en el attempt 1 → `cancelled`, infra; `gh run rerun --failed` una vez) · u11 33094121229 ✅ · u12 33094457509 ✅ |

## Evidencia temporal de la ejecución
| # | Unidad | Paquetes (antes → después) | Commit | CI run | Iter. fix | Resultado |
|---|---|---|---|---|---|---|
| 1 | frontend lockfile | `npm audit fix` (0 vulns) | — | — | — | ⏭️ vacía |
| 2 | frontend patch | — | — | — | — | ⏭️ vacía |
| 3 | frontend minor (1) | next-intl 4.13.7 → 4.14.0 | ddd17d7 | 33088651217 ✅ | 0 | ✅ aplicada |
| 4 | typescript (tooling) | 5.9.3 → 6.0.3 (7.0.2 bloqueado) | f2fbaa5 | 33089272567 ✅ | 1 local (escalón) | ✅ aplicada |
| 5 | eslint (tooling) | 9.39.5 → 10.9.1 | — | — | 0 | 🔁 diferida (plugin incompatible con ESLint 10) |
| 6 | @types/node | 25.9.5 → 26.4.0 | c1549f6 | 33090209560 ✅ | 0 | ✅ aplicada |
| 7 | backend patch | — | — | — | — | ⏭️ vacía |
| 8 | backend minor | — | — | — | — | ⏭️ vacía |
| 9 | Django (framework) | 6.0.8 → 6.1 | — | — | — | ⏭️ constraint: MySQL 8.0.x en producción (requirements.txt:2) |
| 10 | ruff (tooling) | 0.15.22 → 0.16.4 | f270733 | 33091299307 ✅ (attempt 2) | 0 | ✅ aplicada · `CI: no cubre` |
| 11 | gunicorn | 23.0.0 → 26.2.0 | 01979b5 | 33094121229 ✅ | 0 | ✅ aplicada · `CI: no cubre` |
| 12 | sqlparse | 0.5.5 → 0.6.0 | 1ad5a15 | 33094457509 ✅ | 0 | ✅ aplicada |
| 13 | reporte | audit-report.md | (este commit) | — | — | — |

Snapshots: `/tmp/xpandia_project-{npm-audit,npm-outdated,pip-audit,pip-outdated}.json` (inicio) y `…-final.json` (cierre) en vps-projectapp-prod.

## Acción operativa posterior al merge
- El deploy reinstala (`pip install -r backend/requirements.txt`, `npm ci && NEXT_PUBLIC_BACKEND_ORIGIN=https://xpandia.global npm run build`); sin migraciones nuevas (ningún major de Django).
- Paquetes runtime-only que el CI no ejercita (`CI: no cubre`): **gunicorn 26.2.0** (reinicio del service `xpandia_project` con `Type=notify`) y ruff (dev) — validar con `/deploy-and-check xpandia_project` tras el deploy.
- Majors diferidos, orden sugerido para la próxima corrida: (1) Django 6.1 tras MySQL 8.4; (2) eslint 10 y typescript 7 cuando `eslint-config-next` los soporte. ruff 0.16.5 (patch publicado durante la corrida) entra en el próximo batch patch.
