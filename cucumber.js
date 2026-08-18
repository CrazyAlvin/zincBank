// Central Cucumber configuration.
// `cucumber-js` (the `test` npm script) reads this file automatically.
module.exports = {
  default: {
    // Files containing step definitions, hooks and the custom World.
    // They are all written in TypeScript, so we load them through ts-node.
    require: ["src/support/**/*.ts", "src/step-definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    // Where the .feature files live.
    paths: ["src/features/**/*.feature"],
    // Reporters: console progress + Allure JSON results + Cucumber HTML/JSON reports.
    format: [
      "progress",
      "allure-cucumberjs/reporter",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],
    formatOptions: {
      snippetInterface: "async-await"
    },
    // Stop publishing results to the public Cucumber dashboard.
    publishQuiet: true,
    // Number of times to retry a failed scenario (0 = no retry).
    retry: 0
  }
};
