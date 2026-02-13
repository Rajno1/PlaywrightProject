import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { Logger } from '../../utils/logger';

/**
 * Edit Program Page Object
 * Handles all interactions on the Edit Program page
 */
export class EditProgramPage extends BasePage {
  // Page header
  readonly pageHeader: Locator;
  readonly noteMessage: Locator;

  // Left sidebar tabs
  readonly programInformationDetailsTab: Locator;
  readonly contactInformationTab: Locator;
  readonly documentsTab: Locator;
  readonly subProgramsTab: Locator;
  readonly grantsTab: Locator;
  readonly programFundingTab: Locator;
  readonly applicationQuestionsTab: Locator;

  // Collapsible sections
  readonly programBasicInformationSection: Locator;
  readonly requiredTabsSection: Locator;
  readonly supportingDocumentsSection: Locator;
  readonly awardAmountAllocationSection: Locator;

  // Action buttons
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize locators
    this.pageHeader = page.locator('h1:has-text("Edit Program"), h2:has-text("Edit Program")');
    this.noteMessage = page.locator('text=/Note:Please Add At Least One Contact/i');

    // Sidebar tabs
    this.programInformationDetailsTab = page.locator('text=Program Information Details');
    this.contactInformationTab = page.locator('text=Contact Information');
    this.documentsTab = page.locator('text=Documents');
    this.subProgramsTab = page.locator('text=Sub Programs');
    this.grantsTab = page.locator('text=Grants');
    this.programFundingTab = page.locator('text=Program Funding');
    this.applicationQuestionsTab = page.locator('text=Application Questions');

    // Collapsible sections (with + icon)
    this.programBasicInformationSection = page.locator('text=Program Basic Information');
    this.requiredTabsSection = page.locator('text=Required Tabs To Show in Application');
    this.supportingDocumentsSection = page.locator('text=Supporting Documents');
    this.awardAmountAllocationSection = page.locator('text=Award Amount Allocation');

