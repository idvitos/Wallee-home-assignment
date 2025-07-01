import { FrameLocator, Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { User } from '../interfaces/user';
import { CardData } from '../interfaces/cardData';

export class CheckoutPage extends BasePage {
  private readonly email: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly address: Locator;
  private readonly apartment: Locator;
  private readonly country: Locator;
  private readonly city: Locator;
  private readonly stateDropdown: Locator;
  private readonly postalCode: Locator;
  private readonly phone: Locator;
  private readonly paymentRadio: Locator;
  private readonly createAccountCheckbox: Locator;
  private readonly placeOrderButton: Locator;
  private readonly confirmationMessage: Locator;
  private readonly errorMessage: Locator;
  private readonly returnLink: Locator;
  private readonly paymentFrame: FrameLocator;
  private readonly cardNumberInput: Locator;
  private readonly expiryMonthInput: Locator;
  private readonly expiryYearInput: Locator;
  private readonly cvcInput: Locator;
  private readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.email = page.getByRole('textbox', { name: 'Email address' });
    this.firstName = page.getByRole('textbox', { name: 'First name' });
    this.lastName = page.getByRole('textbox', { name: 'Last name' });
    this.address = page.getByRole('textbox', { name: 'Address', exact: true });
    this.apartment = page.getByRole('textbox', { name: 'Apartment, suite, etc. (' });
    this.country = page.getByRole('combobox', { name: 'Switzerland, Country/Region' });
    this.city = page.getByRole('textbox', { name: 'City' });
    this.stateDropdown = page.getByText('State/County');
    this.postalCode = page.getByRole('textbox', { name: 'Postal code' });
    this.phone = page.getByRole('textbox', { name: 'Phone (optional)' });
    this.paymentRadio = page.getByRole('radio', { name: 'Credit / Debit Card Credit /' });
    this.createAccountCheckbox = page.getByRole('checkbox', { name: 'Create an account?' });
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.confirmationMessage = page.locator('.wc-block-order-confirmation-status');
    this.errorMessage = page.locator('.wc-block-components-notice-banner__content');
    this.returnLink = page.getByRole('link', { name: 'Return to Cart' });
    this.paymentFrame = page.frameLocator('iframe[name="lightboxPaymentFrame"]');
    this.cardNumberInput = this.paymentFrame.getByRole('textbox', { name: 'Card Number *' });
    this.expiryMonthInput = this.paymentFrame.getByRole('textbox', { name: 'MM' });
    this.expiryYearInput = this.paymentFrame.getByRole('textbox', { name: 'Expiry Date *' });
    this.cvcInput = this.paymentFrame.getByRole('textbox', { name: 'Security Code *' });
    this.payButton = this.paymentFrame.getByRole('button', { name: 'Pay', exact: true });
  }

  async fillCheckoutForm(user: User) {
    await this.email.fill(user.email);
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.address.fill(user.address);
    await this.apartment.fill(user.apartment ?? '');
    await this.country.fill(user.country);
    await this.page.getByRole('option', { name: user.country }).click();
    await this.city.fill(user.city);
    await this.stateDropdown.click();
    await this.page.getByRole('option', { name: user.state }).click();
    await this.postalCode.fill(user.postalCode);
    await this.phone.fill(user.phone ?? '');
  }

  async selectPayment() {
    await this.paymentRadio.check();
  }

  async checkCreateAccount() {
    await this.createAccountCheckbox.check();
  }

  async placeOrderWithRetry(retries: number = 2): Promise<void> {
    for (let i = 0; i < retries; i++) {
      await this.placeOrderButton.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async fillCardDetails(card: CardData): Promise<void> {
    await this.cardNumberInput.waitFor({ state: 'visible', timeout: 10000 });

    await this.cardNumberInput.fill(card.cardNumber);
    await this.expiryMonthInput.fill(card.expiryMonth);
    await this.expiryYearInput.fill(card.expiryYear);
    await this.cvcInput.fill(card.cvc);

    await this.payButton.click();
  }

  async getConfirmationMessage(): Promise<string | null> {
    return this.confirmationMessage.textContent();
  }

  async getErrorMessage(): Promise<string | null> {
    return this.errorMessage.textContent();
  }
  
  async returnToCart(): Promise<void> {
    await this.returnLink.click();
  }
}