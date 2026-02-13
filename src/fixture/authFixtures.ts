import { test as base, Page } from '@playwright/test';
import fs from 'fs';
import { loginAs } from '@utils/authHelper';
import { Paths } from '@constants/Paths';
import { Logger } from '@utils/logger';

// Page Objects
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
 * Create authenticated page for any role
 * DRY approach - reusable helper
 */
async function createAuthenticatedPage(
  browser: any,
  authFile: string,
  role: 'staff' | 'Organization' | 'individual'
): Promise<Page> {
  ensureAuthDirectoryExists(); // ✅ Added: ensure directory exists
  
  const context = await browser.newContext({
    storageState: fs.existsSync(authFile) ? authFile : undefined,
  });
  
  const page = await context.newPage();
  
  if (!fs.existsSync(authFile)) {
    Logger.info(`No auth found for ${role}, logging in`); // ✅ Fixed: parentheses
    await loginAs(page, role);
    await context.storageState({ path: authFile });
    Logger.success(`${role} auth saved`); // ✅ Fixed: parentheses
  } else {
    Logger.info(`Using existing auth for ${role}`); // ✅ Fixed: parentheses
  }
  
  await page.goto('/profiles/dashboard');
  await page.waitForLoadState('networkidle');
  
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
  },

  orgPage: async ({ browser }, use) => {
    const page = await createAuthenticatedPage(
      browser,
      Paths.ORG_AUTH_FILE,
      'Organization'
    );
    await use(page);
    await page.context().close();
  },

  individualPage: async ({ browser }, use) => {
    const page = await createAuthenticatedPage(
      browser,
      Paths.INDIVIDUAL_AUTH_FILE,
      'individual'
    );
    await use(page);
    await page.context().close();
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
  Logger.info(`Starting Test: ${testInfo.title}`); // ✅ Fixed: parentheses
});

test.afterEach(async ({}, testInfo) => {
  Logger.info(`Ending Test: ${testInfo.title}`); // ✅ Fixed: parentheses
  Logger.separator();
});

/* ==================== EXPORTS ==================== */

export { expect } from '@playwright/test';