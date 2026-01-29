import { Page , Locator} from "@playwright/test";

export class ProgramsPage {

    protected page :Page;

  
    readonly programMenu : Locator;



    constructor(page:Page){
        this.page=page;

        this.programMenu  = page.locator('ul[class="vg-nav-wrapper"]>li>a[href="/programs"]')
    }


  // Actions methos 
  async clickPrograms() {
    await this.programMenu.click();
  }
}