# Bilingual (EN/ES) Marketing Site with next-intl — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a real Spanish version of the Xpandia marketing site alongside English, using `next-intl` (already a dependency). English URLs stay unchanged (`/`, `/services`, …); Spanish lives under `/es/…`. The header EN|ES toggle becomes functional. The blog is unified with the global locale system.

**Architecture:** `next-intl` with `localePrefix: 'as-needed'`. All `app/*` routes move under `app/[locale]/*`; `app/[locale]/layout.tsx` sets `<html lang>` and wraps in `NextIntlClientProvider`. A `middleware.ts` resolves the locale (no auto-detection). All user-facing copy moves to `messages/<locale>/<namespace>.json` (one file per page + a shared `common.json`). Spanish translations are written as a professional draft for the client to polish.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind v4, `next-intl ^4.11.0`, Jest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-05-12-i18n-design.md` (approved).

**Working assumptions for the engineer:**
- A dev server may already be running on `http://localhost:3010` (the spec/PDF work session left one). If not, start one with `cd frontend && npm run dev -- -H 0.0.0.0 -p 3010` (run it backgrounded). Restart it after `next.config.ts` or `middleware.ts` changes.
- Project rule: **never run the full test suite**. Run targeted files only: `npm test -- <path/to/file.test.tsx>`, max ~20 tests per batch, ≤3 commands per cycle. For E2E: `npx playwright test <spec>` (max 2 spec files per invocation), use `E2E_REUSE_SERVER=1` if a server is running.
- Component style (from `frontend/CLAUDE.md`): `function` declarations for components, named exports for helpers (Next.js pages must stay `export default function`), no semicolons in `.ts`/`.tsx`, prefer interfaces, mobile-first Tailwind. Follow existing patterns.
- There are uncommitted changes in the repo from a prior session — commit your i18n work in its own commits as described in each task.

---

## File Structure (what gets created / changed)

**New files:**
- `frontend/i18n/routing.ts` — locale routing config (`defineRouting`).
- `frontend/i18n/navigation.ts` — locale-aware `Link`/`redirect`/`usePathname`/`useRouter` (`createNavigation`).
- `frontend/i18n/request.ts` — per-request message loader (`getRequestConfig`, merges namespace files).
- `frontend/middleware.ts` — `createMiddleware(routing)`.
- `frontend/messages/en/{common,home,services,language-assurance,localization,aci,about,contact,blog}.json` — English copy (extracted verbatim).
- `frontend/messages/es/{...same 9 files...}.json` — Spanish copy (Phase 1: English copies; Phase 2: translated).
- `frontend/lib/seo/alternates.ts` — builds `alternates.languages` (hreflang) for a path.
- `frontend/test-utils/renderWithIntl.tsx` — Testing-Library render wrapped in `NextIntlClientProvider`.
- `frontend/components/contact/ContactForm.tsx` — the client form, extracted from `app/contact/page.tsx` so the page can be a server component with `generateMetadata`.
- `frontend/e2e/public/i18n.spec.ts` — locale-switch E2E.

**Moved (via `git mv`):** `frontend/app/page.tsx`, `app/providers.tsx`, `app/about/`, `app/contact/`, `app/services/` (all of it), `app/blog/`, `app/blog/[slug]/`, and all their `__tests__/` → under `frontend/app/[locale]/…`. `app/layout.tsx` → `app/[locale]/layout.tsx`.

**Stay put:** `frontend/app/globals.css` (only the import path in the moved layout changes), `frontend/app/icon.png`, `frontend/app/apple-icon.png` (Next.js icon convention is root-level).

**Modified:** `frontend/next.config.ts` (wrap with `createNextIntlPlugin`, add `/es/...` redirects), `frontend/components/layout/XpandiaHeader.tsx` (functional switcher + `t()`), `frontend/components/layout/XpandiaFooter.tsx` + `FABContact.tsx` (`t()`), `frontend/jest.setup.ts` (mock `next-intl/navigation`), `frontend/lib/services/blog.ts` callers in the blog pages (lang from locale, Phase 3), `frontend/lib/i18n/config.ts` (stays the source of truth for the locale list; `i18n/routing.ts` imports from it), `frontend/e2e/helpers/flow-tags.ts` + `e2e/flow-definitions.json` (add i18n flow), root `CLAUDE.md` (routes + i18n note).

**Deleted (Phase 3):** `frontend/components/blog/BlogLanguageToggle.tsx` + its `__tests__/`.

---

# PHASE 1 — Infrastructure + English externalized

End state of Phase 1: next-intl wired; routes under `app/[locale]/`; `/` and `/es` and every route return 200; English content & URLs unchanged; `/es/...` renders English (fallback) for now; EN|ES toggle navigates between `/x` and `/es/x`; all unit tests adapted and green. **Stop for a checkpoint after Task 19.**

---

### Task 1: next-intl config files (`i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts`)

**Files:**
- Create: `frontend/i18n/routing.ts`
- Create: `frontend/i18n/navigation.ts`
- Create: `frontend/i18n/request.ts`
- Test: `frontend/i18n/__tests__/routing.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// frontend/i18n/__tests__/routing.test.ts
import { describe, it, expect } from '@jest/globals'
import { routing } from '../routing'

describe('i18n routing', () => {
  it('declares en and es as the supported locales', () => {
    expect(routing.locales).toEqual(['en', 'es'])
  })

  it('uses en as the default locale', () => {
    expect(routing.defaultLocale).toBe('en')
  })

  it('uses as-needed locale prefixing (no prefix for the default locale)', () => {
    expect(routing.localePrefix).toBe('as-needed')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd frontend && npm test -- i18n/__tests__/routing.test.ts`
Expected: FAIL — `Cannot find module '../routing'`.

- [ ] **Step 3: Write `i18n/routing.ts`**

```ts
// frontend/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/config'

export const routing = defineRouting({
  locales: [...SUPPORTED_LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
  localeDetection: false,
})
```

- [ ] **Step 4: Write `i18n/navigation.ts`**

```ts
// frontend/i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
```

- [ ] **Step 5: Write `i18n/request.ts`**

```ts
// frontend/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

// One JSON file per namespace under messages/<locale>/. Add new namespaces here.
const NAMESPACES = [
  'common',
  'home',
  'services',
  'language-assurance',
  'localization',
  'aci',
  'about',
  'contact',
  'blog',
] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale

  const entries = await Promise.all(
    NAMESPACES.map(async ns => {
      const mod = await import(`../messages/${locale}/${ns}.json`)
      return [ns, mod.default] as const
    }),
  )

  return { locale, messages: Object.fromEntries(entries) }
})
```

- [ ] **Step 6: Create placeholder message files so the dynamic import resolves**

Create empty objects for all 18 files (`messages/en/common.json` … `messages/es/blog.json`), each containing `{}` for now. Tasks 7, 10–18 fill them.

```bash
cd frontend
mkdir -p messages/en messages/es
for loc in en es; do for ns in common home services language-assurance localization aci about contact blog; do echo '{}' > messages/$loc/$ns.json; done; done
```

- [ ] **Step 7: Run test to verify it passes**

Run: `cd frontend && npm test -- i18n/__tests__/routing.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 8: Commit**

```bash
cd /home/cerrotico/work/xpandia_project
git add frontend/i18n frontend/messages
git commit -m "feat(i18n): add next-intl routing/navigation/request config + empty message files"
```

---

### Task 2: Wrap `next.config.ts` with `createNextIntlPlugin` + add `/es/...` redirects

**Files:**
- Modify: `frontend/next.config.ts`

- [ ] **Step 1: Edit `next.config.ts`**

At the top, add the plugin import; at the bottom, wrap the export. Add three `/es/...` redirect entries mirroring the existing ones.

```ts
// frontend/next.config.ts — top of file, after the existing imports
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
```

In the `redirects()` array, add (keep the existing three):

```ts
      { source: '/es/services/qa', destination: '/es/services/language-assurance', permanent: true },
      { source: '/es/services/audit', destination: '/es/services/language-assurance', permanent: true },
      { source: '/es/services/fractional', destination: '/es/services/language-assurance', permanent: true },
