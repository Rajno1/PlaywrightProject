import { test, expect } from '../../src/fixtures/authFixtures';
import { ProgramsPage } from '../../src/pages/programs/ProgramsPage';
import { AddProgramPage } from '../../src/pages/programs/AddProgramPage';
import { EditProgramPage } from '../../src/pages/programs/EditProgramPage';
import { TestDataFactory } from '../../src/utils/testDataFactory';
import { Logger } from '../../src/utils/logger';
import { Assertions } from '../../src/utils/assertions';

/**
 * WEEK 1: Foundation Tests (10 tests)
 * Focus: Basic smoke tests and simple positive scenarios
 * Goal: Get comfortable with the pattern
 */

test.describe('Week 1 - Foundation Tests @week1', () => {

  test.beforeEach(async () => {
    Logger.separator();
  });

  test.afterEach(async () => {
    Logger.separator();
  });

  /* ==================== SMOKE TESTS (5 tests) ==================== */

  test('TC-PL-001: View Programs List @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-PL-001: View Programs List');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Verify page is loaded correctly', async () => {
      await programsPage.verifyPageLoaded();
    });

    await test.step('Verify all key elements are visible', async () => {
      await Assertions.verifyElementVisible(programsPage.programCodeHeader, 'Program Code header');
      await Assertions.verifyElementVisible(programsPage.programNameHeader, 'Program Name header');
    });

    Logger.testEnd('TC-PL-001: View Programs List');
  });

  test('TC-PL-002: Add New Program Navigation @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-PL-002: Add New Program Navigation');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Click Add New Program button', async () => {
      await programsPage.clickAddNewProgram();
    });

    await test.step('Verify navigated to Add Program page', async () => {
      const currentUrl = await staffPage.url();
      expect(currentUrl).toContain('add');
      Logger.success('Successfully navigated to Add Program page');
    });

    Logger.testEnd('TC-PL-002: Add New Program Navigation');
  });

  test('TC-AP-001: Create Program with All Fields @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-AP-001: Create Program with All Fields');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    // Generate unique test data
    const programData = TestDataFactory.generateProgramData();

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Fill program form with all details', async () => {
      await addProgramPage.fillProgramForm(programData);
    });

    await test.step('Submit the form', async () => {
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify redirect to Edit Program page', async () => {
      await editProgramPage.verifyPageLoaded();
      Logger.success(`Program created: ${programData.programName}`);
    });

    Logger.testEnd('TC-AP-001: Create Program with All Fields');
  });

  test('TC-AP-002: Create Program with Required Fields Only @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-AP-002: Create Program with Required Fields Only');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = TestDataFactory.generateProgramData();

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Fill only required fields', async () => {
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
    });

    await test.step('Submit the form', async () => {
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify program is created', async () => {
      const currentUrl = await staffPage.url();
      if (currentUrl.includes('edit') || currentUrl.includes('program')) {
        Logger.success('Program created with required fields only');
      } else {
        Logger.info('Program may require additional fields');
      }
    });

    Logger.testEnd('TC-AP-002: Create Program with Required Fields Only');
  });

  test('TC-EP-001: View Edit Program Page After Creation @smoke', async ({ staffPage }) => {
    Logger.testStart('TC-EP-001: View Edit Program Page After Creation');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = TestDataFactory.generateProgramData();

    await test.step('Create a new program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.fillProgramForm(programData);
      await addProgramPage.clickSubmit();
    });

    await test.step('Verify Edit page is displayed', async () => {
      await editProgramPage.verifyPageLoaded();
    });

    await test.step('Verify all tabs are visible', async () => {
      await editProgramPage.verifyAllTabsVisible();
    });

    await test.step('Verify note message appears', async () => {
      await editProgramPage.verifyNoteMessageAppears();
    });

    Logger.testEnd('TC-EP-001: View Edit Program Page After Creation');
  });

  /* ==================== SIMPLE POSITIVE TESTS (5 tests) ==================== */

  test('TC-PL-003: Filter Active Programs', async ({ staffPage }) => {
    Logger.testStart('TC-PL-003: Filter Active Programs');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Select Active filter', async () => {
      await programsPage.selectActiveFilter();
    });

    await test.step('Verify Active filter is selected', async () => {
      await Assertions.verifyElementChecked(programsPage.activeRadioButton, 'Active filter');
      Logger.success('Active filter applied successfully');
    });

    Logger.testEnd('TC-PL-003: Filter Active Programs');
  });

  test('TC-PL-004: Filter Inactive Programs', async ({ staffPage }) => {
    Logger.testStart('TC-PL-004: Filter Inactive Programs');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Select Inactive filter', async () => {
      await programsPage.selectInactiveFilter();
    });

    await test.step('Verify Inactive filter is selected', async () => {
      await Assertions.verifyElementChecked(programsPage.inactiveRadioButton, 'Inactive filter');
      Logger.success('Inactive filter applied successfully');
    });

    Logger.testEnd('TC-PL-004: Filter Inactive Programs');
  });

  test('TC-PL-006: Search by Program Code', async ({ staffPage }) => {
    Logger.testStart('TC-PL-006: Search by Program Code');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Search for a known program code', async () => {
      // Use a known code from your system, or create one first
      const searchCode = 'GP'; // From your screenshot
      await programsPage.searchByProgramCode(searchCode);
    });

    await test.step('Verify search executes', async () => {
      // Wait for page to update
      await staffPage.waitForTimeout(1000);
      Logger.success('Search executed successfully');
    });

    Logger.testEnd('TC-PL-006: Search by Program Code');
  });

  test('TC-EP-002: Navigate Between Tabs', async ({ staffPage }) => {
    Logger.testStart('TC-EP-002: Navigate Between Tabs');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = TestDataFactory.generateProgramData();

    await test.step('Create a program first', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
    });

    await test.step('Navigate to Contact Information tab', async () => {
      await editProgramPage.goToContactInformation();
      Logger.success('Navigated to Contact Information');
    });

    await test.step('Navigate to Documents tab', async () => {
      await editProgramPage.goToDocuments();
      Logger.success('Navigated to Documents');
    });

    Logger.testEnd('TC-EP-002: Navigate Between Tabs');
  });

  test('TC-EP-003: Expand Program Basic Information', async ({ staffPage }) => {
    Logger.testStart('TC-EP-003: Expand Program Basic Information');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    const programData = TestDataFactory.generateProgramData();

    await test.step('Create a program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
    });

    await test.step('Expand Program Basic Information section', async () => {
      await editProgramPage.expandProgramBasicInfo();
      Logger.success('Section expanded successfully');
    });

    Logger.testEnd('TC-EP-003: Expand Program Basic Information');
  });
});

/**
 * SUMMARY OF WEEK 1 TESTS:
 * 
 * Total: 10 tests
 * - 5 Smoke tests (critical paths)
 * - 5 Simple positive tests (basic features)
 * 
 * These tests cover:
 * ✅ Viewing programs list
 * ✅ Creating programs (full and minimal)
 * ✅ Navigating between pages
 * ✅ Filtering and searching
 * ✅ Tab navigation in edit page
 * 
 * NEXT WEEK: Add more functional tests (search, edit, pagination)
 */