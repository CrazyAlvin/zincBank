import { defineConfig } from "@playwright/test";

/**
 * Playwright configuration.
 *
 * NOTE: In this framework, Cucumber (@cucumber/cucumber) is the test runner and
 * it drives Playwright's browser launching directly (see src/step-definitions/hooks.ts).
 * This file is kept as a reference for common Playwright options, and can be used
 * if you ever want to write standalone Playwright tests too.
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: 0,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL || "https://zincbank.cydeo.io",
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  }
});
