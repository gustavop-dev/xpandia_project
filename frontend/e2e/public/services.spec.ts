import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import {
  SERVICES_OVERVIEW,
  SERVICES_LANGUAGE_ASSURANCE,
  SERVICES_LOCALIZATION_ADAPTATION,
  SERVICES_APPLIED_CULTURAL_INTELLIGENCE,
} from '../helpers/flow-tags'

test.describe('Services', () => {
  test('services overview page loads', { tag: [...SERVICES_OVERVIEW] }, async ({ page }) => {
    await page.goto('/services')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /The Spanish expertise your product needs/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Book a diagnostic call/i }).first()).toBeVisible()
  })

  test('Language Assurance service page loads', { tag: [...SERVICES_LANGUAGE_ASSURANCE] }, async ({ page }) => {
    await page.goto('/services/language-assurance')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Validate Spanish before your users do/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /all services/i }).first()).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })

  test('Spanish Experience Repair & Adaptation service page loads', { tag: [...SERVICES_LOCALIZATION_ADAPTATION] }, async ({ page }) => {
    await page.goto('/services/localization-adaptation')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /More than translated/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /all services/i }).first()).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })

  test('Applied Cultural Intelligence service page loads', { tag: [...SERVICES_APPLIED_CULTURAL_INTELLIGENCE] }, async ({ page }) => {
    await page.goto('/services/applied-cultural-intelligence')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Make better decisions with cultural context/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /all services/i }).first()).toBeVisible()
    await expect(page.locator('.hero-ctas').getByRole('link').first()).toHaveAttribute('href', '/contact')
  })

  test('legacy /services/qa redirects to Language Assurance', { tag: [...SERVICES_LANGUAGE_ASSURANCE] }, async ({ page }) => {
    await page.goto('/services/qa')
    await waitForPageLoad(page)
    await expect(page).toHaveURL(/\/services\/language-assurance$/)
  })
})
