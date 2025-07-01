import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class MyAccountPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole("textbox", { name: "Username or email address *",});
    this.passwordInput = page.getByRole("textbox", { name: "Password *" });
    this.loginButton = page.getByRole("button", { name: "Log in" });
    this.errorMessage = page.getByText("Error: The password you");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? "";
  }
}
