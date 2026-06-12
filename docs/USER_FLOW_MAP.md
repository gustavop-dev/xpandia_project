# User Flow Map

**Single source of truth for all user flows in the Xpandia application.**

Use this document to understand each flow's steps, branching conditions, role restrictions, and API contracts before writing or reviewing E2E tests.

**Version:** 2.2.0
**Last Updated:** 2026-05-07

---

## Table of Contents

1. [Module Index](#module-index)
2. [Home Module](#home-module)
3. [Services Module](#services-module)
4. [Static Module](#static-module)
5. [Blog Module](#blog-module)
6. [Navigation](#navigation)

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
| `cta-services-core-solution-to-contact` | CTA: Core solution card → Contact | cta | P3 | guest | `/services` |
| `services-card-to-detail` | Service card → Detail page | services | P2 | guest | `/services` |
| `breadcrumb-back-to-services` | Breadcrumb: Detail → Services | services | P2 | guest | `/services/qa` |
| `about-page` | About | static | P3 | guest | `/about` |
| `contact-page` | Contact | static | P2 | guest | `/contact` |
| `blog-list` | Blog list view | blog | P2 | guest | `/blog` |
| `blog-detail` | Blog detail view | blog | P2 | guest | `/blog/[slug]` |
| `blog-pagination` | Blog pagination | blog | P3 | guest | `/blog?page=N` |
| `blog-language-switch` | Blog language switch (EN ↔ ES) | blog | P3 | guest | `/blog?lang=` |
| `blog-not-found` | Blog detail 404 | blog | P4 | guest | `/blog/[unknown]` |
| `blog-card-to-detail` | Blog card click → detail | blog | P3 | guest | `/blog` |
| `blog-back-from-detail-to-list` | Back link from detail → list | blog | P3 | guest | `/blog/[slug]` |
| `contact-form-error-state` | Contact form server error | contact | P3 | guest | `/contact` |
| `header-blog-link` | Header Blog nav link | navigation | P4 | guest | all pages |
| `mobile-navigation-drawer` | Mobile nav drawer | navigation | P3 | guest | all pages |
| `header-services-dropdown` | Header services dropdown | navigation | P3 | guest | all pages |
| `fab-contact-button` | FAB contact button | navigation | P3 | guest | all pages |
| `language-toggle-preference` | Language toggle | navigation | P3 | guest | all pages |
| `mobile-language-toggle` | Mobile language toggle in main bar | navigation | P3 | guest | all pages |
| `i18n-locale-switch` | Locale switch (EN ⇄ ES) | navigation | P2 | shared | all pages |
| `i18n-locale-persistence-nav` | Locale persists across nav links | navigation | P2 | shared | all pages |
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
| **API endpoints** | `POST /api/contact/` (AllowAny) |

**Preconditions:** User is on `/contact`.

**Steps:**
1. User clicks a service radio tile (e.g., "AI Spanish QA Sprint").
2. User clicks a company size radio tile (e.g., "50–150").
3. User fills in Full name, Role, Work email, Company text inputs.
4. User writes a paragraph in the situation textarea.
5. User clicks "Request diagnostic call" button.
6. While the request is in flight, the button shows "Sending…" and is disabled.

**Happy path:** Backend returns 201; `setSubmitted(true)` replaces the button with a success banner reading "✓ Request received — we'll reply within 24 hours".

### contact-form-error-state

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/contact` |
| **API endpoints** | `POST /api/contact/` (AllowAny — failure path) |

**Preconditions:** Same as `contact-form-submit`.

**Steps:**
1. User completes the form and submits as in the happy path.
2. Backend responds with a non-2xx status (e.g. 503 from email provider failure).

**Expected outcome:** A red error banner appears above the submit button reading: "Something went wrong. Please email us directly at hello@xpandia.co". The button is re-enabled and the success banner does NOT appear.

**Edge cases:**
- Network offline → same fallback banner.
- Backend `/api/contact/` returns 400 (serializer validation error) → currently shown via the same generic banner; consider improving messaging in a future iteration.

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

### cta-services-core-solution-to-contact

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/services` |
| **API endpoints** | none |

**Steps:** User clicks a core-solution card text-link CTA (e.g. "Request an AI QA Sprint →") in the CORE SERVICES / SOLUCIONES PRINCIPALES section of `/services` → browser navigates to `/contact`. Six cards expose this CTA; the spec exercises the first one as representative.

---

## Services Module

### services-overview

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/services` |
| **API endpoints** | none |

Presents the three decision cards (choose-your-path) plus the six core-solution cards, with cross-links to the detail pages and contact.

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

## Blog Module

The blog is a public, bilingual (EN/ES) collection of articles authored entirely from the Django admin (no public POST endpoints). Pagination is server-side (default 9 posts/page, max 50). Content is stored as structured JSON with 6 supported section types: paragraph, heading, list, image, quote, callout.

### blog-list

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/blog` |
| **API endpoints** | `GET /api/blog/?lang=&page=&page_size=` (AllowAny) |

**Preconditions:** At least one published `BlogPost` exists in the database (`is_published=True`).

**Steps:**
1. User opens `/blog`.
2. Server Component fetches `GET /api/blog/?lang=en&page=1&page_size=9`.
3. Hero section renders with H1 `Notes on Spanish quality for AI products.` and an EN/ES toggle.
4. Up to 9 `BlogCard` items render in a responsive grid (1/2/3 columns at sm/tablet/lg).
5. If `total_pages > 1`, `BlogPagination` renders below the grid.

**Happy path:** Grid shows published posts; drafts are filtered out; `BlogCard` link includes `?lang=en`.

**Edge cases:**
- 0 published posts → empty state with `"No posts published yet."` (or Spanish equivalent).
- `?page=99` beyond range → backend clamps to last page; UI shows the available results.

### blog-detail

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | guest |
| **Frontend route** | `/blog/[slug]` |
| **API endpoints** | `GET /api/blog/<slug>/?lang=` (AllowAny) |

**Preconditions:** A `BlogPost` with the given slug exists and `is_published=True`.

**Steps:**
1. User clicks a `BlogCard` on `/blog` (or navigates directly to `/blog/<slug>`).
2. `generateMetadata` and the page component share a single `React.cache`-wrapped `fetchBlogPost(slug, lang)` call.
3. Hero renders the back link `← BACK TO BLOG`, category eyebrow, H1 title, excerpt, author + formatted date.
4. If `cover_image` is set, the cover image renders above the content.
5. `BlogContentRenderer` renders `intro`, ordered `sections`, and `conclusion`.

**Happy path:** Title, metadata, cover, and structured content all render in the requested language.

**Edge cases:**
- Slug refers to a draft → backend returns 404 → Next.js `notFound()` renders.
- `?lang=fr` (unsupported) → backend falls back to English.

### blog-pagination

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/blog?page=N` |
| **API endpoints** | `GET /api/blog/?lang=&page=N` |

**Preconditions:** At least 10 published posts (so `total_pages > 1` at default `page_size=9`).

**Steps:**
1. User opens `/blog`.
2. User clicks the `NEXT →` link in `BlogPagination`.
3. URL changes to `/blog?lang=en&page=2`.
4. New grid renders the next batch of posts.

**Edge cases:**
- On the last page, the `NEXT →` element is rendered as a disabled `<span>` (not a `<Link>`).
- Symmetrically, `← PREV` is disabled on the first page.

### blog-language-switch

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/blog?lang=es` |
| **API endpoints** | `GET /api/blog/?lang=es` and `GET /api/blog/<slug>/?lang=es` |

**Preconditions:** At least one bilingual published post exists.

**Steps:**
1. User opens `/blog` (default `?lang=en`).
2. User clicks `ES` inside the `BlogLanguageToggle` `role="group"` named "Language".
3. URL changes to `/blog?lang=es`.
4. Hero copy switches to Spanish; `BlogCard` titles and excerpts are re-fetched in Spanish.

**Edge cases:**
- The header's localStorage-based EN/ES toggle is independent of this URL toggle (current intentional split).

### blog-not-found

| Field | Value |
|-------|-------|
| **Priority** | P4 |
| **Roles** | guest |
| **Frontend route** | `/blog/[unknown]` |
| **API endpoints** | `GET /api/blog/<unknown>/` returns 404 |

**Steps:**
1. User navigates to `/blog/this-slug-does-not-exist`.
2. Backend returns `{"detail": "Not found."}` with 404.
3. `fetchBlogPost` returns `null`; the page calls Next.js `notFound()`.
4. Browser receives a 404 status with the Next.js `not-found` UI.

### blog-card-to-detail

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/blog` → `/blog/<slug>` |
| **API endpoints** | `GET /api/blog/<slug>/?lang=` (after click) |

**Preconditions:** At least one published `BlogPost` is visible on `/blog`.

**Steps:**
1. User opens `/blog` (with optional `?lang=es`).
2. User clicks the link on the first `BlogCard` (the link element wraps the entire card).
3. Browser navigates to `/blog/<slug>?lang=<current>`; the `lang` query param is preserved from the list page.

**Expected outcome:** The detail page renders the clicked post's title in the requested language.

### blog-back-from-detail-to-list

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | `/blog/<slug>` → `/blog` |
| **API endpoints** | `GET /api/blog/?lang=` (after click) |

**Preconditions:** User is on `/blog/<slug>?lang=es`.

**Steps:**
1. User clicks the eyebrow link `← BACK TO BLOG` (or `← VOLVER AL BLOG` in Spanish) at the top of the detail page.
2. Browser navigates to `/blog?lang=es`; the `lang` query param is preserved.

**Expected outcome:** The list page renders in the same language the user was reading the detail in.

---

## Navigation

### navigation-between-pages

Cross-page navigation via `XpandiaHeader` (desktop nav, mobile drawer) across `/`, `/about`, `/contact`, `/services`, `/services/qa`, `/services/audit`, `/services/fractional`, `/blog`.

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

### mobile-language-toggle

| Field | Value |
|-------|-------|
| **Priority** | P3 |
| **Roles** | guest |
| **Frontend route** | all pages |
| **Viewport** | mobile (390×844) |

**Steps:** User on a mobile viewport sees the EN|ES toggle in the main header bar (next to the hamburger, not inside the drawer) → taps "ES" → URL gains the `/es` prefix and content switches to Spanish, without opening the drawer.

### i18n-locale-switch

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | shared |
| **Frontend route** | all pages |

**Steps:** User clicks the "ES" (or "EN") toggle in the header → URL gains/loses the `/es` prefix, page content switches language, and `<html lang>` updates.

### i18n-locale-persistence-nav

| Field | Value |
|-------|-------|
| **Priority** | P2 |
| **Roles** | shared |
| **Frontend route** | all pages |

**Steps:** User switches to ES (or lands on any `/es/…` URL) → user clicks links in the header nav, services dropdown, footer columns, or the contact FAB → every destination URL keeps the `/es` prefix and renders Spanish content.

**Expected outcome:** The locale never silently resets to English while navigating; all internal chrome links are locale-aware (`@/i18n/navigation` `Link`).

### footer-links-navigation

| Field | Value |
|-------|-------|
| **Priority** | P4 |
| **Roles** | guest |
| **Frontend route** | all pages |

**Steps:** User clicks the "About" link in the footer Company column → browser navigates to `/about`.

### header-blog-link

| Field | Value |
|-------|-------|
| **Priority** | P4 |
| **Roles** | guest |
| **Frontend route** | all pages (desktop + mobile drawer) |

**Steps:**
1. User is on any page (e.g. `/`).
2. User clicks the "Blog" link in the desktop header nav (or in the mobile drawer after opening the hamburger menu).
3. Browser navigates to `/blog`.

**Expected outcome:** The header's `nav-active` underline appears on the Blog item once on `/blog`.

---

## Notes for new flows

When adding authenticated flows (sign-in, sign-up, dashboards), extend this map and add the corresponding entry to `frontend/e2e/flow-definitions.json` and `frontend/e2e/helpers/flow-tags.ts`.