```

Change the bottom `export default nextConfig;` to:

```ts
export default withNextIntl(nextConfig);
```

- [ ] **Step 2: Restart the dev server and verify it boots**

Run: `cd frontend && pkill -f "next dev.*3010" 2>/dev/null; nohup npm run dev -- -H 0.0.0.0 -p 3010 > /tmp/xpandia_dev.log 2>&1 & disown; sleep 5; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3010/`
Expected: `200`. (Routes still work because `app/[locale]/` doesn't exist yet, so Next falls back to `app/*` — that's fine, Task 4 fixes the structure.)

- [ ] **Step 3: Commit**

```bash
git add frontend/next.config.ts
git commit -m "feat(i18n): wire createNextIntlPlugin into next.config + /es legacy redirects"
```

---

### Task 3: Add `middleware.ts`

**Files:**
- Create: `frontend/middleware.ts`

- [ ] **Step 1: Write `middleware.ts`**

```ts
// frontend/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip API, Next internals, the media proxy, the icon routes, and any path with a file extension.
  matcher: ['/((?!api|_next|_vercel|media|icon\\.png|apple-icon\\.png|.*\\..*).*)'],
}
```

- [ ] **Step 2: Restart the dev server and verify**

Run: `cd frontend && pkill -f "next dev.*3010" 2>/dev/null; nohup npm run dev -- -H 0.0.0.0 -p 3010 > /tmp/xpandia_dev.log 2>&1 & disown; sleep 5; curl -s -o /dev/null -w "/=%{http_code} " http://localhost:3010/; curl -s -o /dev/null -w "/es=%{http_code}\n" http://localhost:3010/es`
Expected: `/=200` and `/es=404` (the `[locale]` segment doesn't exist yet; Task 4 creates it).

- [ ] **Step 3: Commit**

```bash
git add frontend/middleware.ts
git commit -m "feat(i18n): add next-intl middleware"
```

---

### Task 4: Move all `app/*` routes under `app/[locale]/`

**Files:**
- `git mv`: `frontend/app/page.tsx`, `app/providers.tsx`, `app/layout.tsx`, `app/about/`, `app/contact/`, `app/services/`, `app/blog/`, `app/__tests__/` → under `app/[locale]/`. Keep `app/globals.css`, `app/icon.png`, `app/apple-icon.png` at `app/`.

- [ ] **Step 1: Create the `[locale]` directory and move everything in**

```bash
cd frontend/app
mkdir -p '[locale]'
git mv layout.tsx '[locale]/layout.tsx'
git mv page.tsx '[locale]/page.tsx'
git mv providers.tsx '[locale]/providers.tsx'
git mv __tests__ '[locale]/__tests__'
git mv about '[locale]/about'
git mv contact '[locale]/contact'
git mv services '[locale]/services'
git mv blog '[locale]/blog'
ls '[locale]'        # should list: __tests__ about blog contact layout.tsx page.tsx providers.tsx services
ls .                 # should still have: globals.css icon.png apple-icon.png [locale]
```

- [ ] **Step 2: Fix the relative import paths that shifted by one level**

In `app/[locale]/layout.tsx`: `import './globals.css'` → `import '../globals.css'`. All other imports use the `@/` alias (which is repo-root-relative), so they don't change. Verify: `grep -rn "from '\.\./" app/[locale]/ | grep -v "@/"` — anything matching `'./globals.css'` or other now-broken relative imports must be fixed (most files import via `@/components/...` and are fine).

- [ ] **Step 3: Do NOT run/verify yet** — `app/[locale]/layout.tsx` still uses the old (non-i18n) shape and will error on the `[locale]` param. Task 5 rewrites it. Proceed directly.

- [ ] **Step 4: Commit**

```bash
cd /home/cerrotico/work/xpandia_project
git add -A frontend/app
git commit -m "refactor(i18n): move all routes under app/[locale]/"
```

---

### Task 5: Rewrite `app/[locale]/layout.tsx` (locale param, provider, html lang, static params)

**Files:**
- Modify: `frontend/app/[locale]/layout.tsx`

- [ ] **Step 1: Replace the file contents**

```tsx
// frontend/app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { routing } from '@/i18n/routing'
import XpandiaHeader from '@/components/layout/XpandiaHeader'
import XpandiaFooter from '@/components/layout/XpandiaFooter'
import FABContact from '@/components/layout/FABContact'
import Providers from './providers'
import SiteAnimations from '@/components/animations/SiteAnimations'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xpandia.global'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common.metadata' })
  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: locale === routing.defaultLocale ? siteUrl : `${siteUrl}/${locale}`,
      siteName: 'Xpandia',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: t('ogTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/og-image.png'],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <XpandiaHeader />
            {children}
            <XpandiaFooter />
            <FABContact />
            <SiteAnimations />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Add an `app/[locale]/not-found.tsx`** (a minimal localized 404 so unknown paths under a locale don't crash)

```tsx
// frontend/app/[locale]/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="container" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <div className="eyebrow mb-6">404</div>
      <h1 className="hero-display text-[clamp(40px,5vw,72px)]">Page not found.</h1>
      <p className="lede mt-6">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.</p>
      <div className="hero-ctas mt-8"><Link className="btn btn-primary" href="/">Back to home <span className="btn-arrow"></span></Link></div>
    </main>
  )
}
```

(Note: this 404 is intentionally not localized via messages — it's a fallback edge page; YAGNI. The marketing pages are what matter.)

- [ ] **Step 3: Add the `common.metadata` keys NOW** (the layout reads them; put them in `messages/en/common.json` so the dev server doesn't crash — full `common.json` is filled in Task 7, but seed `metadata` here):

```jsonc
// frontend/messages/en/common.json — seed; Task 7 adds the rest
{
  "metadata": {
    "title": "Xpandia | Spanish Language Assurance, Localization & Cultural Intelligence",
    "description": "Xpandia helps AI, SaaS, EdTech, and digital product teams validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.",
    "ogTitle": "Xpandia | Spanish that works for real users",
    "ogDescription": "Spanish language assurance, localization, and applied cultural intelligence for AI, SaaS, EdTech, and digital product teams."
  }
}
```

Copy the same into `messages/es/common.json` for now.

- [ ] **Step 4: Restart dev server and verify the route tree**

Run: `cd frontend && pkill -f "next dev.*3010" 2>/dev/null; nohup npm run dev -- -H 0.0.0.0 -p 3010 > /tmp/xpandia_dev.log 2>&1 & disown; sleep 6; for p in / /es /services /es/services /about /es/about /contact /es/contact /blog /es/blog; do echo -n "$p="; curl -s -o /dev/null -w "%{http_code} " http://localhost:3010$p; done; echo; tail -20 /tmp/xpandia_dev.log | grep -i error || echo "(no errors in log)"`
Expected: every path `200` (English content on both `/x` and `/es/x` for now; `/blog` still 500 if the Django backend is down — pre-existing, ignore).

- [ ] **Step 5: Commit**

```bash
cd /home/cerrotico/work/xpandia_project
git add frontend/app/[locale]/layout.tsx frontend/app/[locale]/not-found.tsx frontend/messages
git commit -m "feat(i18n): locale-aware root layout (NextIntlClientProvider, html lang, static params)"
```

---

### Task 6: Test infra — mock `next-intl/navigation` + `renderWithIntl` helper

**Files:**
- Modify: `frontend/jest.setup.ts`
- Create: `frontend/test-utils/renderWithIntl.tsx`
- Create: `frontend/test-utils/messages.ts`

- [ ] **Step 1: Add a `next-intl/navigation`-compatible mock to `jest.setup.ts`**

Append to `frontend/jest.setup.ts` (after the existing `next/link` mock):

```ts
// i18n navigation: make next-intl's Link/useRouter/usePathname behave like plain Next equivalents in tests
jest.mock('@/i18n/navigation', () => {
  const React = require('react')
  return {
    Link: ({ href, children, ...rest }: any) => React.createElement('a', { href: typeof href === 'string' ? href : href?.pathname ?? '/', ...rest }, children),
    usePathname: jest.fn(() => '/'),
    useRouter: jest.fn(() => ({ push: jest.fn(), replace: jest.fn(), refresh: jest.fn(), back: jest.fn() })),
    redirect: jest.fn(),
    getPathname: jest.fn(({ href }: any) => (typeof href === 'string' ? href : href?.pathname ?? '/')),
  }
})
```

- [ ] **Step 2: Create `test-utils/messages.ts`** (loads the real English messages so tests assert real copy)

```ts
// frontend/test-utils/messages.ts
import common from '@/messages/en/common.json'
import home from '@/messages/en/home.json'
import services from '@/messages/en/services.json'
import languageAssurance from '@/messages/en/language-assurance.json'
import localization from '@/messages/en/localization.json'
import aci from '@/messages/en/aci.json'
import about from '@/messages/en/about.json'
import contact from '@/messages/en/contact.json'
import blog from '@/messages/en/blog.json'

export const enMessages = {
  common,
  home,
  services,
  'language-assurance': languageAssurance,
  localization,
  aci,
  about,
  contact,
  blog,
}
```

(Requires `"resolveJsonModule": true` in `tsconfig.json` — it almost certainly already is; if not, add it.)

- [ ] **Step 3: Create `test-utils/renderWithIntl.tsx`**

```tsx
// frontend/test-utils/renderWithIntl.tsx
import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { enMessages } from './messages'

export function renderWithIntl(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>
    ),
    ...options,
  })
}
```

- [ ] **Step 4: Verify nothing else broke** — run one existing test that doesn't use i18n yet:

Run: `cd frontend && npm test -- lib/i18n/__tests__/config.test.ts`
Expected: PASS (this confirms `jest.setup.ts` still loads).

- [ ] **Step 5: Commit**

```bash
git add frontend/jest.setup.ts frontend/test-utils
git commit -m "test(i18n): add NextIntlClientProvider render helper + next-intl/navigation mock"
```

---

### Task 7: Externalize the chrome — `messages/en/common.json` + `XpandiaHeader`, `XpandiaFooter`, `FABContact` (WORKED EXAMPLE for the extraction pattern)

This task establishes the extraction pattern that Tasks 10–18 follow. Do it carefully.

**Files:**
- Modify: `frontend/messages/en/common.json` (add to the seed from Task 5)
- Modify: `frontend/messages/es/common.json` (copy of en for now)
- Modify: `frontend/components/layout/XpandiaHeader.tsx`
- Modify: `frontend/components/layout/XpandiaFooter.tsx`
- Modify: `frontend/components/layout/FABContact.tsx`
- Modify: `frontend/components/layout/__tests__/XpandiaHeader.test.tsx`, `XpandiaFooter.test.tsx`, `FABContact.test.tsx`

- [ ] **Step 1: Fill `messages/en/common.json`** — read the three components and lift every user-facing string. Target structure:

```jsonc
{
  "metadata": { "title": "...", "description": "...", "ogTitle": "...", "ogDescription": "..." },   // from Task 5
  "header": {
    "logoAlt": "Xpandia",
    "primaryNavLabel": "Primary",
    "nav": { "services": "Services", "blog": "Blog", "about": "About", "contact": "Contact" },
    "servicesMenu": {
      "all": { "label": "All services", "desc": "Overview & comparison" },
      "items": [
        { "num": "01 / VALIDATE", "label": "Language Assurance", "desc": "Validate Spanish before your users do." },
        { "num": "02 / ADAPT", "label": "Localization & Adaptation", "desc": "More than translated. Built for Spanish-speaking audiences." },
        { "num": "03 / UNDERSTAND", "label": "Applied Cultural Intelligence", "desc": "Read the invisible rules behind trust, culture, and growth." }
      ]
    },
    "cta": "Book a diagnostic call",
    "menuButtonLabel": "Menu",
    "langGroupLabel": "Language",
    "drawerServicesHeading": "SERVICES"
  },
  "footer": {
    "logoAlt": "Xpandia",
    "tagline": "Spanish that works for real users.",
    "description": "Xpandia helps AI, SaaS, EdTech, and digital product teams validate, localize, and culturally adapt Spanish experiences for Hispanic and Spanish-speaking audiences.",
    "brandLine": "SPANISH EXPERTISE · 2026",
    "colServices": { "heading": "Services" },
    "colCompany": { "heading": "Company", "bookCall": "Book a diagnostic call" },
    "colContact": { "heading": "Contact", "requestAudit": "Request an audit" },
    "copyright": "© 2026 Xpandia. All rights reserved.",
    "terms": "Terms",
    "privacy": "Privacy"
  },
  "fab": { "label": "Book a diagnostic call" },
  "serviceLines": {
    "languageAssurance": "Language Assurance",
    "localizationAdaptation": "Localization & Adaptation",
    "appliedCulturalIntelligence": "Applied Cultural Intelligence"
  }
}
```

Note: the route `href` values (`/services/language-assurance`, etc.) are NOT in messages — they're locale-independent and stay in the components. The `next-intl/navigation` `Link` automatically prefixes the active locale, so the components keep using path strings like `/services/language-assurance`.

- [ ] **Step 2: Copy `messages/en/common.json` → `messages/es/common.json`** (translated in Phase 2).

```bash
cd frontend && cp messages/en/common.json messages/es/common.json
```

- [ ] **Step 3: Rewrite `XpandiaHeader.tsx`** — `'use client'` stays. Replace `next/link` import with `import { Link } from '@/i18n/navigation'`. Add `import { useTranslations, useLocale } from 'next-intl'` and `import { useRouter, usePathname } from '@/i18n/navigation'`. Replace all literal strings with `t('header.nav.services')` etc. (use `t.raw('header.servicesMenu.items')` for the dropdown items array). Keep all `href` values as-is. Implement the functional switcher (see Task 8 — it can be done in this same edit, but Task 8's test must still pass). Keep the `activePage` logic. Keep the `<aside>` mobile drawer markup, swapping its strings. **Definition of done:** no English literal strings remain in `XpandiaHeader.tsx` (run `grep -nE "[A-Z][a-z]+ [a-z]+" components/layout/XpandiaHeader.tsx` and confirm only class names / non-copy remain).

- [ ] **Step 4: Rewrite `XpandiaFooter.tsx`** — it's a server component (no `'use client'`). Add `import { getTranslations } from 'next-intl/server'`, make the component `async`, `const t = await getTranslations('common.footer')`. Replace `next/link` with `import { Link } from '@/i18n/navigation'`. Replace literal strings with `t(...)`. Use the `common.serviceLines` keys for the Services-column link labels. Keep all `href` values.

- [ ] **Step 5: Rewrite `FABContact.tsx`** — if it's a server component, use `getTranslations('common.fab')`; if client, `useTranslations('common.fab')`. Replace `next/link` with `@/i18n/navigation` `Link`. Swap the label.

- [ ] **Step 6: Adapt the three component tests** — change `render(<XpandiaHeader />)` → `renderWithIntl(<XpandiaHeader />)` (import from `@/test-utils/renderWithIntl`). The assertions on English text keep working because `renderWithIntl` supplies the real English messages. For `XpandiaFooter` (now `async`): tests must `await` the rendered output — `render(await XpandiaFooter())` won't work with the provider wrapper; instead, since it's a server component returning JSX, do `const ui = await XpandiaFooter(); renderWithIntl(ui)`. Update the `next/link` mock expectation if any test inspected it (the `@/i18n/navigation` `Link` mock renders `<a href>` the same way). Keep the `usePathname` mock from `next-intl/navigation` (already in `jest.setup.ts`).

- [ ] **Step 7: Run the three component test files**

Run: `cd frontend && npm test -- components/layout/__tests__/XpandiaHeader.test.tsx components/layout/__tests__/XpandiaFooter.test.tsx components/layout/__tests__/FABContact.test.tsx`
Expected: PASS (adjust assertions if a string moved namespaces, but copy is unchanged so they should pass as-is once `renderWithIntl` is wired).

- [ ] **Step 8: Verify in the browser**

Run: `cd frontend && curl -s http://localhost:3010/ | grep -ci "book a diagnostic call"` → expect ≥1. `curl -s http://localhost:3010/es | grep -ci "book a diagnostic call"` → expect ≥1 (English fallback for now).

- [ ] **Step 9: Commit**

```bash
cd /home/cerrotico/work/xpandia_project
git add frontend/messages frontend/components/layout
git commit -m "feat(i18n): externalize header/footer/FAB copy to common.json + use next-intl navigation"
```

---

### Task 8: Make the EN|ES toggle functional

(If you already wired the switcher in Task 7's `XpandiaHeader.tsx` rewrite, this task is the test that proves it. If not, do it now.)

**Files:**
- Modify: `frontend/components/layout/XpandiaHeader.tsx` (the toggle handlers)
- Test: `frontend/components/layout/__tests__/XpandiaHeader.test.tsx` (add cases)

- [ ] **Step 1: Add failing tests**

```tsx
// add to XpandiaHeader.test.tsx
import { useRouter, usePathname } from '@/i18n/navigation'

it('switches to Spanish by replacing the current path with the es locale', async () => {
  const replace = jest.fn()
  ;(useRouter as jest.Mock).mockReturnValue({ replace, push: jest.fn(), refresh: jest.fn(), back: jest.fn() })
  ;(usePathname as jest.Mock).mockReturnValue('/services/language-assurance')
  const user = userEvent.setup()
  renderWithIntl(<XpandiaHeader />)
  const langGroup = screen.getByRole('group', { name: 'Language' })
  await user.click(within(langGroup).getByRole('button', { name: 'ES' }))
  expect(replace).toHaveBeenCalledWith('/services/language-assurance', { locale: 'es' })
})

it('switches to English by replacing the current path with the en locale', async () => {
  const replace = jest.fn()
  ;(useRouter as jest.Mock).mockReturnValue({ replace, push: jest.fn(), refresh: jest.fn(), back: jest.fn() })
  ;(usePathname as jest.Mock).mockReturnValue('/about')
  const user = userEvent.setup()
  renderWithIntl(<XpandiaHeader />)
  const langGroup = screen.getByRole('group', { name: 'Language' })
  await user.click(within(langGroup).getByRole('button', { name: 'EN' }))
  expect(replace).toHaveBeenCalledWith('/about', { locale: 'en' })
})
```

(Remove the obsolete `xpandia-lang` localStorage tests — `localStorage` is no longer used by the header.)

- [ ] **Step 2: Run, expect FAIL** — `cd frontend && npm test -- components/layout/__tests__/XpandiaHeader.test.tsx` → the new cases fail because the toggle still writes localStorage.

- [ ] **Step 3: Implement** — in `XpandiaHeader.tsx`:

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, useRouter, usePathname } from '@/i18n/navigation'
// ...
const t = useTranslations('common.header')
const locale = useLocale()
const router = useRouter()
const pathname = usePathname()
// ... (remove the `lang` useState and the localStorage useEffect and setLangPref)
function switchLocale(target: string) {
  if (target === locale) return
  router.replace(pathname, { locale: target })
}
// ...
// In the desktop & mobile language toggle:
//   <button ... className={cn(..., locale === 'en' ? "bg-ink-900 text-paper" : "bg-transparent")} onClick={() => switchLocale('en')}>EN</button>
//   <button ... className={cn(..., locale === 'es' ? "bg-ink-900 text-paper" : "bg-transparent")} onClick={() => switchLocale('es')}>ES</button>
```

`pathname` from `@/i18n/navigation` is the locale-stripped pathname (so on `/es/about` it returns `/about`) — `router.replace(pathname, { locale })` then produces the correct URL for the target locale.

- [ ] **Step 4: Run, expect PASS** — `cd frontend && npm test -- components/layout/__tests__/XpandiaHeader.test.tsx`

- [ ] **Step 5: Commit**

```bash
git add frontend/components/layout/XpandiaHeader.tsx frontend/components/layout/__tests__/XpandiaHeader.test.tsx
git commit -m "feat(i18n): functional EN|ES locale switcher in the header"
```

---

### Task 9: `lib/seo/alternates.ts` hreflang helper

**Files:**
- Create: `frontend/lib/seo/alternates.ts`
- Test: `frontend/lib/seo/__tests__/alternates.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// frontend/lib/seo/__tests__/alternates.test.ts
import { describe, it, expect } from '@jest/globals'
import { localizedAlternates } from '../alternates'

describe('localizedAlternates', () => {
  it('builds canonical + en/es language URLs for the home path', () => {
    expect(localizedAlternates('/')).toEqual({
      canonical: '/',
      languages: { en: '/', es: '/es' },
    })
  })
  it('builds canonical + en/es language URLs for a nested path', () => {
    expect(localizedAlternates('/services/language-assurance')).toEqual({
      canonical: '/services/language-assurance',
      languages: { en: '/services/language-assurance', es: '/es/services/language-assurance' },
    })
  })
})
```

- [ ] **Step 2: Run, expect FAIL** — `cd frontend && npm test -- lib/seo/__tests__/alternates.test.ts`

- [ ] **Step 3: Implement**

```ts
// frontend/lib/seo/alternates.ts
import type { Metadata } from 'next'

/** Given the locale-independent path (e.g. "/services/x"), returns Metadata.alternates with
 *  a self-canonical and en/es hreflang URLs. en is unprefixed; es is "/es"-prefixed. */
