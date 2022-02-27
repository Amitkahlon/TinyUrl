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
    it("should not post empty url", (done) => {
      postUrl("").end((error, res) => {
        expect(error).to.not.be.null;
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.empty);

        done();
      });
    });

    it("should not post long url(>150)", (done) => {
      const validLink = "http://www.google.co.il/";
      postUrl(validLink + generateRandomString(150 - validLink.length + 1)).end(
        (error, res) => {
          expect(error).to.not.be.null;
          expect(error.status).to.eq(400);
          expect(error.response.body.message).to.eq(errorMessages.long);

          done();
        }
      );
    });

    it("should not post a random string", (done) => {
      const url = generateRandomString(15);
      postUrl(url).end((error, res) => {
        expect(error).to.not.be.null;
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);

        done();
      });
    });

    it("should not post with bad protocol", (done) => {
      const url = "htp://www.google.co.il/";
      postUrl(url).end((error, res) => {
        expect(error).to.not.be.null;
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);

        done();
      });
    });

    it("should not post without protocol", (done) => {
      const url = "www.google.co.il/";
      postUrl(url).end((error, res) => {
        expect(error).to.not.be.null;
        expect(error.status).to.eq(400);
        expect(error.response.body.message).to.eq(errorMessages.bad);

        done();
      });
    });

    describe("negative get requests", () => {
      it("should not redirect with non existing url", (done) => {
        //we assume it not exist atm
        const nonexistingId = "qqzzascz";
        getUrl(nonexistingId).end((error, res) => {
          expect(error).to.not.be.null;
          expect(error.status).to.eq(404);
          expect(error.response.body.message).to.eq(errorMessages.notExists);

          done();
        });
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
