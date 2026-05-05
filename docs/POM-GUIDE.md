# Page Object Model Implementation Guide

## Overview

This guide explains how the Page Object Model (POM) is implemented in this Playwright framework and how to use it effectively.

## What is Page Object Model?

Page Object Model is a design pattern that creates an object-oriented interface for web pages or web applications. It abstracts page elements and interactions into reusable classes.

### Benefits
- **Maintainability**: Changes to UI only require updates in page classes
- **Reusability**: Methods can be used across multiple tests
- **Scalability**: Easy to add new pages and tests
- **Readability**: Tests read like business logic, not technical details
- **Reduced Duplication**: Common operations defined once

## Architecture

```
Test File (What to test)
    ↓
Page Object (How to interact)
    ↓
BasePage (Common operations)
    ↓
Playwright API
```

## Creating a New Page Object

### Example: Amazon Shopping Page

```javascript
// pages/AmazonPage.js
import { BasePage } from './BasePage.js';

export class AmazonPage extends BasePage {
  // ============ LOCATORS ============
  get searchInput() {
    return this.page.locator('input[placeholder="Search Amazon.com"]');
  }

  get searchButton() {
    return this.page.locator('input[value="Go"]');
  }

  get productTitle() {
    return this.page.locator('span.a-size-large');
  }

  get addToCartButton() {
    return this.page.locator('#add-to-cart-button');
  }

  get cartLink() {
    return this.page.locator('a[href="/cart"]');
  }

  // ============ METHODS ============
  
  /**
   * Navigate to Amazon
   */
  async navigateToAmazon() {
    await this.goto('https://www.amazon.com/', 'load');
  }

  /**
   * Search for a product
   * @param {string} productName - Product name to search
   */
  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Add first product to cart
   */
  async addFirstProductToCart() {
    await this.productTitle.first().click();
    await this.addToCartButton.waitFor({ state: 'visible' });
    await this.addToCartButton.click();
  }

  /**
   * Navigate to cart
   */
  async goToCart() {
    await this.cartLink.click();
  }

  /**
   * Complete shopping workflow
   * @param {string} productName - Product to search and buy
   */
  async searchAndAddToCart(productName) {
    await this.searchProduct(productName);
    await this.addFirstProductToCart();
  }
}
```

### Example: Test Using the Page Object

```javascript
// tests/amazon.spec.js
import { test, expect } from '@playwright/test';
import { AmazonPage } from '../pages/AmazonPage.js';
import { amazonTestData } from '../test-data/amazonData.js';
import { logTestStart, logTestEnd, logStep } from '../utils/testHelpers.js';

test.describe('Amazon Shopping Tests', () => {
  let amazonPage;

  test.beforeEach(async ({ page }) => {
    amazonPage = new AmazonPage(page);
    await amazonPage.navigateToAmazon();
  });

  test('TC001: Search and add product to cart', async () => {
    logTestStart('Amazon shopping flow');

    logStep('Step 1', `Search for ${amazonTestData.productName}`);
    await amazonPage.searchAndAddToCart(amazonTestData.productName);

    logStep('Step 2', 'Navigate to cart');
    await amazonPage.goToCart();

    logStep('Step 3', 'Verify cart is not empty');
    const cartItems = await amazonPage.page.locator('span.sc-item-count').textContent();
    expect(cartItems).toContain('1');

    logTestEnd('Amazon shopping flow', 'PASSED');
  });
});
```

### Example: Test Data

```javascript
// test-data/amazonData.js
export const amazonTestData = {
  url: 'https://www.amazon.com/',
  productName: 'Wireless Keyboard',
  expectedPrice: '$49.99',
  searchResults: {
    minResults: 5,
    maxResults: 100,
  },
};
```

## BasePage Methods Reference

### Navigation
- `goto(url, waitUntil, timeout)` - Navigate to URL
- `getPageTitle()` - Get page title
- `getCurrentUrl()` - Get current URL

### Interactions
- `fillInput(selector, value)` - Fill input field
- `clickElement(selector)` - Click element
- `clickByRole(role, name)` - Click by accessibility role
- `getElementText(selector)` - Get text content

### Visibility & State
- `isElementVisible(selector)` - Check if visible
- `waitForElementVisible(selector, timeout)` - Wait for visibility
- `takeScreenshot(fileName)` - Take screenshot

## Locator Strategies

### Preferred Methods (in order)
1. **By Role** - Most accessible and robust
   ```javascript
   get saveButton() {
     return this.page.getByRole('button', { name: 'Save' });
   }
   ```

2. **By Label** - Great for form fields
   ```javascript
   get emailInput() {
     return this.page.getByLabel('Email');
   }
   ```

3. **By Placeholder** - For input fields
   ```javascript
   get searchInput() {
     return this.page.getByPlaceholder('Search...');
   }
   ```

