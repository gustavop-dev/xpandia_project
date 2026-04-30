# Vulnerability Audit Report — `xpandia_project`

- **Branch**: `double-check-30042026`
- **Date**: 2026-04-30
- **Scope**: Frontend (`frontend/`, npm) + Backend (`backend/`, pip)
- **Policy**: patch + minor only — no major bumps, no `npm audit fix --force`

---

## 1. Summary — CVE counts

### Frontend (`npm audit`)

| Severity | Count |
|----------|------:|
| critical | 0 |
| high     | 3 |
| moderate | 5 |
| low      | 0 |
| info     | 0 |
| **total**| **8** |

Direct vulnerable packages: `axios`, `next`, `next-intl`. Transitive: `brace-expansion`, `flatted`, `follow-redirects`, `picomatch`, `postcss`.

### Backend (`pip-audit`)

| Severity (per advisory) | Count |
|-------------------------|------:|
| Total advisories        | 10    |
| Affected packages       | 4     |

(`pip-audit` doesn't emit a CVSS severity per finding; the table below lists each CVE with its fix range.)

Affected packages: `Django`, `pillow`, `pytest`, `requests`.

---

## 2. Frontend outdated table (patch + minor scope)

| Package | Current | Wanted (patch+minor) | Latest | Major skipped? |
|---------|---------|----------------------|--------|----------------|
| @playwright/test | 1.58.2 | 1.59.1 | 1.59.1 | no |
| @react-oauth/google | 0.13.4 | 0.13.5 | 0.13.5 | no |
| @tailwindcss/postcss | 4.2.1 | 4.2.4 | 4.2.4 | no |
| @types/node | 25.3.0 | 25.6.0 | 25.6.0 | no |
| axios | 1.13.5 | 1.15.2 | 1.15.2 | no |
| eslint | 9.39.3 | 9.39.4 | 10.2.1 | **yes (10.x)** |
| eslint-config-next | 16.1.6 | 16.1.6 | 16.2.4 | no (wanted=current; latest is minor but ncu --target minor will pick it) |
| eslint-plugin-playwright | 2.7.1 | 2.10.2 | 2.10.2 | no |
| jest | 30.2.0 | 30.3.0 | 30.3.0 | no |
| jest-environment-jsdom | 30.2.0 | 30.3.0 | 30.3.0 | no |
| lucide-react | 1.8.0 | 1.14.0 | 1.14.0 | no |
| next | 16.1.6 | 16.1.6 | 16.2.4 | no |
| next-intl | 4.8.3 | 4.11.0 | 4.11.0 | no |
| react | 19.2.4 | 19.2.4 | 19.2.5 | no |
| react-dom | 19.2.4 | 19.2.4 | 19.2.5 | no |
| tailwindcss | 4.2.1 | 4.2.4 | 4.2.4 | no |
| typescript | 5.9.3 | 5.9.3 | 6.0.3 | **yes (6.x)** |
| zustand | 5.0.11 | 5.0.12 | 5.0.12 | no |

## 3. Backend outdated table (patch + minor scope)

| Package | Current | Wanted (patch+minor) | Latest | Major skipped? |
|---------|---------|----------------------|--------|----------------|
| coverage | 7.13.4 | 7.13.5 | 7.13.5 | no |
| Django | 6.0.2 | 6.0.4 | 6.0.4 | no |
| djangorestframework | 3.16.1 | 3.17.1 | 3.17.1 | no |
| Faker | 40.5.1 | 40.15.0 | 40.15.0 | no |
| gunicorn | 23.0.0 | 23.0.0 | 25.3.0 | **yes (24.x/25.x; pinned `>=23.0,<24.0`)** |
| pillow | 12.1.1 | 12.2.0 | 12.2.0 | no |
| pytest | 9.0.2 | 9.0.3 | 9.0.3 | no |
| pytest-cov | 7.0.0 | 7.1.0 | 7.1.0 | no |
| requests | 2.32.5 | 2.33.1 | 2.33.1 | no |
| ruff | 0.15.2 | 0.15.12 | 0.15.12 | no |

---

## 4. CVE details

### Frontend

| Package | Advisory | Severity | CVSS | Fix version |
|---------|----------|----------|------|-------------|
| axios | GHSA-3p68-rc4w-qgx5 — NO_PROXY hostname normalization bypass / SSRF | moderate | 4.8 | >=1.15.0 |
| axios | GHSA-fvcv-3m26-pcqx — Cloud metadata exfiltration via header injection | moderate | 4.8 | >=1.15.0 |
| brace-expansion | GHSA-f886-m6hf-6m8v — Zero-step sequence DoS | moderate | 6.5 | >=5.0.5 |
| flatted | GHSA-rf6f-7fwh-wjgh — Prototype pollution via parse() | high | n/a | >3.4.1 |
| follow-redirects | GHSA-r4q5-vmmm-2653 — Auth header leak on cross-domain redirect | moderate | n/a | >1.15.11 |
| next | GHSA-ggv3-7p47-pfv8 — HTTP request smuggling in rewrites | moderate | n/a | >=16.1.7 |
| next | GHSA-3x4c-7xq6-9pq8 — Unbounded next/image disk cache | moderate | n/a | >=16.1.7 |
| next | GHSA-h27x-g6w4-24gq — Unbounded postponed resume buffering DoS | moderate | n/a | >=16.1.7 |
| next | GHSA-mq59-m269-xvcx — null origin bypass of Server Actions CSRF | moderate | n/a | >=16.1.7 |
| next | GHSA-jcc7-9wpm-mj36 — null origin bypass of dev HMR CSRF | low | n/a | >=16.1.7 |
| next | GHSA-q4gf-8mx6-v5v3 — DoS with Server Components | high | 7.5 | >=16.2.3 |
| next-intl | GHSA-8f24-v5vv-gm5j — open redirect | moderate | n/a | >=4.9.1 |
| picomatch | GHSA-3v7f-55p6-f55p — POSIX class method injection | moderate | 5.3 | >=2.3.2 / >=4.0.4 |
| picomatch | GHSA-c2c7-rcm5-vvqj — ReDoS via extglob quantifiers | high | 7.5 | >=2.3.2 / >=4.0.4 |
| postcss | GHSA-qx2v-qp2m-jg93 — XSS via unescaped `</style>` | moderate | 6.1 | >=8.5.10 (pulled in by `next>=16.2.3`) |

### Backend

| Package | CVE / Advisory | Fix versions |
|---------|----------------|--------------|
| Django 6.0.2 | CVE-2026-25674 (GHSA-mjgh-79qc-68w3) — race in file storage / file cache umask | 4.2.29, 5.2.12, 6.0.3 |
| Django 6.0.2 | CVE-2026-25673 (GHSA-8p8v-wh79-9r56) — URLField NFKC slowdown DoS (Windows) | 4.2.29, 5.2.12, 6.0.3 |
| Django 6.0.2 | CVE-2026-33033 (GHSA-5mf9-h53q-7mhq) — MultiPartParser base64 whitespace DoS | 4.2.30, 5.2.13, 6.0.4 |
| Django 6.0.2 | CVE-2026-33034 (GHSA-933h-hp56-hf7m) — ASGI Content-Length bypass of DATA_UPLOAD_MAX_MEMORY_SIZE | 4.2.30, 5.2.13, 6.0.4 |
| Django 6.0.2 | CVE-2026-4292 (GHSA-mmwr-2jhp-mc7j) — list_editable forged POST creates new instances | 4.2.30, 5.2.13, 6.0.4 |
| Django 6.0.2 | CVE-2026-4277 (GHSA-pwjp-ccjc-ghwg) — GenericInlineModelAdmin add-permission bypass | 4.2.30, 5.2.13, 6.0.4 |
| Django 6.0.2 | CVE-2026-3902 (GHSA-mvfq-ggxm-9mc5) — ASGIRequest header spoof via hyphen/underscore aliasing | 4.2.30, 5.2.13, 6.0.4 |
| pillow 12.1.1 | CVE-2026-40192 (GHSA-whj4-6x5x-4v2j) — FITS GZIP decompression bomb | 12.2.0 |
| pytest 9.0.2 | CVE-2025-71176 (GHSA-6w46-j5rx-g56g) — predictable `/tmp/pytest-of-{user}` directory | 9.0.3 |
| requests 2.32.5 | CVE-2026-25645 (GHSA-gc5v-m9x4-r6x2) — `extract_zipped_paths` predictable temp filename | 2.33.0 |

---

## 5. Reproducibility commands

```bash
# Frontend scans
cd frontend
npm install
npm audit --json     > /tmp/xpandia_project-npm-audit.json
npm outdated --json  > /tmp/xpandia_project-npm-outdated.json

# Backend scans
cd backend
python3 -m venv .venv-audit
.venv-audit/bin/pip install --upgrade pip
.venv-audit/bin/pip install -r requirements.txt
.venv-audit/bin/pip install pip-audit
.venv-audit/bin/pip-audit -r requirements.txt --format json > /tmp/xpandia_project-pip-audit.json
.venv-audit/bin/pip list --outdated --format json            > /tmp/xpandia_project-pip-outdated.json

# Frontend updates (patch + minor only)
cd frontend
npm audit fix              # no --force
npx --yes npm-check-updates -u --target minor
npm install

# Backend updates (patch + minor only)
# Edit requirements.txt to bump pinned versions.
cd backend
rm -rf .venv-audit && python3 -m venv .venv-audit
.venv-audit/bin/pip install --upgrade pip
.venv-audit/bin/pip install -r requirements.txt
.venv-audit/bin/pip-audit -r requirements.txt
```

---

## 6. Notes on majors available but skipped

Per policy (no major version bumps), the following latest versions are *not* applied. They remain available for a future deliberate upgrade:

- **Frontend**: `eslint` 10.x (current 9.39.x), `typescript` 6.x (current 5.9.x).
- **Backend**: `gunicorn` 24.x/25.x (currently pinned as `>=23.0,<24.0` in `requirements.txt`).

No security advisories were observed against these packages in the scans above, so skipping them carries no known CVE risk in the current snapshot.

---

## 7. Update execution log

This section is updated as updates are applied (sub-phases D and E).

</content>
</invoke>