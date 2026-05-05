/**
 * Epazz Contact Form Tests
 * Tests contact form submission functionality
 */
import { test, expect } from '@playwright/test';
import { EpazzPage } from '../pages/EpazzPage.js';
import { epazzTestData } from '../test-data/epazzData.js';
import { logTestStart, logTestEnd, logStep, isValidEmail, isValidPhone } from '../utils/testHelpers.js';
import { assertElementVisible } from '../utils/assertionHelpers.js';

test.describe('Epazz Contact Form Tests', () => {
  let epazzPage;

  test.beforeEach(async ({ page }) => {
    epazzPage = new EpazzPage(page);
    await epazzPage.navigateToEpazz();
  });

  test('TC001: Submit contact form with valid data', async () => {
    logTestStart('Contact form submission');
    
    const formData = epazzTestData.formSubmissions[0];
    
    logStep('Step 1', 'Verify form is visible');
    await assertElementVisible(epazzPage.fullNameInput, 'Full Name Input');
    
    logStep('Step 2', 'Fill and submit form');
    await epazzPage.fillAndSubmitForm(formData);
    
    logStep('Step 3', 'Form submitted successfully');
    console.log('✓ Contact form submission completed');
    
    logTestEnd('Contact form submission', 'PASSED');
  });

  test('TC002: Verify form field inputs', async () => {
    logTestStart('Form field validation');
    
    const formData = epazzTestData.formSubmissions[1];
    
    logStep('Step 1', 'Fill full name field');
    await epazzPage.fillFullName(formData.fullName);
    let fieldValue = await epazzPage.fullNameInput.inputValue();
    expect(fieldValue).toBe(formData.fullName);
    
    logStep('Step 2', 'Fill email field');
    await epazzPage.fillEmail(formData.email);
    fieldValue = await epazzPage.emailInput.inputValue();
    expect(fieldValue).toBe(formData.email);
    
    logStep('Step 3', 'Verify email format is valid');
    expect(isValidEmail(formData.email)).toBeTruthy();
    
    logStep('Step 4', 'Fill phone field');
    await epazzPage.fillPhone(formData.phone);
    fieldValue = await epazzPage.phoneInput.inputValue();
    expect(fieldValue).toBe(formData.phone);
    
    logStep('Step 5', 'Verify phone format is valid');
    expect(isValidPhone(formData.phone)).toBeTruthy();
    
    logStep('Step 6', 'Fill message field');
    await epazzPage.fillMessage(formData.message);
    fieldValue = await epazzPage.messageInput.inputValue();
    expect(fieldValue).toBe(formData.message);
    
    logTestEnd('Form field validation', 'PASSED');
  });

  test('TC003: Update form data after initial entry', async () => {
    logTestStart('Update form data');
    
    const initialData = epazzTestData.formSubmissions[0];
    const updatedData = epazzTestData.formSubmissions[1];
    
    logStep('Step 1', 'Fill form with initial data');
    await epazzPage.fillAndSubmitForm(initialData);
    
    logStep('Step 2', 'Update full name field');
    await epazzPage.updateFullName(updatedData.fullName);
    const updatedValue = await epazzPage.fullNameInput.inputValue();
    expect(updatedValue).toBe(updatedData.fullName);
    
    logTestEnd('Update form data', 'PASSED');
  });

  test('TC004: Verify all form fields are accessible', async () => {
    logTestStart('Form fields accessibility');
    
    logStep('Step 1', 'Verify full name input is visible');
    await assertElementVisible(epazzPage.fullNameInput, 'Full Name Input');
    
    logStep('Step 2', 'Verify email input is visible');
    await assertElementVisible(epazzPage.emailInput, 'Email Input');
    
    logStep('Step 3', 'Verify phone input is visible');
    await assertElementVisible(epazzPage.phoneInput, 'Phone Input');
    
    logStep('Step 4', 'Verify message input is visible');
    await assertElementVisible(epazzPage.messageInput, 'Message Input');
    
    logStep('Step 5', 'Verify submit button is visible');
    await assertElementVisible(epazzPage.submitButton, 'Submit Button');
    
    logTestEnd('Form fields accessibility', 'PASSED');
  });
});
