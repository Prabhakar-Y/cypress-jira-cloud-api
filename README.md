# JIRA CLOUD API Automation Using CYPRESS with TypeScript

This project demonstrate API test automation for JIRA Cloud API using Cypress with TypeScript. 
The setup includes Docker for isolated execution and generates detailed test reports using Mochawesome.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Running Tests Locally](#running-tests-locally)
5. [Running Tests in Docker](#running-tests-in-docker)
6. [Generating Reports](#generating-reports)
7. [File Exclusions with `.gitignore`](#file-exclusions-with-gitignore)

## Prerequisites

- Node.js (latest stable version)
- npm or yarn
- Docker (for containerized execution)
- Cypress 
- Typescript 
- Jira Cloud API domain access

## Project Structure

```
├── cypress
│   ├── e2e
│   │   └── jira-api-tests.cy.ts  # Test file for JIRA API
│   ├── fixtures  # Test data files
│   ├── support  # Custom commands and utility functions
├── mochawesome-report  # Test report output
├── Dockerfile  # Docker configuration
├── cypress.config.ts  # Cypress configuration
├── .gitignore  # Files and directories to exclude
├── package.json  # Project dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Prabhakar-Y/cypress-jira-cloud-api.git
   cd cypress-jira-cloud-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `cypress.config.ts`:
   ```ts
   export default defineConfig({
     env: {
       jiraEmail: "email",
       jiraToken: "api-token",
       jiraBaseUrl: "doamin",
       projectKey: "project-key", // Jira Project
     },
   });
   ```

## Running Tests Locally

To execute tests locally:

1. Run all tests:
   ```bash
   npm run test:headless
   ```

2. Run a specific test file:
   ```bash
   npx cypress run --spec 'cypress/e2e/jira-api-tests.cy.ts'
   ```

## Running Tests in Docker

1. Build the Docker image:
   ```bash
   docker build --no-cache -t cypress-jira-api -f docker/Dockerfile .
   ```

2. Run the container:
   ```bash
   docker run -v $(pwd)/mochawesome-report:/app/cypress/mochawesome-report cypress-jira-api:latest
   ```

## Generating Reports - Mochawesome

1. After executing tests, view reports in the `mochawesome-report` directory.
2. Use the following script to open the report:
   ```bash
   open mochawesome-report/mochawesome.html
   ```

## Connect with Me

You can read my articles on [Medium](https://medium.com/@prabhtra01) and follow me on [Instagram](https://www.instagram.com/prabh_the_techie/).


---

