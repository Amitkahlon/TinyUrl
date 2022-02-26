const { baseServerUrl, baseUrl } = require("../../../appsettings.json");
const { postUrl } = require("tinyurl-api-utils");

describe("Redirect tests", () => {
  const url = "https://practice.automationbro.com/";
  let shortUrl;

  before("post a link", async () => {
    const res = await postUrl(url);
    shortUrl = res.body.message;
  });

  it("redirect short link", () => {
    cy.visit(shortUrl);

    //assert the url
    cy.url().should("eq", url);
  });
});
