"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var encodeBase62 = function (integer) {
    if (integer < 0) {
        throw new Error("number cannot be negative");
    }
    if (integer === 0) {
        return "0";
    }
    var s = [];
    while (integer > 0) {
        s = __spreadArray([base62Encoder.charset[integer % 62]], s, true);
        integer = Math.floor(integer / 62);
    }
    return s.join("");
};
var decodeBase62 = function (chars) {
    if (!isValidChars(chars)) {
        throw new Error("not a valid chars");
    }
    return chars
        .split("")
        .reverse()
        .reduce(function (prev, curr, i) { return prev + base62Encoder.charset.indexOf(curr) * Math.pow(62, i); }, 0);
};
var isValidChars = function (id) {
    for (var i = 0; i < id.length; i++) {
        var c = id[i];
        var isExists = base62Encoder.charset.includes(c);
        if (!isExists) {
            return false;
        }
    }
    return true;
};
var base62Encoder = {
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    decode: decodeBase62,
    encode: encodeBase62,
    isValidChars: isValidChars,
};
exports.default = base62Encoder;
