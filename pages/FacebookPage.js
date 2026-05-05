/**
 * Facebook Page Object
 */
import { BasePage } from './BasePage.js';

export class FacebookPage extends BasePage {
  get emailInput() {
    return this.page.locator('#_R_64mkqsr9pb6amH1_');
  }

  get passwordInput() {
    return this.page.locator('#_R_66mkqsr9pb6amH1_');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Log in' });
  }

  async navigateToFacebook() {
    await this.goto('https://www.facebook.com/', 'domcontentloaded');
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(credentials) {
    const { email, password } = credentials;
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }
}
