/**
 * Epazz Contact Form Page Object
 */
import { BasePage } from './BasePage.js';

export class EpazzPage extends BasePage {
  // Locators
  get fullNameInput() {
    return this.page.locator('#fullname');
  }

  get emailInput() {
    return this.page.locator('#email');
  }

  get phoneInput() {
    return this.page.locator('#phone');
  }

  get messageInput() {
    return this.page.locator('#message');
  }

  get submitButton() {
    return this.page.locator('#submit');
  }

  /**
   * Navigate to Epazz website
   */
  async navigateToEpazz() {
    await this.goto('https://www.epazz.com/', 'domcontentloaded');
  }

  /**
   * Fill full name field
   * @param {string} fullName - Full name value
   */
  async fillFullName(fullName) {
    await this.fullNameInput.fill(fullName);
  }

  /**
   * Fill email field
   * @param {string} email - Email value
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill phone field
   * @param {string} phone - Phone number
   */
  async fillPhone(phone) {
    await this.phoneInput.fill(phone);
  }

  /**
   * Fill message field
   * @param {string} message - Message content
   */
  async fillMessage(message) {
    await this.messageInput.fill(message);
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Fill and submit contact form with complete data
   * @param {Object} formData - Object containing fullName, email, phone, message
   */
  async fillAndSubmitForm(formData) {
    const { fullName, email, phone, message } = formData;
    
    await this.fillFullName(fullName);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.fillMessage(message);
    await this.submitForm();
  }

  /**
   * Update full name field
   * @param {string} fullName - New full name value
   */
  async updateFullName(fullName) {
    await this.fillFullName(fullName);
  }
}
