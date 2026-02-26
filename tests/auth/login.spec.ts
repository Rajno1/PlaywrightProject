// tests/auth/login.spec.ts

import { DashboardTitles } from '@enums/Enums';
import { test, expect } from '@fixtures/AuthFixtures';
import { Assertions } from '@utils/assertions';
import { Logger } from '@utils/logger';

test.describe('Login Tests @auth @login', () => {

  test('TC-LOGIN-001: Staff Login with Valid Credentials', async ({ loginPage, guestPage }) => {
    Logger.testStart('TC-LOGIN-001: Staff Login');

    await test.step('Navigate to Login Page', async () => {
      await loginPage.gotoPublicPage();
      await loginPage.clickOnLogin();
    });

    await test.step('Click Staff Portal Login', async () => {
      await loginPage.clickOnStaffPortalLoginLink();
    });

    await test.step('Enter Credentials and Login', async () => {
      await loginPage.staffLogin(
        process.env.STAFF_USERNAME!,
        process.env.STAFF_PASSWORD!
      );
    });

    await test.step('Verify Successful Login', async () => {
      await guestPage.waitForURL('**/dashboard');
     // const dashboardHeader = guestPage.locator('.top-title.d-display .header-subtitle:has-text("Internal Portal")');
     await Assertions.verifyElementVisible(loginPage.StaffDashboardHeader, 'Staff login Dashboard header');

     await Assertions.verifyElementText(loginPage.StaffDashboardHeader,
             DashboardTitles.STAFF_DASHBOARD_TITLE,
             'Staff login Dashboard header')
      Logger.success('Login successful');
    });

    Logger.testEnd('TC-LOGIN-001');
  });

  test('TC-LOGIN-002: Login with Invalid Credentials', async ({ loginPage, guestPage }) => {
    Logger.testStart('TC-LOGIN-002: Invalid Login');

    await loginPage.gotoPublicPage();
    await loginPage.clickOnLogin();
    await loginPage.clickOnStaffPortalLoginLink();

    // ✅ Invalid credentials
    await loginPage.staffLogin('invalid@test.com', 'WrongPassword123');

    // Verify error message
    const errorMessage = guestPage.locator('.alert-danger');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Please Enter Your Valid Username and Password');

    Logger.testEnd('TC-LOGIN-002');
  });
});

/* 

## 📊 **Fixture Usage Guide:**

| Test Type | Use This Fixture | Reason |
|-----------|------------------|--------|
| **Registration (Staff)** | `staffGuestPage` | No auth, starts at /staff |
| **Registration (Org)** | `orgGuestPage` | No auth, starts at /organization |
| **Registration (Individual)** | `individualGuestPage` | No auth, starts at /individual |
| **Login Tests** | `guestPage` + `loginPage` | No auth, public homepage |
| **Public Page Tests** | `guestPage` | No auth, public pages |
| **Programs CRUD** | `staffPage` | Needs staff auth |
| **Grants CRUD** | `staffPage` | Needs staff auth |
| **Org Dashboard** | `orgPage` | Needs org auth |
| **Individual Dashboard** | `individualPage` | Needs individual auth |

---

## 🎯 **File Structure:**
```
tests/
├── auth/
│   ├── staff-registration.spec.ts       ✅ Uses staffGuestPage
│   ├── organization-registration.spec.ts ✅ Uses orgGuestPage
│   ├── individual-registration.spec.ts   ✅ Uses individualGuestPage
│   └── login.spec.ts                     ✅ Uses guestPage + loginPage
│
├── programs/
│   ├── programs-view.spec.ts             ✅ Uses staffPage (authenticated)
│   ├── programs-add.spec.ts              ✅ Uses staffPage (authenticated)
│   └── programs-edit.spec.ts             ✅ Uses staffPage (authenticated)
│
└── public/
    ├── homepage.spec.ts                  ✅ Uses guestPage
    └── about-page.spec.ts                ✅ Uses guestPage

*/
