# Quick Reference Guide

## 🚀 Most Common Commands

```bash
# Run all tests
npm test

# Run tests with browser visible
npm test --headed

# Run interactive UI mode
npm test --ui

# Run specific test file
npm test tests/epazz.spec.js

# Run test by name pattern
npm test -g "TC001"

# View test report
npm run test:report

# Debug mode
npm test --debug
```

## 📖 Adding a New Test

### 1. Create Page Object (if needed)
```javascript
// pages/NewPage.js
import { BasePage } from './BasePage.js';

export class NewPage extends BasePage {
  get element() {
    return this.page.locator('#selector');
  }

  async performAction() {
    await this.element.click();
  }
}
```

### 2. Create Test Data
```javascript
// test-data/newData.js
export const newTestData = {
  url: 'https://example.com',
  testCase: { /* data */ }
};
```

### 3. Create Test File
```javascript
// tests/new.spec.js
import { test } from '@playwright/test';
import { NewPage } from '../pages/NewPage.js';
import { newTestData } from '../test-data/newData.js';

test('TC001: Test description', async ({ page }) => {
  const newPage = new NewPage(page);
  await newPage.goto(newTestData.url);
  await newPage.performAction();
});
```

## 🎯 Common Page Object Methods

```javascript
// Navigation
await page.goto(url);
await page.goto(url, 'domcontentloaded', 60000);

// Interactions
await page.fillInput('#selector', 'value');
await page.clickElement('#selector');
await page.clickByRole('button', 'Click Me');

// Verification
await page.isElementVisible('#selector');
await page.getElementText('#selector');
await page.getPageTitle();

// Waiting
await page.waitForElementVisible('#selector');
```

## 🔍 Common Locators

```javascript
// By accessibility role (PREFERRED)
this.page.getByRole('button', { name: 'Save' })

// By label
this.page.getByLabel('Email')

// By placeholder
this.page.getByPlaceholder('Search...')

// By text
this.page.getByText('Welcome')

// By CSS selector
this.page.locator('.class-name')

// By ID
this.page.locator('#id-name')
```

## ✅ Common Assertions

```javascript
// Using Playwright expect
import { expect } from '@playwright/test';

expect(await page.title()).toContain('Title');
expect(locator).toBeVisible();
expect(locator).toHaveText('text');
expect(locator).toHaveValue('value');

// Using custom assertions
import { assertElementVisible } from '../utils/assertionHelpers.js';
await assertElementVisible(locator, 'Element Name');
```

## 📝 Logging & Debugging

```javascript
// Import helpers
import { logStep, logTestStart, logTestEnd } from '../utils/testHelpers.js';

// Use in tests
logTestStart('Test Name');
logStep('Step 1', 'Do something');
logTestEnd('Test Name', 'PASSED');

// Console output
console.log('Debug message');
```

## 🏗️ Project Structure at a Glance

```
Playwright/
├── pages/              ← Page objects with locators
├── tests/              ← Test files with test cases
├── test-data/          ← Static test data
├── utils/              ← Helper functions
├── docs/               ← Documentation
├── README.md           ← Main guide
└── playwright.config.js ← Config
```

## 📂 File Location Guide

| What you need | Where to find | File |
|---------------|---------------|------|
| Run tests | Root | `npm test` |
| Configure tests | Root | `playwright.config.js` |
| Create test page | `pages/` | `*Page.js` |
| Write tests | `tests/` | `*.spec.js` |
| Add test data | `test-data/` | `*Data.js` |
| Common functions | `utils/` | `*Helpers.js` |
| Learn about POM | `docs/` | `POM-GUIDE.md` |

## 🔑 Key Principles

1. **Locators in Pages** - Never in tests
2. **Methods Reusable** - Use page objects from tests
3. **Data External** - All hardcoded values in test-data/
4. **One Concern** - Each method does one thing
5. **Descriptive Names** - Method names explain what they do
6. **Async/Await** - Always use proper async patterns
7. **No Hard Waits** - Use Playwright's auto-wait
8. **Tests Independent** - Each test stands alone

## 🎯 Test Naming Convention

```javascript
// TC### format (TC = Test Case)
test('TC001: Description of what is tested', async () => {
  // TC001, TC002, TC003, etc.
});
```

## 📊 Example Workflow

```javascript
import { test } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage.js';
import { exampleData } from '../test-data/exampleData.js';
import { logStep, logTestStart, logTestEnd } from '../utils/testHelpers.js';

test('TC001: Complete user workflow', async ({ page }) => {
  // Setup
  logTestStart('Complete user workflow');
  const example = new ExamplePage(page);

  // Navigate
  logStep('Step 1', 'Navigate to page');
  await example.goto(exampleData.url);

  // Interact
  logStep('Step 2', 'Perform action');
  await example.performAction();

  // Verify
  logStep('Step 3', 'Verify result');
  const result = await example.verifyResult();
  expect(result).toBeTruthy();

  // Finish
  logTestEnd('Complete user workflow', 'PASSED');
});
```

## 🐛 Debugging Tips

```bash
# Debug mode - opens inspector
npm test -- --debug

# Headed mode - see browser
npm test -- --headed

# Single test only
npm test -g "TC001"

# Generate code
npm run test:codegen

# Show trace from last run
npm run test:trace
```

## 📚 Documentation Quick Links

| Document | Purpose |
|----------|---------|
| README.md | Main framework documentation |
| FRAMEWORK-SUMMARY.md | What was created and why |
| POM-GUIDE.md | How to use Page Object Model |
| MIGRATION.md | What changed from original code |
| This file | Quick reference |

## ⚡ Pro Tips

1. **Use --ui mode for development**
   ```bash
   npm test -- --ui
   ```

2. **Run one test at a time**
   ```bash
   npm test -g "test name"
   ```

3. **Generate locators automatically**
   ```bash
   npm run test:codegen
   ```

4. **View HTML report after tests**
   ```bash
   npm run test:report
   ```

5. **Keep locators simple and stable**
   - Avoid deep CSS selectors
   - Use accessibility attributes when possible

6. **Group related locators and methods**
   ```javascript
   // All getters together
   get email() { return this.page.locator('#email'); }
   get password() { return this.page.locator('#password'); }
   
   // All methods together
   async login(credentials) { }
   async logout() { }
   ```

## 🚨 Common Mistakes to Avoid

```javascript
// ❌ DON'T - Locators in tests
test('Login', async ({ page }) => {
  await page.locator('#email').fill('user@example.com');
});

// ✅ DO - Locators in page objects
// In LoginPage.js
get emailInput() { return this.page.locator('#email'); }

// In test
await loginPage.fillEmail('user@example.com');

// ❌ DON'T - Hard waits
await page.waitForTimeout(5000);

// ✅ DO - Let Playwright wait
await element.click(); // Auto-waits
await element.waitFor({ state: 'visible' }); // Explicit wait when needed

// ❌ DON'T - Multiple assertions mixed with logic
await page.click('#btn');
expect(result).toBe(true);

// ✅ DO - Separate logic and verification
await page.performAction();
const result = await page.verifyAction();
expect(result).toBe(true);
```

## 📞 Need Help?

1. **Understand the pattern** → Read POM-GUIDE.md
2. **See examples** → Check existing tests and pages
3. **Learn commands** → See quick start above
4. **Debug tests** → Use `npm test -- --debug`
5. **Check reports** → Run `npm run test:report`

---

**Start Testing! 🚀**
