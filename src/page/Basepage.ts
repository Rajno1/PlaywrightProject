import { Page, Locator } from "@playwright/test";

export class BasePage {

  constructor(protected page: Page) {}

  // Generic menu locator function
  menu(menuName: string): Locator {
    return this.page.locator(`ul.vg-nav-wrapper [aria-label="${menuName}"]`);
  }

  // Generic sub menu locator function
  subMenu(subMenuName: string): Locator {
    return this.page.locator(`.left.show [aria-label="${subMenuName}"]`);
  }

  async openMenu(menuName: string) {
    const menu = this.menu(menuName);
    await menu.waitFor();
    await menu.click();
  }

  async openSubMenu(parent: string, child: string) {
    await this.openMenu(parent);
    const sub = this.subMenu(child);
    await sub.waitFor();
    await sub.click();
  }
}
