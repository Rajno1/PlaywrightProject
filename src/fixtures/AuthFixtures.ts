import { test as base, Page } from '@playwright/test';
import fs from 'fs';
import { loginAs } from '@utils/authHelper';
import { Paths } from '@constants/Paths';
import { Logger } from '@utils/logger';

// Page Objects
import { LoginPage } from '@pages/login/LoginPage';
import { ProgramsPage } from '@pages/programs/ProgramsPage';
import { AddProgramPage } from '@pages/programs/AddProgramPage';
import { EditProgramPage } from '@pages/programs/EditProgramPage';

/* ==================== TYPES ==================== */
type Fixtures = {
  staffPage: Page;
  orgPage: Page;
  individualPage: Page;
  programsPage: ProgramsPage;
  addProgramPage: AddProgramPage;
  editProgramPage: EditProgramPage;
};

/* ==================== HELPER FUNCTIONS ==================== */

/**
 * Ensure auth directory exists
 */
function ensureAuthDirectoryExists(): void {
  if (!fs.existsSync(Paths.AUTH_FOLDER_PATH)) {
    fs.mkdirSync(Paths.AUTH_FOLDER_PATH, { recursive: true });
    Logger.info(`Created auth directory: ${Paths.AUTH_FOLDER_PATH}`);
  }
}

/**
 * Check if the server actually accepted our session
 * by confirming we landed on dashboard and not redirected away
 */
function isSessionValid(page: Page): boolean {
  const url = page.url();
  Logger.info(`Session validation — current URL: ${url}`);
  return url.includes('/profiles/dashboard');
}

/**
 * Delete stale auth file so next attempt triggers a fresh login
 */
function deleteStaleAuthFile(authFile: string, role: string): void {
  if (fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
    Logger.info(`Deleted stale auth file for ${role}: ${authFile}`);
  }
}

/**
 * Create authenticated page for any role
 * Validates session server-side after loading — re-authenticates if rejected
 */
async function createAuthenticatedPage(
  browser: any,
  authFile: string,
  role: 'staff' | 'Organization' | 'individual'
): Promise<Page> {
  ensureAuthDirectoryExists();

  Logger.info(`Setting up ${role} user fixture`);

  const context = await browser.newContext({
    storageState: fs.existsSync(authFile) ? authFile : undefined,
  });

  const page = await context.newPage();

  // Navigate to dashboard — if session is dead server will redirect away
  await page.goto('/profiles/dashboard');
  await page.waitForLoadState('networkidle');

  // ✅ Check if the server actually accepted our session
  if (!isSessionValid(page)) {
    Logger.info(`Server rejected session for ${role} — performing fresh login`);

    // Wipe the stale auth file
    deleteStaleAuthFile(authFile, role);

    // Perform fresh login
    await loginAs(page, role);

    // Wait until fully landed on dashboard before saving state
    await page.waitForURL('**/profiles/dashboard', { timeout: 20000 });
    await page.waitForLoadState('networkidle');

    // Save the fresh valid session
    await context.storageState({ path: authFile });
    Logger.success(`Fresh auth state saved for ${role}`);
  } else {
    Logger.info(`Session valid for ${role} — reusing existing auth`);
  }

  return page;
}

/* ==================== FIXTURES ==================== */

export const test = base.extend<Fixtures>({

  /* -------- AUTHENTICATION FIXTURES -------- */

  staffPage: async ({ browser }, use) => {
    const page = await createAuthenticatedPage(
      browser,
      Paths.STAFF_AUTH_FILE,
      'staff'
    );
    await use(page);
    await page.context().close();
    Logger.info('Staff user fixture cleaned up');
  },

  orgPage: async ({ browser }, use) => {
    const page = await createAuthenticatedPage(
      browser,
      Paths.ORG_AUTH_FILE,
      'Organization'
    );
    await use(page);
    await page.context().close();
    Logger.info('Organization user fixture cleaned up');
  },

  individualPage: async ({ browser }, use) => {
    const page = await createAuthenticatedPage(
      browser,
      Paths.INDIVIDUAL_AUTH_FILE,
      'individual'
    );
    await use(page);
    await page.context().close();
    Logger.info('Individual user fixture cleaned up');
  },

  /* -------- PAGE OBJECT FIXTURES -------- */

  programsPage: async ({ staffPage }, use) => {
    await use(new ProgramsPage(staffPage));
  },

  addProgramPage: async ({ staffPage }, use) => {
    await use(new AddProgramPage(staffPage));
  },

  editProgramPage: async ({ staffPage }, use) => {
    await use(new EditProgramPage(staffPage));
  },
});

/* ==================== GLOBAL HOOKS ==================== */

test.beforeEach(async ({}, testInfo) => {
  Logger.separator();
  Logger.info(`Starting Test: ${testInfo.title}`);
});

test.afterEach(async ({}, testInfo) => {
  Logger.info(`Ending Test: ${testInfo.title}`);
  Logger.separator();
});

/* ==================== EXPORTS ==================== */

export { expect } from '@playwright/test';