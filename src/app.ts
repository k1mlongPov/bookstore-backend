import express from "express";
import type {Application, Response, Request} from "express";
import userRoute from "./modules/user/user.route";
import {errorHandler} from "./middleware/error.middleware";

const app: Application = express();
app.use(express.json());

app.use('/user', userRoute);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to back-end...");
})

export default app;