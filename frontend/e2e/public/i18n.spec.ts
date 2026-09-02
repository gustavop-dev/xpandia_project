import { test, expect } from '@playwright/test'
import { waitForPageLoad } from '../fixtures'

test.describe('i18n locale switch', () => {
  test('switching EN→ES adds the /es prefix, swaps content, and sets html lang', async ({ page }) => {
    await page.goto('/')
    await waitForPageLoad(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works for real users/i })).toBeVisible()

    await page.getByRole('group', { name: /language|idioma/i }).getByRole('button', { name: 'ES' }).click()

    await expect(page).toHaveURL(/\/es\/?$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByRole('heading', { level: 1, name: /Traducciones que funcionan para usuarios reales/i })).toBeVisible()
  })

  test('switching ES→EN removes the /es prefix and restores English', async ({ page }) => {
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
  test('navigating via a header nav link keeps the /es prefix', async ({ page }) => {
    await page.goto('/es')
    await waitForPageLoad(page)

    await page.getByRole('banner').getByRole('link', { name: 'Nosotros' }).click()

    await expect(page).toHaveURL(/\/es\/about$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  })

  test('navigating via a footer link keeps the /es prefix', async ({ page }) => {
    await page.goto('/es')
    await waitForPageLoad(page)

    await page.locator('footer').getByRole('link', { name: 'Nosotros' }).click()

    await expect(page).toHaveURL(/\/es\/about$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  })
})

test.describe('localized 404', () => {
  test('an unmatched Spanish URL renders the 404 copy in Spanish', async ({ page }) => {
    const response = await page.goto('/es/pagina-que-no-existe')
    await waitForPageLoad(page)

    expect(response?.status()).toBe(404)
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await expect(page.getByRole('heading', { level: 1, name: /Página no encontrada/i })).toBeVisible()
  })

  test('the 404 CTA returns to the homepage of the active locale', async ({ page }) => {
    await page.goto('/es/pagina-que-no-existe')
    await waitForPageLoad(page)

    await page.locator('main').getByRole('link', { name: /Volver al inicio/i }).click()

    await expect(page).toHaveURL(/\/es\/?$/)
    await expect(page.getByRole('heading', { level: 1, name: /Traducciones que funcionan para usuarios reales/i })).toBeVisible()
  })

  test('an unmatched English URL renders the 404 copy in English', async ({ page }) => {
    const response = await page.goto('/page-that-does-not-exist')
    await waitForPageLoad(page)

    expect(response?.status()).toBe(404)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('heading', { level: 1, name: /Page not found/i })).toBeVisible()
  })
})
