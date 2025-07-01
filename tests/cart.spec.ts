import { test, expect } from "../fixtures/fixturePages";

test.describe("Cart functionality ", () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateTo("/");
    await homePage.dismissWelcomeMessage();
    await homePage.addItemToCart("Laptops");
  });

  test("increase quantity and check total amount", async ({ cartPage }) => {
    const itemPrice = await cartPage.getItemPrice();

    await cartPage.increaseQuantity(2);

    const quantity = await cartPage.getQuantity();

    const updatedTotalAmount = await cartPage.getUpdatedTotalAmount();
    
    expect(updatedTotalAmount).toEqual(quantity * itemPrice)
  });

    test("decrease quantity", async ({ cartPage }) => {
    await cartPage.increaseQuantity(1);
    await cartPage.decreaseQuantity();

    const quantity = await cartPage.getQuantity();
    
    expect(quantity).toEqual(1)
  });

  test("add wrong coupon", async ({ cartPage }) => {
    await cartPage.applyCoupon("test");

    const errorMessage = await cartPage.getCouponErrorMessage();
    expect(errorMessage).toContain('Coupon "test" does not exist!');
  });

  test("remove item from cart", async ({ cartPage }) => {
    await cartPage.removeItem('Laptops');

    const emptyCartText = await cartPage.getEmptyCartText();
    
    expect(emptyCartText).toContain("Your cart is currently empty!");
  });
});
