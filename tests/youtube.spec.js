/**
 * YouTube Search Tests
 * Tests YouTube search functionality
 */
import { test, expect } from '@playwright/test';
import { YoutubePage } from '../pages/YoutubePage.js';
import { youtubeTestData } from '../test-data/youtubeData.js';
import { logTestStart, logTestEnd, logStep } from '../utils/testHelpers.js';
import { assertPageUrlContains } from '../utils/assertionHelpers.js';

test.describe('YouTube Search Tests', () => {
  let youtubePage;

  test.beforeEach(async ({ page }) => {
    youtubePage = new YoutubePage(page);
    await youtubePage.navigateToYoutube();
  });

  test('TC001: Search for "Atif Aslam songs" and click first result', async () => {
    logTestStart('YouTube video search');
    
    const testData = youtubeTestData.searchQueries[0];
    
    logStep('Step 1', `Search for "${testData.query}"`);
    await youtubePage.searchVideo(testData.query);
    
    logStep('Step 2', 'Wait for search results to load');
    // Playwright auto-waits for elements, no explicit wait needed
    
    logStep('Step 3', 'Click first video result');
    await youtubePage.clickFirstVideoResult();
    
    logStep('Step 4', 'Verify we are on video page');
    await assertPageUrlContains(youtubePage.page, 'youtube.com/watch');
    
    logTestEnd('YouTube video search', 'PASSED');
  });

  test('TC002: Verify YouTube search input accepts text', async () => {
    logTestStart('YouTube search input');
    
    const searchQuery = youtubeTestData.searchQueries[1].query;
    
    logStep('Step 1', `Fill search input with "${searchQuery}"`);
    await youtubePage.searchInput.fill(searchQuery);
    
    logStep('Step 2', 'Verify search input has the text');
    const inputValue = await youtubePage.searchInput.inputValue();
    expect(inputValue).toBe(searchQuery);
    
    logTestEnd('YouTube search input', 'PASSED');
  });
});
