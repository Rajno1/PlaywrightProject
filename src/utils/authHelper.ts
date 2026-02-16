import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login/LoginPage';
import { UserRole } from '../types';
import { Logger } from './logger';

/**
 * Authentication Helper
 * Handles login for different user roles
 */
export async function loginAs(page: Page, role: UserRole): Promise<void> {
  const loginPage = new LoginPage(page);

  try {
    Logger.info(`Attempting login as: ${role}`);
    
    await loginPage.gotoPublicPage();
    await loginPage.clickOnLogin();

    switch (role) {
      case 'staff':
        await loginPage.clickOnStaffPortalLoginLink();
        await loginPage.staffLogin(
          process.env.STAFF_USERNAME!,
          process.env.STAFF_PASSWORD!
        );
        Logger.success('Staff login successful');
        break;

      case 'Organization':
        await loginPage.clickOnOrganizationPortalLoginLink();
        await loginPage.organizationLogin(
          process.env.ORG_USERNAME!, // ! =' i promise this exist'
          process.env.ORG_PASSWORD!,
          process.env.ORG_NAME!
        );
        Logger.success('Organization login successful');
        break;

      case 'individual':
        await loginPage.clickOnIndividualLoginLink();
        await loginPage.individualLogin(
          process.env.IND_USERNAME!,
          process.env.IND_PASSWORD!
        );
        Logger.success('Individual login successful');
        break;

      default:
        throw new Error(`Unknown role: ${role}`);

        // await page.waitForLoadState('networkidle');
        // Logger.success(`${role} login successful`);
    }
  } catch (error) {
    Logger.error(`Login failed for role: ${role}`, error);
    throw error;
  }
}

/**
 * Validate environment variables
 */
export function validateEnvVariables(): void {
  const requiredVars = [
    'ISSI_GMS_URL',
    'STAFF_USERNAME',
    'STAFF_PASSWORD',
    'ORG_USERNAME',
    'ORG_PASSWORD',
    'ORG_NAME',
    'IND_USERNAME',
    'IND_PASSWORD'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    Logger.error(`Missing environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  Logger.success('All environment variables validated');
}
