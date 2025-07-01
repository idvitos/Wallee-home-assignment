import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState();
  }

  async getTitle(): Promise<string> {
    const title = await this.page.locator('h1').textContent();
    return title ? title.trim() : '';
  }
}