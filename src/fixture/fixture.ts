import { test as base } from '@playwright/test';
import { Basepage } from '../page/Basepage'
import { Loginpage } from '../page/Loginpage';



type appPages = {
    basepage : Basepage;
    loginpage : Loginpage
}

type fixtures ={
    baselog: void;
    pages:appPages;
    stafflogin:void
}

export const test = base.extend<fixtures>({
    baselog:[
        async({},use)=>{
            
            console.log('Before test - seting up base logs');
            await use();
            console.log('After test - setting up base logs');

        }, {auto : true }
    ],

    //  create object for page classes

    pages: async({page}, use )=>{
        await use ({
            basepage: new Basepage(page),
            loginpage: new Loginpage(page)
        });
    },

    stafflogin : async({pages}, use)=>{
        await pages.loginpage.gotoPublicpage();
        await pages.loginpage.clickOnLogin();
        await pages.loginpage.clickOnStaffPortalLogin();
        await pages.loginpage.staffLogin();
        await use();
    }
 
})

export { expect } from '@playwright/test';
