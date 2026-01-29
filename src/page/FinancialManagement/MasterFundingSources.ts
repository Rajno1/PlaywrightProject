import { Page ,Locator } from "@playwright/test";

export class MasterFundingSources {

    protected page : Page;

    //Locators
    readonly financialManagement : Locator ;
    readonly masterFundingSources : Locator ;


    constructor(page:Page){
        this.page=page;

    
    // initializing locators
    this.financialManagement = page.locator('');
    this.masterFundingSources = page.locator('');

    }

    // action method
    async clickOnMasterFundingSource(){
        await this.financialManagement.click();
    }

    async selectMasterFundingSourcesOption(){
        await this.masterFundingSources.click();
    }


}