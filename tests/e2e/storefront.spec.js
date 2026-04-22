const { test, expect } = require('@playwright/test');

test.describe('Storefront Visual Journey', () => {
  test('Capture Homepage and Shop Navigation', async ({ page }) => {
    // 1. Visit Homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Luster Lane | Fine Jewelry/i);
    
    // Take a manual screenshot of the homepage
    await page.screenshot({ path: 'tests/e2e/screenshots/homepage.png', fullPage: true });
    
    // 2. Navigate to Shop
    const shopLink = page.getByRole('link', { name: /shop/i });
    await shopLink.click();
    
    // Wait for the shop page to load (hash routing)
    await expect(page).toHaveURL(/#!\/shop/);
    
    // Take a manual screenshot of the shop page
    await page.screenshot({ path: 'tests/e2e/screenshots/shop-page.png', fullPage: true });
    
    // 3. Verify a product is visible (if any)
    // We'll just wait for the view container to be visible
    await expect(page.locator('.main-view-container')).toBeVisible();
  });
});
