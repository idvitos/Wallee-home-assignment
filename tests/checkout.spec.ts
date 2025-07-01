import { test, expect } from '../fixtures/fixturePages';
import { generateRandomEmail } from '../utils/helpers/generateEmail';
import { User } from '../interfaces/user';
import { CardData } from '../interfaces/cardData';

const user: User = {
  firstName: "Vitalii",
  lastName: "Popovych",
  email: "popovich.vitaliy@gmail.com",
  address: "test",
  apartment: "test",
  country: "Ukraine",
  city: "Kyiv",
  state: "Kyivshchyna",
  postalCode: "00000",
  phone: "12345678",
};

const cardData: CardData = {
  cardNumber: "5555 5555 5555 4444",
  expiryMonth: "03",
  expiryYear: "28",
  cvc: "123",
};

test.describe('Checkout ', () => {

test.beforeEach(async ({ homePage, cartPage }) => {
  await homePage.navigateTo('/');
  await homePage.dismissWelcomeMessage();
  await homePage.addItemToCart('Glasses');
  await cartPage.proceedToCheckout();
});

  test('with existing account', async ({ checkoutPage }) => {
    await checkoutPage.checkCreateAccount();
    await checkoutPage.fillCheckoutForm(user);
    await checkoutPage.selectPayment();
    await checkoutPage.placeOrderWithRetry();

    const errorMessage = await checkoutPage.getErrorMessage();

    expect(errorMessage).toContain(
      'An account is already registered with your email address. Please log in before proceeding.'
    );
  });

  test('with new account', async ({ checkoutPage }) => {
    const newlUser = { ...user, email: await generateRandomEmail() };

    await checkoutPage.checkCreateAccount();
    await checkoutPage.fillCheckoutForm(newlUser);
    await checkoutPage.selectPayment();
    await checkoutPage.placeOrderWithRetry();
    await checkoutPage.fillCardDetails(cardData);

    const confirmation = await checkoutPage.getConfirmationMessage();

    expect(confirmation).toContain('Thank you. Your order has been received.');
  });
});
