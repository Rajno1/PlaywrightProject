import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '../../utils/logger';

/**
 * Programs List Page Object
 * Handles all interactions on the Programs listing page
 */
export class ProgramsPage extends BasePage {
  
  // Header elements
  readonly addNewProgramButton: Locator;
  readonly programsHeader: Locator;

  // Filter radio buttons
  readonly activeRadioButton: Locator;
  readonly inactiveRadioButton: Locator;
  readonly allRadioButton: Locator;

  // Table elements
  readonly selectAllCheckbox: Locator;
  readonly programCodeHeader: Locator;
  readonly programNameHeader: Locator;
  readonly actionsHeader: Locator;

  // Search/Filter
  readonly programCodeSearchInput: Locator;
  readonly programNameSearchInput: Locator;

  // Pagination
  readonly firstPageButton: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly lastPageButton: Locator;
  readonly pageInfo: Locator;
  readonly rowsPerPageDropdown: Locator;

  // Action buttons
  readonly deleteButton: Locator;
  readonly exportButton: Locator;
  readonly chooseFormatDropdown: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.addNewProgramButton = page.locator('a:has-text("Add New Program")');
    this.programsHeader = page.locator('div:has-text("Programs")').first();

    // Filter radio buttons
    this.activeRadioButton = page.locator('input[value="Active"]:visible');
    this.inactiveRadioButton = page.locator('input[value="Inactive"]:visible');
    this.allRadioButton = page.locator('input[value="All"]:visible');

    // Table headers
    this.selectAllCheckbox = page.locator('th:has-text("Select All") input[type="checkbox"]');
    this.programCodeHeader = page.locator('th:has-text("Program Code")');
    this.programNameHeader = page.locator('th:has-text("Program")');
    this.actionsHeader = page.locator('th:has-text("Actions")');

    // Search inputs
    this.programCodeSearchInput = page.locator('input[placeholder="Program Code"]');
    this.programNameSearchInput = page.locator('input[placeholder="Program"]');

    // Pagination
    this.firstPageButton = page.locator('button:has-text("First")');
    this.previousPageButton = page.locator('button:has-text("Previous")');
    this.nextPageButton = page.locator('button:has-text("Next")');
    this.lastPageButton = page.locator('button:has-text("Last")');
    this.pageInfo = page.locator('text=/Showing \\d+ To \\d+ Of \\d+ Entries/');
    this.rowsPerPageDropdown = page.locator('select').first();

