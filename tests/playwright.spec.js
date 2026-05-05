/**
 * Playwright.dev - Smoke Tests
 * Tests core functionality of the Playwright documentation site
 */
import { test, expect } from '@playwright/test';
import { PlaywrightPage } from '../pages/PlaywrightPage.js';
import { playwrightTestData } from '../test-data/playwrightData.js';
import { logTestStart, logTestEnd, logStep } from '../utils/testHelpers.js';
import { assertPageTitleContains, assertElementVisible } from '../utils/assertionHelpers.js';

test.describe('Playwright.dev Tests', () => {
  let playwrightPage;

  test.beforeEach(async ({ page }) => {
    playwrightPage = new PlaywrightPage(page);
    await playwrightPage.navigateToPlaywright();
  });

  test('TC001: Verify page title contains "Playwright"', async () => {
    logTestStart('Verify page title');
    
    logStep('Step 1', 'Verify page title');
    await assertPageTitleContains(playwrightPage.page, playwrightTestData.expectedTitleContains);
    
    logTestEnd('Verify page title', 'PASSED');
  });

  test('TC002: Navigate to Installation page via Get Started link', async ({ page }) => {
    logTestStart('Navigate to Installation');
    
    logStep('Step 1', 'Click on Get Started link');
    await playwrightPage.clickGetStartedLink();
    
    logStep('Step 2', 'Verify Installation heading is visible');
    await assertElementVisible(playwrightPage.installationHeading, 'Installation Heading');
    
    logTestEnd('Navigate to Installation', 'PASSED');
  });

  test('TC003: Verify Playwright.dev loads successfully', async () => {
    logTestStart('Verify page loads');
    
    logStep('Step 1', 'Verify page has Playwright in title');
    const hasPlaywright = await playwrightPage.hasPlaywrightInTitle();
    expect(hasPlaywright).toBeTruthy();
    
    logStep('Step 2', 'Verify Get Started link is visible');
    await assertElementVisible(playwrightPage.getStartedLink, 'Get Started Link');
    
    logTestEnd('Verify page loads', 'PASSED');
  });
});
