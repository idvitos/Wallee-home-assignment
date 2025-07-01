import { test as base } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { CheckoutPage } from '../pages/checkoutPage';
import { MyAccountPage } from '../pages/myAccountPage';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';

type PageFixtures = {
  basePage: BasePage;
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  myAccountPage: MyAccountPage;
};

export const test = base.extend<PageFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },
});

export { expect } from '@playwright/test';
