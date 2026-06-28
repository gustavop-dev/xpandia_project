import { test, expect } from '../test-with-coverage'
import { waitForPageLoad, fillContactForm } from '../fixtures'
import {
  CONTACT_FORM_SUBMIT,
  CONTACT_FORM_ERROR_STATE,
  CTA_HOME_TO_CONTACT,
  CTA_SERVICE_DETAIL_TO_CONTACT,
  CTA_SERVICES_CORE_SOLUTION_TO_CONTACT,
  SERVICES_CARD_TO_DETAIL,
  BREADCRUMB_BACK_TO_SERVICES,
  MOBILE_NAVIGATION_DRAWER,
  HEADER_SERVICES_DROPDOWN,
  FAB_CONTACT_BUTTON,
  LANGUAGE_TOGGLE_PREFERENCE,
  MOBILE_LANGUAGE_TOGGLE,
  FOOTER_LINKS_NAVIGATION,
} from '../helpers/flow-tags'

test.describe('Contact form', () => {
  test(
    'submitting the contact form shows the success banner',
    { tag: [...CONTACT_FORM_SUBMIT] },
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
    { tag: [...CONTACT_FORM_ERROR_STATE] },
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
      await expect(page.getByText(/Request received/i)).not.toBeVisible()
      await expect(page.getByRole('button', { name: /Send request/i })).toBeVisible()
    }
  )
})

test.describe('CTA navigation', () => {
  test(
    'clicking the home page CTA navigates to /contact',
    { tag: [...CTA_HOME_TO_CONTACT] },
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
    { tag: [...CTA_SERVICES_CORE_SOLUTION_TO_CONTACT] },
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
    { tag: [...CTA_SERVICE_DETAIL_TO_CONTACT] },
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
    { tag: [...SERVICES_CARD_TO_DETAIL] },
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
    { tag: [...BREADCRUMB_BACK_TO_SERVICES] },
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
    { tag: [...MOBILE_NAVIGATION_DRAWER] },
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
    { tag: [...MOBILE_LANGUAGE_TOGGLE] },
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
    { tag: [...HEADER_SERVICES_DROPDOWN] },
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
    { tag: [...FAB_CONTACT_BUTTON] },
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('link', { name: /let.s talk/i }).click()

      await expect(page).toHaveURL(/\/contact/)
    }
  )

  test(
    'clicking the ES language toggle stores the preference in localStorage',
    { tag: [...LANGUAGE_TOGGLE_PREFERENCE] },
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'ES' }).click()

      const stored = await page.evaluate(() => localStorage.getItem('xpandia-lang'))
      expect(stored).toBe('es')
    }
  )

  test(
    'clicking the About link in the footer navigates to /about',
    { tag: [...FOOTER_LINKS_NAVIGATION] },
    async ({ page }) => {
      await page.goto('/')
      await waitForPageLoad(page)

      await page.locator('footer').getByRole('link', { name: 'About' }).click()

      await expect(page).toHaveURL(/\/about/)
    }
  )
})
