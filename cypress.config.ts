import { defineConfig } from "cypress";
const apiToken = process.env.ATLASSIAN_API_TOKEN;

export default defineConfig({
  env: {
    jiraEmail: "shitra01@gmail.com",
    jiraToken: apiToken,
    jiraBaseUrl: "https://chila.atlassian.net",
    projectKey: "EJAA",
  },

  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Register the Allure plugin
      //require('@shelex/cypress-allure-plugin').install(on);
    },
    supportFile: 'cypress/support/commands.ts',
  },
  reporter: 'mochawesome',//'cypress-allure-plugin',
  reporterOptions: {
    resultDir: 'mochawesome-report',
    overwwrite: true,
    html: true,
    json: true,
  },
});
