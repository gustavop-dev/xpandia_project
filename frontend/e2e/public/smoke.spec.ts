import { expect, test } from '../test-with-coverage';
import { HOME_LOADS } from '../helpers/flow-tags';

test('home page loads', { tag: [...HOME_LOADS] }, async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: /Spanish that works/i })).toBeVisible();
  await expect(page.locator('#site-nav')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
  await expect(page.getByRole('link', { name: /Book a diagnostic call/i }).first()).toBeVisible();
});
