import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import { I18N_LOCALE_SWITCH, I18N_LOCALE_PERSISTENCE_NAV } from '../helpers/flow-tags'

test.describe('i18n locale switch', () => {
  test('switching EN→ES adds the /es prefix, swaps content, and sets html lang', { tag: [...I18N_LOCALE_SWITCH] }, async ({ page }) => {
    await page.goto('/')
    await waitForPageLoad(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works for real users/i })).toBeVisible()

    await page.getByRole('group', { name: /language|idioma/i }).getByRole('button', { name: 'ES' }).click()

    await expect(page).toHaveURL(/\/es\/?$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByRole('heading', { level: 1, name: /Traducciones que funcionan para usuarios reales/i })).toBeVisible()
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
})

test.describe('i18n locale persistence across navigation', () => {
  test('navigating via a header nav link keeps the /es prefix', { tag: [...I18N_LOCALE_PERSISTENCE_NAV] }, async ({ page }) => {
    await page.goto('/es')
    await waitForPageLoad(page)

    await page.getByRole('banner').getByRole('link', { name: 'Nosotros' }).click()

    await expect(page).toHaveURL(/\/es\/about$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  })

  test('navigating via a footer link keeps the /es prefix', { tag: [...I18N_LOCALE_PERSISTENCE_NAV] }, async ({ page }) => {
    await page.goto('/es')
    await waitForPageLoad(page)

    await page.locator('footer').getByRole('link', { name: 'Nosotros' }).click()

    await expect(page).toHaveURL(/\/es\/about$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  })
})