export function localizedAlternates(path: string): NonNullable<Metadata['alternates']> {
  const clean = path === '/' ? '' : path
  return {
    canonical: clean === '' ? '/' : clean,
    languages: {
      en: clean === '' ? '/' : clean,
      es: `/es${clean}`,
    },
  }
}
```

- [ ] **Step 4: Run, expect PASS**

- [ ] **Step 5: Commit**

```bash
git add frontend/lib/seo
git commit -m "feat(i18n): hreflang alternates helper"
```

---

### Task 10: Externalize the Home page → `messages/en/home.json`

**Files:**
- Modify: `frontend/app/[locale]/page.tsx`
- Create/fill: `frontend/messages/en/home.json`, `frontend/messages/es/home.json`
- Modify: `frontend/app/[locale]/__tests__/home.test.tsx`

- [ ] **Step 1: Build `messages/en/home.json`** — read `app/[locale]/page.tsx` and lift **every** user-facing string into a structured JSON object mirroring the page sections. Pattern (follow the Task 7 worked example):
  - Scalar copy → `home.hero.eyebrow`, `home.hero.h1`, `home.hero.subheadline`, `home.hero.ctaPrimary`, `home.hero.ctaSecondary`, `home.proof.*`, `home.positioning.eyebrow/headline/body/supportingLine/callout`, `home.servicesOverview.eyebrow/headline/intro`, `home.methodology.*`, `home.deliverables.*`, `home.builtFor.*`, `home.buyer.*`, `home.finalCta.*`.
  - Arrays of objects (the 3 service cards, the 4 methodology steps, the 4 deliverable cards, the 6 audience cards, the buyer roles list, the scorecard criteria labels) → arrays in JSON, e.g. `home.servicesOverview.cards = [{ tagline, description, bestForLabel, bestFor: [...], whatYouGetLabel, whatYouGet: [...], cta }, ...]`. Keep the `href` of each card OUT of messages (it's in the component).
  - Add `home.metadata = { title, description, ogTitle, ogDescription }` using the values currently in `app/[locale]/layout.tsx`'s old metadata / the spec's Home SEO.
- [ ] **Step 2: Copy `messages/en/home.json` → `messages/es/home.json`**.
- [ ] **Step 3: Rewrite `app/[locale]/page.tsx`** — keep `export default async function Home(...)`. Add `import { getTranslations, setRequestLocale } from 'next-intl/server'`; the page receives `{ params }: { params: Promise<{ locale: string }> }`; do `const { locale } = await params; setRequestLocale(locale); const t = await getTranslations('home')`. Replace `next/link` import with `import { Link } from '@/i18n/navigation'`. Replace every literal string with `t('...')`; for arrays use `t.raw('home.servicesOverview.cards') as Array<{...}>` and `.map(...)`. Keep the JSX structure, the class names, the `href`s, the image paths exactly as they are. Add at the top of the file:

```tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { localizedAlternates } from '@/lib/seo/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.metadata' })
  return { title: t('title'), description: t('description'), openGraph: { title: t('ogTitle'), description: t('ogDescription') }, alternates: localizedAlternates('/') }
}
```

- [ ] **Step 4: Adapt `app/[locale]/__tests__/home.test.tsx`** — wrap renders in `renderWithIntl` (import from `@/test-utils/renderWithIntl`). If the test imports the page component and renders it directly: the page is now an `async` server component taking `params` — render via `renderWithIntl(await Home({ params: Promise.resolve({ locale: 'en' }) }))`. (If `setRequestLocale` throws in the jsdom env, mock `next-intl/server`'s `setRequestLocale` to a no-op in `jest.setup.ts` — add `jest.mock('next-intl/server', () => ({ ...jest.requireActual('next-intl/server'), setRequestLocale: jest.fn(), getTranslations: jest.fn() }))` ONLY if needed; prefer not mocking. Actually simpler: tests that render server components should pass `params` and the component will call `getTranslations` which, inside the test, needs a request scope — next-intl provides `getMessages`/`getTranslations` server APIs that don't work in jsdom. **Therefore: test the rendered output via the page's exported pieces is hard.** Instead, keep page tests light: assert via the running dev server is overkill for unit tests. **Decision for page tests:** convert them to render the page through `NextIntlClientProvider` only if the page is refactored to a client-renderable shape — it isn't. So: **simplify the home unit test** to assert the metadata function returns the right title (`expect((await generateMetadata({params: Promise.resolve({locale:'en'})})).title).toMatch(/Spanish/)`) and leave full-page rendering assertions to E2E. Remove the DOM-render assertions that no longer work for the async server component.) — **Net:** home.test.tsx becomes a small test of `generateMetadata`; deep content checks move to E2E (Task 32 covers EN; the existing `smoke.spec.ts`/`navigation.spec.ts` cover EN content).

  > **NOTE TO IMPLEMENTER:** This page-test simplification applies to ALL the marketing page tests (Tasks 11–16). Server components that call `getTranslations()` can't be unit-rendered in jsdom. So for each `<page>/__tests__/page.test.tsx`: keep/convert it to a `generateMetadata` test (title/description), and rely on the existing E2E `services.spec.ts` / `static-pages.spec.ts` / `navigation.spec.ts` / `smoke.spec.ts` (which hit the running dev server) for content assertions. Update those E2E specs only if a heading string changed (it shouldn't — copy is unchanged in Phase 1).

- [ ] **Step 5: Verify in the browser** — `cd frontend && curl -s -o /dev/null -w "/=%{http_code} /es=%{http_code}\n" http://localhost:3010/ http://localhost:3010/es; curl -s http://localhost:3010/ | grep -ci "spanish that works for real users"` → ≥1. `curl -s http://localhost:3010/es | grep -ci "spanish that works for real users"` → ≥1 (English fallback). Check `/tmp/xpandia_dev.log` for errors.

