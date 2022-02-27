"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base62Encoder_1 = __importDefault(require("../services/base62Encoder"));
var convertToBase62Test = function (base10num, expectedResult) {
    it("should convert ".concat(base10num, " to base62"), function () {
        var base62Num = base62Encoder_1.default.encode(base10num);
        expect(base62Num).toEqual(expectedResult);
    });
};
var convertFromBase62Test = function (base62num, expectedResult) {
    it("should convert ".concat(base62num, " to base10"), function () {
        var base62Num = base62Encoder_1.default.decode(base62num);
        expect(base62Num).toEqual(expectedResult);
    });
};
var testTuples = [
    [0, "0"],
    [2, "2"],
    [10, "a"],
    [11, "b"],
    [61, "Z"],
    [62, "10"],
    [100, "1C"],
    [3000, "Mo"],
    [60000, "fBK"],
];
describe("base62 encoder tests", function () {
    describe("encode", function () {
        describe("positive", function () {
            testTuples.forEach(function (tuple) {
                convertToBase62Test(tuple[0], tuple[1]);
            });
        });
        describe("negative", function () {
            it("should throw exception when encoding negative numbers => -1", function () {
                expect(function () { return base62Encoder_1.default.encode(-1); }).toThrow("number cannot be negative");
            });
            it("should throw exception when encoding negative numbers => -10000", function () {
                expect(function () { return base62Encoder_1.default.encode(-10000); }).toThrow("number cannot be negative");
            });
        });
    });
    describe("decode", function () {
        describe("positive", function () {
            testTuples.forEach(function (tuple) {
                convertFromBase62Test(tuple[1], tuple[0]);
            });
        });
        describe("negative", function () {
            it("should throw when not a valid chars", function () {
                expect(function () { return base62Encoder_1.default.decode("#$#@!"); }).toThrow("not a valid chars");
            });
        });
    });
});