    // Action buttons
    this.submitButton = page.locator('button:has-text("Submit")');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.nextButton = page.locator('button:has-text("Next")');
  }

  /* ==================== Navigation Methods ==================== */

  /**
   * Click on a specific tab
   */
  async clickTab(tabName: string): Promise<void> {
    Logger.step(`Clicking on ${tabName} tab`);
    const tab = this.page.locator(`text=${tabName}`);
    await this.clickElement(tab, `${tabName} tab`);
  }

  /**
   * Navigate to Program Information Details tab
   */
  async goToProgramInformationDetails(): Promise<void> {
    await this.clickElement(this.programInformationDetailsTab, 'Program Information Details tab');
  }

  /**
   * Navigate to Contact Information tab
   */
  async goToContactInformation(): Promise<void> {
    await this.clickElement(this.contactInformationTab, 'Contact Information tab');
  }

  /**
   * Navigate to Documents tab
   */
  async goToDocuments(): Promise<void> {
    await this.clickElement(this.documentsTab, 'Documents tab');
  }

  /**
   * Navigate to Sub Programs tab
   */
  async goToSubPrograms(): Promise<void> {
    await this.clickElement(this.subProgramsTab, 'Sub Programs tab');
  }

  /**
   * Navigate to Grants tab
   */
  async goToGrants(): Promise<void> {
    await this.clickElement(this.grantsTab, 'Grants tab');
  }

  /**
   * Navigate to Program Funding tab
   */
  async goToProgramFunding(): Promise<void> {
    await this.clickElement(this.programFundingTab, 'Program Funding tab');
  }

  /**
   * Navigate to Application Questions tab
   */
  async goToApplicationQuestions(): Promise<void> {
    await this.clickElement(this.applicationQuestionsTab, 'Application Questions tab');
  }

  /* ==================== Section Expansion Methods ==================== */

  /**
   * Get expand/collapse icon for a section
   */
  getSectionToggleIcon(sectionName: string): Locator {
    return this.page.locator(`text=${sectionName}`).locator('..').locator('[class*="plus"], [class*="expand"]');
  }

  /**
   * Expand a collapsible section
   */
  async expandSection(sectionName: string): Promise<void> {
    Logger.step(`Expanding ${sectionName} section`);
    const section = this.page.locator(`text=${sectionName}`);
    const isExpanded = await section.locator('..').locator('[class*="minus"], [class*="collapse"]').isVisible().catch(() => false);
    
    if (!isExpanded) {
      await section.click();
      await this.wait(500);
      Logger.success(`${sectionName} section expanded`);
    } else {
      Logger.info(`${sectionName} section already expanded`);
    }
  }

  /**
   * Collapse a section
   */
  async collapseSection(sectionName: string): Promise<void> {
    Logger.step(`Collapsing ${sectionName} section`);
    const section = this.page.locator(`text=${sectionName}`);
    const isExpanded = await section.locator('..').locator('[class*="minus"], [class*="collapse"]').isVisible().catch(() => false);
    
    if (isExpanded) {
      await section.click();
      await this.wait(500);
      Logger.success(`${sectionName} section collapsed`);
    } else {
      Logger.info(`${sectionName} section already collapsed`);
    }
  }

  /**
   * Expand Program Basic Information
   */
  async expandProgramBasicInformation(): Promise<void> {
    await this.expandSection('Program Basic Information');
  }

  /**
   * Expand Required Tabs To Show in Application
   */
  async expandRequiredTabs(): Promise<void> {
    await this.expandSection('Required Tabs To Show in Application');
  }

  /**
   * Expand Supporting Documents
   */
  async expandSupportingDocuments(): Promise<void> {
    await this.expandSection('Supporting Documents');
  }

  /**
   * Expand Award Amount Allocation
   */
  async expandAwardAmountAllocation(): Promise<void> {
    await this.expandSection('Award Amount Allocation');
  }

  /* ==================== Action Methods ==================== */

  /**
   * Click Submit button
   */
  async clickSubmit(): Promise<void> {
    Logger.step('Clicking Submit button');
    await this.clickElement(this.submitButton, 'Submit button');
    await this.waitForPageLoad();
  }

  /**
   * Click Cancel button
   */
  async clickCancel(): Promise<void> {
    Logger.step('Clicking Cancel button');
    await this.clickElement(this.cancelButton, 'Cancel button');
    await this.waitForPageLoad();
  }

  /**
   * Click Next button
   */
  async clickNext(): Promise<void> {
    Logger.step('Clicking Next button');
    await this.clickElement(this.nextButton, 'Next button');
    await this.waitForPageLoad();
  }

  /* ==================== Verification Methods ==================== */

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<void> {
    await this.verifyElementVisible(this.pageHeader, 'Edit Program page header');
  }

  /**
   * Verify note message appears
   */
  async verifyNoteMessageAppears(): Promise<void> {
    await this.verifyElementVisible(this.noteMessage, 'Note message');
  }

  /**
   * Verify all tabs are visible
   */
  async verifyAllTabsVisible(): Promise<void> {
    Logger.step('Verifying all tabs are visible');
    
    await this.verifyElementVisible(this.programInformationDetailsTab, 'Program Information Details tab');
    await this.verifyElementVisible(this.contactInformationTab, 'Contact Information tab');
    await this.verifyElementVisible(this.documentsTab, 'Documents tab');
    await this.verifyElementVisible(this.subProgramsTab, 'Sub Programs tab');
    await this.verifyElementVisible(this.grantsTab, 'Grants tab');
    await this.verifyElementVisible(this.programFundingTab, 'Program Funding tab');
    await this.verifyElementVisible(this.applicationQuestionsTab, 'Application Questions tab');
    
    Logger.success('All tabs are visible');
  }

  /**
   * Verify all sections are visible
   */
  async verifyAllSectionsVisible(): Promise<void> {
    Logger.step('Verifying all sections are visible');
    
    await this.verifyElementVisible(this.programBasicInformationSection, 'Program Basic Information section');
    await this.verifyElementVisible(this.requiredTabsSection, 'Required Tabs section');
    await this.verifyElementVisible(this.supportingDocumentsSection, 'Supporting Documents section');
    await this.verifyElementVisible(this.awardAmountAllocationSection, 'Award Amount Allocation section');
    
    Logger.success('All sections are visible');
  }

  /**
   * Get active tab name
   */
  async getActiveTab(): Promise<string | null> {
    const activeTab = this.page.locator('.active[role="tab"], .tab.active, .selected-tab').first();
    if (await this.isElementVisible(activeTab, 2000)) {
      return await activeTab.textContent();
    }
    return null;
  }

  /**
   * Verify specific tab is active
   */
  async verifyTabIsActive(tabName: string): Promise<void> {
    const activeTab = await this.getActiveTab();
    if (activeTab?.includes(tabName)) {
      Logger.success(`${tabName} tab is active`);
    } else {
      Logger.warn(`Expected ${tabName} to be active, but got: ${activeTab}`);
    }
  }

  /**
   * Get program name from header
   */
  async getProgramNameFromHeader(): Promise<string | null> {
    const headerText = await this.pageHeader.textContent();
    return headerText;
  }
}