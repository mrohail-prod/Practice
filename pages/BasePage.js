/**
 * Base Page Class - Common functionality for all page objects
 * Provides reusable methods like goto, click, fill, waitFor, etc.
 */
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL with timeout and wait condition
   * @param {string} url - URL to navigate to
   * @param {string} waitUntil - Wait condition: 'load', 'domcontentloaded', 'networkidle'
   * @param {number} timeout - Timeout in milliseconds
   */
  async goto(url, waitUntil = 'load', timeout = 60000) {
    await this.page.goto(url, { waitUntil, timeout });
  }

  /**
   * Fill input field using locator
   * @param {string} selector - CSS selector
   * @param {string} value - Value to fill
   */
  async fillInput(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  /**
   * Click an element using locator
   * @param {string} selector - CSS selector
   */
  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  /**
   * Click element by role and name
   * @param {string} role - Role type (link, button, heading, etc.)
   * @param {string} name - Name/text of element
   */
  async clickByRole(role, name) {
    await this.page.getByRole(role, { name }).click();
  }

  /**
   * Get page title
   * @returns {Promise<string>} Page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>} True if visible
   */
  async isElementVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  /**
   * Get element text content
   * @param {string} selector - CSS selector
   * @returns {Promise<string>} Element text
   */
  async getElementText(selector) {
    return this.page.locator(selector).textContent();
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElementVisible(selector, timeout = 30000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Take screenshot
   * @param {string} fileName - Screenshot file name
   */
  async takeScreenshot(fileName) {
    await this.page.screenshot({ path: `./screenshots/${fileName}.png`, fullPage: true });
  }
}
