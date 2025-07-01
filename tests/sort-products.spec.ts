import { test, expect } from '../fixtures/fixturePages'
import { SORT_OPTIONS } from '../utils/constants/sorting';

test.describe('Sorting ', () => {

  test.beforeEach(async ({ homePage }) => {
  await homePage.navigateTo('/');
  await homePage.dismissWelcomeMessage();
  });
 
  test('by DESC', async ({ homePage }) => {
    await homePage.sortBy(SORT_OPTIONS.PRICE_DESC);

    const prices = await homePage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
  });

  test('by ASC', async ({ homePage }) => {
    await homePage.sortBy(SORT_OPTIONS.PRICE_ASC);

    const prices = await homePage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  // TO DO: Implement sorting by NEWNESS
  // TO DO: Implement sorting by POPULARITY
  // TO DO: Implement sorting by DEFAULT
});