import { test as base, Page } from '@playwright/test';
import fs from 'fs';
import {loginAs} from '../utils/authHelper'
/* -------------------- Types -------------------- */


type Fixtures = {
  staffPage: Page;
  orgPage: Page;
  individualPage:Page;
};

/* -------------------- Fixtures -------------------- */

export const test = base.extend<Fixtures>({


  // 2️⃣ Authentication fixture (BEST PRACTICE)
  /* 
  This custom fixture:
    Logs in as Staff user only once
    Saves login session to a file (staffPage.json)
    Reuses that session in future test runs
    Avoids repeated login → faster tests
    This is called session reuse using storageState.
  */
 
  staffPage: async ({ browser }, use) => {

    const authFile = 'staffLogin.json';

    // 🔹 Create browser context with existing auth (if available)
    const context = await browser.newContext({
      storageState: fs.existsSync(authFile) ? authFile : undefined,
    });

    const page = await context.newPage();

    // 🔹 First time login only
    if (!fs.existsSync(authFile)) {
     // 🔹 login using authHelper
      await loginAs(page,'staff');
      // 🔹 Save login session
      await context.storageState({ path: authFile });
    }
    // ✅ COMMON STEP — DO IT ONCE HERE
    await page.goto('/profiles/dashboard');

    // 🔹 Provide logged-in page to test
    await use(page);

    // 🔹 Cleanup
    await context.close();
  },



  // Authfixure for organization login
  orgPage: async({ browser }, use) => {

    const orgAuthFile = 'orgLogin.json';

   const context = await browser.newContext({
    storageState : fs.existsSync(orgAuthFile) ? orgAuthFile : undefined 
   })
    const page = await context.newPage();

    if(!fs.existsSync(orgAuthFile)){
      
      await loginAs(page,'Organization');

       await context.storageState({ path : orgAuthFile})

       await use(page);

       await context.close();

    }
   
  },

  // Authfixure for individual login
individualPage: async({ browser }, use) => {

    const individualAuthFile = 'individualLogin.json';

   const context = await browser.newContext({
    storageState : fs.existsSync(individualAuthFile) ? individualAuthFile : undefined 
   })
    const page = await context.newPage();

    if(!fs.existsSync(individualAuthFile)){
      
      await loginAs(page,'individual');

       await context.storageState({ path : individualAuthFile})

       await use(page);

       await context.close();

    }
   
  }
    

});

export { expect } from '@playwright/test';

