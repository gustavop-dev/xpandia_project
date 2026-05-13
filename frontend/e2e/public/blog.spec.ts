import { test, expect } from '../test-with-coverage'
import { waitForPageLoad } from '../fixtures'
import {
  BLOG_LIST,
  BLOG_DETAIL,
  BLOG_PAGINATION,
  BLOG_LANGUAGE_SWITCH,
  BLOG_NOT_FOUND,
  BLOG_CARD_TO_DETAIL,
  BLOG_BACK_FROM_DETAIL_TO_LIST,
} from '../helpers/flow-tags'

test.describe('Blog', () => {
  test('blog list shows seeded posts in English', { tag: [...BLOG_LIST] }, async ({ page }) => {
    await page.goto('/blog')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /Spanish quality/i })).toBeVisible()
    // Posts ordered by -published_at, -created_at → newest seeded post (12) appears on page 1
    await expect(page.getByRole('heading', { level: 3, name: /E2E Post 12/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /E2E Draft/i })).not.toBeVisible()
  })

  test('blog detail renders title and back link', { tag: [...BLOG_DETAIL] }, async ({ page }) => {
    await page.goto('/blog/e2e-post-01')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /E2E Post 01/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /BACK TO BLOG/i })).toHaveAttribute('href', '/blog')
  })

  test('blog pagination navigates to page 2', { tag: [...BLOG_PAGINATION] }, async ({ page }) => {
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

  test('blog list renders Spanish content at /es/blog', { tag: [...BLOG_LANGUAGE_SWITCH] }, async ({ page }) => {
    await page.goto('/es/blog')
    await waitForPageLoad(page)

    await expect(page.getByRole('heading', { level: 1, name: /calidad en español/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: /Post E2E 12/i })).toBeVisible()
  })

  test('unknown slug returns 404', { tag: [...BLOG_NOT_FOUND] }, async ({ page }) => {
    const response = await page.goto('/blog/this-slug-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('clicking a blog card navigates to the detail under the same locale', { tag: [...BLOG_CARD_TO_DETAIL] }, async ({ page }) => {
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

  test('back link from blog detail returns to the localized list', { tag: [...BLOG_BACK_FROM_DETAIL_TO_LIST] }, async ({ page }) => {
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
})
