---
trigger: manual
description: System architecture, component relationships, API endpoints, data models, and deployment overview for Xpandia.
---

# Architecture — Xpandia

## 1. System Overview

```mermaid
graph TD
    Browser["Browser / Client"]
    Next["Next.js 16 Frontend :3000"]
    Django["Django 6 Backend :8000"]
    MySQL[("MySQL 8")]
    Redis[("Redis")]
    Huey["Huey Task Queue"]
    Email["Email (SMTP)"]
    Google["Google OAuth / reCAPTCHA"]

    Browser -->|"HTTP/HTTPS"| Next
    Next -->|"REST API + JWT"| Django
    Django --> MySQL
    Django --> Redis
    Huey -->|"async tasks"| Redis
    Huey --> Email
    Django --> Google
    Browser --> Google
```

---

## 2. Request Flow — Authenticated API Call

```mermaid
sequenceDiagram
    participant B as Browser
    participant FE as Next.js
    participant API as Django DRF
    participant DB as MySQL

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

---

## 3. Backend API Endpoints

### Root (`base_feature_project/urls.py`)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health/` | Health check |
| POST | `/api/token/` | Obtain JWT pair (SimpleJWT) |
| POST | `/api/token/refresh/` | Refresh access token |
| `*` | `/api/` | Includes `base_feature_app` URLs |

### Auth (`base_feature_app/urls/auth.py`)
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/sign_up/` | Register new user |
| POST | `/api/sign_in/` | Login → returns JWT |
| POST | `/api/google_login/` | Google OAuth login |
| POST | `/api/send_passcode/` | Send password-reset code by email |
| POST | `/api/verify_passcode_and_reset_password/` | Verify code + set new password |
| POST | `/api/update_password/` | Update password (authenticated) |
| GET | `/api/validate_token/` | Validate access token |

### Users (`base_feature_app/urls/user.py`)
| Method | Path | Purpose |
|--------|------|---------|
| GET, POST | `/api/users/` | List users / create user |
| GET, PUT, PATCH, DELETE | `/api/users/<id>/` | User detail CRUD |

### Captcha (`base_feature_app/urls/captcha.py`)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/google-captcha/site-key/` | Get reCAPTCHA site key |
| POST | `/api/google-captcha/verify/` | Verify reCAPTCHA token |

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

    User ||--o{ PasswordCode : "has"
```

**Notes:**
- `User.role` choices: `customer` (default), `admin`
- `PasswordCode` expires after 15 minutes, enforced by `is_valid()` method
- `django_attachments` provides a generic file attachment model (not yet used in views)

---

## 5. Frontend Route Architecture

```mermaid
graph TD
    Layout["app/layout.tsx (RSC)\nXpandiaHeader + XpandiaFooter + FABContact + SiteAnimations"]
    Providers["app/providers.tsx (client)"]
    Home["app/page.tsx (RSC)"]
    About["app/about/page.tsx (RSC)"]
    Contact["app/contact/page.tsx (client)"]
    Services["app/services/page.tsx (RSC)"]
    QA["app/services/qa/page.tsx (RSC)"]
    Audit["app/services/audit/page.tsx (RSC)"]
    Fractional["app/services/fractional/page.tsx (RSC)"]

    Layout --> Providers
    Layout --> Home
    Layout --> About
    Layout --> Contact
    Layout --> Services
    Services --> QA
    Services --> Audit
    Services --> Fractional
```

---

## 6. Frontend State Architecture

```mermaid
graph TD
    LS["localStorage\n'xpandia-lang'\n'locale'"]
    Cookies["Cookies\naccess_token\nrefresh_token"]

    LangPref["XpandiaHeader\nlang state (en/es)"]
    LocaleStore["localeStore (Zustand)\npersisted via 'locale' key"]
    Axios["lib/services/http.ts\nAxios instance"]
    TokenSvc["lib/services/tokens.ts\nget/set/clear tokens"]

    LangPref <-->|read/write| LS
    LocaleStore <-->|persists| LS
    Axios --> TokenSvc
    TokenSvc <-->|read/write| Cookies
```

---

## 7. Component Hierarchy

```
app/layout.tsx
├── Providers (client wrapper, currently passthrough)
├── XpandiaHeader (client — scroll, drawer, lang toggle)
├── {children}  (page content)
├── XpandiaFooter (server)
├── FABContact (server)
└── SiteAnimations (client — GSAP, returns null)
```

---

## 8. Deployment Architecture (Planned)

```mermaid
graph LR
    CF["Cloudflare / CDN"]
    Nginx["Nginx"]
    Next["Next.js (pm2)"]
    Gunicorn["Gunicorn (Django)"]
    MySQL[("MySQL 8")]
    Redis[("Redis")]
    Huey["Huey worker"]

    CF --> Nginx
    Nginx -->|":3000"| Next
    Nginx -->|":8000"| Gunicorn
    Gunicorn --> MySQL
    Gunicorn --> Redis
    Huey --> Redis
```

**Status:** Staging/production not yet provisioned. Server paths TBD.
