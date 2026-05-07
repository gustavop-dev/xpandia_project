---
trigger: manual
description: System architecture, component relationships, API endpoints, data models, and deployment overview for Xpandia.
---

# Architecture — Xpandia

_Last verified: 2026-05-07_

## 1. System Overview

```mermaid
graph TD
    Browser["Browser / Client"]
    Next["Next.js 16 Frontend :3000 (dev) / :3004 (E2E)"]
    Django["Django 6 Backend :8000"]
    DB[("MySQL 8 / SQLite")]
    Redis[("Redis")]
    Huey["Huey Task Queue"]
    Email["Email (SMTP)"]
    Google["Google OAuth / reCAPTCHA"]

    Browser -->|"HTTP/HTTPS"| Next
    Next -->|"REST API + JWT (client)"| Django
    Next -->|"fetch + ISR (server)"| Django
    Django --> DB
    Django --> Redis
    Huey -->|"async tasks"| Redis
    Huey --> Email
    Django --> Google
    Browser --> Google
```

---

## 2. Request Flows

### 2a. Authenticated API call (client-side, JWT)

```mermaid
sequenceDiagram
    participant B as Browser
    participant FE as Next.js (client)
    participant API as Django DRF
    participant DB as Database

    B->>FE: User action
    FE->>FE: Read access token from cookie (tokens.ts)
    FE->>API: GET /api/resource/ (Authorization: Bearer <token>)
    API->>API: Verify JWT
    alt Token valid
        API->>DB: Query
        DB-->>API: Data
        API-->>FE: 200 JSON
    else Token expired (401)
        FE->>API: POST /api/token/refresh/ (refresh token)
        API-->>FE: New access token
        FE->>API: Retry original request
        API-->>FE: 200 JSON
    end
    FE-->>B: Rendered response
```

### 2b. Public blog detail (server-side, ISR)

```mermaid
sequenceDiagram
    participant B as Browser
    participant Next as Next.js (RSC)
    participant API as Django (AllowAny)
    participant DB as Database

    B->>Next: GET /blog/<slug>?lang=es
    Next->>Next: generateMetadata + page share React.cache(fetchBlogPost)
    Next->>API: GET /api/blog/<slug>/?lang=es (single fetch via cache)
    API->>DB: SELECT * FROM blog_blogpost WHERE slug=? AND is_published=true
    alt Found
        DB-->>API: row
        API-->>Next: 200 JSON (lang-resolved)
        Next-->>B: SSR HTML (revalidate: 60s)
    else Not found
        DB-->>API: empty
        API-->>Next: 404 {"detail":"Not found."}
        Next-->>B: Next notFound() page
    end
```

---

## 3. Backend API Endpoints

### Root (`base_feature_project/urls.py`, 8 path entries)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health/` | Health check |
| `*` | `/admin/` | Custom `BaseFeatureAdminSite` |
| `*` | `/admin-gallery/` | Default Django admin (rare use) |
| POST | `/api/token/` | Obtain JWT pair (SimpleJWT) |
| POST | `/api/token/refresh/` | Refresh access token |
| `*` | `/api/blog/` | Includes `blog.urls` |
| `*` | `/api/` | Includes `base_feature_app.urls` |

### Blog (`blog/urls.py`)
| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| GET | `/api/blog/` | Paginated list of published posts | AllowAny |
| GET | `/api/blog/<slug>/` | Single published post detail | AllowAny |

Query params on both: `?lang=es|en` (default `en`), `?page=N`, `?page_size=K` (default 9, max 50, list only).

### Auth (`base_feature_app/urls/auth.py`, 7 paths)
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/sign_up/` | Register new user |
| POST | `/api/sign_in/` | Login → returns JWT |
| POST | `/api/google_login/` | Google OAuth login |
| POST | `/api/send_passcode/` | Send password-reset code |
| POST | `/api/verify_passcode_and_reset_password/` | Verify code + new password |
| POST | `/api/update_password/` | Update password (authenticated) |
| GET | `/api/validate_token/` | Validate access token |

### Users (`base_feature_app/urls/user.py`, 2 paths)
| Method | Path | Purpose |
|--------|------|---------|
| GET, POST | `/api/users/` | List / create users |
| GET, PUT, PATCH, DELETE | `/api/users/<id>/` | User detail CRUD |

### Captcha (`base_feature_app/urls/captcha.py`, 2 paths)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/google-captcha/site-key/` | Get reCAPTCHA site key |
| POST | `/api/google-captcha/verify/` | Verify reCAPTCHA token |

