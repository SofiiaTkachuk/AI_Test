import { test, expect } from '@playwright/test';

// Test: Navigate EPAM site -> Services -> Explore Our Client Work -> Verify "Client Work" text
test.describe('EPAM site - Client Work navigation', () => {
  test('should open Services and navigate to Client Work', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.epam.com/');

    // Open header Services menu - selector may need adjustment if site changes
    await page.click('header >> text=Services');

    // Click the "Explore Our Client Work" link
    await page.click('text=Explore Our Client Work');

    // Assert that "Client Work" text is visible on the page
    await expect(page.locator('text=Client Work')).toBeVisible();
  });
});
