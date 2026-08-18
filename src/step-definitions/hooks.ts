import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, firefox, webkit, type Browser } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { ENV } from "../config/env";

// A single browser instance is shared across all scenarios for performance.
let browser: Browser;

/** Launch the configured browser once before the whole test run. */
BeforeAll(async function () {
  const launchOptions = { headless: ENV.HEADLESS };
  switch (ENV.BROWSER) {
    case "firefox":
      browser = await firefox.launch(launchOptions);
      break;
    case "webkit":
      browser = await webkit.launch(launchOptions);
      break;
    case "chromium":
    default:
      browser = await chromium.launch(launchOptions);
  }
});

/** Create a fresh browser context + page for each scenario. */
Before(async function (this: CustomWorld) {
  this.browser = browser;
  this.context = await browser.newContext({ viewport: ENV.VIEWPORT });
  this.page = await this.context.newPage();
  await this.page.setDefaultTimeout(ENV.TIMEOUT);
});

/** Capture a screenshot + trace on failure, then clean up the scenario. */
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
    const screenshotPath = `screenshots/${safeName}_${Date.now()}.png`;
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    // Attach the screenshot directly to the failed scenario in the HTML report.
    this.attach(screenshot, "image/png");
  }
  await this.page?.close();
  await this.context?.close();
});

/** Close the shared browser instance after the whole run. */
AfterAll(async function () {
  await browser?.close();
});