- [ ] **Step 6: Run the home test** — `cd frontend && npm test -- app/[locale]/__tests__/home.test.tsx` → PASS.

- [ ] **Step 7: Commit**

```bash
cd /home/cerrotico/work/xpandia_project
git add frontend/messages/en/home.json frontend/messages/es/home.json "frontend/app/[locale]/page.tsx" "frontend/app/[locale]/__tests__/home.test.tsx"
git commit -m "feat(i18n): externalize Home page copy to home.json"
```

---

### Task 11: Externalize the Services hub → `messages/en/services.json`

**Files:** Modify `frontend/app/[locale]/services/page.tsx`; create/fill `frontend/messages/{en,es}/services.json`; modify `frontend/app/[locale]/services/__tests__/page.test.tsx`.

- [ ] Follow the **exact same procedure as Task 10**, applied to `app/[locale]/services/page.tsx`. Namespace `services`. Sections: `hero`, `decision` (eyebrow/headline/intro + `cards: [{ question, choose, body, bestWhenLabel, bestWhen: [...], cta }, x3]`), `serviceLines` (eyebrow/headline/intro + `cards: [{ tagline, overview, whenToUseLabel, whenToUse: [...], bestFor, coreEngagementsLabel, coreEngagements: [...], whatYouGetLabel, whatYouGet: [...], pricingLabel, pricing: [...], timelineLabel, timeline, cta }, x3]`), `comparison` (eyebrow/headline + table `headers: [...]` + `rows: [{ need, choose, outcome }, x3]` + supportingCopy), `startingPoints` (eyebrow/headline/intro + `cards: [{ title, tagline?, overview?, bestFor, outcome, deliverablesLabel, deliverables: [...], price, timeline, cta }, x4]`), `engagementModel` (eyebrow/headline + `steps: [{ title, body }, x4]`), `pricing` (eyebrow/headline/body + `cards: [{ name, price, desc }, x6]` + note), `finalCta`, plus `services.metadata`.
- [ ] Rewrite `page.tsx`: `getTranslations('services')`, `setRequestLocale`, `@/i18n/navigation` `Link`, `generateMetadata` with `localizedAlternates('/services')`. Keep `href`s, table classes, etc.
- [ ] Copy `en/services.json` → `es/services.json`.
- [ ] Simplify `services/__tests__/page.test.tsx` to a `generateMetadata` test (per the Task 10 note).
- [ ] Verify: `curl -s http://localhost:3010/services | grep -ci "the spanish expertise your product needs"` ≥1; `/es/services` likewise. Check dev log.
- [ ] Commit: `git add frontend/messages/en/services.json frontend/messages/es/services.json "frontend/app/[locale]/services/page.tsx" "frontend/app/[locale]/services/__tests__/page.test.tsx" && git commit -m "feat(i18n): externalize Services hub copy to services.json"`

---

### Task 12: Externalize Language Assurance → `messages/en/language-assurance.json`

**Files:** Modify `frontend/app/[locale]/services/language-assurance/page.tsx`; create/fill `frontend/messages/{en,es}/language-assurance.json`; modify its `__tests__/page.test.tsx`.

- [ ] Same procedure. Namespace `language-assurance`. Sections (mirror the page): `hero` (eyebrow/h1/subheadline/supportingCopy/ctaPrimary/ctaSecondary + `proofPoints: [{title, desc}, x3]`), `photoBand` (caption text), `positioning` (eyebrow/headline/body/callout), `whatWeEvaluate` (eyebrow/headline/intro + `cards: [{title,desc}, x6]`), `whenToUse` (eyebrow/headline + `bullets: [...]`), `criteria` (eyebrow/headline/intro + `cards: [{n,title,desc}, x11]`), `engagements` (eyebrow/headline/intro + `items: [{n,title,tagline?,bestFor,outcome,overview?,deliverablesLabel,deliverables:[...],advisoryRhythm?:[...],price,timeline,cta}, x5]`), `methodology` (eyebrow/headline/intro + `steps: [{title,body}, x5]`), `deliverables` (eyebrow/headline/body + `cards: [{title,desc}, x7]`), `scorecard` (any labels used in the scorecard preview), `builtFor` (eyebrow/headline + `cards: [{title,desc}, x6]`), `pricing` (eyebrow/headline/body + `cards: [{name,price,desc?}, x5]` + note), `faq` (eyebrow/headline + `items: [{q,a}, x6]`), `finalCta` (eyebrow/headline/body/pricingCallout/ctaPrimary/ctaSecondary), `breadcrumb` ("← ALL SERVICES" text, eyebrow tag), plus `metadata`.
- [ ] Rewrite `page.tsx`: `getTranslations('language-assurance')`, `setRequestLocale`, `@/i18n/navigation` `Link`, `generateMetadata` with `localizedAlternates('/services/language-assurance')`. Keep image paths, `href`s, the dark-section classes.
- [ ] Copy `en` → `es`.
- [ ] Simplify the page test to a `generateMetadata` check.
- [ ] Verify: `curl -s http://localhost:3010/services/language-assurance | grep -ci "validate spanish before your users do"` ≥1; `/es/...` likewise. Dev log clean.
- [ ] Commit: `git add ... && git commit -m "feat(i18n): externalize Language Assurance copy"`

