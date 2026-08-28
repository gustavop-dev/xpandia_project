# Informe de auditoría y actualización operativa de dependencias

**Rama:** `chore/28082026-pip-outdated`
**Fecha:** 2026-08-28
**Base:** `main` @ `d57c06d`
**Alcance:** backend; actualización controlada de transitivas del venv de producción

## Resumen

| Superficie | Vulnerabilidades | Desactualizadas antes | Desactualizadas después |
|---|---:|---:|---:|
| Backend | 0 → 0 | 9 | 1 |

El contador inicial mezclaba una actualización mayor de framework con ocho
dependencias transitivas acumuladas en el venv de producción. Un venv aislado creado
desde `backend/requirements.txt` ya resolvía esas ocho transitivas a sus versiones
actuales, por lo que no correspondía convertirlas en dependencias directas ni cambiar
los pins del proyecto.

Django permanece en `6.0.8`: producción usa MySQL 8.0.46 y Django 6.1 exige MySQL
8.4 o posterior. Ese constraint sigue vigente.

---

## Snapshot inicial

| Paquete | Versión inicial | Última | Clasificación | Decisión |
|---|---:|---:|---|---|
| certifi | 2026.5.20 | 2026.7.22 | transitiva | Actualizada en runtime |
| charset-normalizer | 3.4.7 | 3.5.1 | transitiva | Actualizada en runtime |
| Django | 6.0.8 | 6.1 | major de framework | Omitida por constraint MySQL 8.0 |
| idna | 3.17 | 3.19 | transitiva | Actualizada en runtime |
| msgpack | 1.2.1 | 1.2.2 | transitiva | Actualizada en runtime |
| packaging | 26.2 | 26.3 | transitiva/tooling | Actualizada en runtime |
| platformdirs | 4.11.4 | 4.11.5 | transitiva/tooling | Actualizada en runtime |
| Pygments | 2.20.0 | 2.21.0 | transitiva/tooling | Actualizada en runtime |
| wheel | 0.47.0 | 0.48.0 | tooling | Actualizada en runtime |

`pip-audit` inicial: **0 vulnerabilidades conocidas**.

## Actualizaciones aplicadas

Se ejecutó primero un dry-run con versiones explícitas. Después se actualizaron sólo
los ocho paquetes transitivos listados, sin dependencias adicionales y sin modificar
`backend/requirements.txt`.

| Paquete | Antes | Después |
|---|---:|---:|
| certifi | 2026.5.20 | 2026.7.22 |
| charset-normalizer | 3.4.7 | 3.5.1 |
| idna | 3.17 | 3.19 |
| msgpack | 1.2.1 | 1.2.2 |
| packaging | 26.2 | 26.3 |
| platformdirs | 4.11.4 | 4.11.5 |
| Pygments | 2.20.0 | 2.21.0 |
| wheel | 0.47.0 | 0.48.0 |

Snapshot previo para rollback operativo:
`/tmp/xpandia-prod-pip-before-20260828.txt`.

## Rollbacks

Ninguno.

## Resultados de verificación

| Verificación | Resultado |
|---|---|
| `pip check` | ✅ sin dependencias rotas |
| `pip-audit` | ✅ 0 vulnerabilidades conocidas |
| `python manage.py check` en venv aislado | ✅ 0 issues |
| `pytest --collect-only -q` | ✅ 234 tests colectados |
| `pytest blog/tests/test_admin.py -q` | ✅ 18 passed con `settings_test` SQLite |
| imports de runtime | ✅ MySQLdb, certifi, charset-normalizer, idna y msgpack |
| `manage.py check --database default` con settings de producción | ✅ 0 issues |
| servicios | ✅ gunicorn, Huey y frontend activos |
| `https://xpandia.global/api/health/` | ✅ HTTP 200 |
| `post-deploy-check.sh xpandia_project` | ✅ PASS=19, FAIL=0, WARN=0, SKIP=0 |

## Estado final

- `pip list --outdated`: **1** paquete, Django `6.0.8 → 6.1`.
- Django 6.1 queda diferido hasta migrar producción de MySQL 8.0 a MySQL 8.4+.
- El diagnóstico de disco se revisó: `xpandia_project/node_modules` es requerido por
  el runtime SSR y no debe eliminarse.
