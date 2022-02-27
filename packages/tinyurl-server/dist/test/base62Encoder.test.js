"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const encoder = require("../services/base62Encoder")
var base62Encoder_1 = __importDefault(require("../services/base62Encoder"));
describe("base62 encoder tests", function () {
    it("should pass", function () {
        var base10Num = 0;
        var expectedResult = 0;
        var base62Num = base62Encoder_1.default.encode(base10Num);
        expect(base62Num).toEqual(expectedResult);
    });
});
