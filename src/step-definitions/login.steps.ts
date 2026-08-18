import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { LoginPage } from "../pages/LoginPage";
import { ENV } from "../config/env";

Given("I am on the login page", async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto(`${ENV.BASE_URL}/login`);
});

When(
  "I log in with email {string} and password {string}",
  async function (this: CustomWorld, email: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(email, password);
  }
);

Then("I should be successfully logged in", async function (this: CustomWorld) {
  // A successful login navigates the app away from the login page. Once valid
  // credentials are confirmed, add a specific "dashboard visible" assertion here.
  await expect(this.page).toHaveURL((url) => !url.pathname.includes("/login"), {
    timeout: ENV.TIMEOUT
  });
});

Then(
  "I should see the error message {string}",
  async function (this: CustomWorld, expectedMessage: string) {
    const loginPage = new LoginPage(this.page);
    const actualMessage = await loginPage.getErrorMessage();
    if (!actualMessage.includes(expectedMessage)) {
      throw new Error(
        `Expected error message to contain "${expectedMessage}" but got "${actualMessage}".`
      );
    }
  }
);

