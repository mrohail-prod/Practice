/**
 * YouTube Search Page Object
 */
import { BasePage } from './BasePage.js';

export class YoutubePage extends BasePage {
  // Locators
  get searchInput() {
    return this.page.locator('input[placeholder="Search"]');
  }

  get searchButton() {
    return this.page.locator('button[title="Search"]');
  }

  get firstVideoResult() {
    return this.page.locator('a#video-title').first();
  }

  /**
   * Navigate to YouTube
   */
  async navigateToYoutube() {
    await this.goto('https://www.youtube.com/', 'domcontentloaded');
  }

  /**
   * Search for a video
   * @param {string} searchQuery - Video search query
   */
  async searchVideo(searchQuery) {
    await this.searchInput.fill(searchQuery);
    await this.searchButton.click();
  }

  /**
   * Click on first video result
   */
  async clickFirstVideoResult() {
    await this.firstVideoResult.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstVideoResult.click();
  }

  /**
   * Complete search flow
   * @param {string} searchQuery - Video search query
   */
  async searchAndClickFirstResult(searchQuery) {
    await this.searchVideo(searchQuery);
    await this.clickFirstVideoResult();
  }
}
