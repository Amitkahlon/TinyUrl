const {baseServerUrl, baseUrl} = require("../../../appsettings.json")

describe("Home Tests", () => {
  beforeEach("visit site", () => {
    //open home page
    cy.visit(baseUrl);
  });

  it("open the home page and verify the url and the title", () => {
    //assert the url
    cy.url().should("include", "localhost").and("include", "3000");

    //asset the title
    cy.title().should("eq", "React App");
  });

  it("verify the header", () => {
    //get the header, assert the header
    cy.get("#header").should("have.text", "TinyURL");
  });

  it("verify the sub title", () => {
    //get the header, assert the header
    cy.get("#sub_title").should((h) => {
      console.log(h.text());
      expect(h.text()).to.eq(
        "Enter a a long url, and we will make it shorter 😀: "
      );
    });
  });

  it("verify the form", () => {
    cy.get("#url_input").should("exist");

    cy.get("#submit_btn").should((s) => {
      expect(s.text()).to.eq("Submit");
    });
  });

  it("verify the output", () => {
    cy.get("#output_msg").should("have.text", "Your link:");
  });

  it("verify input works", () => {
    const typeText = "hello test";
    cy.get("#url_input").type(typeText);

    cy.get("#url_input").should("have.value", typeText);
    cy.get("#url_input").clear();
    cy.get("#url_input").should("have.value", "");
  });

  it("verify submit button works", () => {
    //empty
    cy.get("#submit_btn").click();
    cy.get("#error")
      .should("have.text", "url cannot be empty")
      .and("have.css", "color")
      .and("eq", "rgb(255, 0, 0)");

    //valid
    const validUrl = "https://www.google.co.il/";
    cy.get("#url_input").type(validUrl);
    cy.get("#submit_btn").click();
    cy.get("#output_link").should("exist");
    cy.get("#output_link").then((link) => {
      expect(link.text()).to.include(baseServerUrl);
      expect(link).to.have.attr("href").include(baseServerUrl);
    });

    //we assume that if both works, we can rely on the ui to display any kind of error,
    //the different errors we get are tested in the http tests
  });
});
