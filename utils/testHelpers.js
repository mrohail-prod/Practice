/**
 * Common test utilities and helper functions
 */

/**
 * Wait for a specific time (use sparingly, prefer Playwright waits)
 * @param {number} ms - Milliseconds to wait
 */
export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a unique test ID
 * @returns {string} Unique test ID
 */
export function generateTestId() {
  return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format log message with timestamp
 * @param {string} message - Message to log
 * @returns {string} Formatted message
 */
export function logMessage(message) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${message}`;
}

/**
 * Log test step
 * @param {string} stepName - Step name
 * @param {string} description - Step description
 */
export function logStep(stepName, description) {
  console.log(logMessage(`✓ ${stepName}: ${description}`));
}

/**
 * Log test start
 * @param {string} testName - Test name
 */
export function logTestStart(testName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(logMessage(`🚀 Starting test: ${testName}`));
  console.log(`${'='.repeat(60)}\n`);
}

/**
 * Log test completion
 * @param {string} testName - Test name
 * @param {string} status - Test status (PASSED/FAILED)
 */
export function logTestEnd(testName, status = 'PASSED') {
  const icon = status === 'PASSED' ? '✅' : '❌';
  console.log(`\n${icon} Test: ${testName} - ${status}`);
  console.log(`${'='.repeat(60)}\n`);
}

/**
 * Extract domain from URL
 * @param {string} url - Full URL
 * @returns {string} Domain name
 */
export function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (e) {
    return 'unknown';
  }
}

/**
 * Verify email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Verify phone number format (basic validation)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid format
 */
export function isValidPhone(phone) {
  const phoneRegex = /^\d{7,15}$/;
  return phoneRegex.test(phone.replace(/[-\s()]/g, ''));
}
