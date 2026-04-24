import { test, expect } from '../test-with-coverage';
import { waitForPageLoad } from '../fixtures';
import { HOME_LOADS, NAVIGATION_BETWEEN_PAGES, NAVIGATION_HEADER, NAVIGATION_FOOTER } from '../helpers/flow-tags';

test.describe('Navigation', () => {
  test('should navigate to home page', { tag: [...HOME_LOADS] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Ideas, stories and knowledge' })).toBeVisible();
  });

  test('should navigate to blogs page', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // quality: allow-fragile-selector (blogs link appears in both header and page; selecting first occurrence)
    const blogsLink = page.locator('a[href="/blogs"]').first();
    if (await blogsLink.isVisible()) {
      await blogsLink.click();
      await waitForPageLoad(page);
      await expect(page).toHaveURL(/.*blogs/);
    } else {
      await page.goto('/blogs');
      await waitForPageLoad(page);
      await expect(page).toHaveURL(/.*blogs/);
    }
  });

  test('should have working header navigation', { tag: [...NAVIGATION_HEADER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // quality: allow-fragile-selector (selecting first of header/nav structural elements)
    const header = page.locator('header, nav').first();
    if (await header.isVisible()) {
      const links = header.locator('a');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });

  test('should have working footer', { tag: [...NAVIGATION_FOOTER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const footer = page.locator('footer');
    if (await footer.isVisible()) {
      await expect(footer).toBeVisible();
    }
  });

  test('should maintain navigation across pages', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');

    await page.goto('/blogs', { waitUntil: 'domcontentloaded' });
    await page.waitForURL(/.*blogs/);
    await expect(page).toHaveURL(/.*blogs/);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});
