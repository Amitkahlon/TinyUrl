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
const { generateRandomString } = require("../services/valuesService");

const errorMessages = {
  empty: "url cannot be empty",
  long: "url cannot be longer than 150 characters",
  bad: "Please provide a valid url with http/https protocol",
  notExists: "url does not exists",
};

describe("negative api tests", () => {
  describe("negative post requests", () => {
    it("should not post empty url", async () => {
      try {
        await postUrl("");
      } catch (error) {
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.empty);
      }
    });

    it("should not post long url(>150)", async () => {
      try {
        const validLink = "http://www.google.co.il/";
        await postUrl(
          validLink + generateRandomString(150 - validLink.length + 1)
        );
      } catch (error) {
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.long);
      }
    });

    it("should not post a random string", async () => {
      const url = generateRandomString(15);
      try {
        await postUrl(url);
      } catch (error) {
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);
      }
    });

    it("should not post with bad protocol", async () => {
      const url = "htp://www.google.co.il/";
      try {
        await postUrl(url);
      } catch (error) {
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);
      }
    });

    it("should not post without protocol", async () => {
      const url = "www.google.co.il/";
      try {
        await postUrl(url);
      } catch (error) {
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);
      }
    });

    describe("negative get requests", () => {
      it("should not redirect with non existing url", async () => {
        try {
          //we assume it not exist
          const nonexistingId = "qqzzas";
          await getUrl(nonexistingId);
        } catch (error) {
          expect(error.status).to.eq(404);
          expect(error.response.body.message).to.eq(errorMessages.notExists);
        }
      });

      const malformedIds = [
        "%",
        "#",
        "$",
        "&",
        "!@#%!",
        "asd123asg!@#",
        "()",
        "z@",
      ];

      malformedIds.forEach((s) => {
        it(`should not redirect with bad id => ${s}`, (done) => {
          getUrl(s).end((err, res) => {
            expect(err).to.not.be.null;
            expect(err.status).to.eq(404);
            expect(err.response.body.message).to.eq(errorMessages.notExists);
            done();
          });
        });
      });
    });
  });
});
