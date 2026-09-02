import { test, expect } from '@playwright/test'
import { waitForPageLoad, fillContactForm } from '../fixtures'

test.describe('Contact form', () => {
  test(
    'submitting the contact form shows the success banner',
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      await fillContactForm(page)

      await Promise.all([
        page.waitForResponse(resp =>
          resp.url().endsWith('/api/contact/') && resp.status() === 201,
        ),
        page.getByRole('button', { name: /Send request/i }).click(),
      ])

      await expect(page.getByText(/Request received/i)).toBeVisible()
    }
  )

  test(
    'shows the error banner when the contact API returns 5xx',
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      // Force the backend to fail so we exercise the failure path, not the happy one.
      await page.route('**/api/contact/', route =>
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ detail: 'Could not send message.' }),
        }),
      )

      await fillContactForm(page)

      await Promise.all([
        page.waitForResponse(resp =>
          resp.url().endsWith('/api/contact/') && resp.status() === 503,
        ),
        page.getByRole('button', { name: /Send request/i }).click(),
      ])

      await expect(page.getByText(/something went wrong/i)).toBeVisible()
      await expect(page.getByText(/Request received/i)).toBeHidden()
      await expect(page.getByRole('button', { name: /Send request/i })).toBeVisible()
    }
  )

  test(
    'selecting a quick start request type sends it with the contact form',
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      // Capture the outgoing payload so we can assert the chosen intent is sent.
      let capturedBody: Record<string, unknown> | null = null
      await page.route('**/api/contact/', route => {
        capturedBody = route.request().postDataJSON()
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ detail: 'Request received.' }),
        })
      })

      const auditButton = page.getByRole('button', { name: 'Request an audit' })
      await auditButton.click()
      await expect(auditButton).toHaveAttribute('aria-pressed', 'true')

      await fillContactForm(page)

      await Promise.all([
        page.waitForResponse(resp =>
          resp.url().endsWith('/api/contact/') && resp.status() === 201,
        ),
        page.getByRole('button', { name: /Send request/i }).click(),
      ])

      await expect(page.getByText(/Request received/i)).toBeVisible()
      expect(capturedBody?.intent).toBe('audit')
    }
  )
})

// Mirrors components/contact/CalScript.tsx — kept as a literal so the spec does
// not import a 'use client' module (and next/script) into the Playwright runner.
const CAL_LINK = 'milena-gonzalez-oqdwif/discovery-call'

/**
 * Stands in for https://app.cal.com/embed/embed.js.
 *
 * The real embed owns the whole popup: the trigger buttons carry no onClick, so
 * without a stub a click is a no-op with nothing to assert, and with the real
 * script the suite gains its only third-party network dependency. This replays
 * the one contract our code relies on — document-level delegation on
 * [data-cal-link] — and records the opened link on <body>. It verifies OUR
 * wiring; the scheduler itself belongs to Cal.com and is out of scope.
 */
const CAL_EMBED_STUB = `
  document.addEventListener('click', function (event) {
    var trigger = event.target.closest && event.target.closest('[data-cal-link]')
    if (!trigger) return
    document.body.dataset.calOpened = trigger.getAttribute('data-cal-link')
  })
  document.documentElement.dataset.calStub = 'ready'
`

/**
 * Navigate to the contact page and wait until the embed stub has registered its
 * click listener. The real embed is injected by an afterInteractive script, so
 * clicking before it loads is a silent no-op.
 */
async function gotoContactWithCalReady(page: import('@playwright/test').Page) {
  await page.goto('/contact')
  await waitForPageLoad(page)
  await expect(page.locator('html')).toHaveAttribute('data-cal-stub', 'ready')
}

