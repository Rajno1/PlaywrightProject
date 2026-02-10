import { test as base, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { loginAs } from '@utils/authHelper';
import { Paths } from '@constants/Paths';
import { Logger } from '@utils/logger';

/**
 * Custom Fixtures
 * Provides authenticated pages for different user roles
 */

/* ==================== Types ==================== */
type Fixtures = {
  staffPage: Page;
  orgPage: Page;
  individualPage: Page;
};

/* ==================== Helper Functions ==================== */

/**
 * Ensure auth directory exists
 */
function ensureAuthDirectoryExists(): void {
  if (!fs.existsSync(Paths.AUTH_FOLDER_PATH)) {
    fs.mkdirSync(Paths.AUTH_FOLDER_PATH, { recursive: true });
    Logger.info(`Created auth directory: ${Paths.AUTH_FOLDER_PATH}`);
  }
}

/* ==================== Fixtures ==================== */

export const test = base.extend<Fixtures>({
  /**
   * Staff User Fixture
   * Provides authenticated page for staff user
   */
  staffPage: async ({ browser }, use) => {
    ensureAuthDirectoryExists();
    const authFile = Paths.STAFF_AUTH_FILE;

    Logger.info('Setting up staff user fixture');

    // Create browser context with existing auth (if available)
    const context = await browser.newContext({
      storageState: fs.existsSync(authFile) ? authFile : undefined,
    });

    const page = await context.newPage();

    // First time login only
    if (!fs.existsSync(authFile)) {
      Logger.info('No existing auth found, performing login');
      await loginAs(page, 'staff');
      // Save login session
      await context.storageState({ path: authFile });
      Logger.success('Staff auth state saved');
    } else {
      Logger.info('Using existing staff auth state');
    }

    // Navigate to dashboard
    await page.goto('/profiles/dashboard');
    await page.waitForLoadState('networkidle');

    // Provide logged-in page to test
    await use(page);

    // Cleanup
    await context.close();
    Logger.info('Staff user fixture cleaned up');
  },

  /**
   * Organization User Fixture
   * Provides authenticated page for organization user
   */
  orgPage: async ({ browser }, use) => {
    ensureAuthDirectoryExists();
    const authFile = Paths.ORG_AUTH_FILE;

    Logger.info('Setting up organization user fixture');

    const context = await browser.newContext({
      storageState: fs.existsSync(authFile) ? authFile : undefined,
    });

    const page = await context.newPage();

    // First time login only
    if (!fs.existsSync(authFile)) {
      Logger.info('No existing auth found, performing login');
      await loginAs(page, 'Organization');
      await context.storageState({ path: authFile });
      Logger.success('Organization auth state saved');
    } else {
      Logger.info('Using existing organization auth state');
    }

    // Navigate to dashboard
    await page.goto('/profiles/dashboard');
    await page.waitForLoadState('networkidle');

    // Provide logged-in page to test
    await use(page);

    // Cleanup
    await context.close();
    Logger.info('Organization user fixture cleaned up');
  },

  /**
   * Individual User Fixture
   * Provides authenticated page for individual user
   */
  individualPage: async ({ browser }, use) => {
    ensureAuthDirectoryExists();
    const authFile = Paths.INDIVIDUAL_AUTH_FILE;

    Logger.info('Setting up individual user fixture');

    const context = await browser.newContext({
      storageState: fs.existsSync(authFile) ? authFile : undefined,
    });

    const page = await context.newPage();

    // First time login only
    if (!fs.existsSync(authFile)) {
      Logger.info('No existing auth found, performing login');
      await loginAs(page, 'individual');
      await context.storageState({ path: authFile });
      Logger.success('Individual auth state saved');
    } else {
      Logger.info('Using existing individual auth state');
    }

    // Navigate to dashboard
    await page.goto('/profiles/dashboard');
    await page.waitForLoadState('networkidle');

    // Provide logged-in page to test
    await use(page);

    // Cleanup
    await context.close();
    Logger.info('Individual user fixture cleaned up');
  },
});

export { expect } from '@playwright/test';
