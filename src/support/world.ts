import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";

/**
 * Custom World instance.
 *
 * @cucumber/cucumber creates one World per scenario and makes it available as
 * `this` inside every step definition and hook, letting us share the browser,
 * context and page across all steps of a single scenario.
 */
export class CustomWorld extends World {
  // Populated by the Before hook in src/step-definitions/hooks.ts
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
