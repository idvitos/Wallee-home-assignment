import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import type { Sorting } from '../utils/constants/sorting';

export class HomePage extends BasePage {
  private readonly sortSelect: Locator;
  private readonly productPrices: Locator;
  private readonly dismissButton: Locator;
  private readonly addToCartLink: (productName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.sortSelect = page.getByLabel('Shop order');
    this.productPrices = page.locator('.wc-block-components-product-price');
    this.dismissButton = page.getByRole('link', { name: 'Dismiss' });
    this.addToCartLink = (productName: string) =>
      page.getByRole('link', { name: `Add to cart: “${productName}”` });
  }

  async navigateTo(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async dismissWelcomeMessage(): Promise<void> {
    if (await this.dismissButton.isVisible()) {
      await this.dismissButton.click();
    }
  }

  async sortBy(option: Sorting): Promise<void> {
    await this.sortSelect.selectOption(option);
    await this.productPrices.first().waitFor({ state: 'visible' });
  }

  async getAllProductPrices(): Promise<number[]> {
    return this.productPrices.evaluateAll((elements) =>
      elements.map((el) => {
        const priceText = el.textContent?.replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(priceText || '0');
      })
    );
  }

  async addItemToCart(productName: string): Promise<void> {
    await this.addToCartLink(productName).click();
    await this.page.waitForLoadState('networkidle');
  }
}
