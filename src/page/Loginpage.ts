import  { Page , Locator } from '@playwright/test';


export class Loginpage {

    protected page:Page; 
    /* page → variable name
    : Page → TypeScript type (Playwright Page object
    So this means: “LoginPage class will have a variable called page, and its type is Playwright Page.”
    */
 
    
 // Locators
  readonly loginButton: Locator;
  readonly staffPortalLoginLink: Locator;
  readonly individualPortalLoginLink: Locator;
  readonly organizationPortalLoginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly organizationDropdown: Locator;
  readonly loginButtonSubmit: Locator;



    // constructor
    constructor(page:Page){ // this is the constructor of this class When someone creates LoginPage, they must give a Page object.
        this.page=page; 
        /* This means: Store the incoming page into this class variable.
        page (right side) = parameter passed from outside
        this.page (left side) = class variable
        */

    // Initialize locators so every method can use 
    this.loginButton = page.locator('a:has-text("Login")');
    this.staffPortalLoginLink = page.locator('a:has-text("Staff Portal Login")');
    this.individualPortalLoginLink = page.locator('a:has-text("Individual Portal Login")');
    this.organizationPortalLoginLink = page.locator('a:has-text("Organization Portal Login")');

    this.usernameInput = page.locator('input[placeholder="Enter Username"]');
    this.passwordInput = page.locator('input[placeholder="Enter Password"]');
    this.organizationDropdown = page.locator('#id_org');
    this.loginButtonSubmit = page.locator('#btn-login');
    }

 


// Action Methods :

async gotoPublicpage(){
   await this.page.goto('/pages/public');
}  


async isLoginVisible(){
    return await this.loginButton.isVisible();
    
}

async clickOnLogin(){
   await this.loginButton.click();
}



// staff login
async clickOnStaffPortalLoginLink(){
    await this.staffPortalLoginLink.click();
}

async staffLogin(username:string, password:string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}


// organization Login
async clickOnOrganizationPortalLoginLink(){
    await this.organizationPortalLoginLink.click();
}

async organizationLogin(username:string,password:string,organization:string){
   await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.organizationDropdown.selectOption(organization)
    await this.loginButton.click();
}


// Individual Login

async clickOnIndividualLoginLink(){    
    await this.individualPortalLoginLink.click();
}

async individualLogin(username:string,password:string){
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}


}


