"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urlService_1 = require("../services/urlService");
describe("url service", function () {
    describe("isValidHttpUrl tests", function () {
        var arrTuples = [
            ["", false],
            ["wadas", false],
            ["htp://www.google.co.il/", false],
            ["htps://www.google.co.il/", false],
            ["http://www.google.co.il/", true],
            ["https://www.google.co.il/", true],
            ["www.google.co.il/", false],
        ];
        arrTuples.forEach(function (_a) {
            var url = _a[0], expectedResult = _a[1];
            it("url: ".concat(url, " should be validate as: ").concat(expectedResult), function () {
                var isValid = (0, urlService_1.isValidHttpUrl)(url);
                expect(isValid).toEqual(expectedResult);
            });
        });
    });
    describe("getShortUrl  tests");
});
