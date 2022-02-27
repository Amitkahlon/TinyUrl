"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlController_1 = __importDefault(require("./urlController"));
var controllers = [urlController_1.default];
var addControllers = function (app) {
    controllers.forEach(function (controller) {
        controller(app);
    });
};
exports.default = addControllers;
