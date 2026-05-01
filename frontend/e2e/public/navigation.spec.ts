import { test, expect } from '../test-with-coverage';
import { waitForPageLoad } from '../fixtures';
import { HOME_LOADS, NAVIGATION_BETWEEN_PAGES, NAVIGATION_HEADER, NAVIGATION_FOOTER } from '../helpers/flow-tags';

test.describe('Navigation', () => {
  test('should navigate to home page', { tag: [...HOME_LOADS] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('should navigate to about page', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.goto('/about', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/.*about/);
    await expect(page.getByRole('heading', { level: 1, name: /Built by a senior operator/i })).toBeVisible();
  });

  test('should have working header navigation', { tag: [...NAVIGATION_HEADER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const header = page.getByRole('banner');
    await expect(header).toBeVisible();
    // Logo links to home
    await expect(header.getByRole('link', { name: 'Xpandia' })).toHaveAttribute('href', '/');
    // Header CTA
    await expect(header.getByRole('link', { name: /Book a diagnostic call/i })).toBeVisible();
  });

  test('should have working footer', { tag: [...NAVIGATION_FOOTER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(footer.getByText('hello@xpandia.co')).toBeVisible();
  });

  test('should maintain navigation across pages', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');

    await page.goto('/services', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/.*services/);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForURL('/');
    await expect(page).toHaveURL('/');
  });
});
