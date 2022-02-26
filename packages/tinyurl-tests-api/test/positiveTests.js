const { expect } = require("chai");
const { getUrl, postUrl, createRequest } = require("tinyurl-api-utils");
const {
  baseUrl,
  base64charset,
  postUrlRoute,
  protocol: expectedProtocol,
  url: expectedUrl,
} = require("../appsettings.json");
const { assertProperShortLink } = require("../services/assertService");

describe("positive api tests", () => {
  it("should post an url with https protocol", async () => {
    const longLink = "https://www.google.co.il/";

    const res = await postUrl(longLink);
    expect(res).to.ownProperty("status").which.eq(200);
    expect(res.body).to.ownProperty("message");

    assertProperShortLink(res.body.message);
  });

  it("should post an url with http protocol", async () => {
    const longLink = "http://www.google.co.il/";

    const res = await postUrl(longLink);
    expect(res).to.ownProperty("status").which.eq(200);
    expect(res.body).to.ownProperty("message");

    assertProperShortLink(res.body.message);
  });

  it("should get the same link when adding same urls", async () => {
    const longLink = "https://www.notGoogle.co.il/";
    const res1 = await postUrl(longLink);
    const res2 = await postUrl(longLink);

    expect(res1.body.message).to.equal(res2.body.message);
  })

  it("should get the different link when adding different urls", async () => {
    const longLink1 = "https://www.newWebsite.co.il/";
    const longLink2 = "https://www.oldWebsite.co.il/";

    const res1 = await postUrl(longLink1);
    const res2 = await postUrl(longLink2);

    expect(res1.body.message).to.not.equal(res2.body.message);
  })

  describe("redirect to url", () => {
    const longUrl = "https://stackoverflow.com/";
    let shortUrl, id;
    before("post url", async () => {
      const res = await postUrl(longUrl);
      shortUrl = res.body.message;
      id = res.body.message.split("/")[3];
    });
    it("should redirect to url", (done) => {
      createRequest(shortUrl, "get").end((err, res) => {
        expect(res).to.ownProperty("status").which.eq(200);
        expect(res.redirects[0]).to.equal(longUrl);

        done();
      });
    });
  });
});
