import { test, expect } from '@playwright/test'
import { waitForPageLoad } from '../fixtures'

test.describe('Blog', () => {
  test('blog list shows seeded posts in English', async ({ page }) => {
    await page.goto('/blog')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Spanish quality/i })).toBeVisible()
    // Posts ordered by -published_at, -created_at → newest seeded post (12) appears on page 1
    await expect(page.getByRole('heading', { level: 3, name: /E2E Post 12/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /E2E Draft/i })).toBeHidden()
  })

  test('blog detail renders title and back link', async ({ page }) => {
    await page.goto('/blog/e2e-post-01')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /E2E Post 01/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /BACK TO BLOG/i })).toHaveAttribute('href', '/blog')
  })

  test('blog pagination navigates to page 2', async ({ page }) => {
    await page.goto('/blog')
    await waitForPageLoad(page)

    const nextLink = page.getByRole('link', { name: 'NEXT →' })
    await Promise.all([
      page.waitForURL(/[?&]page=2/),
      nextLink.click(),
    ])
    // Page 2 holds the oldest 3 seeded posts (03, 02, 01) under the same ordering rule.
    await expect(page.getByRole('heading', { level: 3, name: /E2E Post 01/i })).toBeVisible()
  })

  test('blog list renders Spanish content at /es/blog', async ({ page }) => {
    await page.goto('/es/blog')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /calidad en español/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /Post E2E 12/i })).toBeVisible()
  })

  test('unknown slug returns 404', async ({ page }) => {
    const response = await page.goto('/blog/this-slug-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('clicking a blog card navigates to the detail under the same locale', async ({ page }) => {
    await page.goto('/es/blog')
    await waitForPageLoad(page)

    // First card on page 1 (newest) is e2e-post-12.
    const firstCard = page.getByRole('link', { name: /Post E2E 12/i })
    await Promise.all([
      page.waitForURL(/\/es\/blog\/e2e-post-12$/),
      firstCard.click(),
    ])
    await expect(page.getByRole('heading', { level: 1, name: /Post E2E 12/i })).toBeVisible()
  })

  test('back link from blog detail returns to the localized list', async ({ page }) => {
    await page.goto('/es/blog/e2e-post-12')
    await waitForPageLoad(page)

    const backLink = page.getByRole('link', { name: /VOLVER AL BLOG/i })
    await expect(backLink).toHaveAttribute('href', '/es/blog')
    await Promise.all([
      page.waitForURL(/\/es\/blog$/, { waitUntil: 'commit' }),
      backLink.click(),
    ])
    // Spanish list hero confirms the back link landed on /es/blog.
    await expect(page.getByRole('heading', { level: 1, name: /calidad en español/i })).toBeVisible()
  })

  test('a post without a Spanish body is listed in English', async ({ page }) => {
    // The English-only post is seeded oldest, so it sits on the last page.
    await page.goto('/blog')
    await waitForPageLoad(page)

    const nextLink = page.getByRole('link', { name: 'NEXT →' })
    await Promise.all([
      page.waitForURL(/[?&]page=2/),
      nextLink.click(),
    ])
    await expect(page.getByRole('heading', { level: 3, name: /E2E English Only/i })).toBeVisible()
  })

  test('a post without a Spanish body is absent from the Spanish list', async ({ page }) => {
    // Reach the Spanish list the way a reader does: from /blog via the language toggle.
    await page.goto('/blog')
    await waitForPageLoad(page)

    await Promise.all([
      page.waitForURL(/\/es\/blog$/),
      page.getByRole('group', { name: /language|idioma/i }).getByRole('button', { name: 'ES' }).click(),
    ])
    await waitForPageLoad(page)

    await Promise.all([
      page.waitForURL(/[?&]page=2/),
      page.getByRole('link', { name: 'SIGUIENTE →' }).click(),
    ])
    await expect(page.getByRole('heading', { level: 3, name: /E2E Solo Ingles/i })).toBeHidden()
  })

  test('a post without a Spanish body returns 404 under the Spanish locale', async ({ page }) => {
    const response = await page.goto('/es/blog/e2e-english-only')
    expect(response?.status()).toBe(404)
  })

  test('the blog card category label is translated on the Spanish list', async ({ page }) => {
    await page.goto('/blog')
    await waitForPageLoad(page)

    // e2e-post-12 carries category "localization"; switching locale must swap its label.
    // The label is uppercased by CSS only, so the DOM text keeps its original casing.
    const englishCard = page.getByRole('link', { name: /E2E Post 12/i })
    await expect(englishCard).toContainText('Localization')

    await Promise.all([
      page.waitForURL(/\/es\/blog$/),
      page.getByRole('button', { name: 'ES', exact: true }).click(),
    ])
    await waitForPageLoad(page)

    await expect(page.getByRole('link', { name: /Post E2E 12/i })).toContainText('Localización')
  })
})
