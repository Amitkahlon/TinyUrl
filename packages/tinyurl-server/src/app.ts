import express, {Application, Request, Response} from 'express';
const cors = require('cors')
import addControllers from './controllers/addControllers';
import addMiddlewares from "./middlewares/addMiddlewares";

const PORT = 5000;

const app: Application = express();

app.use(cors())

addMiddlewares(app);
addControllers(app);


app.listen(PORT, () => {
    console.log("server running on " + PORT)
})

export default app;