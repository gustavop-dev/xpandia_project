---
trigger: manual
description: Known errors, their context, and resolutions. Reference when debugging or encountering recurring issues in Xpandia.
---

# Error Documentation — Xpandia

This file tracks known errors, their context, and resolutions. When a reusable fix or correction is found, document it here to avoid repeating the same mistake.

---

## Format

```
### [ERROR-NNN] Short description
- **Date**: YYYY-MM-DD
- **Context**: Where/when this error occurs
- **Root Cause**: Why it happens
- **Resolution**: How to fix it
- **Files Affected**: List of files
```

---

## Known Issues

_No open issues._

---

## Resolved Issues

### [ERROR-001] Multiple elements found for `getByRole` in page tests
- **Date**: 2026-04-24
- **Context**: Frontend unit tests for service pages — `getByRole('link', { name: /book a diagnostic call/i })` threw "Found multiple elements"
- **Root Cause**: CTAs like "Book a diagnostic call" and "Request a Launch Readiness Audit" appear twice per page (hero section + bottom CTA section)
- **Resolution**: Use `getAllByRole(...)[0]` when a page intentionally repeats a link
- **Files Affected**: `app/services/__tests__/page.test.tsx`, `app/services/qa/__tests__/page.test.tsx`, `app/services/audit/__tests__/page.test.tsx`, `app/services/fractional/__tests__/page.test.tsx`

### [ERROR-002] Stale element reference after RadioTile re-render
- **Date**: 2026-04-24
- **Context**: `app/contact/__tests__/page.test.tsx` — asserting `.toHaveClass('on')` on a stored tile reference after a click failed
- **Root Cause**: `RadioTile` is defined as a nested function inside `ContactPage`. React treats it as a different component type on each render, causing full unmount → remount. The stored DOM node becomes stale after state update.
- **Resolution**: Re-query the element after the click: `screen.getByText('...').closest('[role="button"]')` instead of storing the reference before the click
- **Files Affected**: `app/contact/__tests__/page.test.tsx`

### [ERROR-003] `priority` prop warning from Next.js Image mock
- **Date**: 2026-04-24
- **Context**: `XpandiaHeader.test.tsx` — `console.error: Received 'true' for a non-boolean attribute 'priority'`
- **Root Cause**: The `jest.setup.ts` mock for `next/image` renders as a plain `<img>` and passes all props including `priority={true}`, which is not a valid HTML attribute
- **Resolution**: This is a non-fatal warning, not a test failure. Suppress by updating the Image mock to omit `priority`, or accept it as a known mock limitation
- **Files Affected**: `frontend/jest.setup.ts`, any test that renders a component using `<Image priority />`
