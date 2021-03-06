import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { get, insert } from "../dal/urlDAL";
import { addUrl, getLongUrl } from "../services/urlService";

const jsonParser = bodyParser.json();

const urlController = (app: Application) => {
  app.post("/url", jsonParser, (req: Request, res: Response) => {
    const payload = req.body.url;
    try {
      const url = addUrl(payload);
      res.send({ message: url });
    } catch (error: any) {
      if (error.problem) {
        errorsHandlerObj[error.problem as keyof typeof errorsHandlerObj](
          res,
          error
        );
      } else {
        errorsHandlerObj["default"](res, error);
      }
    }
  });

  app.get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const longUrl = getLongUrl(id);
      res.redirect(longUrl);
    } catch (error: any) {
      if (error.message === "url does not exists") {
        res.status(404).send({ message: error.message });
      } else {
        console.log(error);
        res.status(500).send({ message: "problem occurred" });
      }
    }
  });
};

export default urlController;

const errorsHandlerObj = {
  invalid: (res: Response) => {
    res.status(400).send({
      message: "Please provide a valid url with http/https protocol",
    });
  },
  short: (res: Response) => {
    res.status(400).send({
      message: "url cannot be empty",
    });
  },
  long: (res: Response) => {
    res.status(400).send({
      message: "url cannot be longer than 150 characters",
    });
  },
  default: (res: Response, error: any) => {
    console.log(error);
    res.status(500).send({ message: "problem occurred" });
  },
};
