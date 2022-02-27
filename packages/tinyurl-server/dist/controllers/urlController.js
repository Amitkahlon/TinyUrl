"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var urlService_1 = require("../services/urlService");
var jsonParser = body_parser_1.default.json();
var urlController = function (app) {
    app.post("/url", jsonParser, function (req, res) {
        var payload = req.body.url;
        try {
            var url = (0, urlService_1.addUrl)(payload);
            res.send({ message: url });
        }
        catch (error) {
            if (error.problem) {
                errorsHandlerObj[error.problem](res, error);
            }
            else {
                errorsHandlerObj["default"](res, error);
            }
        }
    });
    app.get("/:id", function (req, res) {
        var id = req.params.id;
        try {
            var longUrl = (0, urlService_1.getLongUrl)(id);
            res.redirect(longUrl);
        }
        catch (error) {
            if (error.message === "url does not exists") {
                res.status(404).send({ message: error.message });
            }
            else {
                console.log(error);
                res.status(500).send({ message: "problem occurred" });
            }
        }
    });
};
exports.default = urlController;
var errorsHandlerObj = {
    invalid: function (res) {
        res.status(400).send({
            message: "Please provide a valid url with http/https protocol",
        });
    },
    short: function (res) {
        res.status(400).send({
            message: "url cannot be empty",
        });
    },
    long: function (res) {
        res.status(400).send({
            message: "url cannot be longer than 150 characters",
        });
    },
    default: function (res, error) {
        console.log(error);
        res.status(500).send({ message: "problem occurred" });
    },
};
