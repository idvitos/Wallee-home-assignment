import { test, expect } from '../fixtures/fixturePages';

const pageDataset = [
  { url: '/', expectedTitle: 'Shop' },
  { url: '/cart', expectedTitle: 'Cart' },
  { url: '/my-account', expectedTitle: 'My account' },
  { url: '/checkout', expectedTitle: 'Cart' },
  { url: '/daily-subscription', expectedTitle: 'Daily Subscription' },
  { url: '/product/glasses', expectedTitle: 'Glasses' },
  { url: '/product/laptops', expectedTitle: 'Laptops' },
  { url: 'product/pants', expectedTitle: 'Pants' },
  { url: 'product/phones', expectedTitle: 'Phones' },
  { url: '/product/shirt', expectedTitle: 'Shirt' },
  { url: '/product/shoes', expectedTitle: 'Shoes' },
  { url: '/product/socks', expectedTitle: 'Socks' }
];

for (const { url, expectedTitle } of pageDataset) {
  test(`Visit and verify: ${url}`, async ({ homePage, basePage }) => {
    await homePage.navigateTo(url);
    await homePage.dismissWelcomeMessage();

    const actualTitle = await basePage.getTitle();

    expect(actualTitle).toBe(expectedTitle);
  });
}

/*
test('All main menu items work', async ({ page }) => {
  await page.goto('https://woocommerce.showcase-wallee.com/');

  const links = await page.$$eval('nav a', as =>
    as
      .filter((a): a is HTMLAnchorElement => a instanceof HTMLAnchorElement)
      .map(a => a.href)
  );

  for (const link of links) {
    await page.goto(link);
    const title = await page.title();
    console.log(`Visited: ${link} → Title: ${title}`);
    await expect(page.locator('body')).toBeVisible();
  }
});

test('Visit all product pages and log titles', async ({ page }) => {
  await page.goto('https://woocommerce.showcase-wallee.com/');

  const productLinks = await page.$$eval('h3 a', as =>
    as
      .filter((a): a is HTMLAnchorElement => a instanceof HTMLAnchorElement)
      .map(a => a.href)
  );

  for (const link of productLinks) {
    await page.goto(link);
    const title = await page.title();
    console.log(`Product page: ${link} → Title: ${title}`);
    await expect(page.locator('body')).toBeVisible();
  }
});
*/