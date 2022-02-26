const { expect } = require("chai");
const {
    baseUrl,
    base64charset,
    postUrlRoute,
    protocol: expectedProtocol,
    url: expectedUrl,
  } = require("../appsettings.json");

  const assertProperShortLink = (link) => {
    const linkArr = link.split("/");
    const protocol = linkArr[0].slice(0, -1); //remove the ':' from the end of the string
    const url = linkArr[2];
    const id = linkArr[3];
  
    expect(protocol).to.equal(expectedProtocol);
    expect(url).to.equal(expectedUrl);
    checkIfProperId(id);
  };
  
  const checkIfProperId = (id) => {
    for (c in id) {
      expect(base64charset).to.include(c);
    }
  };

  module.exports = {
    checkIfProperId,
    assertProperShortLink
  }