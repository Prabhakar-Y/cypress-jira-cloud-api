describe("JIRA CLOUD API Automation using Cypress with Typescript", () => {

  const baseUrl = Cypress.env("jiraBaseUrl");
  const authToken = Buffer.from(`${Cypress.env("jiraEmail")}:${Cypress.env("jiraToken")}`).toString("base64");

  let createdIssueKey: string;
  let xsrfToken: string;

  beforeEach(() => {
    cy.session("jira-session", () => {
      // Set up the session and retrieve the xsrf token for subsequent requests
      cy.request({
        method: "GET",
        url: `${baseUrl}/rest/api/3/project/search`,
        headers: {
          Authorization: `Basic ${authToken}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        const cookieHeader = response.headers["set-cookie"];
        if (Array.isArray(cookieHeader)) {
          xsrfToken = cookieHeader
            .find((cookie: string) => cookie.includes("atlassian.xsrf.token"))
            ?.match(/atlassian\.xsrf\.token=([^;]+);/)?.[1];
        } else if (typeof cookieHeader === "string") {
          xsrfToken = cookieHeader
            .match(/atlassian\.xsrf\.token=([^;]+);/)?.[1];
        }
        expect(xsrfToken).to.exist;
        Cypress.env("xsrfToken", xsrfToken);
      });
    });
  });

  it("[GET]: Fetch all projects from JIRA API", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/rest/api/3/project/search`,
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`GET request to fetch projects: ${response.body}`);
    });
  });

  it("[POST]: Create a new issue in JIRA project using API", () => {
    const issuePayload = {
      fields: {
        project: {
          key: Cypress.env("projectKey"),
        },
        summary: "[AUTOMATION]REST - Test ---1",
        description: "Creating an issue via REST API",
        issuetype: { name: "Bug" },
      },
    };

    cy.request({
      method: "POST",
      url: `${baseUrl}/rest/api/2/issue`,
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
        "X-Atlassian-Token": "nocheck", 
        "User-Agent": "test-agent", 
      },
      body: issuePayload,
    }).then((response) => {
      expect(response.status).to.eq(201);
      createdIssueKey = response.body.key;
      cy.log(`POST request to create issue: ${createdIssueKey}`);
    });
  });

  it("[DELETE]: Remove the created issue from JIRA project using API", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/rest/api/3/issue/${createdIssueKey}`,
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
        "User-Agent": "test-agent", 
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
      cy.log(`DELETE request to remove issue: ${createdIssueKey}`);
    });
  });
});
