"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors = require('cors');
var addControllers_1 = __importDefault(require("./controllers/addControllers"));
var addMiddlewares_1 = __importDefault(require("./middlewares/addMiddlewares"));
var PORT = 5000;
var app = (0, express_1.default)();
app.use(cors());
(0, addMiddlewares_1.default)(app);
(0, addControllers_1.default)(app);
app.listen(PORT, function () {
    console.log("server running on " + PORT);
});
exports.default = app;
