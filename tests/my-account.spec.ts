import { test, expect } from "../fixtures/fixturePages";

test.beforeEach(async ({ homePage }) => {
  await homePage.navigateTo("/my-account");
});

test("Login with invalid password", async ({ myAccountPage }) => {
  await myAccountPage.login("popovich.vitaliy@gmail.com", "wrongpassword");
  
  const error = await myAccountPage.getErrorMessage();

  expect(error).toContain("Error: The password you");
});
