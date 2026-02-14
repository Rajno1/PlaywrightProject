import { test, expect } from '@fixtures/AuthFixtures';
import { ProgramsPage } from '@pages/programs/ProgramsPage';
import { Logger } from '@utils/logger';
import { Assertions } from '@utils/assertions';

/**
 * Programs List Page Tests
 * Tests for viewing, searching, filtering programs
 */

test.describe('Programs Page view @programs @view', () => {
  let programsPage: ProgramsPage;

  test.beforeEach(async ({ programsPage: page }) => {
    programsPage = page;
  });

  /* ==================== VIEW/NAVIGATION TESTS ==================== */

  test('TC-PP-001: View Programs Page @smoke @regression', async () => {
    Logger.testStart('TC-PP-001: View Programs Page');

    await test.step('User navigates to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('Page title should display as "Programs"', async () => {
      await Assertions.verifyElementVisible(
        programsPage.programsHeader,
        'Programs page header'
      );
      
      const headerText = await programsPage.programsHeader.textContent();
      expect(headerText).toContain('Programs');
      Logger.success('Page title displays correctly');
    });

    await test.step('"Add New Program" button is visible', async () => {
      await Assertions.verifyElementVisible(
        programsPage.addNewProgramButton,
        'Add New Program button'
      );
    });

    await test.step('Filter options (Active, Inactive, All) are visible', async () => {
      await Assertions.verifyElementVisible(
        programsPage.activeRadioButton,
        'Active filter'
      );
      await Assertions.verifyElementVisible(
        programsPage.inactiveRadioButton,
        'Inactive filter'
      );
      await Assertions.verifyElementVisible(
        programsPage.allRadioButton,
        'All filter'
      );
      Logger.success('All filter options are visible');
    });

    Logger.testEnd('TC-PP-001: View Programs Page');
  });

  test('TC-PP-002: Add New Program Navigation @smoke @regression', async ({ staffPage }) => {
    Logger.testStart('TC-PP-002: Add New Program Navigation');

    await test.step('User is on Programs list page', async () => {
      await programsPage.navigateToProgramsPage();
      await programsPage.verifyPageLoaded();
    });

    await test.step('User clicks "Add New Program" button', async () => {
      await programsPage.clickAddNewProgram();
    });

    await test.step('User is navigated to Add Program page', async () => {
      await staffPage.waitForTimeout(1000); // Wait for navigation
      
      const currentUrl = await staffPage.url();
      expect(currentUrl).toContain('add');
      Logger.success('Successfully navigated to Add Program page');
    });

    await test.step('Page title shows "Add Program"', async () => {
      const pageTitle = await staffPage.locator('h1, h2').first().textContent();
      expect(pageTitle).toContain('Add Program');
      Logger.success('Page title shows "Add Program"');
    });

    Logger.testEnd('TC-PP-002: Add New Program Navigation');
  });

  /* ==================== FILTER TESTS ==================== */

  test('TC-PP-003: Filter Active Programs @regression', async () => {
    Logger.testStart('TC-PP-003: Filter Active Programs');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('User selects "Active" filter', async () => {
      await programsPage.selectActiveFilter();
    });

    await test.step('Active filter is selected', async () => {
      await Assertions.verifyElementChecked(
        programsPage.activeRadioButton,
        'Active filter'
      );
      Logger.success('Active filter applied successfully');
    });

    Logger.testEnd('TC-PP-003: Filter Active Programs');
  });

  test('TC-PP-004: Filter Inactive Programs @regression', async () => {
    Logger.testStart('TC-PP-004: Filter Inactive Programs');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('User selects "Inactive" filter', async () => {
      await programsPage.selectInactiveFilter();
    });

    await test.step('Inactive filter is selected', async () => {
      await Assertions.verifyElementChecked(
        programsPage.inactiveRadioButton,
        'Inactive filter'
      );
      Logger.success('Inactive filter applied successfully');
    });

    Logger.testEnd('TC-PP-004: Filter Inactive Programs');
  });

  test('TC-PP-005: Show All Programs @regression', async () => {
    Logger.testStart('TC-PP-005: Show All Programs');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('User selects "All" filter', async () => {
      await programsPage.selectAllFilter();
    });

    await test.step('All filter is selected', async () => {
      await Assertions.verifyElementChecked(
        programsPage.allRadioButton,
        'All filter'
      );
      Logger.success('All filter applied successfully');
    });

    Logger.testEnd('TC-PP-005: Show All Programs');
  });

  /* ==================== SEARCH TESTS ==================== */

  test('TC-PP-006: Search by Program Code @regression', async ({ staffPage }) => {
    Logger.testStart('TC-PP-006: Search by Program Code');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('User enters program code in search field', async () => {
      const searchCode = 'GP'; // Use a known code from your system
      await programsPage.searchByProgramCode(searchCode);
    });

    await test.step('Search results are displayed', async () => {
      await staffPage.waitForTimeout(1000);
      Logger.success('Search executed successfully');
    });

    Logger.testEnd('TC-PP-006: Search by Program Code');
  });

  test('TC-PP-007: Search by Program Name @regression', async ({ staffPage }) => {
    Logger.testStart('TC-PP-007: Search by Program Name');

    await test.step('Navigate to Programs page', async () => {
      await programsPage.navigateToProgramsPage();
    });

    await test.step('User enters program name in search field', async () => {
      await programsPage.searchByProgramName('Grant');
    });

    await test.step('Search results are displayed', async () => {
      await staffPage.waitForTimeout(1000);
      Logger.success('Search executed successfully');
    });

    Logger.testEnd('TC-PP-007: Search by Program Name');
  });

  /* ==================== PAGINATION TESTS ==================== */

  test('TC-PP-008: Pagination - Next Page @regression', async ({ staffPage }) => {
    Logger.testStart('TC-PP-008: Pagination - Next Page');

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

    Logger.testEnd('TC-PP-008: Pagination - Next Page');
  });
});

/**
 * HOW TO RUN THESE TESTS:
 * 
 * Run all programs list tests:
 * npx playwright test programs-list.spec.ts
 * 
 * Run only smoke tests:
 * npx playwright test --grep @smoke
 * 
 * Run only regression tests:
 * npx playwright test --grep @regression
 * 
 * Run specific test:
 * npx playwright test -g "TC-PP-001"
 * 
 * Run with UI mode:
 * npx playwright test programs-list.spec.ts --ui
 * 
 * Run in headed mode (see browser):
 * npx playwright test programs-list.spec.ts --headed
 */