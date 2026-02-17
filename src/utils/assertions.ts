import { expect, Locator, Page } from '@playwright/test';
import { Logger } from './logger';

/**
 * Custom Assertions Helper
 * Provides reusable assertion methods with better error messages
 */
export class Assertions {
  /**
   * Verify element is visible
   * 
   */

    /**
   * Check if element is visible
   */
  static async isElementVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
  
  static async verifyElementVisible(
    locator: Locator,
    elementName: string,
    timeout: number = 10000
  ): Promise<void> {
    try {
      Logger.info(`Verifying ${elementName} visibility`);
    await expect(locator).toBeVisible({ timeout });
    Logger.success(`${elementName} is visible`);
    } catch (error) {
    Logger.error(`${elementName} is not visible`);
    throw error;
}
    
  }


  /* ==================== Assertion Methods ==================== */

  /**
   * Verify element is visible
   */
  async verifyElementVisible(locator: Locator, elementName: string = 'element'): Promise<void> {
    Logger.info(`Verifying ${elementName} visibility`);
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


  /**
   * Verify element text
   */
  static async verifyElementText(
    locator: Locator,
    expectedText: string,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} has text: ${expectedText}`);
    await expect(locator).toHaveText(expectedText);
    Logger.success(`${elementName} has correct text`);
  }

  /**
   * Verify element contains text
   */
  static async verifyElementContainsText(
    locator: Locator,
    expectedText: string,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} contains text: ${expectedText}`);
    await expect(locator).toContainText(expectedText);
    Logger.success(`${elementName} contains correct text`);
  }

  /**
   * Verify element value
   */
  static async verifyElementValue(
    locator: Locator,
    expectedValue: string,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} has value: ${expectedValue}`);
    await expect(locator).toHaveValue(expectedValue);
    Logger.success(`${elementName} has correct value`);
  }

  /**
   * Verify element is enabled
   */
  static async verifyElementEnabled(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} is enabled`);
    await expect(locator).toBeEnabled();
    Logger.success(`${elementName} is enabled`);
  }

  /**
   * Verify element is disabled
   */
  static async verifyElementDisabled(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} is disabled`);
    await expect(locator).toBeDisabled();
    Logger.success(`${elementName} is disabled`);
  }

  /**
   * Verify page URL
   */
  static async verifyPageURL(
    page: Page,
    expectedUrl: string | RegExp
  ): Promise<void> {
    Logger.info(`Verifying page URL: ${expectedUrl}`);
    await expect(page).toHaveURL(expectedUrl);
    Logger.success(`Page URL is correct`);
  }

  /**
   * Verify page title
   */
  static async verifyPageTitle(
    page: Page,
    expectedTitle: string | RegExp
  ): Promise<void> {
    Logger.info(`Verifying page title: ${expectedTitle}`);
    await expect(page).toHaveTitle(expectedTitle);
    Logger.success(`Page title is correct`);
  }

  /**
   * Verify element count
   */
  static async verifyElementCount(
    locator: Locator,
    expectedCount: number,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} count is ${expectedCount}`);
    await expect(locator).toHaveCount(expectedCount);
    Logger.success(`${elementName} count is correct`);
  }

  /**
   * Verify element is checked (for checkboxes/radio buttons)
   */
  static async verifyElementChecked(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} is checked`);
    await expect(locator).toBeChecked();
    Logger.success(`${elementName} is checked`);
  }

  /**
   * Verify element is not checked
   */
  static async verifyElementNotChecked(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    Logger.info(`Verifying ${elementName} is not checked`);
    await expect(locator).not.toBeChecked();
    Logger.success(`${elementName} is not checked`);
  }

  /**
   * Verify array contains value
   */
  static verifyArrayContains<T>(
    array: T[],
    value: T,
    arrayName: string
  ): void {
    Logger.info(`Verifying ${arrayName} contains: ${value}`);
    expect(array).toContain(value);
    Logger.success(`${arrayName} contains the value`);
  }

  /**
   * Verify arrays are equal
   */
  static verifyArraysEqual<T>(
    actual: T[],
    expected: T[],
    arrayName: string
  ): void {
    Logger.info(`Verifying ${arrayName} matches expected array`);
    expect(actual).toEqual(expected);
    Logger.success(`${arrayName} matches expected array`);
  }

  /**
   * Soft assertion - doesn't stop test execution
   */
  static async softVerifyElementVisible(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    try {
      await expect.soft(locator).toBeVisible();
      Logger.success(`Soft assertion passed: ${elementName} is visible`);
    } catch (error) {
      Logger.warn(`Soft assertion failed: ${elementName} is not visible`);
    }
  }
}