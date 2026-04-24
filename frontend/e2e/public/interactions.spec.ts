import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import {
  CONTACT_FORM_SUBMIT,
  CTA_HOME_TO_CONTACT,
  CTA_SERVICE_DETAIL_TO_CONTACT,
  SERVICES_CARD_TO_DETAIL,
  BREADCRUMB_BACK_TO_SERVICES,
  MOBILE_NAVIGATION_DRAWER,
  HEADER_SERVICES_DROPDOWN,
  FAB_CONTACT_BUTTON,
  LANGUAGE_TOGGLE_PREFERENCE,
  FOOTER_LINKS_NAVIGATION,
} from '../helpers/flow-tags'

test.describe('Contact form', () => {
  test(
    'submitting the contact form shows the success banner',
    { tag: [...CONTACT_FORM_SUBMIT] },
    async ({ page }) => {
      await page.goto('/contact')
      await waitForPageLoad(page)

      // Radio tiles use role="button" (no native <input type="radio">)
      await page.getByRole('button', { name: 'AI Spanish QA Sprint' }).click()
      await page.getByRole('button', { name: '50–150' }).click()

      // Labels are not linked to inputs via for/id — use placeholder instead
      await page.getByPlaceholder('Jane Doe').fill('Jane Doe')
      await page.getByPlaceholder('VP Product').fill('VP Product')
      await page.getByPlaceholder('jane@company.com').fill('jane@company.com')
      await page.getByPlaceholder('Company Inc.').fill('Acme Inc.')
      await page.getByPlaceholder(/e\.g\., We launched/).fill('We need a quality review of our Spanish AI outputs.')

      await page.getByRole('button', { name: /Request diagnostic call/i }).click()

      await expect(page.getByText(/Request received/i)).toBeVisible()
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

      await page.getByRole('link', { name: /Book a diagnostic call/i }).first().click()

      await expect(page).toHaveURL(/\/contact/)
      await expect(page.getByRole('heading', { level: 1, name: /Tell us where your Spanish/i })).toBeVisible()
    }
  )

  test(
    'clicking the service detail CTA navigates to /contact',
    { tag: [...CTA_SERVICE_DETAIL_TO_CONTACT] },
    async ({ page }) => {
      await page.goto('/services/qa')
      await waitForPageLoad(page)

      // Scope to .hero-ctas to avoid matching header dropdown or second CTA on page
      const cta = page.locator('.hero-ctas').getByRole('link').first()
      await cta.waitFor({ state: 'visible' })

      await Promise.all([
        page.waitForURL(/\/contact/),
        cta.click(),
      ])
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

      await page.getByRole('link', { name: /AI Spanish QA Sprint/i }).first().click()

      await expect(page).toHaveURL(/\/services\/qa/)
      await expect(page.getByRole('heading', { level: 1, name: /Validate your AI in Spanish/i })).toBeVisible()
    }
  )

  test(
    'clicking the breadcrumb on a service detail page returns to /services',
    { tag: [...BREADCRUMB_BACK_TO_SERVICES] },
    async ({ page }) => {
      await page.goto('/services/qa')
      await waitForPageLoad(page)

      // Use exact text with ← char to avoid matching "All services" in the hidden header dropdown
      const breadcrumb = page.getByRole('link', { name: '← ALL SERVICES' })
      await breadcrumb.waitFor({ state: 'visible' })

      await Promise.all([
        page.waitForURL(/\/services$/),
        breadcrumb.click(),
      ])

      await expect(page.getByRole('heading', { level: 1, name: /Three engagements/i })).toBeVisible()
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

      await page.getByRole('link', { name: 'Book a diagnostic call' }).filter({ hasText: 'Book a diagnostic call' }).last().click()

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