---

### Task 13: Externalize Localization & Adaptation → `messages/en/localization.json`

**Files:** Modify `frontend/app/[locale]/services/localization-adaptation/page.tsx`; create/fill `frontend/messages/{en,es}/localization.json`; modify its `__tests__/page.test.tsx`.

- [ ] Same procedure. Namespace `localization`. Sections mirror the page: `hero` (+ 3 proofPoints), `visualBand` (caption), `positioning`, `whatWeAdapt` (6 cards), `whenToUse` (bullets), `criteria` (10 cards `{n,title,desc}`), `engagements` (6 items `{n,title,tagline,bestFor,outcome,deliverablesLabel,deliverables:[...],price,timeline,cta}`), `methodology` (5 steps), `deliverables` (8 cards), `builtFor` (6 cards), `pricing` (6 cards + note), `faq` (6 items), `finalCta`, `breadcrumb`, `metadata`.
- [ ] Rewrite `page.tsx` (note: this file currently has a top-level `const heroProofPoints = [...]`, `const coverageCards = [...]`, etc. — move the *text* into messages; you may keep the array constants but populate them from `t.raw(...)`, or inline `t.raw(...)` in the JSX). `getTranslations('localization')`, `setRequestLocale`, `@/i18n/navigation` `Link`, `generateMetadata` with `localizedAlternates('/services/localization-adaptation')`.
- [ ] Copy `en` → `es`.
- [ ] Simplify the page test to a `generateMetadata` check.
- [ ] Verify: `curl -s http://localhost:3010/services/localization-adaptation | grep -ci "more than translated"` ≥1; `/es/...` likewise. Dev log clean.
- [ ] Commit: `git add ... && git commit -m "feat(i18n): externalize Localization & Adaptation copy"`

---

### Task 14: Externalize Applied Cultural Intelligence → `messages/en/aci.json`

**Files:** Modify `frontend/app/[locale]/services/applied-cultural-intelligence/page.tsx`; create/fill `frontend/messages/{en,es}/aci.json`; modify its `__tests__/page.test.tsx`.

- [ ] Same procedure. Namespace `aci`. Sections: `hero` (+ 3 proofPoints), `positioning`, `whatWeHelpUnderstand` (6 cards), `visualBand` (caption "DECODE → ALIGN → ACT"), `whenToUse` (bullets), `criteria` (10 cards), `engagements` (6 items — note item 1 "Cultural Intelligence Talks" has `overview` + `themes: [...]`), `methodology` (5 steps), `deliverables` (8 cards), `builtFor` (8 cards), `pricing` (6 cards + note), `faq` (6 items, accordion), `finalCta` (incl. pricingCallout "...start from $1,500."), `breadcrumb`, `metadata`. (This file also has top-level `const coverageCards = [...]`, `const criteriaCards = [...]`, `const engagements = [...]` — same treatment as Task 13.)
- [ ] Rewrite `page.tsx`: `getTranslations('aci')`, `setRequestLocale`, `@/i18n/navigation` `Link`, `generateMetadata` with `localizedAlternates('/services/applied-cultural-intelligence')`. The FAQ accordion (`<details>/<summary>`) keeps its markup; only the Q/A text comes from `t.raw('aci.faq.items')`.
- [ ] Copy `en` → `es`.
- [ ] Simplify the page test to a `generateMetadata` check.
- [ ] Verify: `curl -s http://localhost:3010/services/applied-cultural-intelligence | grep -ci "read the invisible rules"` ≥1; `/es/...` likewise. Dev log clean.
- [ ] Commit: `git add ... && git commit -m "feat(i18n): externalize Applied Cultural Intelligence copy"`

---

### Task 15: Externalize the About page → `messages/en/about.json`

**Files:** Modify `frontend/app/[locale]/about/page.tsx`; create/fill `frontend/messages/{en,es}/about.json`; modify `frontend/app/[locale]/about/__tests__/page.test.tsx`.

- [ ] Same procedure. Namespace `about`. Sections: `hero`, `positioning` (eyebrow/headline/body/supportingLine), `differentiators` (eyebrow/headline/intro + `cards: [{title,desc}, x6]`), `founder` (eyebrow/headline/body + `name: "Nestor Solano"`, `title: "Founder, Xpandia Applied Cultural Intelligence SAS"`, `bio`), `howWeWork` (eyebrow/headline + `steps: [{title,body}, x4]`), `startingPoints` (eyebrow/headline/body + `cards: [{name,price,desc}, x6]` + note), `proofSignals` (eyebrow + `items: [...]` x4), `finalCta` (eyebrow "READY TO START?" / headline / body / ctaPrimary / ctaSecondary), `metadata`. Founder photo path (`/assets/founder.jpg`) stays in the component.
- [ ] Rewrite `page.tsx`: `getTranslations('about')`, `setRequestLocale`, `@/i18n/navigation` `Link`, `generateMetadata` with `localizedAlternates('/about')`.
- [ ] Copy `en` → `es`.
- [ ] Simplify `about/__tests__/page.test.tsx` to a `generateMetadata` check (assert title matches `/About Xpandia/`).
- [ ] Verify: `curl -s http://localhost:3010/about | grep -ci "nestor solano"` ≥1; `/es/about` likewise. Dev log clean.
- [ ] Commit: `git add ... && git commit -m "feat(i18n): externalize About page copy"`

---

### Task 16: Externalize Contact + split the form into a client component

The Contact page is `'use client'` (it has form state), so it can't export `generateMetadata`. Split it.

**Files:**
- Create: `frontend/components/contact/ContactForm.tsx` (`'use client'`)
- Modify: `frontend/app/[locale]/contact/page.tsx` → becomes a server component
- Create/fill: `frontend/messages/{en,es}/contact.json`
- Modify: `frontend/app/[locale]/contact/__tests__/page.test.tsx` → split into `ContactForm` tests + a `generateMetadata` test
- Create: `frontend/components/contact/__tests__/ContactForm.test.tsx`

