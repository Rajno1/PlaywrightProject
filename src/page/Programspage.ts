import { Page , Locator} from "@playwright/test";
import { BasePage } from "./Basepage";
import { MainMenu } from "../enums/Enum";

export class ProgramsPage extends BasePage{

    protected page :Page;

  
    constructor(page:Page){
        super(page)
        this.page=page;
    }


  // Actions methos 
    async clickOnProgramMenu(){
      await this.openMenu(MainMenu.PROGRAMS);
    }



}