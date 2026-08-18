import dotenv from "dotenv";

// Load variables from the .env file (copy .env.example to .env first).
dotenv.config();

/**
 * Central place for all environment-driven configuration.
 * Defaults keep the framework runnable even without a .env file.
 */
export const ENV = {
  // Base URL of the application under test.
  BASE_URL: process.env.BASE_URL ?? "https://www.saucedemo.com",

  // Which browser to launch: chromium | firefox | webkit.
  BROWSER: process.env.BROWSER ?? "chromium",

  // Run the browser without a visible window.
  HEADLESS: (process.env.HEADLESS ?? "true") === "true",

  // Default timeout (ms) used by Playwright actions and assertions.
  TIMEOUT: Number(process.env.TIMEOUT ?? 10_000),

  // Viewport size for new browser contexts.
  VIEWPORT: { width: 1280, height: 720 }
} as const;