    // Action buttons
    this.deleteButton = page.locator('button:has-text("Delete")');
    this.exportButton = page.locator('button:has-text("Export")');
    this.chooseFormatDropdown = page.locator('button:has-text("Choose Format")');
  }

  /* ==================== Navigation Methods ==================== */

  /**
   * Navigate to Programs list page
   */
  async navigateToProgramsPage(): Promise<void> {
    Logger.step('Navigating to Programs page');
    await this.openMenu('Programs');
    await this.waitForPageLoad();
  }

  /**
   * Click Add New Program button
   */
  async clickAddNewProgram(): Promise<void> {
    Logger.step('Clicking Add New Program button');
    await this.clickElement(this.addNewProgramButton, 'Add New Program button');
  }

  /* ==================== Filter Methods ==================== */

  /**
   * Select Active filter
   */
  async selectActiveFilter(): Promise<void> {
    Logger.step('Selecting Active filter');
    await this.activeRadioButton.check();
    await this.waitForPageLoad();
  }

  /**
   * Select Inactive filter
   */
  async selectInactiveFilter(): Promise<void> {
    Logger.step('Selecting Inactive filter');
    await this.inactiveRadioButton.check();
    await this.waitForPageLoad();
  }

  /**
   * Select All filter
   */
  async selectAllFilter(): Promise<void> {
    Logger.step('Selecting All filter');
    await this.allRadioButton.check();
    await this.waitForPageLoad();
  }

  /* ==================== Search Methods ==================== */

  /**
   * Search by program code
   */
  async searchByProgramCode(code: string): Promise<void> {
    Logger.step(`Searching for program code: ${code}`);
    await this.fillInput(this.programCodeSearchInput, code, 'Program Code search');
    await this.waitForPageLoad();
  }

  /**
   * Search by program name
   */
  async searchByProgramName(name: string): Promise<void> {
    Logger.step(`Searching for program name: ${name}`);
    await this.fillInput(this.programNameSearchInput, name, 'Program Name search');
    await this.waitForPageLoad();
  }

  /* ==================== Table Methods ==================== */

  /**
   * Get program row by code
   */
  getProgramRow(programCode: string): Locator {
    return this.page.locator(`tr:has-text("${programCode}")`);
  }

  /**
   * Get program checkbox
   */
  getProgramCheckbox(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('input[type="checkbox"]');
  }

  /**
   * Select program by code
   */
  async selectProgram(programCode: string): Promise<void> {
    Logger.step(`Selecting program: ${programCode}`);
    const checkbox = this.getProgramCheckbox(programCode);
    await checkbox.check();
  }

  /**
   * Get view icon for program
   */
  getProgramViewIcon(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('a[title="View"], .fa-eye').first();
  }

  /**
   * Get edit icon for program
   */
  getProgramEditIcon(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('a[title="Edit"], .fa-edit').first();
  }

  /**
   * Get copy icon for program
   */
  getProgramCopyIcon(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('a[title="Copy"], .fa-copy').first();
  }

  /**
   * Get delete icon for program
   */
  getProgramDeleteIcon(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('a[title="Delete"], .fa-trash').first();
  }

  /**
   * Get toggle icon for program (activate/deactivate)
   */
  getProgramToggleIcon(programCode: string): Locator {
    return this.getProgramRow(programCode).locator('.fa-toggle-on, .fa-toggle-off').first();
  }

  /**
   * Click view program
   */
  async viewProgram(programCode: string): Promise<void> {
    Logger.step(`Viewing program: ${programCode}`);
    await this.getProgramViewIcon(programCode).click();
    await this.waitForPageLoad();
  }

  /**
   * Click edit program
   */
  async editProgram(programCode: string): Promise<void> {
    Logger.step(`Editing program: ${programCode}`);
    await this.getProgramEditIcon(programCode).click();
    await this.waitForPageLoad();
  }

  /**
   * Click copy program
   */
  async copyProgram(programCode: string): Promise<void> {
    Logger.step(`Copying program: ${programCode}`);
    await this.getProgramCopyIcon(programCode).click();
    await this.waitForPageLoad();
  }

  /**
   * Click delete program
   */
  async deleteProgram(programCode: string): Promise<void> {
    Logger.step(`Deleting program: ${programCode}`);
    await this.getProgramDeleteIcon(programCode).click();
    // Wait for confirmation dialog if any
    await this.wait(1000);
  }

  /**
   * Toggle program status
   */
  async toggleProgramStatus(programCode: string): Promise<void> {
    Logger.step(`Toggling status for program: ${programCode}`);
    await this.getProgramToggleIcon(programCode).click();
    await this.waitForPageLoad();
  }

  /* ==================== Pagination Methods ==================== */

  /**
   * Go to first page
   */
  async goToFirstPage(): Promise<void> {
    Logger.step('Going to first page');
    await this.firstPageButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Go to next page
   */
  async goToNextPage(): Promise<void> {
    Logger.step('Going to next page');
    await this.nextPageButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Go to previous page
   */
  async goToPreviousPage(): Promise<void> {
    Logger.step('Going to previous page');
    await this.previousPageButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Go to last page
   */
  async goToLastPage(): Promise<void> {
    Logger.step('Going to last page');
    await this.lastPageButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Set rows per page
   */
  async setRowsPerPage(rows: string): Promise<void> {
    Logger.step(`Setting rows per page to: ${rows}`);
    await this.rowsPerPageDropdown.selectOption(rows);
    await this.waitForPageLoad();
  }

  /* ==================== Verification Methods ==================== */

  /**
   * Verify program exists in table
   */
  async verifyProgramExists(programCode: string): Promise<boolean> {
    const row = this.getProgramRow(programCode);
    return await this.isElementVisible(row);
  }

  /**
   * Get program count from page info
   */
  async getTotalProgramCount(): Promise<number> {
    const text = await this.pageInfo.textContent();
    const match = text?.match(/Of (\d+) Entries/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Verify Add New Program button is visible
   */
  async verifyAddNewProgramButtonVisible(): Promise<void> {
    await this.verifyElementVisible(this.addNewProgramButton, 'Add New Program button');
  }
}