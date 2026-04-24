import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import { ABOUT_PAGE, CONTACT_PAGE } from '../helpers/flow-tags'

test.describe('Static pages', () => {
  test('about page loads with content', { tag: [...ABOUT_PAGE] }, async ({ page }) => {
    await page.goto('/about')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Built by a senior operator/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Book a diagnostic call/i }).first()).toBeVisible()
  })

  test('contact page loads with contact section', { tag: [...CONTACT_PAGE] }, async ({ page }) => {
    await page.goto('/contact')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Tell us where your Spanish/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Request diagnostic call/i })).toBeVisible()
    await expect(page.locator('aside').getByText('hello@xpandia.co')).toBeVisible()
  })
})
