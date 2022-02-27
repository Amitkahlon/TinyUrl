"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHttpUrl = exports.getLongUrl = exports.addUrl = exports.getShortUrl = void 0;
var urlDAL_1 = require("../dal/urlDAL");
var appsettings_json_1 = require("../appsettings.json");
/**
 * returns url based on the base url and id
 * @param id
 * @returns
 */
var getShortUrl = function (id) {
    var url = "".concat(appsettings_json_1.BASE, "/").concat(id);
    return url;
};
exports.getShortUrl = getShortUrl;
var addUrl = function (longUrl) {
    var _a = isValidStringLength(longUrl), isValid = _a.isValid, long = _a.long, short = _a.short;
    if (!isValid) {
        if (!long) {
            throw { problem: "long", message: 'url is longer than 150 chars' };
        }
        else {
            throw { problem: "short", message: 'url cannot be empty' };
        }
    }
    var isValidUrl = isValidHttpUrl(longUrl);
    if (isValidUrl) {
        var index = (0, urlDAL_1.insert)(longUrl);
        var url = getShortUrl(index);
        return url;
    }
    else {
        throw { problem: "invalid", message: 'not a valid http/https url' };
    }
};
exports.addUrl = addUrl;
var getLongUrl = function (id) {
    var longUrl = (0, urlDAL_1.get)(id);
    return longUrl;
};
exports.getLongUrl = getLongUrl;
var isValidHttpUrl = function (string) {
    var url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};
exports.isValidHttpUrl = isValidHttpUrl;
var isValidStringLength = function (string) {
    var length = string.length;
    var validObj = {
        short: length !== 0,
        long: length <= 150,
        isValid: length !== 0 && length <= 150,
    };
    return validObj;
};
