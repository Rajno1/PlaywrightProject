import { Page, Locator } from "@playwright/test";

export class Basepage {

   // protected page: Page;

    constructor(protected page: Page) {
        this.page = page;
    }

    // Cretating a Generic Locator menu function

    menu(menuName: string): Locator {
        return this.page.locator(`ul.vg-nav-wrapper [aria-label="${menuName}"]`);
    }

    subMenu(subMenu : string): Locator {
       return this.page.locator(`[class="left show"]>[aria-label="${subMenu}"]`)
    }

    async openMenu(menuName: string) {
    await this.menu(menuName).click();
}

async openSubMenu(parent: string, child: string) {
    await this.open(parent);
    await this.page.locator(`text=${child}`).click();
  }

}

