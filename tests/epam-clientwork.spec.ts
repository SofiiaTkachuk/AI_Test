import { test, expect } from '@playwright/test';

test.describe('EPAM client work navigation', () => {
  test('EPAM: Services -> Explore Our Client Work shows Client Work', async ({ page }) => {
    test.setTimeout(60_000);

    await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

    // Find clickable Services candidate
    const servicesCandidates = page.locator('a', { hasText: 'Services' });
    const servicesCount = await servicesCandidates.count();
    let clickedServices = false;

    for (let i = 0; i < servicesCount; i++) {
      const cand = servicesCandidates.nth(i);
      const visible = await cand.isVisible();
      const box = await cand.boundingBox();
      if (!visible || !box) continue;
      await cand.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      try {
        await cand.click({ timeout: 5000 });
        clickedServices = true;
        break;
      } catch {
        const h = await cand.elementHandle();
        if (h) {
          await page.evaluate((el: HTMLElement) => el.click(), h);
          clickedServices = true;
          break;
        }
      }
    }

    expect(clickedServices, 'clickable Services link not found').toBeTruthy();

    // Find clickable Explore Our Client Work candidate
    const exploreCandidates = page.locator('a', { hasText: 'Explore Our Client Work' });
    const exploreCount = await exploreCandidates.count();
    let clickedExplore = false;

    for (let i = 0; i < exploreCount; i++) {
      const cand = exploreCandidates.nth(i);
      const visible = await cand.isVisible();
      const box = await cand.boundingBox();
      if (!visible || !box) continue;
      await cand.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      try {
        await cand.click({ timeout: 5000 });
        clickedExplore = true;
        break;
      } catch {
        const h = await cand.elementHandle();
        if (h) {
          await page.evaluate((el: HTMLElement) => el.click(), h);
          clickedExplore = true;
          break;
        }
      }
    }

    expect(clickedExplore, 'clickable Explore Our Client Work link not found').toBeTruthy();

    await page.waitForLoadState('networkidle');

    // Verify Client Work text visible
    const clientWork = page.locator('text=Client Work');
    await expect(clientWork).toBeVisible({ timeout: 15_000 });
  });
});
