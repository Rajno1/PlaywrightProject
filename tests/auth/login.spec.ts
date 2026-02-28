// tests/auth/login.spec.ts - CLEANEST VERSION

import { test, expect } from '@fixtures/AuthFixtures';
import { Assertions } from '@utils/assertions';
import { Logger } from '@utils/logger';
import { NavigationHelper } from '@utils/helpers/navigationHelper';
import { StaffLoginPage } from '@pages/auth/staff/StaffLoginPage';
import { DashboardTitles, LoginPortalHeaders } from '@enums/Enums';

test.describe('Login Tests @auth @login', () => {

  test('TC-LOGIN-001: Staff Login with Valid Credentials', async ({ guestPage, publicPage, portalSelectionPage }) => {
    Logger.testStart('TC-LOGIN-001: Staff Login');

    const nav = new NavigationHelper(guestPage);
    const staffLoginPage = new StaffLoginPage(guestPage);

    await test.step('Verify and Navigate to Staff Login', async () => {
      // ✅ Verify Login button before clicking
      await Assertions.verifyElementVisible(
        publicPage.loginButton,
        'Login button'
      );
      
      // Navigate using publicPage
      await publicPage.clickOnLogin();
      
      // ✅ Verify Staff Portal link before clicking
      await Assertions.verifyElementVisible(
        portalSelectionPage.staffPortalLoginLink,
        'Staff Portal Login link'
      );
      
      await portalSelectionPage.clickOnStaffPortalLoginLink();
      
      Logger.success('Navigated to Staff Login page');
    });

    await test.step('Verify Staff Login Page', async () => {
      const loginPortalHeader = guestPage.locator('.login100-form-title-1');
      
      await Assertions.verifyElementVisible(loginPortalHeader, 'Login Portal Header');
      await Assertions.verifyElementText(
        loginPortalHeader,
        LoginPortalHeaders.STAFF_LOGIN_PORTAL_TITLE,
        'Login Portal Title'
      );
      
      await Assertions.verifyElementVisible(staffLoginPage.userNameField, 'Username field');
      await Assertions.verifyElementVisible(staffLoginPage.passwordField, 'Password field');
      await Assertions.verifyElementVisible(staffLoginPage.login, 'Login button');
    });

    await test.step('Login with Valid Credentials', async () => {
      await staffLoginPage.staffLogin(
        process.env.STAFF_USERNAME!,
        process.env.STAFF_PASSWORD!
      );
    });

    await test.step('Verify Successful Login', async () => {
      await guestPage.waitForURL('**/dashboard', { timeout: 30000 });
      
      const dashboardHeader = staffLoginPage.staffDashboardHeader;
      await Assertions.verifyElementVisible(dashboardHeader, 'Dashboard header');
      await Assertions.verifyElementText(
        dashboardHeader,
        DashboardTitles.STAFF_DASHBOARD_TITLE,
        'Dashboard title'
      );
      
      Logger.success('Login successful');
    });

    Logger.testEnd('TC-LOGIN-001');
  });


  test('TC-LOGIN-002: Staff Login with Invalid Credentials', async ({ guestPage }) => {
    Logger.testStart('TC-LOGIN-002: Invalid Login');

    const nav = new NavigationHelper(guestPage);
    const staffLoginPage = new StaffLoginPage(guestPage);

    await test.step('Navigate to Staff Login', async () => {
      // ✅ Using NavigationHelper - no manual verification needed inside
      await nav.goToStaffLogin();
      
      // ✅ Verify we're on the login page
      await Assertions.verifyElementVisible(
        staffLoginPage.userNameField,
        'Username field'
      );
    });

    await test.step('Login with Invalid Credentials', async () => {
      await staffLoginPage.staffLogin('invalid@test.com', 'WrongPassword123');
    });

    await test.step('Verify Error Message', async () => {
      const errorMessage = guestPage.locator('.alert-danger');
      
      await Assertions.verifyElementVisible(errorMessage, 'Error message', 10000);
      await Assertions.verifyElementContainsText(
        errorMessage,
        'Please Enter Your Valid Username and Password',
        'Error message text'
      );
    });

    Logger.testEnd('TC-LOGIN-002');
  });
});