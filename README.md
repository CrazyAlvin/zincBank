# Zinc BzNK Test Framework

A simple, clean, beginner-friendly BDD automation framework built with **Playwright**, **TypeScript**, **Cucumber** and the **Page Object Model**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation |
| [TypeScript](https://www.typescriptlang.org) | Programming language |
| [@cucumber/cucumber](https://github.com/cucumber/cucumber-js) | BDD test runner & Gherkin step definitions |
| [Allure](https://allurereport.org) | Rich HTML test reporting |
| Page Object Model (POM) | Separates page logic from test logic |

## Folder Structure

```
zincBznkTestFramework/
├── package.json            # Dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
├── cucumber.js             # Cucumber configuration (incl. Allure reporter)
├── playwright.config.ts    # Playwright reference config
├── .env.example            # Environment variable template
├── .env                    # Your actual settings (git-ignored)
├── .gitignore
├── README.md
└── src/
    ├── config/env.ts               # Reads .env into typed config
    ├── features/login/login.feature    # Gherkin scenarios
    ├── pages/LoginPage.ts          # Page Object(s)
    ├── step-definitions/hooks.ts   # Browser setup/teardown + screenshots
    ├── step-definitions/login.steps.ts # Step definitions
    └── support/
        ├── world.ts                # Shared browser/page per scenario
        └── test-data/users.ts      # Reusable test data

# Generated at run time (git-ignored):
reports/         # Cucumber HTML + JSON reports
allure-results/  # Allure JSON results (raw)
allure-report/   # Allure HTML report (generated)
screenshots/     # Failure screenshots
```

## Installation

```bash
# 1. Install Node.js (v18+) and npm, then install dependencies
npm install

# 2. Install the Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install
# Only needed the first time; install just one browser if you prefer, e.g.
npx playwright install chromium

# 3. Create your environment file from the template
cp .env.example .env
```

## Usage / npm Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all scenarios (uses `.env` settings) |
| `npm run test:chrome` | Run on Chromium |
| `npm run test:firefox` | Run on Firefox |
| `npm run test:webkit` | Run on WebKit |
| `npm run test:headless` | Run headlessly |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:smoke` | Run only scenarios tagged `@smoke` |
| `npm run report` | Run and write an HTML report to `reports/` |
| `npm run report:allure` | Build the Allure report from `allure-results/` into `allure-report/` |
| `npm run report:allure:open` | Open the generated Allure report in a browser |
| `npm run typecheck` | Type-check the source without running |

> `npm test` already produces **Cucumber HTML/JSON** reports in `reports/`, raw
> **Allure** results in `allure-results/`, and screenshots of failed scenarios in
> `screenshots/`. After running, build the visual Allure report with:
>
> ```bash
> npm run report:allure
> npm run report:allure:open   # opens the report in your browser
> ```
>
> The Allure CLI requires Java (JDK 17+). This machine already has Java 21.

## How the Pieces Fit Together

1. **Feature file** (`*.feature`) describes behaviour in Gherkin.
2. **Hooks** (`hooks.ts`) launch the browser and give every scenario a fresh
   page via the shared `CustomWorld`.
3. **Step definitions** (`*.steps.ts`) map Gherkin steps to code and call
   **Page Objects**.
4. **Page Objects** (`src/pages/*.ts`) hold the locators and actions for a
   single screen, so steps stay clean and UI changes are contained in one place.

```
login.feature ──> login.steps.ts ──> LoginPage (POM) ──> Playwright ──> Browser
                     └─────────────> hooks.ts (World, browser setup)
```

## Writing Your First Test (Your Own ACs)

1. Put your scenarios in a new `src/features/<area>/<area>.feature` file.
2. Reuse existing step definitions where possible.
3. If a step doesn't exist yet, run the suite once — Cucumber prints missing
   step snippets you can copy into a new file under `src/step-definitions/`.
4. Add Page Objects under `src/pages/` and reference them from the new steps.
5. Store any reusable credentials/test data in `src/support/test-data/`.

### Example: the bundled Login feature (ZINC Bank)

```gherkin
Feature: Login
  Background:
    Given I am on the login page

  @smoke @US00-AC2
  Scenario: US00-AC2 - Valid login with correct credentials
    When I log in with email "grace@zinc.test" and password "Passw0rd!"
    Then I should be successfully logged in
```

This demonstrates the **US00-AC2** acceptance criterion. Credentials live in
`src/support/test-data/users.ts` and the base URL (`https://zincbank.cydeo.io`)
is read from `.env`. Update your credentials and add further scenarios following
the same pattern.
