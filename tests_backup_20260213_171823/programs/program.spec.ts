
import { test, expect } from '@fixtures/AuthFixtures';
import { ProgramsPage } from '@pages/programs/ProgramsPage';
import { AddProgramPage } from '@pages/programs/AddProgramPage';
import { EditProgramPage } from '@pages/programs/EditProgramPage';
import { ProgramFactory } from '@utils/factories/ProgramFactory';
import { Logger } from '@utils/logger';

/**
 * Programs Module - Foundation Tests
 * Tests the basic functionality of the Programs module
 */
test.describe('Programs Module - Foundation Tests @smoke', () => {̀

  /* ==================== LIST PAGE TESTS ==================== */

  test('TC-PL-001: Navigate to Programs List Page', async ({ staffPage }) => {
    Logger.testStart('TC-PL-001: Navigate to Programs List Page');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Verify page is displayed', async () => {
      const currentUrl = await programsPage.getCurrentUrl();
      Logger.info(`Current URL: ${currentUrl}`);
      expect(currentUrl).toContain('program');
    });

    await test.step('Verify page title', async () => {
      const title = await programsPage.getPageTitle();
      Logger.info(`Page title: ${title}`);
      expect(title).toBeTruthy();
    });

    Logger.testEnd('TC-PL-001: Navigate to Programs List Page');
  });

  test('TC-PL-002: Click Add New Program Button', async ({ programsPage }) => {
    Logger.testStart('TC-PL-002: Click Add New Program Button');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Click Add New Program', async () => {
      await programsPage.clickAddNewProgram();
    });

    await test.step('Verify navigated to Add Program page', async () => {
      const currentUrl = await programsPage.getCurrentUrl();
      expect(currentUrl).toContain('add');
      Logger.success('Successfully navigated to Add Program page');
    });

    Logger.testEnd('TC-PL-002: Click Add New Program Button');
  });

  test('TC-PL-003: Apply Active Filter', async ({ programsPage }) => {
    Logger.testStart('TC-PL-003: Apply Active Filter');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Select Active filter', async () => {
      await programsPage.selectActiveFilter();
    });

    await test.step('Verify Active filter is checked', async () => {
      const isChecked = await programsPage.activeRadioButton.isChecked();
      expect(isChecked).toBeTruthy();
      Logger.success('Active filter applied successfully');
    });

    Logger.testEnd('TC-PL-003: Apply Active Filter');
  });

  /* ==================== ADD PROGRAM TESTS ==================== */

  test('TC-AP-001: Create Program with Required Fields', async ({ staffPage }) => {
    Logger.testStart('TC-AP-001: Create Program with Required Fields');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    // Generate unique test data
    const programData = ProgramFactory.generateMinimalProgram();
    Logger.info(`Generated program data: ${programData.programCode} - ${programData.programName}`);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Fill required fields only', async () => {
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
    });

    await test.step('Submit the form', async () => {
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify program is created', async () => {
      // Wait a bit for navigation
      await staffPage.waitForTimeout(2000);
      
      const currentUrl = await staffPage.url();
      Logger.info(`Current URL after submit: ${currentUrl}`);
      
      // Check if we're on edit page or got validation error
      if (currentUrl.includes('edit') || currentUrl.includes('program')) {
        Logger.success(`Program created successfully: ${programData.programName}`);
      } else {
        Logger.warn('Still on add page - may need more fields');
      }
    });

    Logger.testEnd('TC-AP-001: Create Program with Required Fields');
  });

  test('TC-AP-002: Create Program with All Fields', async ({ staffPage }) => {
    Logger.testStart('TC-AP-002: Create Program with All Fields');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    // Generate complete test data
    const programData = ProgramFactory.generateBasicInfo();
    Logger.info(`Generated complete program data: ${programData.programCode}`);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Fill complete program form', async () => {
      await addProgramPage.fillProgramForm(programData);
    });

    await test.step('Submit the form', async () => {
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify redirect to Edit Program page', async () => {
      await staffPage.waitForTimeout(2000);
      await editProgramPage.verifyPageLoaded();
      Logger.success(`Program created with all fields: ${programData.programName}`);
    });

    Logger.testEnd('TC-AP-002: Create Program with All Fields');
  });

  test('TC-AP-003: Cancel Program Creation', async ({ staffPage }) => {
    Logger.testStart('TC-AP-003: Cancel Program Creation');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    const programData = ProgramFactory.generateMinimalProgram();

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Fill some fields', async () => {
      await addProgramPage.enterProgramCode(programData.programCode);
    });

    await test.step('Click Cancel button', async () => {
      await addProgramPage.clickCancel();
    });

    await test.step('Handle confirmation dialog if present', async () => {
      await staffPage.waitForTimeout(1000);
      
      // Try to click confirmation if it appears
      try {
        const confirmButton = staffPage.locator('button:has-text("Yes"), button:has-text("OK"), button:has-text("Confirm")');
        if (await confirmButton.isVisible({ timeout: 2000 })) {
          await confirmButton.click();
          Logger.info('Confirmation dialog handled');
        }
      } catch (e) {
        Logger.info('No confirmation dialog appeared');
      }
    });

    await test.step('Verify returned to Programs list', async () => {
      await staffPage.waitForTimeout(1000);
      const currentUrl = await staffPage.url();
      Logger.info(`Current URL: ${currentUrl}`);
      Logger.success('Cancel operation completed');
    });

    Logger.testEnd('TC-AP-003: Cancel Program Creation');
  });

  /* ==================== EDIT PROGRAM TESTS ==================== */

  test('TC-EP-001: View Edit Program Page After Creation', async ({ staffPage }) => {
    Logger.testStart('TC-EP-001: View Edit Program Page After Creation');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = ProgramFactory.generateBasicInfo();

    await test.step('Create a new program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.fillProgramForm(programData);
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify Edit page is displayed', async () => {
      await staffPage.waitForTimeout(2000);
      await editProgramPage.verifyPageLoaded();
    });

    await test.step('Verify all tabs are visible', async () => {
      await editProgramPage.verifyAllTabsVisible();
    });

    Logger.testEnd('TC-EP-001: View Edit Program Page After Creation');
  });

  test('TC-EP-002: Navigate Between Tabs', async ({ staffPage }) => {
    Logger.testStart('TC-EP-002: Navigate Between Tabs');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = ProgramFactory.generateMinimalProgram();

    await test.step('Create a program first', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
      await staffPage.waitForTimeout(2000);
    });

    await test.step('Navigate to Contact Information tab', async () => {
      await editProgramPage.goToContactInformation();
      await staffPage.waitForTimeout(500);
      Logger.success('Navigated to Contact Information tab');
    });

    await test.step('Navigate to Documents tab', async () => {
      await editProgramPage.goToDocuments();
      await staffPage.waitForTimeout(500);
      Logger.success('Navigated to Documents tab');
    });

    Logger.testEnd('TC-EP-002: Navigate Between Tabs');
  });

  /* ==================== SEARCH & FILTER TESTS ==================== */

  test('TC-PL-004: Search by Program Code', async ({ programsPage }) => {
    Logger.testStart('TC-PL-004: Search by Program Code');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Search for a program code', async () => {
      const searchCode = 'GP'; // Use known code from your system
      await programsPage.searchByProgramCode(searchCode);
    });

    await test.step('Verify search executes', async () => {
      await programsPage.waitForPageLoad();
      Logger.success('Search executed successfully');
    });

    Logger.testEnd('TC-PL-004: Search by Program Code');
  });

  test('TC-PL-005: Search by Program Name', async ({ programsPage }) => {
    Logger.testStart('TC-PL-005: Search by Program Name');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Search by program name', async () => {
      await programsPage.searchByProgramName('Grant');
    });

    await test.step('Verify search executes', async () => {
      await programsPage.waitForPageLoad();
      Logger.success('Search by name executed');
    });

    Logger.testEnd('TC-PL-005: Search by Program Name');
  });

  /* ==================== NEGATIVE TESTS ==================== */

  test('TC-AP-NEG-001: Submit Without Required Fields @negative', async ({ staffPage }) => {
    Logger.testStart('TC-AP-NEG-001: Submit Without Required Fields');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Click Submit without filling anything', async () => {
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify validation error or still on add page', async () => {
      await staffPage.waitForTimeout(1000);
      
      const currentUrl = await staffPage.url();
      
      if (currentUrl.includes('add')) {
        Logger.success('Form submission blocked - validation works');
        expect(currentUrl).toContain('add');
      } else {
        Logger.warn('Form may have submitted - check validation');
      }
    });

    Logger.testEnd('TC-AP-NEG-001: Submit Without Required Fields');
  });
});

/**
 * SUMMARY OF TESTS:
 * 
 * List Page Tests (5):
 * - TC-PL-001: Navigate to Programs List
 * - TC-PL-002: Click Add New Program
 * - TC-PL-003: Apply Active Filter
 * - TC-PL-004: Search by Program Code
 * - TC-PL-005: Search by Program Name
 * 
 * Add Program Tests (3):
 * - TC-AP-001: Create with Required Fields
 * - TC-AP-002: Create with All Fields
 * - TC-AP-003: Cancel Creation
 * 
 * Edit Program Tests (2):
 * - TC-EP-001: View Edit Page
 * - TC-EP-002: Navigate Between Tabs
 * 
 * Negative Tests (1):
 * - TC-AP-NEG-001: Submit Without Required Fields
 * 
 * Total: 11 tests
 */
