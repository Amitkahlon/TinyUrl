import {
  addUrl,
  getLongUrl,
  getShortUrl,
  isValidHttpUrl,
} from "../services/urlService";

import { BASE } from "../appsettings.json";

describe("url service", () => {
  describe("isValidHttpUrl tests", () => {
    const arrTuples: Array<[string, boolean]> = [
      ["", false],
      ["wadas", false],
      ["htp://www.google.co.il/", false],
      ["htps://www.google.co.il/", false],
      ["http://www.google.co.il/", true],
      ["https://www.google.co.il/", true],
      ["www.google.co.il/", false],
    ];

    arrTuples.forEach(([url, expectedResult]) => {
      it(`url: ${url} should be validate as: ${expectedResult}`, () => {
        const isValid = isValidHttpUrl(url);
        expect(isValid).toEqual(expectedResult);
      });
    });
  });

  describe("getShortUrl  tests", () => {
    const arrTuples: Array<[string, string]> = [
      ["4", BASE + "/4"],
      ["bbb", BASE + "/bbb"],
    ];

    arrTuples.forEach(([id, expectedResult]) => {
      it(`should return a short url based on id => id: ${id}`, () => {
        const result = getShortUrl(id);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
