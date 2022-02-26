import badRouteHandler from "./badRouteHandler";
import express, {Application, Request, Response} from 'express';


const middlewares = [badRouteHandler]

const addMiddlewares = (app: Application) => {
    middlewares.forEach(middleware => {
        middleware(app);
    })
}

export default addMiddlewares;