test.describe('Contact scheduling', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/app.cal.com/embed/**', route =>
      route.fulfill({ contentType: 'application/javascript', body: CAL_EMBED_STUB })
    )
  })

  test(
    'clicking the book-a-call CTA opens the Cal scheduler',
    async ({ page }) => {
      await gotoContactWithCalReady(page)

      await page.getByRole('button', { name: 'Book a diagnostic call' }).click()

      await expect(page.locator('body')).toHaveAttribute('data-cal-opened', CAL_LINK)
    }
  )

  test(
    'opening the Cal scheduler keeps the user on the contact page',
    async ({ page }) => {
      await gotoContactWithCalReady(page)

      await page.getByRole('button', { name: 'Book a diagnostic call' }).click()
      await expect(page.locator('body')).toHaveAttribute('data-cal-opened', CAL_LINK)

      await expect(page).toHaveURL(/\/contact$/)
    }
  )
})

test.describe('Contact form CTA', () => {
  test(
    'the final CTA scrolls the contact form into view',
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      // The form heading stands in for the form: it scrolls into view with it.
      const formHeading = page.getByRole('heading', { name: /Let's talk about your Spanish\/English products/i })
      const cta = page.getByRole('button', { name: 'Talk to an Expert' })

      await cta.scrollIntoViewIfNeeded()
      await expect(formHeading).not.toBeInViewport()

      await cta.click()

      // toBeInViewport retries, which the JS-driven smooth scroll needs —
      // reducedMotion does not shorten window.scrollTo({behavior:'smooth'}).
      await expect(formHeading).toBeInViewport()
    }
  )

  test(
    'the final CTA surfaces the hint above the contact form',
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      await page.getByRole('button', { name: 'Talk to an Expert' }).click()

      // The hint clears itself after 5s, so assert right away. The banner stays
      // in the DOM and is collapsed with grid-template-rows/opacity rather than
      // display:none, so toBeVisible() would not tell the two states apart —
      // the `show` class is the actual signal.
      await expect(page.getByRole('status')).toHaveClass(/show/)
      await expect(page.getByRole('status')).toHaveText(/Fill out this form/i)
    }
  )
})

test.describe('CTA navigation', () => {
  test(
    'clicking the home page CTA navigates to /contact',
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('link', { name: /Talk to an Expert/i }).first().click()

      await expect(page).toHaveURL(/\/contact/)
      await expect(page.getByRole('heading', { level: 1, name: /Tell us what your team is building/i })).toBeVisible()
    }
  )

  test(
    'clicking a core-solution card CTA on /services navigates to /contact',
    async ({ page }) => {
      await page.goto('/services')
      await waitForPageLoad(page)

      const cta = page.getByRole('link', { name: /Request an AI QA Sprint/i })
      await cta.scrollIntoViewIfNeeded()

      await Promise.all([
        page.waitForURL(/\/contact/),
        cta.click(),
      ])

      await expect(page).toHaveURL(/\/contact/)
    }
  )

  test(
    'clicking the service detail CTA navigates to /contact',
    async ({ page }) => {
      await page.goto('/services/language-assurance')
      await waitForPageLoad(page)

      // Scope to .hero-ctas to avoid matching header dropdown or second CTA on page
      const cta = page.locator('.hero-ctas').getByRole('link').first()
      await cta.waitFor({ state: 'visible' })

      await Promise.all([
        page.waitForURL(/\/contact/),
        cta.click(),
      ])

      await expect(page).toHaveURL(/\/contact/)
    }
  )
})

test.describe('Services navigation', () => {
  test(
    'clicking a service card on /services navigates to the service detail page',
    async ({ page }) => {
      await page.goto('/services')
      await waitForPageLoad(page)

      await page.getByRole('link', { name: /Explore Language Assurance/i }).first().click()

      await expect(page).toHaveURL(/\/services\/language-assurance/)
      await expect(page.getByRole('heading', { level: 1, name: /Validate Spanish before your users do/i })).toBeVisible()
    }
  )

  test(
    'clicking the breadcrumb on a service detail page returns to /services',
    async ({ page }) => {
      await page.goto('/services/language-assurance')
      await waitForPageLoad(page)

      // Use exact text with ← char to avoid matching "All services" in the hidden header dropdown
      const breadcrumb = page.getByRole('link', { name: '← ALL SERVICES' })
      await breadcrumb.waitFor({ state: 'visible' })

      await Promise.all([
        page.waitForURL(/\/services$/),
        breadcrumb.click(),
      ])

      await expect(page.getByRole('heading', { level: 1, name: /The Spanish expertise your product needs/i })).toBeVisible()
    }
  )
})

test.describe('Navigation interactions', () => {
  test(
    'mobile hamburger opens the drawer and navigates to About',
    async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
      })
      const page = await context.newPage()
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('button', { name: 'Menu' }).click()
      await expect(page.getByRole('link', { name: 'About' }).first()).toBeVisible()
      await page.getByRole('link', { name: 'About' }).first().click()

      await expect(page).toHaveURL(/\/about/)
      await context.close()
    }
  )

  test(
    'mobile main bar exposes the language toggle and switches to Spanish without opening the drawer',
    async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
      })
      const page = await context.newPage()
      await page.goto('/')
      await waitForPageLoad(page)

      const langGroup = page.getByRole('group', { name: /language|idioma/i })
      await expect(langGroup).toBeVisible()

      await langGroup.getByRole('button', { name: 'ES' }).click()

      await expect(page).toHaveURL(/\/es$/)
      await expect(page.locator('html')).toHaveAttribute('lang', 'es')
      await context.close()
    }
  )

  test(
    'hovering Services in the desktop header shows the dropdown and navigates on click',
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Services' }).hover()
      const dropdown = page.getByRole('menu')
      await expect(dropdown).toBeVisible()

      await page.getByRole('menu').getByRole('link', { name: 'All services' }).click()

      await expect(page).toHaveURL(/\/services$/)
    }
  )

  test(
    'clicking the FAB contact button navigates to /contact',
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('link', { name: /let.s talk/i }).click()

      await expect(page).toHaveURL(/\/contact/)
    }
  )

  test(
    'clicking the About link in the footer navigates to /about',
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.locator('footer').getByRole('link', { name: 'About' }).click()

      await expect(page).toHaveURL(/\/about/)
    }
  )
})
