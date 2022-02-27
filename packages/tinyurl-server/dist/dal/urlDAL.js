"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDb = exports.getDb = exports.insert = exports.get = void 0;
var base62Encoder_1 = __importDefault(require("../services/base62Encoder"));
var urlDb = [];
/**
 * insert a new url and returns the short url id.
 * @param longUrl
 * @returns
 */
var insert = function (longUrl) {
    //check if exists, if not it returns -1
    var index = urlDb.findIndex(function (item) { return item === longUrl; });
    if (index === -1) {
        var arrLength = urlDb.push(longUrl);
        index = arrLength - 1;
    }
    var base62index = base62Encoder_1.default.encode(index);
    return base62index;
};
exports.insert = insert;
var get = function (base62Id) {
    var isValidId = base62Encoder_1.default.isValidChars(base62Id);
    if (!isValidId) {
        throw { message: "url does not exists" };
    }
    var index = base62Encoder_1.default.decode(base62Id);
    if (urlDb.length < index) {
        throw { message: "url does not exists" };
    }
    var item = urlDb[index];
    return item;
};
exports.get = get;
var getDb = function () {
    return urlDb;
};
exports.getDb = getDb;
var setDb = function (setter) {
    urlDb = setter;
};
exports.setDb = setDb;
