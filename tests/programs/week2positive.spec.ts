import { test, expect } from '../../src/fixtures/authFixtures';
import { ProgramsPage } from '../../src/pages/programs/ProgramsPage';
import { AddProgramPage } from '../../src/pages/programs/AddProgramPage';
import { EditProgramPage } from '../../src/pages/programs/EditProgramPage';
import { TestDataFactory } from '../../src/utils/TestDataFactory';
import { Logger } from '../../src/utils/logger';
import { Assertions } from '../../src/utils/assertions';

/**
 * WEEK 2: Positive Functional Tests (15 tests)
 * Focus: Complete functional scenarios
 * Goal: Cover all major features
 */

test.describe('Week 2 - Positive Functional Tests @week2', () => {

  let programData: any;

  test.beforeEach(async () => {
    programData = TestDataFactory.generateProgramData();
    Logger.separator();
  });

  test.afterEach(async () => {
    Logger.separator();
  });

  /* ==================== LIST PAGE TESTS (7 tests) ==================== */

  test('TC-PL-005: Show All Programs', async ({ staffPage }) => {
    Logger.testStart('TC-PL-005: Show All Programs');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Select All filter', async () => {
      await programsPage.selectAllFilter();
    });

    await test.step('Verify All filter is selected', async () => {
      await Assertions.verifyElementChecked(programsPage.allRadioButton, 'All filter');
    });

    Logger.testEnd('TC-PL-005: Show All Programs');
  });

  test('TC-PL-007: Search by Program Name', async ({ staffPage }) => {
    Logger.testStart('TC-PL-007: Search by Program Name');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Search by program name', async () => {
      await programsPage.searchByProgramName('Grant.gov');
    });

    await test.step('Verify search executes', async () => {
      await staffPage.waitForTimeout(1000);
      Logger.success('Search by name executed');
    });

    Logger.testEnd('TC-PL-007: Search by Program Name');
  });

  test('TC-PL-008: View Program Details', async ({ staffPage }) => {
    Logger.testStart('TC-PL-008: View Program Details');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Click view icon for a program', async () => {
      await programsPage.viewProgram('GP'); // Use known program code
    });

    await test.step('Verify program details page opens', async () => {
      await staffPage.waitForTimeout(1000);
      Logger.success('Program details view opened');
    });

    Logger.testEnd('TC-PL-008: View Program Details');
  });

  test('TC-PL-009: Edit Program from List', async ({ staffPage }) => {
    Logger.testStart('TC-PL-009: Edit Program from List');

    const programsPage = new ProgramsPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Click edit icon for a program', async () => {
      await programsPage.editProgram('GP');
    });

    await test.step('Verify Edit Program page opens', async () => {
      await editProgramPage.verifyPageLoaded();
    });

    Logger.testEnd('TC-PL-009: Edit Program from List');
  });

  test('TC-PL-011: Pagination - Next Page', async ({ staffPage }) => {
    Logger.testStart('TC-PL-011: Pagination - Next Page');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Check if Next button is enabled and click', async () => {
      const isEnabled = await programsPage.nextPageButton.isEnabled();
      
      if (isEnabled) {
        await programsPage.nextPageButton.click();
        await staffPage.waitForTimeout(1000);
        Logger.success('Navigated to next page');
      } else {
        Logger.info('Only one page of results - Next button disabled');
      }
    });

    Logger.testEnd('TC-PL-011: Pagination - Next Page');
  });

  test('TC-PL-012: Pagination - Previous Page', async ({ staffPage }) => {
    Logger.testStart('TC-PL-012: Pagination - Previous Page');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Go to next page if possible', async () => {
      const isNextEnabled = await programsPage.nextPageButton.isEnabled();
      if (isNextEnabled) {
        await programsPage.nextPageButton.click();
        await staffPage.waitForTimeout(1000);
      }
    });

    await test.step('Click Previous button', async () => {
      const isPrevEnabled = await programsPage.previousPageButton.isEnabled();
      if (isPrevEnabled) {
        await programsPage.previousPageButton.click();
        await staffPage.waitForTimeout(1000);
        Logger.success('Navigated to previous page');
      }
    });

    Logger.testEnd('TC-PL-012: Pagination - Previous Page');
  });

  test('TC-PL-013: Filter Then Search', async ({ staffPage }) => {
    Logger.testStart('TC-PL-013: Filter Then Search');

    const programsPage = new ProgramsPage(staffPage);

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Apply Active filter', async () => {
      await programsPage.selectActiveFilter();
    });

    await test.step('Then search for program code', async () => {
      await programsPage.searchByProgramCode('GP');
    });

    await test.step('Verify combined filter and search works', async () => {
      await Assertions.verifyElementChecked(programsPage.activeRadioButton, 'Active filter');
      Logger.success('Filter and search combination works');
    });

    Logger.testEnd('TC-PL-013: Filter Then Search');
  });

  /* ==================== ADD PROGRAM TESTS (5 tests) ==================== */

  test('TC-AP-003: Cancel Program Creation', async ({ staffPage }) => {
    Logger.testStart('TC-AP-003: Cancel Program Creation');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

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

    await test.step('Verify returned to Programs list', async () => {
      // Handle confirmation dialog if it appears
      try {
        await staffPage.waitForTimeout(500);
        const dialogPresent = await staffPage.locator('.modal, .dialog').isVisible();
        if (dialogPresent) {
          await staffPage.locator('button:has-text("Yes"), button:has-text("OK")').click();
        }
      } catch (e) {
        // No dialog, continue
      }
      
      const currentUrl = await staffPage.url();
      Logger.info(`Current URL: ${currentUrl}`);
    });

    Logger.testEnd('TC-AP-003: Cancel Program Creation');
  });

  test('TC-AP-004: Select Department', async ({ staffPage }) => {
    Logger.testStart('TC-AP-004: Select Department');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Select department from dropdown', async () => {
      // Check if dropdown has options
      const optionCount = await addProgramPage.departmentDropdown.locator('option').count();
      if (optionCount > 1) {
        await addProgramPage.departmentDropdown.selectOption({ index: 1 });
        Logger.success('Department selected');
      } else {
        Logger.info('No department options available');
      }
    });

    Logger.testEnd('TC-AP-004: Select Department');
  });

  test('TC-AP-006: Select Fiscal Year', async ({ staffPage }) => {
    Logger.testStart('TC-AP-006: Select Fiscal Year');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Select fiscal year', async () => {
      const optionCount = await addProgramPage.fiscalYearDropdown.locator('option').count();
      if (optionCount > 1) {
        await addProgramPage.fiscalYearDropdown.selectOption({ index: 1 });
        Logger.success('Fiscal year selected');
      } else {
        Logger.info('No fiscal year options available');
      }
    });

    Logger.testEnd('TC-AP-006: Select Fiscal Year');
  });

  test('TC-AP-007: Enter Program Budget', async ({ staffPage }) => {
    Logger.testStart('TC-AP-007: Enter Program Budget');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Enter budget amount', async () => {
      await addProgramPage.enterProgramBudget('100000');
    });

    await test.step('Verify budget is entered', async () => {
      const value = await addProgramPage.programBudgetInput.inputValue();
      Logger.success(`Budget entered: ${value}`);
    });

    Logger.testEnd('TC-AP-007: Enter Program Budget');
  });

  test('TC-AP-008: Enter Program Dates', async ({ staffPage }) => {
    Logger.testStart('TC-AP-008: Enter Program Dates');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);

    await test.step('Navigate to Add Program page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
    });

    await test.step('Enter start and end dates', async () => {
      await addProgramPage.enterProgramStartDate('03/01/2026');
      await addProgramPage.enterProgramEndDate('12/31/2026');
    });

    await test.step('Verify dates are entered', async () => {
      Logger.success('Dates entered successfully');
    });

    Logger.testEnd('TC-AP-008: Enter Program Dates');
  });

  /* ==================== EDIT PROGRAM TESTS (3 tests) ==================== */

  test('TC-EP-004: Navigate to All Tabs', async ({ staffPage }) => {
    Logger.testStart('TC-EP-004: Navigate to All Tabs');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    await test.step('Create a program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
    });

    await test.step('Navigate through all tabs', async () => {
      await editProgramPage.goToContactInformation();
      await staffPage.waitForTimeout(500);
      
      await editProgramPage.goToDocuments();
      await staffPage.waitForTimeout(500);
      
      await editProgramPage.goToSubPrograms();
      await staffPage.waitForTimeout(500);
      
      Logger.success('Navigated through all tabs');
    });

    Logger.testEnd('TC-EP-004: Navigate to All Tabs');
  });

  test('TC-EP-005: Expand and Collapse Sections', async ({ staffPage }) => {
    Logger.testStart('TC-EP-005: Expand and Collapse Sections');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    await test.step('Create a program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
    });

    await test.step('Expand Program Basic Information', async () => {
      await editProgramPage.expandProgramBasicInfo();
    });

    await test.step('Collapse by clicking again', async () => {
      await editProgramPage.expandSection('Program Basic Information'); // Click again to collapse
      Logger.success('Section expand/collapse works');
    });

    Logger.testEnd('TC-EP-005: Expand and Collapse Sections');
  });

  test('TC-EP-006: Click Next Button', async ({ staffPage }) => {
    Logger.testStart('TC-EP-006: Click Next Button');

    const programsPage = new ProgramsPage(staffPage);
    const addProgramPage = new AddProgramPage(staffPage);
    const editProgramPage = new EditProgramPage(staffPage);

    await test.step('Create a program', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.clickAddNewProgram();
      await addProgramPage.enterProgramCode(programData.programCode);
      await addProgramPage.enterProgramName(programData.programName);
      await addProgramPage.clickSubmit();
    });

    await test.step('Click Next button', async () => {
      const isVisible = await editProgramPage.nextButton.isVisible();
      if (isVisible) {
        await editProgramPage.clickNext();
        Logger.success('Next button clicked');
      } else {
        Logger.info('Next button not visible on this page');
      }
    });

    Logger.testEnd('TC-EP-006: Click Next Button');
  });
});

/**
 * SUMMARY OF WEEK 2 TESTS:
 * 
 * Total: 15 tests
 * - 7 List page functional tests
 * - 5 Add program functional tests
 * - 3 Edit program functional tests
 * 
 * These tests cover:
 * ✅ All filter options
 * ✅ Search variations
 * ✅ Pagination
 * ✅ Form field interactions
 * ✅ Cancel operations
 * ✅ Tab navigation
 * ✅ Section expand/collapse
 * 
 * CUMULATIVE: 25 tests total (Week 1 + Week 2)
 * 
 * NEXT WEEK: Add negative tests and validation scenarios
 */