- [ ] **Step 1: Build `messages/en/contact.json`** — namespace `contact`. Keys: `hero` (eyebrow "CONTACT" / headline / body / emailLabel / email "hello@xpandia.global" / ctaPrimary "Book a diagnostic call" / ctaSecondary "Request an audit"), `form` (title "Start a conversation" / intro / fields: `name`, `email`, `company`, `role`, `service` (label + `options: [...]`), `audience` (label + `options: [...]`), `timeline` (label + `options: [...]`), `scope` (label + `options: [...]`), `message` (label + placeholder) / submit "Send request" / submitting "Sending…" / microcopy / success "✓ Request received — we'll reply within 24 hours" / errorPrefix "Something went wrong. Please email us directly at " ), `whatHappensNext` (eyebrow "NEXT STEPS" / headline / `steps: [{title,body}, x4]`), `finalCta` (eyebrow "READY TO START?" / headline / body / ctaPrimary / ctaSecondary), `aside` (contact-options card heading/labels), `metadata`. Read the current `contact/page.tsx` for the exact strings/placeholders.
- [ ] **Step 2: Create `components/contact/ContactForm.tsx`** — `'use client'`. Move the entire form (the `useState`s, the `submitContactForm` call, the radio-tile groups, the inputs, the success/error banners, the aside contact-options card) out of `page.tsx` into this component. Use `useTranslations('contact')` for all labels/options. Keep the existing submitted payload shape unchanged: `submitContactForm({ name, email, role, company, message, service, size, variant, urgency })` (the radio groups feed `service`/`size`/`variant`/`urgency` as before — see the prior session's contact-page agent report; do not rename these keys, the Django backend expects them). Use `@/i18n/navigation` `Link` for any internal links.
- [ ] **Step 3: Rewrite `app/[locale]/contact/page.tsx`** — server component (no `'use client'`). `import ContactForm from '@/components/contact/ContactForm'`. `getTranslations('contact')`, `setRequestLocale`. Render the hero section, the `<ContactForm />`, the "What happens next" section, and the final CTA — the static sections use `t(...)`. Add `generateMetadata` with `localizedAlternates('/contact')` (title from `contact.metadata`).
- [ ] **Step 4: Tests** — `components/contact/__tests__/ContactForm.test.tsx`: `renderWithIntl(<ContactForm />)`, assert the headline, the "Send request" button, that `hello@xpandia.global` is shown, and the radio options render. If the old contact test had a form-submit test (mocking `submitContactForm`), move it here and adapt to `renderWithIntl`. `app/[locale]/contact/__tests__/page.test.tsx`: convert to a `generateMetadata` check. Make sure NO occurrence of `hello@xpandia.co` remains in either component.
- [ ] **Step 5: Run** — `cd frontend && npm test -- components/contact/__tests__/ContactForm.test.tsx app/[locale]/contact/__tests__/page.test.tsx` → PASS.
- [ ] **Step 6: Verify** — `curl -s http://localhost:3010/contact | grep -ci "tell us what your team is building"` ≥1 and `grep -ci "xpandia.global"` ≥1 and `grep -ciE "xpandia\.co\b"` = 0; `/es/contact` likewise. Dev log clean.
- [ ] **Step 7: Commit** — `git add frontend/messages/en/contact.json frontend/messages/es/contact.json "frontend/app/[locale]/contact" frontend/components/contact && git commit -m "feat(i18n): externalize Contact copy + split ContactForm into a client component"`

---

### Task 17: Externalize the blog chrome → `messages/en/blog.json` (keep `?lang=` for now)

**Files:** Modify `frontend/app/[locale]/blog/page.tsx`, `frontend/app/[locale]/blog/[slug]/page.tsx`, and the blog components (`BlogCard.tsx`, `BlogPagination.tsx`, `BlogContentRenderer.tsx`, `BlogLanguageToggle.tsx`) as needed; create/fill `frontend/messages/{en,es}/blog.json`; adapt the blog component tests to `renderWithIntl`.

> Phase 1 scope for the blog is **minimal**: it's now under `app/[locale]/blog/`, it still uses its `?lang=` query param for content (full unification is Task 30), but its UI chrome strings move to `messages/<locale>/blog.json` so the whole site uses one system. If the Django backend is down, `/blog` returns 500 — that's pre-existing; just confirm the *build/compile* is clean (`/tmp/xpandia_dev.log` shows no module errors for the blog routes).

- [ ] **Step 1: Build `messages/en/blog.json`** — namespace `blog`. Lift the `HERO_COPY` (per-locale hero headline/sub for `/blog`), the "Read more" / "Read article" labels, pagination labels ("Previous"/"Next"/"Page X of Y" or whatever exists), the empty-state copy ("No posts yet" etc.), the toggle labels (still used in Phase 1), and the post-detail "Back to blog" link text. Note: `HERO_COPY` currently is `Record<SupportedLocale, {...}>` — flatten it: in `messages/en/blog.json` put the **English** strings; the Spanish ones go in `messages/es/blog.json`.
- [ ] **Step 2: Update the blog components/pages** to use `useTranslations('blog')` (client components) / `getTranslations('blog')` (server components) instead of the inline `HERO_COPY[lang]` and literal strings. Replace `next/link` with `@/i18n/navigation` `Link` where the link is an internal route (the `BlogLanguageToggle`'s `?lang=` links can stay with plain `next/link` for now since Task 31 deletes that component anyway).
- [ ] **Step 3: Copy `en/blog.json` → `es/blog.json`.**
- [ ] **Step 4: Adapt blog component tests** — `renderWithIntl(...)` for any test that renders a component now using `useTranslations`. Run `cd frontend && npm test -- components/blog/__tests__/BlogCard.test.tsx components/blog/__tests__/BlogPagination.test.tsx components/blog/__tests__/BlogContentRenderer.test.tsx` → PASS (and `components/blog/__tests__/BlogLanguageToggle.test.tsx` if it still renders).
- [ ] **Step 5: Verify compile** — `tail -30 /tmp/xpandia_dev.log | grep -i "error\|cannot find" || echo clean`. Optionally hit `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3010/blog` (500 if backend down — acceptable; what matters is no *compile* error).
- [ ] **Step 6: Commit** — `git add frontend/messages/en/blog.json frontend/messages/es/blog.json "frontend/app/[locale]/blog" frontend/components/blog && git commit -m "feat(i18n): externalize blog chrome copy to blog.json"`

---

### Task 18: Confirm `es` messages load + all routes serve

**Files:** none new — verification + a tiny test.

- [ ] **Step 1: Confirm every `messages/es/*.json` exists and is non-empty** (they were copied from `en/` in Tasks 7, 10–17): `cd frontend && for f in messages/es/*.json; do echo "$f: $(wc -c < $f) bytes"; done` — all should be > 2 bytes.
- [ ] **Step 2: Add a smoke test** that the request config loads both locales' messages without error:

```ts
// frontend/i18n/__tests__/request.test.ts
import { describe, it, expect } from '@jest/globals'
import getRequestConfig from '../request'

describe('i18n request config', () => {
  it('loads merged messages for en', async () => {
    const cfg: any = await (getRequestConfig as any)({ requestLocale: Promise.resolve('en') })
    expect(cfg.locale).toBe('en')
    expect(cfg.messages).toHaveProperty('common')
    expect(cfg.messages).toHaveProperty('home')
    expect(cfg.messages).toHaveProperty('language-assurance')
  })
  it('falls back to en for an unknown locale', async () => {
    const cfg: any = await (getRequestConfig as any)({ requestLocale: Promise.resolve('fr') })
    expect(cfg.locale).toBe('en')
  })
  it('loads merged messages for es', async () => {
    const cfg: any = await (getRequestConfig as any)({ requestLocale: Promise.resolve('es') })
    expect(cfg.locale).toBe('es')
    expect(cfg.messages).toHaveProperty('home')
  })
})
```

Run: `cd frontend && npm test -- i18n/__tests__/request.test.ts` → PASS. (`getRequestConfig` from next-intl returns the config-producing function; calling it with `{requestLocale}` is how it's invoked. If the typing is awkward, the `as any` casts above are fine for the test.)

- [ ] **Step 3: Full route smoke (browser)** — `cd frontend && for p in / /es /services /es/services /services/language-assurance /es/services/language-assurance /services/localization-adaptation /es/services/localization-adaptation /services/applied-cultural-intelligence /es/services/applied-cultural-intelligence /about /es/about /contact /es/contact; do echo -n "$p="; curl -s -o /dev/null -w "%{http_code} " http://localhost:3010$p; done; echo; for r in /services/qa /services/audit /services/fractional /es/services/qa /es/services/audit /es/services/fractional; do echo -n "$r="; curl -s -o /dev/null -w "%{http_code} " http://localhost:3010$r; done; echo` — expect all marketing routes `200`, all legacy routes `308`.

- [ ] **Step 4: Commit** — `git add frontend/i18n/__tests__/request.test.ts && git commit -m "test(i18n): request-config smoke test"`

---

### Task 19: Phase 1 wrap-up — run the affected test suites, typecheck, dev-server review

**Files:** none — verification + fixups.

- [ ] **Step 1: Run unit tests in batches** (≤20 tests / ≤3 cmds per cycle, per the project rule):
  - Cycle A: `npm test -- i18n/__tests__ lib/seo/__tests__ lib/i18n/__tests__`
  - Cycle B: `npm test -- components/layout/__tests__/XpandiaHeader.test.tsx components/layout/__tests__/XpandiaFooter.test.tsx components/layout/__tests__/FABContact.test.tsx`
  - Cycle C: `npm test -- "app/[locale]/__tests__/home.test.tsx" "app/[locale]/services/__tests__/page.test.tsx" "app/[locale]/about/__tests__/page.test.tsx"`
  - Cycle D: `npm test -- "app/[locale]/services/language-assurance/__tests__/page.test.tsx" "app/[locale]/services/localization-adaptation/__tests__/page.test.tsx" "app/[locale]/services/applied-cultural-intelligence/__tests__/page.test.tsx" "app/[locale]/contact/__tests__/page.test.tsx" components/contact/__tests__/ContactForm.test.tsx`
  - Cycle E: `npm test -- components/blog/__tests__`
  - Cycle F: `npm test -- components/animations/__tests__ scripts/__tests__`
  Fix any failures (most likely: a test still uses bare `render` instead of `renderWithIntl`, or asserts on a string that moved namespaces — copy is unchanged in Phase 1, so namespace bookkeeping is the only thing that can break).
- [ ] **Step 2: TypeScript check** — `cd frontend && npx tsc --noEmit 2>&1 | grep -v "lib/services/__tests__/http.test.ts" | head -30` — must show no errors except the known pre-existing `http.test.ts` one. Fix anything new (likely: a `t.raw(...)` array needs a cast, or an import path).
- [ ] **Step 3: Browser review** — screenshot `/` and `/es` of the home, one service page, about, contact (using headless chromium as in the prior session, or just `curl | grep` for key headlines). Confirm `/es/...` shows the (still-English) copy and `<html lang="es">` in the page source: `curl -s http://localhost:3010/es | grep -o '<html lang="[^"]*"'` → `<html lang="es">`; `curl -s http://localhost:3010/ | grep -o '<html lang="[^"]*"'` → `<html lang="en">`.
- [ ] **Step 4: Coverage threshold check** — `jest.config.cjs` has `coverageThreshold.global.branches: 50` (and others). The `app/layout.tsx` exclusion in `collectCoverageFrom` is now stale (the file is `app/[locale]/layout.tsx`). Update `collectCoverageFrom`: change `'!app/layout.tsx'` → `'!app/[locale]/layout.tsx'` and `'!app/globals.css'` stays. If coverage dipped below threshold because page tests shrank, either (a) lower the threshold a touch with a comment, or (b) add the excluded `app/[locale]/page.tsx` etc. to `collectCoverageFrom`'s exclusions (page components are mostly markup). Prefer (b): add `'!app/[locale]/**/page.tsx'` to the exclusions, since deep page-content is now E2E-tested, not unit-tested. Run `npm test -- --coverage --coveragePathIgnorePatterns "/node_modules/" lib/i18n/__tests__/config.test.ts` is NOT how to check global coverage — instead just ensure the threshold config is sane; the CI `test:ci` run will enforce it. Document the change in the commit message.
- [ ] **Step 5: Commit any fixups** — `git add -A && git commit -m "chore(i18n): Phase 1 fixups — adapt tests, fix coverage config, typecheck"`

> ### ⏸ CHECKPOINT — Phase 1 complete. Stop here and report to the user before starting Phase 2. The site is fully i18n-wired; `/es/...` shows English (fallback) and the switcher works; English is unchanged.

---

# PHASE 2 — Spanish translations

Fill `messages/es/*.json` with a professional Spanish translation. **Rules for every translation task:**
- Translate **values only**. Keys, JSON structure, array order, and ICU/interpolation placeholders (`{name}`, `{count}`, `<b>...</b>`) must be byte-for-byte identical to the English file's structure.
- Target audience: **LatAm-neutral Spanish** (the firm's positioning is "LatAm, US Hispanic, Spain, neutral Spanish"). Professional, consultative B2B register. Use `tú`-neutral phrasing where possible (avoid heavy `usted`/`vos`); product/AI/QA terminology can stay in English where that's the industry norm (e.g. "AI", "QA", "scorecard" — but prefer "tablero de calidad" / "informe ejecutivo" etc. where natural; the client will refine).
- Eyebrows that are SCREAMING-CAPS labels (e.g. `"WHY XPANDIA"`, `"NEXT STEP"`) → translate and keep them uppercase (`"POR QUÉ XPANDIA"`, `"SIGUIENTE PASO"`).
- Prices/numbers (`"From $4,500"`, `"$3,000/month"`) → `"Desde $4,500"`, `"$3,000/mes"`. Timelines (`"10 business days"`) → `"10 días hábiles"`.
- Brand names stay: "Xpandia", "Language Assurance", "Localization & Adaptation", "Applied Cultural Intelligence", "Nestor Solano", "Xpandia Applied Cultural Intelligence SAS". (These are product-line names — keep in English even in the Spanish site, like the nav.)
- Email `hello@xpandia.global` stays.
- `metadata.title`/`description`/`og*` → translate (these are the Spanish SEO strings).
- After writing each file, validate it's still valid JSON: `node -e "JSON.parse(require('fs').readFileSync('messages/es/<file>.json','utf8'))"` (no output = valid).

These 9 tasks are independent and can be done by **parallel agents** (one per file), like the PDF rewrite. Each agent: read `messages/en/<ns>.json`, write `messages/es/<ns>.json` with translated values, validate JSON, report.

- [ ] **Task 20:** Translate `messages/es/common.json` (header nav, dropdown descriptions, footer tagline/description/columns/copyright, FAB, metadata). Note: nav items "Services"/"Blog"/"About"/"Contact" → "Servicios"/"Blog"/"Nosotros"/"Contacto". "Book a diagnostic call" → "Agenda una llamada de diagnóstico". "All services" → "Todos los servicios". Footer "SPANISH EXPERTISE · 2026" → "EXPERTISE EN ESPAÑOL · 2026". Validate JSON. Commit `git add frontend/messages/es/common.json && git commit -m "feat(i18n): Spanish translation — common.json"`.
- [ ] **Task 21:** Translate `messages/es/home.json`. H1 "Spanish that works for real users." → "Español que funciona para usuarios reales." etc. Validate. Commit.
- [ ] **Task 22:** Translate `messages/es/services.json`. H1 → "El expertise en español que tu producto necesita." etc. Validate. Commit.
- [ ] **Task 23:** Translate `messages/es/language-assurance.json`. H1 "Validate Spanish before your users do." → "Valida el español antes de que lo hagan tus usuarios." etc. Validate. Commit.
- [ ] **Task 24:** Translate `messages/es/localization.json`. H1 "More than translated. Built for Spanish-speaking audiences." → "Más que traducido. Hecho para audiencias hispanohablantes." etc. Validate. Commit.
- [ ] **Task 25:** Translate `messages/es/aci.json`. H1 "Read the invisible rules behind trust, culture, and growth." → "Lee las reglas invisibles detrás de la confianza, la cultura y el crecimiento." etc. Validate. Commit.
- [ ] **Task 26:** Translate `messages/es/about.json`. H1 "Spanish expertise for companies building across languages, cultures, and markets." → "Expertise en español para empresas que construyen entre idiomas, culturas y mercados." Founder bio translated. Validate. Commit.
- [ ] **Task 27:** Translate `messages/es/contact.json`. Headline "Tell us what your team is building, launching, or improving in Spanish." → "Cuéntanos qué está construyendo, lanzando o mejorando tu equipo en español." All form labels/options/microcopy translated. Validate. Commit.
- [ ] **Task 28:** Translate `messages/es/blog.json`. Hero copy, "Read more" → "Leer más", pagination, empty state. Validate. Commit.
- [ ] **Task 29: Phase 2 verification.** With the dev server running: `cd frontend && for p in /es /es/services /es/services/language-assurance /es/services/localization-adaptation /es/services/applied-cultural-intelligence /es/about /es/contact; do echo "=== $p ==="; curl -s "http://localhost:3010$p" | grep -ciE "valida|español|expertise|cultural|nosotros|contacto" ; done` — each should be ≥1 (Spanish words present). Then curl `/` and confirm English is still there (`grep -ci "spanish that works for real users"` ≥1). Check `/tmp/xpandia_dev.log` for any `IntlError` (missing/malformed key) — fix in the relevant `es/*.json`. Add a tiny unit test that renders `XpandiaHeader` with the **Spanish** messages and asserts a Spanish nav label appears (extend `renderWithIntl` to optionally take messages, or add a `renderWithIntlEs` helper). Run it. Commit `git add -A && git commit -m "test(i18n): Spanish-render smoke test + Phase 2 verification fixups"`.

> ### ⏸ CHECKPOINT — Phase 2 complete. Stop here and report to the user before starting Phase 3. The site is fully bilingual; `/es/...` shows the Spanish draft.

---

# PHASE 3 — Blog unification + tests/e2e + final verification

### Task 30: Migrate the blog to locale routing (drop `?lang=`)

**Files:** Modify `frontend/app/[locale]/blog/page.tsx`, `frontend/app/[locale]/blog/[slug]/page.tsx`. Possibly touch `frontend/lib/services/blog.ts` (no signature change — it keeps its `lang` param) and `frontend/lib/i18n/config.ts` (no change — still used for `formatLocaleDate`).

- [ ] **Step 1:** In `app/[locale]/blog/page.tsx`: remove the `searchParams: Promise<{ page?: string; lang?: string }>` `lang` handling. Get the locale from the route: the page receives `{ params }: { params: Promise<{ locale: string; }> }` plus `searchParams` for `page`. Do `const { locale } = await params; setRequestLocale(locale)`. Map the next-intl locale to the blog's `SupportedLocale` (they're the same set — `'en' | 'es'`). Call `fetchBlogPosts(locale as SupportedLocale, page, PAGINATION.BLOG_PAGE_SIZE)`. Use `getTranslations('blog')` for chrome. Add `generateMetadata` with `localizedAlternates('/blog')` and a `blog.metadata` namespace entry (add `metadata` to `blog.json` if not already there).
- [ ] **Step 2:** In `app/[locale]/blog/[slug]/page.tsx`: same — locale from route params, pass to `fetchBlogPost(slug, locale)`. Remove `?lang=` handling. `generateMetadata` from the fetched post (title/description) + `localizedAlternates(\`/blog/${slug}\`)`. `setRequestLocale(locale)`.
- [ ] **Step 3:** Replace any remaining `next/link` in the blog pages with `@/i18n/navigation` `Link`.
- [ ] **Step 4:** Verify compile — restart dev server, `curl -s -o /dev/null -w "/blog=%{http_code} /es/blog=%{http_code}\n" http://localhost:3010/blog http://localhost:3010/es/blog` (500 if backend down — acceptable; check `/tmp/xpandia_dev.log` has no module/compile errors for the blog routes). If you can run the Django backend (`cd ../backend && source venv/bin/activate && python manage.py runserver` — only if the user wants it), confirm `/blog` 200 and `/es/blog` 200.
- [ ] **Step 5: Commit** — `git add "frontend/app/[locale]/blog" && git commit -m "feat(i18n): blog uses route locale (drop ?lang= query param)"`

---

### Task 31: Delete `BlogLanguageToggle` and its references

**Files:** Delete `frontend/components/blog/BlogLanguageToggle.tsx` + `frontend/components/blog/__tests__/BlogLanguageToggle.test.tsx`. Modify `frontend/app/[locale]/blog/page.tsx` (remove the `<BlogLanguageToggle .../>` usage).

- [ ] **Step 1:** `cd frontend && git rm components/blog/BlogLanguageToggle.tsx components/blog/__tests__/BlogLanguageToggle.test.tsx`
- [ ] **Step 2:** Remove the `import BlogLanguageToggle from ...` and the `<BlogLanguageToggle currentLang={lang} />` JSX from `app/[locale]/blog/page.tsx`. Also remove any now-unused exports in `lib/i18n/config.ts` ONLY if nothing else uses them (`LOCALE_TOGGLE_LABELS` if it existed) — run `grep -rn "LOCALE_TOGGLE_LABELS\|BlogLanguageToggle" frontend/ --include="*.ts" --include="*.tsx"` and clean up dangling refs.
- [ ] **Step 3:** Run the blog component tests — `cd frontend && npm test -- components/blog/__tests__/BlogCard.test.tsx components/blog/__tests__/BlogPagination.test.tsx components/blog/__tests__/BlogContentRenderer.test.tsx` → PASS.
- [ ] **Step 4:** Verify compile clean (`tail /tmp/xpandia_dev.log`).
- [ ] **Step 5: Commit** — `git add -A frontend/components/blog "frontend/app/[locale]/blog" frontend/lib/i18n && git commit -m "refactor(i18n): remove BlogLanguageToggle — global header switcher handles it"`

---

### Task 32: E2E — locale switch spec + flow registration

**Files:** Create `frontend/e2e/public/i18n.spec.ts`; modify `frontend/e2e/helpers/flow-tags.ts` and `frontend/e2e/flow-definitions.json`.

- [ ] **Step 1:** Add the flow constant to `e2e/helpers/flow-tags.ts` (in the Navigation interactions section):

```ts
export const I18N_LOCALE_SWITCH = ['@flow:i18n-locale-switch', '@module:navigation', '@priority:P2'];
```

- [ ] **Step 2:** Add the flow definition to `e2e/flow-definitions.json` (in the `navigation` module group):

```jsonc
    "i18n-locale-switch": {
      "name": "Locale switch (EN ⇄ ES)",
      "module": "navigation",
      "roles": ["shared"],
      "priority": "P2",
      "description": "Guest toggles the header EN|ES switcher; URL gains/loses the /es prefix, content language changes, <html lang> updates",
      "expectedSpecs": 1
    },
```

- [ ] **Step 3:** Create `e2e/public/i18n.spec.ts`:

```ts
import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import { I18N_LOCALE_SWITCH } from '../helpers/flow-tags'

test.describe('i18n locale switch', () => {
  test('switching EN→ES adds the /es prefix, swaps content, and sets html lang', { tag: [...I18N_LOCALE_SWITCH] }, async ({ page }) => {
    await page.goto('/')
    await waitForPageLoad(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works for real users/i })).toBeVisible()

    await page.getByRole('group', { name: /language|idioma/i }).getByRole('button', { name: 'ES' }).click()

    await expect(page).toHaveURL(/\/es$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    // Spanish H1 (adjust to the actual translated headline if it differs)
    await expect(page.getByRole('heading', { level: 1, name: /Español que funciona para usuarios reales/i })).toBeVisible()
  })

  test('switching ES→EN removes the /es prefix and restores English', { tag: [...I18N_LOCALE_SWITCH] }, async ({ page }) => {
    await page.goto('/es/services/language-assurance')
    await waitForPageLoad(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')

    await page.getByRole('group', { name: /language|idioma/i }).getByRole('button', { name: 'EN' }).click()

    await expect(page).toHaveURL(/\/services\/language-assurance$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: /Validate Spanish before your users do/i })).toBeVisible()
  })

  test('a Spanish service page renders Spanish copy', { tag: [...I18N_LOCALE_SWITCH] }, async ({ page }) => {
    await page.goto('/es/services/applied-cultural-intelligence')
    await waitForPageLoad(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByText(/reglas invisibles/i).first()).toBeVisible()
  })
})
```

> **Implementer note:** the Spanish-headline regexes above (`/Español que funciona.../i`, `/reglas invisibles/i`) MUST match whatever Phase 2 actually wrote into `messages/es/home.json` / `messages/es/aci.json`. After Phase 2, open those files, copy the real `hero.h1` values, and fix these regexes. Do not leave guessed strings.

- [ ] **Step 4:** Run it (needs the dev server + a Playwright browser — if Playwright Chrome isn't installed in the env, note that and skip the run, but the spec file is still committed): `cd frontend && E2E_REUSE_SERVER=1 PLAYWRIGHT_TEST_BASE_URL=http://localhost:3010 npx playwright test e2e/public/i18n.spec.ts` → PASS (or document "Playwright browser not available in this env").
- [ ] **Step 5: Commit** — `git add frontend/e2e && git commit -m "test(i18n): e2e locale-switch spec + flow registration"`

---

### Task 33: Adapt the existing E2E specs (blog `?lang=` removed; English URLs unchanged)

**Files:** Modify `frontend/e2e/public/blog.spec.ts` (if it references `?lang=` or the `BlogLanguageToggle`), and skim `navigation.spec.ts` / `services.spec.ts` / `static-pages.spec.ts` / `interactions.spec.ts` / `smoke.spec.ts` for any breakage.

- [ ] **Step 1:** `grep -rn "?lang=\|BlogLanguageToggle\|lang=es\|lang=en" frontend/e2e/` — for any hit in `blog.spec.ts`: replace `goto('/blog?lang=es')` with `goto('/es/blog')`, and remove assertions about the `BlogLanguageToggle` component (or replace with the global header toggle). The English blog tests keep `goto('/blog')` unchanged.
- [ ] **Step 2:** The non-blog English specs should be untouched (English URLs and copy are unchanged). Quick sanity: `grep -rn "getByRole('heading'" frontend/e2e/public/*.spec.ts` and confirm the headline regexes still match the (unchanged) English copy. If the `XpandiaHeader` mobile-drawer markup changed enough to break `interactions.spec.ts`'s drawer test, fix the selector.
- [ ] **Step 3:** If a Playwright browser is available, run the affected specs (≤2 files per invocation): `npx playwright test e2e/public/blog.spec.ts e2e/public/navigation.spec.ts` then `npx playwright test e2e/public/services.spec.ts e2e/public/static-pages.spec.ts`. Otherwise document that E2E wasn't run here.
- [ ] **Step 4: Commit** — `git add frontend/e2e && git commit -m "test(i18n): adapt e2e specs for the unified blog locale routing"`

---

### Task 34: Update `CLAUDE.md` (routes + i18n note)

**Files:** Modify `/home/cerrotico/work/xpandia_project/CLAUDE.md` (root) and check `frontend/CLAUDE.md` (it has an "i18n Rules — Next.js (with next-intl)" section — make sure it matches reality).

- [ ] **Step 1:** In root `CLAUDE.md`, "Directory Structure" → "Current Xpandia routes": note that the site is now under `app/[locale]/` with `localePrefix: 'as-needed'` — English unprefixed (`/`, `/services`, …), Spanish under `/es/…`; the EN|ES header toggle switches locale; copy lives in `frontend/messages/<locale>/<namespace>.json`; locale config in `frontend/i18n/routing.ts` (+ `lib/i18n/config.ts` for the locale list/date helpers); middleware in `frontend/middleware.ts`. Note the Spanish copy is a draft pending client review.
- [ ] **Step 2:** Add an "i18n" bullet to the General Rules / a short section: "User-facing strings live in `messages/<locale>/`; never hardcode copy in components — use `getTranslations`/`useTranslations`. Adding a page means adding a `messages/en/<ns>.json` + `messages/es/<ns>.json` and registering the namespace in `i18n/request.ts`."
- [ ] **Step 3:** Read `frontend/CLAUDE.md`'s existing "i18n Rules" section — if it describes an `app/[locale]/` + `messages/` + `next-intl` setup, it now matches; if it says anything contradicting `localePrefix: 'as-needed'` or the namespace-per-page layout, align it.
- [ ] **Step 4: Commit** — `git add CLAUDE.md frontend/CLAUDE.md && git commit -m "docs(i18n): document the bilingual route structure and message conventions"`

---

### Task 35: Final verification + cleanup

**Files:** none — verification.

- [ ] **Step 1: Dev server clean** — restart `npm run dev -- -H 0.0.0.0 -p 3010`; confirm `/`, `/es`, all marketing routes (en + es) → 200; legacy redirects (en + es) → 308; `<html lang>` correct on `/` (en) and `/es` (es); `/tmp/xpandia_dev.log` has no `IntlError` / module errors.
- [ ] **Step 2: Browser screenshots** — capture `/` and `/es` hero of: home, services, language-assurance, about, contact. Confirm: English unchanged on `/x`; Spanish copy on `/es/x`; the EN|ES toggle highlights the active locale; the cyan accent underline still looks right on the (now-Spanish) headlines (the `.accent-underline` is `text-decoration`-based, so it follows the text — verify no regression on longer Spanish phrases).
- [ ] **Step 3: Unit tests** — re-run the batches from Task 19's Step 1 plus the new ones (`i18n/__tests__/request.test.ts`, `e2e`-adjacent unit tests N/A) → all green. `npx tsc --noEmit` clean (modulo the known `http.test.ts`).
- [ ] **Step 4: Verification grep** (like the PDF-coverage check): for each `/es/<page>`, `curl | grep -ci` a known Spanish phrase from that page's `messages/es/<ns>.json` `hero.h1`/`hero.eyebrow` → ≥1. For each `/<page>` (English), `curl | grep -ci` the English `hero.h1` → ≥1 (no regression). Confirm `grep -ciE "xpandia\.co\b"` on `/contact` and `/es/contact` → 0.
- [ ] **Step 5: Clean up scratch** — remove any temp screenshot files; leave the dev server running for the user.
- [ ] **Step 6: Commit any final fixups** — `git add -A && git commit -m "chore(i18n): final verification fixups"` (only if there were any).

> ### ⏸ CHECKPOINT — Phase 3 complete. Report to the user: bilingual site live, English untouched, Spanish draft in place pending their review, blog unified, tests green. Note that E2E may not have been run if no Playwright browser was available, and that the Spanish copy is explicitly a draft.

---

## Self-review notes (filled by plan author)

- **Spec coverage:** Routing (`as-needed`, `[locale]`, middleware) → Tasks 1–5. Messages/externalization (per-page namespaces, `metadata` sub-objects, `t.raw` for arrays) → Tasks 7, 10–17, 20–28. Locale switcher → Task 8. Blog unification → Tasks 17 (chrome) + 30 (routing) + 31 (toggle removal). SEO (`generateMetadata` + hreflang) → Task 9 + each page task + Task 5 (layout). `<html lang>` → Task 5. Tests/e2e (render helper, navigation mock, `i18n.spec.ts`, flow registration) → Tasks 6, 8, 9, 18, 32, 33. `localeDetection: false` → Task 1. CLAUDE.md → Task 34. Phasing/checkpoints → headers + the ⏸ markers. **All spec sections mapped.**
- **Placeholder scan:** the page-extraction tasks (10–17) and the translation tasks (20–28) describe a precise repeatable procedure with a fully-worked example (Task 7) and explicit "definition of done" + verification commands — not "implement later". The two implementer-notes that say "fix the regex/headline to match what Phase 2 actually wrote" are deliberate cross-phase dependencies, not placeholders. No `TODO`/`TBD`.
- **Type consistency:** `routing` (from `i18n/routing.ts`) used consistently in `navigation.ts`, `middleware.ts`, `layout.tsx`, `request.ts`. `localizedAlternates(path)` signature consistent everywhere it's used. `enMessages` shape in `test-utils/messages.ts` matches the namespaces in `i18n/request.ts` (`'language-assurance'` key is quoted in both). `renderWithIntl` used uniformly in adapted tests. The contact form payload keys (`name,email,role,company,message,service,size,variant,urgency`) are stated once (Task 16) and not contradicted.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-12-i18n-bilingual-site.md`. Two execution options:

1. **Subagent-Driven (recommended)** — dispatch a fresh subagent per task, review between tasks, fast iteration. Phase 2's 9 translation tasks parallelize especially well (one agent per `es/*.json`).
2. **Inline Execution** — execute tasks in this session with checkpoints (the ⏸ markers + the per-phase wrap-ups).

Which approach?
