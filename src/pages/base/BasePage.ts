import { Page, Locator, expect } from "@playwright/test";
import { Logger } from "@utils/logger";

/**
 * Base Page Object
 * Contains common methods and utilities for all page objects
 */
export class BasePage {
  constructor(protected page: Page) {}

  /* ==================== Menu Navigation Methods ==================== */

  /**
   * Generic menu locator
   */
  menu(menuName: string): Locator {
    return this.page.locator(`ul.vg-nav-wrapper [aria-label="${menuName}"]`);
  }

  /**
   * Generic sub menu locator
   */
  subMenu(subMenuName: string): Locator {
    return this.page.locator(`.left.show [aria-label="${subMenuName}"]`);
  }

  /**
   * Open a menu
   */
  async openMenu(menuName: string): Promise<void> {
    Logger.info(`Opening menu: ${menuName}`);
    const menuLocator = this.menu(menuName);
    await this.waitForElement(menuLocator);
    await menuLocator.click();
  }

  /**
   * Open a sub menu
   */
  async openSubMenu(parent: string, child: string): Promise<void> {
    Logger.info(`Opening submenu: ${parent} > ${child}`);
    await this.openMenu(parent);
    const subMenuLocator = this.subMenu(child);
    await this.waitForElement(subMenuLocator);
    await subMenuLocator.click();
  }



  /* ==================== Navigation Methods ==================== */

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    Logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /* ==================== Wait Methods ==================== */

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementToBeHidden(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for a specific amount of time
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /* ==================== Element Interaction Methods ==================== */

  /**
   * Click on an element with wait
   */
  async clickElement(locator: Locator, elementName: string = 'element'): Promise<void> {
    Logger.info(`Clicking on: ${elementName}`);
    await this.waitForElement(locator);
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fillInput(locator: Locator, value: string, fieldName: string = 'field'): Promise<void> {
    Logger.info(`Filling ${fieldName} with value: ${value}`);
    await this.waitForElement(locator);
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(locator: Locator, value: string, dropdownName: string = 'dropdown'): Promise<void> {
    Logger.info(`Selecting option '${value}' from ${dropdownName}`);
    await this.waitForElement(locator);
    await locator.selectOption(value);
  }

  /**
   * Get text from element
   */
  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isElementEnabled(locator: Locator): Promise<boolean> {
    await this.waitForElement(locator);
    return await locator.isEnabled();
  }


  /* ==================== Assertion Methods ==================== */

  /**
   * Verify element is visible
   */
  async verifyElementVisible(locator: Locator, elementName: string = 'element'): Promise<void> {
    Logger.info(`Verifying ${elementName} is visible`);
    await expect(locator).toBeVisible();
  }

  /**
   * Verify element text
   */
  async verifyElementText(locator: Locator, expectedText: string, elementName: string = 'element'): Promise<void> {
    Logger.info(`Verifying ${elementName} has text: ${expectedText}`);
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Verify page URL
   */
  async verifyPageUrl(expectedUrl: string): Promise<void> {
    Logger.info(`Verifying page URL contains: ${expectedUrl}`);
    await expect(this.page).toHaveURL(new RegExp(expectedUrl));
  }

  /* ==================== Screenshot Methods ==================== */

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    Logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /* ==================== Browser Methods ==================== */

  /**
   * Reload the page
   */
  async reloadPage(): Promise<void> {
    Logger.info('Reloading page');
    await this.page.reload();
    await this.waitForPageLoad();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    Logger.info('Navigating back');
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  /**
   * Go forward
   */
  async goForward(): Promise<void> {
    Logger.info('Navigating forward');
    await this.page.goForward();
    await this.waitForPageLoad();
  }
}
