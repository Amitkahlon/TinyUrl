"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var badRouteHandler = function (app) {
    app.use(function (req, res, next) {
        var err = null;
        try {
            decodeURIComponent(req.path);
        }
        catch (e) {
            err = e;
        }
        if (err) {
            return res.status(404).send({ message: "url does not exists" });
        }
        else {
            next();
        }
    });
};
exports.default = badRouteHandler;
