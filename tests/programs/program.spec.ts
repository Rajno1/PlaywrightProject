import { test ,expect } from "src/fixture/AuthFixtures";
import { ProgramsPage } from "@pages/programs/ProgramsPage";
import { Logger } from 'src/utils/logger';

/**
 * Programs Test Suite
 */
test.describe('Programs Module Tests', () => {
  
  // test.beforeEach(async () => {
  //   Logger.separator();
  // });

  // test.afterEach(async () => {
  //   Logger.separator();
  // });

/*   test('Verify staff user can access Programs menu', async ({ staffPage }) => {
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
 */

/*  test('Test Name @tag', async ({ staffPage }) => {
  Logger.testStart('Test Name');
  
  // 1. Navigate
  await test.step('Navigate to page', async () => {
    await programsPage.navigateToProgramsPage();
  });
  
  // 2. Perform Action
  await test.step('Fill form', async () => {
    await addProgramPage.fillProgramForm(testData);
  });
  
  // 3. Verify Result
  await test.step('Verify success', async () => {
    await Assertions.verifyElementVisible(successMessage);
  });
  
  Logger.testEnd('Test Name');
 });
 */ 

 import { test } from "src/fixture/authFixtures";
import { ProgramsPage } from "@pages/programs/ProgramsPage";
 import { TestDataFactory } from "@utils/testDataFactory";

test.describe('Programs - Foundation Tests', () => {
  let programsPage: ProgramsPage;

  test.beforeEach(async ({ programsPage: page }) => {
    programsPage = page;
  });

  test('TC-PL-001: Navigate to Programs', async () => {
    await programsPage.navigateToProgramsPage();
    await programsPage.verifyPageLoaded();
  });

  test('TC-PL-002: Click Add New Program', async () => {
    await programsPage.navigateToProgramsPage();
    await programsPage.clickAddNewProgram();
  });

  test('TC-PL-003: Apply Active Filter', async () => {
    await programsPage.navigateToProgramsPage();
    await programsPage.selectActiveFilter();
  });

  // Test that needs additional fixtures - pass them
  test('TC-AP-001: Create Program', async ({ 
    addProgramPage,      // Pass additional fixtures
    editProgramPage 
  }) => {
    const data = TestDataFactory.generateProgramData();
    
    await programsPage.navigateToProgramsPage();  // Use beforeEach fixture
    await programsPage.clickAddNewProgram();
    await addProgramPage.fillProgramForm(data);
    await addProgramPage.clickSubmit();
    await editProgramPage.verifyPageLoaded();
  });
});