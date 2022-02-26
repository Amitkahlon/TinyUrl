import express, {Application, Request, Response} from 'express';
import urlController from "./urlController";

const controllers = [urlController]

const addControllers = (app: Application) => {
    controllers.forEach((controller) => {
        controller(app);
    })
}

export default addControllers;