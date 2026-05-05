/**
 * Custom assertion helpers for enhanced test reporting
 */

/**
 * Assert element is visible
 * @param {Object} locator - Playwright locator
 * @param {string} elementName - Element description for error message
 */
export async function assertElementVisible(locator, elementName) {
  try {
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    console.log(`✓ Element "${elementName}" is visible`);
    return true;
  } catch (error) {
    throw new Error(`✗ Element "${elementName}" is not visible. Error: ${error.message}`);
  }
}

/**
 * Assert element contains text
 * @param {Object} locator - Playwright locator
 * @param {string} text - Text to find
 * @param {string} elementName - Element description
 */
export async function assertElementContainsText(locator, text, elementName) {
  try {
    await locator.waitFor({ state: 'attached', timeout: 5000 });
    const content = await locator.textContent();
    
    if (content.includes(text)) {
      console.log(`✓ Element "${elementName}" contains text: "${text}"`);
      return true;
    } else {
      throw new Error(`Text "${text}" not found. Actual content: "${content}"`);
    }
  } catch (error) {
    throw new Error(`✗ Assertion failed for "${elementName}". Error: ${error.message}`);
  }
}

/**
 * Assert page title contains text
 * @param {Object} page - Playwright page
 * @param {string} text - Text to find in title
 */
export async function assertPageTitleContains(page, text) {
  try {
    const title = await page.title();
    
    if (title.includes(text)) {
      console.log(`✓ Page title contains: "${text}"`);
      return true;
    } else {
      throw new Error(`Title "${text}" not found. Actual title: "${title}"`);
    }
  } catch (error) {
    throw new Error(`✗ Page title assertion failed. Error: ${error.message}`);
  }
}

/**
 * Assert page URL contains text
 * @param {Object} page - Playwright page
 * @param {string} text - Text to find in URL
 */
export async function assertPageUrlContains(page, text) {
  try {
    const url = page.url();
    
    if (url.includes(text)) {
      console.log(`✓ Page URL contains: "${text}"`);
      return true;
    } else {
      throw new Error(`URL "${text}" not found. Actual URL: "${url}"`);
    }
  } catch (error) {
    throw new Error(`✗ Page URL assertion failed. Error: ${error.message}`);
  }
}

/**
 * Assert element count
 * @param {Object} locator - Playwright locator
 * @param {number} expectedCount - Expected count
 * @param {string} elementName - Element description
 */
export async function assertElementCount(locator, expectedCount, elementName) {
  try {
    const count = await locator.count();
    
    if (count === expectedCount) {
      console.log(`✓ Element "${elementName}" count is: ${count}`);
      return true;
    } else {
      throw new Error(`Expected count: ${expectedCount}, Actual count: ${count}`);
    }
  } catch (error) {
    throw new Error(`✗ Element count assertion failed for "${elementName}". Error: ${error.message}`);
  }
}
