---
trigger: manual
description: Product requirements document — why Xpandia exists, core requirements, scope, target users, and business rules.
---

# Product Requirement Docs — Xpandia

## 1. Product Overview

**Xpandia** is a boutique language assurance firm for AI, SaaS and EdTech teams entering Spanish/LatAm markets. It is built by a senior operator — a former Global Localization Program Manager with 20+ years of experience.

**Tagline:** "Spanish that works. Quality you can measure."

**Core value proposition:** Expert language quality review, measurable scoring, and senior oversight for AI outputs, digital experiences, and localization operations — not translation, not generic consulting.

**Contact:** hello@xpandia.co

---

## 2. Problem Statement

Growing companies shipping AI, SaaS and EdTech products in Spanish often:
- Can generate Spanish content but cannot trust its quality
- Lack internal senior ownership for localization quality
- Ship AI-generated Spanish without expert validation
- Have no measurable scoring framework for language quality

Xpandia fills this gap with scoped, senior-led, evidence-based engagements.

---

## 3. Core Services (Products)

### 01 / SPRINT — AI Spanish QA Sprint
- **Purpose**: Validate AI-generated Spanish/LatAm outputs before users encounter them
- **Timeline**: 10 business days
- **Scope**: 150–300 outputs, 1 use case, 1 target Spanish variant
- **Route**: `/services/qa`

### 02 / AUDIT — Spanish Launch Readiness Audit
- **Purpose**: Find trust/clarity/conversion issues in the Spanish digital experience
- **Timeline**: 10–12 business days
- **Scope**: 3–5 critical user journeys, 1 Spanish variant or neutral
- **Route**: `/services/audit`

### 03 / FRACTIONAL — Fractional Language Quality Lead
- **Purpose**: Senior-level language quality leadership without a full-time hire
- **Timeline**: Monthly retainer, 3-month minimum, 2–4 meetings per month
- **Route**: `/services/fractional`

---

## 4. Target Users (Buyers)

**Company profile:**
- Mid-market AI, SaaS, EdTech teams
- HQ in US, Canada, or Europe
- Selling into Spanish-speaking markets or about to
- 50–1,500+ employees

**Buyer roles:**
- Head of Product / VP Product
- Director of Localization
- VP Customer Experience
- AI/ML Product Lead / Trust & Safety

**Not a fit:**
- Teams looking for cheap/fast translation
- Companies without a live digital product
- One-off prompt localization tasks
- Organizations with no internal owner

---

## 5. Current Website Scope (as of 2026-04-24)

The frontend is a **marketing site only** — no authenticated features are live yet. Routes:

| Route | Component | Type |
|-------|-----------|------|
| `/` | `app/page.tsx` | Static — home |
| `/about` | `app/about/page.tsx` | Static — founder/firm |
| `/contact` | `app/contact/page.tsx` | Client — contact form |
| `/services` | `app/services/page.tsx` | Static — overview |
| `/services/qa` | `app/services/qa/page.tsx` | Static — sprint detail |
| `/services/audit` | `app/services/audit/page.tsx` | Static — audit detail |
| `/services/fractional` | `app/services/fractional/page.tsx` | Static — fractional detail |

The backend exposes **auth + user management** infrastructure (JWT, Google OAuth, password reset), ready for future authenticated portal features.

---

## 6. Key Business Rules

1. **Senior-led, end-to-end**: No junior hand-offs, no subcontracted reviews
2. **Capped capacity**: Max 12 concurrent engagements per month
3. **Evidence over opinion**: Every claim backed by a defined rubric and score
4. **Scope before speed**: Use case, audience, and success criteria defined before review begins
5. **Commercially useful deliverables**: End in a decision (ship / fix / escalate / defer)

---

## 7. Quality Scoring Dimensions

The Xpandia quality scorecard covers:
- Accuracy, Clarity, Naturalness, Tone & register, Terminology
- Regional fit, Instruction-following, Severity (critical error rate)

---

## 8. Contact / Intake Flow

1. User fills contact form at `/contact` (service, company size, Spanish variant, urgency, name, email)
2. Xpandia replies within 1 business day
3. 30-minute diagnostic call (senior/founder-led)
4. Scoped proposal within 3 business days
