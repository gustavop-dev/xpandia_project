import { test, expect } from '../test-with-coverage';
import { waitForPageLoad } from '../fixtures';
import { HOME_LOADS, NAVIGATION_BETWEEN_PAGES, NAVIGATION_HEADER, NAVIGATION_FOOTER, HEADER_BLOG_LINK, HEADER_CONTACT_LINK } from '../helpers/flow-tags';

test.describe('Navigation', () => {
  test('should navigate to home page', { tag: [...HOME_LOADS] }, async ({ page }) => {
    // quality: allow-no-interaction (home is the app entry point; the hero heading assertion is a real content check)
    await page.goto('/');
    await waitForPageLoad(page);

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('the header logo returns to the home page', { tag: [...NAVIGATION_HEADER] }, async ({ page }) => {
    await page.goto('/blog');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Xpandia' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  });

  test('the footer About link navigates to /about', { tag: [...NAVIGATION_FOOTER] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.locator('footer').getByRole('link', { name: 'About' }).click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole('heading', { level: 1, name: /Spanish and English expertise/i })).toBeVisible();
  });

  test('clicking Blog in the header navigates to /blog', { tag: [...HEADER_BLOG_LINK] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('clicking Contact in the header navigates to /contact', { tag: [...HEADER_CONTACT_LINK] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('navigates between pages via the header nav', { tag: [...NAVIGATION_BETWEEN_PAGES] }, async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.getByRole('banner').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog$/);

    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
