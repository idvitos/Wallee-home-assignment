import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  private increaseQtyButton: Locator;
  private quantityInput: Locator;
  private removeItemButton: Locator;
  private emptyCartText: Locator;
  private itemPrice: Locator;
  private totalAmount: Locator;
  private decreaseQtyButton: Locator;
  private addCouponButton: Locator;
  private couponInput: Locator;
  private applyCouponButton: Locator;
  private couponErrorMessage: Locator;
  private proceedToCheckoutLink: Locator;
  private readonly removeFromCartButton: (productName: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.increaseQtyButton = page.locator('button[aria-label^="Increase quantity of"]');
    this.quantityInput = page.locator('.wc-block-components-quantity-selector__input');
    this.removeItemButton = page.getByRole('button', { name: 'Remove Glasses from cart' });
    this.emptyCartText = page.locator('.wc-block-cart__empty-cart__title');
    this.itemPrice = page.locator('.wc-block-components-product-price__value').first();
    this.totalAmount = page.locator('.wc-block-components-totals-item__value').last();
    this.decreaseQtyButton = page.locator('button[aria-label^="Reduce quantity of"]');
    this.addCouponButton = page.getByRole('button', { name: 'Add a coupon' });
    this.couponInput = page.getByRole('textbox', { name: 'Enter code' });
    this.applyCouponButton = page.getByRole('button', { name: 'Apply' });
    this.couponErrorMessage = page.getByText('Coupon "test" does not exist!');
    this.proceedToCheckoutLink = page.getByRole('link', { name: 'Proceed to Checkout' });
    this.removeFromCartButton = (productName: string): Locator =>
      this.page.getByRole('button', { name: `Remove ${productName} from cart` });
  }

  async increaseQuantity(times: number): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.increaseQtyButton.first().click();
    }
  }

  async decreaseQuantity(): Promise<void> {
    await this.decreaseQtyButton.click();
  }

  async applyCoupon(code: string): Promise<void> {
    await this.addCouponButton.click();
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }

  async getCouponErrorMessage(): Promise<string | null> {
    return await this.couponErrorMessage.textContent();
  }

  async getQuantity(): Promise<number> {
    return parseInt(await this.quantityInput.inputValue(), 10);
  }

  async getEmptyCartText(): Promise<string | null> {
    return await this.emptyCartText.textContent();
  }

  async getItemPrice(): Promise<number> {
    const text = await this.itemPrice.textContent();
    return parseFloat(text?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
  }

  async getTotalAmount(): Promise<number> {
    const text = await this.totalAmount.textContent();
    return parseFloat(text?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
  }

  async getUpdatedTotalAmount(): Promise<number> {
    const previousText = await this.totalAmount.textContent();
    const previousValue = parseFloat(previousText?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');

    await expect.poll(async () => {
      const text = await this.totalAmount.textContent();
      return parseFloat(text?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
    }, {
      timeout: 10000,
    }).not.toBe(previousValue);

    const finalText = await this.totalAmount.textContent();
    const finalValue = parseFloat(finalText?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');

    return finalValue;
  }
    async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutLink.click();
  }

  async removeItem(productName: string): Promise<void> {
    await this.removeFromCartButton(productName).click();
    await this.page.waitForLoadState('networkidle');
  }
}