### Contact (`base_feature_app/urls/contact.py`, 1 path)
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/contact/` | Send contact form via email (AllowAny) |

---

## 4. Data Models (ER Diagram)

```mermaid
erDiagram
    User {
        int id PK
        string email UK
        string first_name
        string last_name
        string phone
        string role "customer|admin"
        bool is_active
        bool is_staff
        datetime date_joined
        string password
    }

    PasswordCode {
        int id PK
        int user_id FK
        string code "6-digit"
        datetime created_at
        bool used
    }

    BlogPost {
        bigint id PK
        string slug UK "auto-generated"
        string title_en
        string title_es
        text excerpt_en
        text excerpt_es
        json content_json_en
        json content_json_es
        image cover_image
        string category "5 choices"
        string author "xpandia-team"
        bool is_published
        datetime published_at
        datetime created_at
        datetime updated_at
    }

    User ||--o{ PasswordCode : "has"
```

**Notes:**
- `User.role` choices: `customer` (default), `admin`
- `PasswordCode` expires after 15 minutes via `is_valid()` method
- `BlogPost.category` choices: `ai-quality`, `localization`, `case-study`, `industry`, `operations`
- `BlogPost.author` choices: `xpandia-team` (only)
- `BlogPost` has no FK to User — authorship is a CharField with hardcoded choices
- `django_attachments` provides a generic file attachment model (not yet used in views)

---

## 5. Frontend Route Architecture

```mermaid
graph TD
    Layout["app/layout.tsx (RSC)\nXpandiaHeader + XpandiaFooter + FABContact + SiteAnimations"]
    Providers["app/providers.tsx (client passthrough)"]
    Home["app/page.tsx (RSC)"]
    About["app/about/page.tsx (RSC)"]
    Contact["app/contact/page.tsx (client)"]
    Services["app/services/page.tsx (RSC)"]
    QA["app/services/qa/page.tsx"]
    Audit["app/services/audit/page.tsx"]
    Fractional["app/services/fractional/page.tsx"]
    BlogList["app/blog/page.tsx (RSC, ISR)"]
    BlogDetail["app/blog/[slug]/page.tsx (RSC, ISR)"]

    Layout --> Providers
    Layout --> Home
    Layout --> About
    Layout --> Contact
    Layout --> Services
    Services --> QA
    Services --> Audit
    Services --> Fractional
    Layout --> BlogList
    BlogList --> BlogDetail
```

---

## 6. Frontend State / Data-Fetching Architecture

```mermaid
graph TD
    LS["localStorage\nxpandia-lang\nlocale"]
    Cookies["Cookies\naccess_token\nrefresh_token"]

    LangPref["XpandiaHeader\nlang state (en/es)"]
    LocaleStore["localeStore (Zustand)"]
    Axios["lib/services/http.ts\nAxios + JWT refresh\n(client only)"]
    TokenSvc["lib/services/tokens.ts"]
    BlogSvc["lib/services/blog.ts\nfetch + React.cache + ISR\n(server only)"]

    LangPref <-->|read/write| LS
    LocaleStore <-->|persists| LS
    Axios --> TokenSvc
    TokenSvc <-->|read/write| Cookies
    BlogSvc -.->|"absolute URL via\nNEXT_PUBLIC_BACKEND_ORIGIN"| Django["Django :8000"]
    Axios -.->|"relative /api/*\n(Next rewrite proxy)"| Django
```

**Key separation**: server-side `BlogSvc` calls Django directly with an absolute URL; client-side `Axios` goes through Next.js's rewrite proxy. They are intentionally distinct.

---

## 7. Component Hierarchy

```
app/layout.tsx
├── Providers (client wrapper, currently passthrough)
├── XpandiaHeader (client — scroll, drawer, lang toggle)
├── {children}  (page content)
│   └── Blog pages → BlogCard, BlogPagination, BlogLanguageToggle, BlogContentRenderer
├── XpandiaFooter (server)
├── FABContact (server)
└── SiteAnimations (client — GSAP, returns null)
```

---

## 8. E2E Test Architecture

```mermaid
graph TD
    Spec["e2e/public/*.spec.ts (6 files)"]
    Tags["e2e/helpers/flow-tags.ts\n(tag constants)"]
    Defs["e2e/flow-definitions.json\n(source of truth, 25 flows)"]
    Setup["e2e/global-setup.ts\nexecFileSync('manage.py seed_blog_e2e')"]
    Reporter["e2e/reporters/flow-coverage-reporter.mjs"]
    Output["e2e-results/flow-coverage.json"]

    Spec -->|imports| Tags
    Tags -.->|references| Defs
    Setup -->|seeds DB before tests| Spec
    Spec -->|tags emitted| Reporter
    Reporter -->|writes| Output
```

---

## 9. Deployment Architecture (Planned)

```mermaid
graph LR
    CF["Cloudflare / CDN"]
    Nginx["Nginx"]
    Next["Next.js (pm2)"]
    Gunicorn["Gunicorn (Django)"]
    DB[("MySQL 8")]
    Redis[("Redis")]
    Huey["Huey worker"]

    CF --> Nginx
    Nginx -->|":3000"| Next
    Nginx -->|":8000"| Gunicorn
    Gunicorn --> DB
    Gunicorn --> Redis
    Huey --> Redis
```

**Status:** Staging/production not yet provisioned. Server paths TBD.
