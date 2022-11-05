const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://demoqa.com/automation-practice-form",
    viewportWidth: 2000,
    viewportHeight: 1300,
    defaultCommandTimeout: 20000,
    videoUploadOnPasses: false,
    waitForAnimations: true,
    retries: {
      runMode: 1,
      openMode: 1
    },
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json"
    }
  },
});
