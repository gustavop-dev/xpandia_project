import { test, expect } from '@playwright/test'
import { waitForPageLoad } from '../fixtures'

test.describe('Static pages', () => {
  test('about page loads with content', async ({ page }) => {
    await page.goto('/about')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Spanish and English expertise/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Talk to an Expert/i }).first()).toBeVisible()
  })

  test('contact page loads with contact section', async ({ page }) => {
    await page.goto('/contact')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Tell us what your team is building/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /Send request/i })).toBeVisible()
    await expect(page.getByText('hello@xpandia.global').first()).toBeVisible()
  })
})
