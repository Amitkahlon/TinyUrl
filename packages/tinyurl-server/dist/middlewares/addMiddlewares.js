"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var badRouteHandler_1 = __importDefault(require("./badRouteHandler"));
var middlewares = [badRouteHandler_1.default];
var addMiddlewares = function (app) {
    middlewares.forEach(function (middleware) {
        middleware(app);
    });
};
exports.default = addMiddlewares;
