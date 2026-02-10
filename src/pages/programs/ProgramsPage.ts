import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { MainMenu } from "@enums/Enums";
import { Logger } from "@utils/logger";

/**
 * Programs Page Object
 * Handles all program-related actions
 */
export class ProgramsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* ==================== Navigation Methods ==================== */

  /**
   * Click on Programs menu
   */
  async clickOnProgramMenu(): Promise<void> {
    await this.openMenu(MainMenu.PROGRAMS);
    Logger.success('Programs menu opened');
  }

  /* ==================== Action Methods ==================== */

  /**
   * Navigate to Programs page
   */
  async navigateToProgramsPage(): Promise<void> {
    await this.clickOnProgramMenu();
    await this.waitForPageLoad();
  }

  // Add more program-specific methods here as you build out functionality
}
