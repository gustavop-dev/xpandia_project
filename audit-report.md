# Informe de auditoría de vulnerabilidades y actualización de dependencias

**Rama:** `chore/27082026-vuln-audit`
**Fecha:** 2026-08-27
**Base:** `main` @ `34768c4`
**Alcance:** sólo backend; actualizaciones patch + minor, sin majors

## Resumen

| Superficie | Vulnerabilidades iniciales | Dependencias desactualizadas |
|---|---:|---:|
| Backend | 1 en 1 paquete (`pip`) | 10 en el venv de producción; 3 en un venv limpio |

La señal de producción mezclaba dependencias declaradas, herramientas del entorno y
dependencias transitivas acumuladas. Para evitar convertir transitivas en dependencias
directas sin una decisión de lockfile, el plan se construyó desde un venv aislado recreado
con `backend/requirements.txt`, usando Python 3.12 como el CI.

No se modificó el venv del servicio ni se abrió una conexión a la base de producción.

---

## Backend — `pip-audit` inicial

Fuente: `/tmp/xpandia_project-pip-audit.json`.

| Paquete | Versión | Vulnerabilidad | Fix mínimo |
|---|---:|---|---:|
| pip | 26.1.2 | PYSEC-2026-3721 | 26.2 |

El snapshot se alineó con `pip 26.1.2`, la versión observada en producción durante
`deploy-and-check`, para reproducir exactamente la alerta de 1 vulnerabilidad.

## Backend — dependencias desactualizadas iniciales

| Paquete | Producción | Última | Clasificación | Decisión |
|---|---:|---:|---|---|
| certifi | 2026.5.20 | 2026.7.22 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| charset-normalizer | 3.4.7 | 3.5.1 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| Django | 6.0.8 | 6.1 | major de framework | Omitida: producción usa MySQL 8.0.x; requiere MySQL 8.4+ |
| idna | 3.17 | 3.19 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| msgpack | 1.2.1 | 1.2.2 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| packaging | 26.2 | 26.3 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| pip | 26.1.2 | 26.2.1 | minor + seguridad | Aplicada como piso `>=26.2,<27.0` |
| Pygments | 2.20.0 | 2.21.0 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |
| ruff | 0.16.4 | 0.16.5 | patch | Aplicada como pin `==0.16.5` |
| wheel | 0.47.0 | 0.48.0 | transitiva | Ya resuelve latest en venv limpio; sin pin directo |

---

## Plan

- Añadir `pip>=26.2,<27.0` como piso de seguridad para que el deploy actualice el
  instalador vulnerable dentro del venv.
- Actualizar `ruff==0.16.4` a `ruff==0.16.5`.
- Mantener `Django==6.0.8`; Django 6.1 queda bloqueado por el constraint documentado
  de MySQL 8.0.x.
- No promover siete dependencias transitivas a directas: un venv limpio ya instala sus
  versiones actuales y ninguna tiene vulnerabilidades conocidas en este snapshot.

## Actualizaciones aplicadas

| Paquete | Antes | Después | Resultado |
|---|---:|---:|---|
| pip | 26.1.2 | 26.2.1 (`>=26.2,<27.0`) | PYSEC-2026-3721 cerrada |
| ruff | 0.16.4 | 0.16.5 | Patch aplicado |

`pip-audit` final: **0 vulnerabilidades conocidas**.

Dependencias desactualizadas en el venv limpio final: sólo Django 6.1, omitida por
constraint. Las siete transitivas antiguas observadas en producción requieren una
recreación o actualización controlada del venv para cambiar en runtime; no justifican
pins directos dentro de este PR.

## Rollbacks

Ninguno.

## Resultados de verificación

| Verificación | Resultado |
|---|---|
| `pip install -r backend/requirements.txt` | ✅ pip 26.2.1 y ruff 0.16.5 instalados |
| `pip check` | ✅ sin dependencias rotas |
| `pip-audit` final | ✅ 0 vulnerabilidades |
| `python manage.py check` | ✅ 0 issues |
| `pytest --collect-only -q` | ✅ 234 tests colectados |
| `pytest blog/tests/test_admin.py -q` | ✅ 18 passed con `settings_test` SQLite |

## Acción operativa posterior al merge

- Desplegar el PR para aplicar el piso de `pip` y el pin de `ruff` al venv del servicio.
- Repetir `post-deploy-check.sh xpandia_project`; `pip-audit` debe quedar en 0.
- Si se desea refrescar también las siete transitivas no vulnerables del venv acumulado,
  hacerlo como mantenimiento explícito del entorno, no añadiendo pins directos ad hoc.
