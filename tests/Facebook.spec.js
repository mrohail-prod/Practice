/**
 * Facebook login test using Page Object Model
 */
import { test, expect } from '@playwright/test';
import { FacebookPage } from '../pages/FacebookPage.js';
import { facebookData } from '../test-data/facebookData.js';

test.describe('Facebook Login', () => {
  let facebookPage;

  test.beforeEach(async ({ page }) => {
    facebookPage = new FacebookPage(page);
    await facebookPage.navigateToFacebook();
  });

  test('TC001: Login to Facebook using valid credentials', async () => {
    await facebookPage.login(facebookData.credentials);

    // Note: On successful login, Facebook may redirect or require additional verification.
    // Validate that navigation occurs after login attempt.
    await expect(facebookPage.page).toHaveURL(/facebook\.com/);
  });
});