4. **By Text** - For visible text elements
   ```javascript
   get heading() {
     return this.page.getByText('Welcome');
   }
   ```

5. **By CSS Selector** - When necessary
   ```javascript
   get element() {
     return this.page.locator('.class-name');
   }
   ```

## Best Practices

### 1. One Responsibility Per Method
```javascript
// ❌ BAD - Does multiple things
async fillAndSubmitForm(data) {
  await this.fillInput('#name', data.name);
  await this.fillInput('#email', data.email);
  await this.submitButton.click();
  await this.page.waitForNavigation();
}

// ✅ GOOD - Single responsibility
async fillForm(data) {
  await this.fillInput('#name', data.name);
  await this.fillInput('#email', data.email);
}

async submitForm() {
  await this.submitButton.click();
}
```

### 2. Return Values for Assertions
```javascript
// ❌ BAD - Assertion inside page object
async submitForm() {
  await this.submitButton.click();
  expect(successMessage).toBeVisible(); // Don't do this!
}

// ✅ GOOD - Return value for test assertion
async submitForm() {
  await this.submitButton.click();
}

async isSuccessMessageVisible() {
  return this.page.locator('.success').isVisible();
}
```

### 3. Use Getter for Locators
```javascript
// ✅ GOOD - Locator as getter
get emailInput() {
  return this.page.locator('#email');
}

// Later in method
async fillEmail(email) {
  await this.emailInput.fill(email);
}
```

### 4. Meaningful Method Names
```javascript
// ❌ BAD
async fill(selector, value) { }
async click(selector) { }

// ✅ GOOD
async fillEmailInput(email) { }
async clickSubmitButton() { }
async searchForProduct(productName) { }
```

### 5. Group Related Locators and Methods
```javascript
export class LoginPage extends BasePage {
  // ============ LOCATORS ============
  get usernameInput() { }
  get passwordInput() { }
  get loginButton() { }

  // ============ METHODS ============
  async fillUsername(username) { }
  async fillPassword(password) { }
  async clickLogin() { }
  async login(credentials) { }
}
```

## Common Patterns

### Pattern 1: Workflow Methods
```javascript
async completeCheckout(cartItems, shippingAddress, paymentInfo) {
  await this.addItemsToCart(cartItems);
  await this.proceedToCheckout();
  await this.fillShippingAddress(shippingAddress);
  await this.fillPaymentInfo(paymentInfo);
  await this.placeOrder();
}
```

### Pattern 2: Verification Methods
```javascript
async verifyProductDisplayed(productName) {
  const product = this.page.getByText(productName);
  return product.isVisible();
}

async verifyPriceRange(minPrice, maxPrice) {
  const price = await this.getProductPrice();
  return price >= minPrice && price <= maxPrice;
}
```

### Pattern 3: Error Handling
```javascript
async fillForm(data) {
  try {
    await this.fillInput('#name', data.name);
    await this.fillInput('#email', data.email);
  } catch (error) {
    console.error('Error filling form:', error.message);
    throw new Error(`Form fill failed: ${error.message}`);
  }
}
```

## Testing the Page Objects

```javascript
test('TC001: Complete user workflow', async ({ page }) => {
  logTestStart('User Workflow');

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const productPage = new ProductPage(page);

  // Arrange
  await loginPage.navigateToApp();

  // Act
  await loginPage.login(validCredentials);

  // Assert
  expect(await dashboardPage.isWelcomeMessageDisplayed()).toBeTruthy();

  logTestEnd('User Workflow', 'PASSED');
});
```

## Tips for Success

1. **Keep Locators Simple** - Use specific, stable locators
2. **Avoid Sleep** - Use Playwright's auto-wait mechanism
3. **Comment Clearly** - Document what each method does
4. **Group Related Code** - Locators together, methods together
5. **Use Descriptive Names** - Method names should be self-explanatory
6. **DRY Principle** - Don't Repeat Yourself
7. **Test Isolation** - Each test should be independent
8. **Handle Waits Properly** - Use `waitFor()` instead of `sleep()`

## File Organization

```
pages/
├── BasePage.js              # Common functionality
├── LoginPage.js             # Login/auth
├── HomePage.js              # Home page
├── ProductPage.js           # Product details
├── CartPage.js              # Shopping cart
└── CheckoutPage.js          # Checkout flow

test-data/
├── loginData.js             # Login test cases
├── productData.js           # Product data
└── checkoutData.js          # Checkout scenarios

tests/
├── auth.spec.js             # Login tests
├── products.spec.js         # Product tests
└── checkout.spec.js         # Checkout flow tests

utils/
├── testHelpers.js           # Common utilities
└── assertionHelpers.js      # Custom assertions
```

## Conclusion

The Page Object Model pattern provides a solid foundation for scalable, maintainable test automation. Follow these guidelines and best practices to build a robust testing framework!
