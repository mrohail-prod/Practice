/**
 * Playwright.dev Home Page Object
 */
import { BasePage } from './BasePage.js';

export class PlaywrightPage extends BasePage {
  // Locators
  get getStartedLink() {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  get installationHeading() {
    return this.page.getByRole('heading', { name: 'Installation' });
  }

  /**
   * Navigate to Playwright.dev
   */
  async navigateToPlaywright() {
    await this.goto('https://playwright.dev/');
  }

  /**
   * Click on "Get Started" link
   */
  async clickGetStartedLink() {
    await this.getStartedLink.click();
  }

  /**
   * Check if Installation heading is visible
   */
  async isInstallationHeadingVisible() {
    return this.installationHeading.isVisible();
  }

  /**
   * Verify page title contains "Playwright"
   */
  async hasPlaywrightInTitle() {
    const title = await this.getPageTitle();
    return title.includes('Playwright');
  }
}
