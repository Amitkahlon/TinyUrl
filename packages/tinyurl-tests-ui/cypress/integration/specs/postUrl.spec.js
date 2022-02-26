const { baseServerUrl, baseUrl } = require("../../../appsettings.json");

describe("Post tests", () => {
  const url = "https://practice.automationbro.com/";

  beforeEach("visit site", () => {
    cy.visit(baseUrl);
  });
  it("post link", () => {
    cy.get("#url_input").type(url);
    cy.get("#submit_btn").click();

    cy.get("#output_link").click();
    cy.url().should("eq", url);
  });
});
