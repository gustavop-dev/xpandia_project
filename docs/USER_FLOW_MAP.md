# User Flow Map

**Single source of truth for all user flows in the Xpandia application.**

Use this document to understand each flow's steps, branching conditions, role restrictions, and API contracts before writing or reviewing E2E tests.

**Version:** 2.0.0
**Last Updated:** 2026-04-24

---

## Table of Contents

1. [Module Index](#module-index)
2. [Home Module](#home-module)
3. [Services Module](#services-module)
4. [Static Module](#static-module)
5. [Navigation](#navigation)

---

## Module Index

| Flow ID | Name | Module | Priority | Roles | Frontend Route |
|---------|------|--------|----------|-------|----------------|
| `home-loads` | Home Page | home | P1 | guest | `/` |
| `contact-form-submit` | Contact Form Submit | contact | P1 | guest | `/contact` |
| `services-overview` | Services Overview | services | P2 | guest | `/services` |
| `services-qa` | AI Spanish QA Sprint | services | P2 | guest | `/services/qa` |
| `services-audit` | Launch Readiness Audit | services | P2 | guest | `/services/audit` |
| `services-fractional` | Fractional Lead | services | P2 | guest | `/services/fractional` |
| `cta-home-to-contact` | CTA: Home → Contact | cta | P2 | guest | `/` |
| `cta-service-detail-to-contact` | CTA: Service detail → Contact | cta | P2 | guest | `/services/qa` |
| `services-card-to-detail` | Service card → Detail page | services | P2 | guest | `/services` |
| `breadcrumb-back-to-services` | Breadcrumb: Detail → Services | services | P2 | guest | `/services/qa` |
| `about-page` | About | static | P3 | guest | `/about` |
| `contact-page` | Contact | static | P2 | guest | `/contact` |
| `mobile-navigation-drawer` | Mobile nav drawer | navigation | P3 | guest | all pages |
| `header-services-dropdown` | Header services dropdown | navigation | P3 | guest | all pages |
| `fab-contact-button` | FAB contact button | navigation | P3 | guest | all pages |
| `language-toggle-preference` | Language toggle | navigation | P3 | guest | all pages |
| `navigation-between-pages` | Cross-page navigation | navigation | P2 | guest | all pages |
| `navigation-header` | Header nav renders | navigation | P3 | guest | all pages |
| `navigation-footer` | Footer renders | navigation | P4 | guest | all pages |
| `footer-links-navigation` | Footer links navigate correctly | navigation | P4 | guest | all pages |

---

## Home Module

### home-loads

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Roles** | guest |
| **Frontend route** | `/` |
| **API endpoints** | none (static content) |

**Preconditions:** None.

**Steps:**
1. User opens `/`.
2. Hero section renders with H1 `Spanish that works. Quality you can measure.`
3. Methodology, stats strip, services grid, scorecard preview, audience fit and CTA sections render.
4. `Book a diagnostic call` and `Request an audit` CTAs link to `/contact`.

**Happy path:** Page renders without network requests; all links are functional; animations trigger on scroll.

---

## Contact Module

### contact-form-submit

| Field | Value |
|-------|-------|
| **Priority** | P1 |
| **Roles** | guest |
| **Frontend route** | `/contact` |
| **API endpoints** | none (frontend-only state; no backend wiring yet) |

**Preconditions:** User is on `/contact`.

**Steps:**
1. User clicks a service radio tile (e.g., "AI Spanish QA Sprint").
2. User clicks a company size radio tile (e.g., "50–150").
3. User fills in Full name, Role, Work email, Company text inputs.
4. User writes a paragraph in the situation textarea.
5. User clicks "Request diagnostic call" button.

**Happy path:** Form submits (`onSubmit` sets `submitted = true`); the button is replaced by a success banner reading "✓ Request received — we'll reply within 24 hours".

---

## CTA Module

### cta-home-to-contact

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/` |
| **API endpoints** | none |

**Steps:** User clicks the "Book a diagnostic call" link in the home hero section → browser navigates to `/contact`.

### cta-service-detail-to-contact

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/services/qa` (representative; same pattern on audit and fractional) |
| **API endpoints** | none |

**Steps:** User clicks the primary CTA "Request an AI Spanish QA Sprint" on `/services/qa` → browser navigates to `/contact`.

---

## Services Module

### services-overview

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/services` |
| **API endpoints** | none |

Presents the three concrete Xpandia engagements with cross-links to the detail pages.

### services-qa / services-audit / services-fractional

Each service detail page is static content under `/services/<slug>`. No API calls.

### services-card-to-detail

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/services` |
| **API endpoints** | none |

**Steps:** User clicks the "AI Spanish QA Sprint" service card/link on the `/services` overview page → browser navigates to `/services/qa`.

### breadcrumb-back-to-services

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/services/qa` |
| **API endpoints** | none |

**Steps:** User clicks the "← ALL SERVICES" breadcrumb link on any service detail page → browser navigates to `/services`.

---

## Static Module

### about-page

Static page at `/about` describing Xpandia's focus, founder background and methodology.

### contact-page

Contact page at `/contact`. Contains the booking and contact form. Email contact: `hello@xpandia.co`.

---

## Navigation

### navigation-between-pages

Cross-page navigation via `XpandiaHeader` (desktop nav, mobile drawer) across `/`, `/about`, `/contact`, `/services`, `/services/qa`, `/services/audit`, `/services/fractional`.

### navigation-header / navigation-footer

Header and footer render on every route and expose the expected link set and CTAs.

### mobile-navigation-drawer

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | all pages |
| **Viewport** | mobile (390×844) |

**Steps:** User taps the hamburger button (`aria-label="Menu"`) → mobile drawer slides in → user taps "About" link → drawer closes; URL is `/about`.

### header-services-dropdown

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | all pages |
| **Viewport** | desktop (≥ 768px) |

**Steps:** User hovers over the "Services" nav item in the desktop header → dropdown menu appears with "All services" and three service links → user clicks "All services" → navigates to `/services`.

### fab-contact-button

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | all pages |

**Steps:** User clicks the `FABContact` floating action button (`aria-label="Book a diagnostic call"`) → browser navigates to `/contact`.

### language-toggle-preference

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | all pages |

**Steps:** User clicks the "ES" language toggle button in the header → `localStorage['xpandia-lang']` is set to `'es'`; the ES button becomes active (dark background).

### footer-links-navigation

| Field | Value |
|-------|-------|
| **Priority** | P4 |
| **Roles** | guest |
| **Frontend route** | all pages |

**Steps:** User clicks the "About" link in the footer Company column → browser navigates to `/about`.

---

## Notes for new flows

When adding authenticated flows (sign-in, sign-up, dashboards), extend this map and add the corresponding entry to `frontend/e2e/flow-definitions.json` and `frontend/e2e/helpers/flow-tags.ts`.
