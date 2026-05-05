# Playwright Test Automation Framework - Page Object Model

This is a scalable, maintainable Playwright test automation framework following the **Page Object Model (POM)** design pattern and industry best practices.

## Project Structure

```
Playwright/
├── pages/                    # Page Object classes
│   ├── BasePage.js          # Base class with common methods
│   ├── PlaywrightPage.js    # Playwright.dev page object
│   ├── YoutubePage.js       # YouTube page object
│   └── EpazzPage.js         # Epazz contact form page object
│
├── tests/                    # Test specifications
│   ├── playwright.spec.js   # Tests for Playwright.dev
│   ├── youtube.spec.js      # Tests for YouTube
│   └── epazz.spec.js        # Tests for Epazz
│
├── test-data/               # Static test data
│   ├── playwrightData.js    # Playwright test data
│   ├── youtubeData.js       # YouTube test data
│   └── epazzData.js         # Epazz test data
│
├── utils/                    # Utility and helper functions
│   ├── testHelpers.js       # Common test utilities
│   └── assertionHelpers.js  # Custom assertion helpers
│
├── playwright.config.js     # Playwright configuration
├── package.json             # Project dependencies
└── README.md                # This file
```

## Key Features

✅ **Page Object Model (POM)** - Separates UI locators from test logic
✅ **Reusable Methods** - Common functionality in BasePage class
✅ **Test Data Separation** - All hardcoded values in dedicated test-data files
✅ **Helper Utilities** - Common functions and custom assertions
✅ **Async/Await** - Proper asynchronous handling throughout
✅ **Playwright Best Practices** - Using recommended waits and locators
✅ **Enhanced Logging** - Structured test logging with timestamps
✅ **Scalable Structure** - Easy to add new pages, tests, and test data

## Page Objects

### BasePage (pages/BasePage.js)
Base class providing reusable methods for all page objects:
- `goto()` - Navigate to URL with custom wait conditions
- `fillInput()` - Fill form fields
- `clickElement()` - Click elements
- `clickByRole()` - Click by accessibility role and name
- `getPageTitle()` - Get page title
- `isElementVisible()` - Check element visibility
- `getElementText()` - Get element text content
- `waitForElementVisible()` - Wait for element to appear
- `takeScreenshot()` - Capture screenshots

### PlaywrightPage (pages/PlaywrightPage.js)
Tests for Playwright.dev documentation site:
- Page-specific locators
- Navigation methods
- Element state checks

### YoutubePage (pages/YoutubePage.js)
Tests for YouTube search functionality:
- Search input and button locators
- Video result locators
- Search and click workflow

### EpazzPage (pages/EpazzPage.js)
Tests for Epazz contact form:
- Form field locators
- Individual field fill methods
- Complete form submission workflow

## Test Data Files

### playwrightData.js
- Base URL and expected values
- Element names and text patterns

### youtubeData.js
- Base URL
- Multiple search query test cases
- Search descriptions

### epazzData.js
- Base URL
- Form submission test cases
- Form field validation rules

## Utility Functions

### testHelpers.js
Common helper functions:
- `sleep()` - Wait for specified milliseconds
- `generateTestId()` - Generate unique test identifiers
- `logMessage()` - Format log messages with timestamps
- `logStep()` - Log test steps
- `logTestStart()` / `logTestEnd()` - Log test lifecycle
- `extractDomain()` - Extract domain from URL
- `isValidEmail()` - Validate email format
- `isValidPhone()` - Validate phone number format

### assertionHelpers.js
Custom assertion helpers with enhanced reporting:
- `assertElementVisible()` - Assert element is visible
- `assertElementContainsText()` - Assert text content
- `assertPageTitleContains()` - Assert page title
- `assertPageUrlContains()` - Assert URL content
- `assertElementCount()` - Assert element count

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/playwright.spec.js
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests with UI Mode
```bash
npx playwright test --ui
```

### Run Tests Headed (Show Browser)
```bash
npx playwright test --headed
```

### Run Single Test
```bash
npx playwright test -g "TC001"
```

### Generate HTML Report
```bash
npx playwright test
npx playwright show-report
```

## Test Files Overview

### playwright.spec.js
- **TC001**: Verify page title contains "Playwright"
- **TC002**: Navigate to Installation page via Get Started link
- **TC003**: Verify Playwright.dev loads successfully

### youtube.spec.js
- **TC001**: Search for "Atif Aslam songs" and click first result
- **TC002**: Verify YouTube search input accepts text

### epazz.spec.js
- **TC001**: Submit contact form with valid data
- **TC002**: Verify form field inputs
- **TC003**: Update form data after initial entry
- **TC004**: Verify all form fields are accessible

## Best Practices Implemented

### 1. **Page Object Model**
- All locators kept inside page classes
- Test logic separated from UI interactions
- Easy to maintain and update

### 2. **Test Data Separation**
- Removed hardcoded values from tests
- Centralized test data in dedicated files
- Easy to add new test cases

### 3. **Reusable Methods**
- Common functionality in BasePage
- Page-specific methods in individual page classes
- DRY (Don't Repeat Yourself) principle

### 4. **Proper Waits**
- Removed `waitForTimeout()` (deprecated)
- Using Playwright's auto-waiting mechanism
- Explicit waits only when necessary

### 5. **Enhanced Logging**
- Structured logging with timestamps
- Step-by-step test progression
- Better test report readability

### 6. **Scalability**
- Easy to add new pages
- Simple to extend page classes
- Modular test data organization

## Adding New Tests

### Step 1: Create a Page Object
```javascript
// pages/NewPage.js
import { BasePage } from './BasePage.js';

export class NewPage extends BasePage {
  get element() {
    return this.page.locator('#element-id');
  }

  async performAction() {
    await this.element.click();
  }
}
```

### Step 2: Create Test Data
```javascript
// test-data/newData.js
export const newTestData = {
  url: 'https://example.com',
  testCases: [ /* ... */ ]
};
```

### Step 3: Create Test File
```javascript
// tests/new.spec.js
import { test } from '@playwright/test';
import { NewPage } from '../pages/NewPage.js';
import { newTestData } from '../test-data/newData.js';

test.describe('New Tests', () => {
  let newPage;
  
  test.beforeEach(async ({ page }) => {
    newPage = new NewPage(page);
    await newPage.goto(newTestData.url);
  });

  test('TC001: Test description', async () => {
    await newPage.performAction();
  });
});
```

## Configuration

### playwright.config.js
- Test directory: `./tests`
- Reporter: HTML report
- Parallel execution enabled
- Retry logic for CI environment
- Trace collection on first retry

## Dependencies

- `@playwright/test@^1.59.1` - Playwright testing framework
- `@types/node@^25.6.0` - TypeScript node type definitions

## Troubleshooting

### Tests Not Running
- Ensure all imports use `.js` extension
- Check that test files match `*.spec.js` pattern
- Verify package.json has "type": "commonjs"

### Locators Not Found
- Use Playwright Inspector: `npx playwright codegen`
- Check if element is within iframe
- Verify element is not hidden or disabled

### Timeouts
- Increase timeout in playwright.config.js
- Check network connectivity
- Use `waitForLoadState()` for dynamic content

## Contributing

1. Follow existing code structure
2. Keep locators in page classes
3. Add test data for new tests
4. Use helper utilities and assertions
5. Add JSDoc comments for clarity
6. Test locally before committing

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Locator Strategy](https://playwright.dev/docs/locators)

## License

ISC
