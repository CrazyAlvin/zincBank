import type { Page } from "@playwright/test";

/**
 * ZINC Bank Login Page Object.
 *
 * Encapsulates all selectors and actions for the login screen so that step
 * definitions stay clean and reusable. Uses stable, intent-revealing locators
 * (placeholder/role/attribute based) instead of auto-generated IDs, and relies
 * on Playwright's built-in auto-waiting (no hardcoded sleeps).
 *
 * Locators are getters so they are evaluated lazily at access time, after the
 * constructor has assigned `this.page`.
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  private get emailInput() {
    return this.page.getByPlaceholder("you@example.com");
  }

  private get passwordInput() {
    return this.page.locator('input[type="password"]');
  }

  private get signInButton() {
    return this.page.getByRole("button", { name: "Sign in" });
  }

  private get errorMessage() {
    return this.page.getByText("Invalid email or password");
  }

  /** Navigate to the login page and wait for it to be ready. */
  async goto(url: string) {
    await this.page.goto(url);
    // Auto-waiting selector so we know the form has rendered.
    await this.emailInput.waitFor({ state: "visible" });
  }

  /** Fill the email and password fields and submit the login form. */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  /** Read the error message shown on a failed login. */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) ?? "";
  }
}
