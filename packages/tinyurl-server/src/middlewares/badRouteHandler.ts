import { Application } from "express";

const badRouteHandler = (app: Application) => {
  app.use(function (req, res, next) {
    var err = null;
    try {
      decodeURIComponent(req.path);
    } catch (e) {
      err = e;
    }
    if (err) {
      return res.status(404).send({ message: "url does not exists" });
    } else {
      next();
    }
  });
};

export default badRouteHandler;