// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('Youtube search video ', async ({ page }) => {
   await page.goto('https://www.youtube.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  //expect(await page.title()).toBe('YouTube');
  await page.locator('input[placeholder="Search"]').fill('atif aslam songs');
  await page.click('button[title="Search"]');
  await page.click('a#video-title')

  // await page.waitForSelector('#search', { state: 'attached' });
  // await page.waitForLoadState("networkidle")
});

test('Epazz', async ({ page }) => { 
  await page.goto('https://www.epazz.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.fill('#fullname', 'Epazz tester');
  await page.fill('#email', 'testeR@epazz.com');
  await page.fill('#phone','0992355051');
  await page.fill('#message', 'This is a test message from TesteR');
  await page.click('#submit');
  console.log('Form submitted, waiting for response...');
  // await page.waitForTimeout(5000); // Wait for 5 seconds to allow the response to be processed

  console.log('Form submitted successfully');
   await page.fill('#fullname', 'Epazz tester2');
   await page.waitForTimeout(5000);
});
  test.only('Facebook', async ({ page }) => {
  await page.goto('https://www.facebook.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.fill('#_R_64mkqsr9pb6amH1_', 'm.rohail@epazz.com');
  await page.fill('#_R_66mkqsr9pb6amH1_', 'password123');
  page.getByRole('button', { name: 'Log in' })
  console.log('Login attempted, waiting for response...');    

});