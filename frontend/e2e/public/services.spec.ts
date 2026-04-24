import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import { SERVICES_OVERVIEW, SERVICES_QA, SERVICES_AUDIT, SERVICES_FRACTIONAL } from '../helpers/flow-tags'

test.describe('Services', () => {
  test('services overview page loads', { tag: [...SERVICES_OVERVIEW] }, async ({ page }) => {
    await page.goto('/services')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Three engagements/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /AI Spanish QA Sprint/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Book a diagnostic call/i }).first()).toBeVisible()
  })

  test('QA sprint service page loads', { tag: [...SERVICES_QA] }, async ({ page }) => {
    await page.goto('/services/qa')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Validate your AI in Spanish/i })).toBeVisible()
    await expect(page.getByRole('link', { name: '← ALL SERVICES' })).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })

  test('launch readiness audit page loads', { tag: [...SERVICES_AUDIT] }, async ({ page }) => {
    await page.goto('/services/audit')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Find what.s breaking trust/i })).toBeVisible()
    await expect(page.getByRole('link', { name: '← ALL SERVICES' })).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })

  test('fractional lead service page loads', { tag: [...SERVICES_FRACTIONAL] }, async ({ page }) => {
    await page.goto('/services/fractional')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Senior language quality leadership/i })).toBeVisible()
    await expect(page.getByRole('link', { name: '← ALL SERVICES' })).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })
})
