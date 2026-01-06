import { Page } from '@playwright/test';

export class Loginpage {

    readonly page:Page;
    // constructor
    constructor(page:Page){
        this.page=page;
    }


get publicPage(){
    return{
        loginButton : this.page.locator(`a:has-text("Login")`)
    }  
}


get applyLogin(){
    return{
        individualPortalLogin : this.page.locator('a:has-text("Individual Portal Login")'),
        staffPortalLogin : this.page.locator('a:has-text("Staff Portal Login")'),
        organizationPortalLogin : this.page.locator('a:has-text("Organization Portal Login")')
    }
}

get loginFiedls(){
    return {
        username : this.page.locator('input[placeholder="Enter Username"]'),
        password : this.page.locator('input[placeholder="Enter Password"]'),
        loginbutton : this.page.locator('button#btn-login')
    }

}




async gotoPublicpage(){
   await this.page.goto(`${process.env.ISSI_GMS_URL}`);
}  

async clickOnLogin(){
    await this.publicPage.loginButton.click();
}

async clickOnStaffPortalLogin(){
    await this.applyLogin.staffPortalLogin.click();
}

async staffLogin(){
    await this.loginFiedls.username.fill(`${process.env.STAFF_USERNAME}`);
    await this.loginFiedls.password.fill(`${process.env.STAFF_PASSWORD}`);
    await this.loginFiedls.loginbutton.click();
}




}


