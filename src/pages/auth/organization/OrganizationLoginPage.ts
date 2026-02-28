import { SharedComponents } from "@pages/base/SharedComponents";
import { Page, Locator } from "@playwright/test";
import { DashboardTitles } from '@enums/Enums';

export class OrganizationLoginPage extends SharedComponents {

    readonly organizationDropdown: Locator;



  constructor(page: Page) {
    super(page);

    this.organizationDropdown = page.locator('#id_org');

    
  }

   get organizationDashboardHeader(): Locator {
    return this.getDashboardTitle(DashboardTitles.ORGANIZATION_DASHBOARD_TITLE);
  }

      /* ==================== Organization Login Methods ==================== */
    
      /**
       * Perform organization login
       */
      async organizationLogin(username: string, password: string, organization: string): Promise<void> {
        Logger.step('Performing organization login');
        await this.fillInput(this.usernameInput, username, 'Username');
        await this.fillInput(this.passwordInput, password, 'Password');
        await this.selectOption(this.organizationDropdown, organization, 'Organization');
        await this.clickElement(this.loginButtonSubmit, 'Login submit button');
        await this.waitForPageLoad();
        Logger.success('Organization login completed');
      }
    
}