import { test ,expect } from "src/fixture/authFixtures";
import { ProgramsPage } from 'src/pages/programs/ProgramsPage';
import { Logger } from 'src/utils/logger';

/**
 * Programs Test Suite
 */
test.describe('Programs Module Tests', () => {
  
  test.beforeEach(async () => {
    Logger.separator();
  });

  test.afterEach(async () => {
    Logger.separator();
  });

  test('Verify staff user can access Programs menu', async ({ staffPage }) => {
    Logger.testStart('Verify staff user can access Programs menu');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Click on Programs menu', async () => {
      await programsPage.clickOnProgramMenu();
    });

    await test.step('Verify Programs page is displayed', async () => {
      const currentUrl = await programsPage.getCurrentUrl();
      Logger.info(`Current URL: ${currentUrl}`);
      expect(currentUrl).toContain('program');
    });

    Logger.testEnd('Verify staff user can access Programs menu');
  });

  test('Verify page title', async ({ staffPage }) => {
    Logger.testStart('Verify page title');

    await test.step('Get and verify page title', async () => {
      const programsPage = new ProgramsPage(staffPage);
      const title = await programsPage.getPageTitle();
      Logger.info(`Page title: ${title}`);
      expect(title).toBeTruthy();
    });

    Logger.testEnd('Verify page title');
  });

  
});
