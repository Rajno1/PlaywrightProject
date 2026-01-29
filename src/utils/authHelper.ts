import { Page } from '@playwright/test';
import { Loginpage } from '../page/Loginpage';

export async function loginAs(
    page:Page,
    role : 'staff' | 'Organization' | 'individual'
){

  const loginpage = new Loginpage(page);

  await loginpage.gotoPublicpage();
  await loginpage.clickOnLogin();

  if( role === 'staff'){
    await loginpage.clickOnStaffPortalLoginLink();
    await loginpage.staffLogin(
      process.env.STAFF_USERNAME!,//! = “I promise this exists”
      process.env.STAFF_PASSWORD!
    );
  }
  if(role === 'Organization'){
    await loginpage.clickOnOrganizationPortalLoginLink();
    await loginpage.organizationLogin(
      process.env.ORG_USERNAME!,//! = “I promise this exists”
      process.env.ORG_PASSWORD!,
      process.env.ORG_NAME!
    );
  }
  if(role === 'individual'){
    await loginpage.clickOnIndividualLoginLink();
    await loginpage.individualLogin(
      process.env.IND_USERNAME!,//! = “I promise this exists”
      process.env.IND_PASSWORD!
    );
  }

}