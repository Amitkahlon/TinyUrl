"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var urlDAL_1 = require("../dal/urlDAL");
describe("dal tests", function () {
    describe("insert", function () {
        beforeEach(function () {
            (0, urlDAL_1.setDb)([]);
        });
        it("insert new item", function () {
            var randomUrl = "aaabbbccc";
            (0, urlDAL_1.insert)(randomUrl);
            expect((0, urlDAL_1.getDb)()).toContain(randomUrl);
        });
        it("insert 5 items", function () {
            var arr = ["aaa", "bbb", "ccc", "ddd", "eee"];
            arr.forEach(function (url) {
                (0, urlDAL_1.insert)(url);
            });
            for (var i = 0; i < arr.length; i++) {
                expect((0, urlDAL_1.getDb)()[i]).toEqual(arr[i]);
            }
        });
        it("insert 2 same items", function () {
            var a = "aaa";
            var b = "aaa";
            (0, urlDAL_1.insert)(a);
            (0, urlDAL_1.insert)(b);
            expect((0, urlDAL_1.getDb)()[0]).toEqual(a);
            expect((0, urlDAL_1.getDb)()[0]).toEqual(b);
            expect((0, urlDAL_1.getDb)()[1]).toBeUndefined();
        });
    });
    describe("get", function () {
        var mock = ["aaa", "bbb", "ccc", "ddd", "eee"];
        beforeEach(function () {
            (0, urlDAL_1.setDb)(mock);
        });
        it("should get aaa", function () {
            var item = (0, urlDAL_1.get)("0");
            expect(item).toEqual(mock[0]);
        });
        it("should get ccc", function () {
            var item = (0, urlDAL_1.get)("2");
            expect(item).toEqual(mock[2]);
        });
        it("should get eee", function () {
            var item = (0, urlDAL_1.get)("4");
            expect(item).toEqual(mock[4]);
        });
        var singleInvalidChars = [
            "#",
            "!",
            "@",
            "#",
            "$",
            "%",
            "^",
            "&",
            "*",
            "(",
            ")",
            "(",
            ")",
        ];
        singleInvalidChars.forEach(function (c) {
            it("should throw when given invalid single char => '".concat(c, "'"), function () {
                expect(function () {
                    (0, urlDAL_1.get)(c);
                }).toThrow("url does not exists");
            });
        });
        var multipleInvalidChars = [
            "!@#",
            "#$%",
            "%^&*&",
            "@#$^()*",
            "0!",
            "!0",
            "0!0",
        ];
        multipleInvalidChars.forEach(function (s) {
            it("should throw when given invalid string => '".concat(s, "'"), function () {
                expect(function () {
                    (0, urlDAL_1.get)(s);
                }).toThrow("url does not exists");
            });
        });
        it("should throw when getting non existing item(valid id)", function () {
            expect(function () {
                (0, urlDAL_1.get)("6");
            }).toThrow("url does not exists");
        });
    });
});
