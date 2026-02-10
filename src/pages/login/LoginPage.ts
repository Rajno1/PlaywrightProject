import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '@utils/logger';

/**
 * Login Page Object
 * Handles all login-related actions
 */
export class LoginPage extends BasePage {
  // Locators
  readonly loginButton: Locator;
  readonly staffPortalLoginLink: Locator;
  readonly individualPortalLoginLink: Locator;
  readonly organizationPortalLoginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly organizationDropdown: Locator;
  readonly loginButtonSubmit: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.loginButton = page.locator('a:has-text("Login")');
    this.staffPortalLoginLink = page.locator('a:has-text("Staff Portal Login")');
    this.individualPortalLoginLink = page.locator('a:has-text("Individual Portal Login")');
    this.organizationPortalLoginLink = page.locator('a:has-text("Organization Portal Login")');
    this.usernameInput = page.locator('input[placeholder="Enter Username"]');
    this.passwordInput = page.locator('input[placeholder="Enter Password"]');
    this.organizationDropdown = page.locator('#id_org');
    this.loginButtonSubmit = page.locator('#btn-login');
  }

  /* ==================== Navigation Methods ==================== */

  /**
   * Navigate to public page
   */
  async gotoPublicPage(): Promise<void> {
    Logger.step('Navigating to public page');
    await this.navigateTo('/pages/public');
  }

  /* ==================== Verification Methods ==================== */

  /**
   * Check if login button is visible
   */
  async isLoginVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginButton);
  }

  /* ==================== Action Methods ==================== */

  /**
   * Click on login button
   */
  async clickOnLogin(): Promise<void> {
    await this.clickElement(this.loginButton, 'Login button');
  }

  /* ==================== Staff Login Methods ==================== */

  /**
   * Click on Staff Portal Login link
   */
  async clickOnStaffPortalLoginLink(): Promise<void> {
    await this.clickElement(this.staffPortalLoginLink, 'Staff Portal Login link');
  }

  /**
   * Perform staff login
   */
  async staffLogin(username: string, password: string): Promise<void> {
    Logger.step('Performing staff login');
    await this.fillInput(this.usernameInput, username, 'Username');
    await this.fillInput(this.passwordInput, password, 'Password');
    await this.clickElement(this.loginButtonSubmit, 'Login submit button');
    await this.waitForPageLoad();
    Logger.success('Staff login completed');
  }

  /* ==================== Organization Login Methods ==================== */

  /**
   * Click on Organization Portal Login link
   */
  async clickOnOrganizationPortalLoginLink(): Promise<void> {
    await this.clickElement(this.organizationPortalLoginLink, 'Organization Portal Login link');
  }

  /**
   * Perform organization login
   */
  async organizationLogin(username: string, password: string, organization: string): Promise<void> {
    Logger.step('Performing organization login');
    await this.fillInput(this.usernameInput, username, 'Username');
    await this.fillInput(this.passwordInput, password, 'Password');
    await this.selectOption(this.organizationDropdown, organization, 'Organization');
    await this.clickElement(this.loginButtonSubmit, 'Login submit button');
    await this.waitForPageLoad();
    Logger.success('Organization login completed');
  }

  /* ==================== Individual Login Methods ==================== */

  /**
   * Click on Individual Portal Login link
   */
  async clickOnIndividualLoginLink(): Promise<void> {
    await this.clickElement(this.individualPortalLoginLink, 'Individual Portal Login link');
  }

  /**
   * Perform individual login
   */
  async individualLogin(username: string, password: string): Promise<void> {
    Logger.step('Performing individual login');
    await this.fillInput(this.usernameInput, username, 'Username');
    await this.fillInput(this.passwordInput, password, 'Password');
    await this.clickElement(this.loginButtonSubmit, 'Login submit button');
    await this.waitForPageLoad();
    Logger.success('Individual login completed');
  }

  /* ==================== Generic Login Method ==================== */

  /**
   * Generic login method that can handle all user types
   */
  async login(
    userType: 'staff' | 'organization' | 'individual',
    username: string,
    password: string,
    organization?: string
  ): Promise<void> {
    await this.gotoPublicPage();
    await this.clickOnLogin();

    switch (userType) {
      case 'staff':
        await this.clickOnStaffPortalLoginLink();
        await this.staffLogin(username, password);
        break;
      case 'organization':
        if (!organization) {
          throw new Error('Organization name is required for organization login');
        }
        await this.clickOnOrganizationPortalLoginLink();
        await this.organizationLogin(username, password, organization);
        break;
      case 'individual':
        await this.clickOnIndividualLoginLink();
        await this.individualLogin(username, password);
        break;
      default:
        throw new Error(`Unknown user type: ${userType}`);
    }
  }
}
