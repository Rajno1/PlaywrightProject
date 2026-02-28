import { SharedComponents } from "@pages/base/SharedComponents";
import { Page,Locator } from "@playwright/test";
import { DashboardTitles } from '@enums/Enums';


export class IndividualLoginPage extends SharedComponents {

get individualDashboardHeader(): Locator {
    return this.getDashboardTitle(DashboardTitles.INDIVIDUAL_DASHBOARD_TITLE);
  }


    /**
   * Perform individual login
   */
  async individualLogin(username: string, password: string): Promise<void> {
    Logger.step('Performing individual login');
    await this.fillInput(this.usernameInput, username, 'Username');
    await this.fillInput(this.passwordInput, password, 'Password');
    await this.clickElement(this.loginButtonSubmit, 'Login submit button');
    await this.waitForPageLoad();
    Logger.success('Individual login completed');
  }

}